import Vue from 'vue'

describe('Options lifecycle hooks', () => {
  let spy
  beforeEach(() => {
    spy = vi.fn()
  })

  describe('beforeCreate', () => {
    it('should allow modifying options', () => {
      const vm = new Vue({
        data: {
          a: 1
        },
        beforeCreate() {
          spy()
          expect(this.a).toBeUndefined()
          this.$options.computed = {
            b() {
              return this.a + 1
            }
          }
        }
      })
      expect(spy).toHaveBeenCalled()
      expect(vm.b).toBe(2)
    })
  })

  describe('created', () => {
    it('should have completed observation', () => {
      new Vue({
        data: {
          a: 1
        },
        created() {
          expect(this.a).toBe(1)
          spy()
        }
      })
      expect(spy).toHaveBeenCalled()
    })
  })

  describe('beforeMount', () => {
    it('should not have mounted', () => {
      const vm = new Vue({
        render() {},
        beforeMount() {
          spy()
          expect(this._isMounted).toBe(false)
          expect(this.$el).toBeUndefined() // due to empty mount
          expect(this._vnode).toBeNull()
          expect(this._watcher).toBeNull()
        }
      })
      expect(spy).not.toHaveBeenCalled()
      vm.$mount()
      expect(spy).toHaveBeenCalled()
    })
  })

  describe('mounted', () => {
    it('should have mounted', () => {
      const vm = new Vue({
        template: '<div></div>',
        mounted() {
          spy()
          expect(this._isMounted).toBe(true)
          expect(this.$el.tagName).toBe('DIV')
          expect(this._vnode.tag).toBe('div')
        }
      })
      expect(spy).not.toHaveBeenCalled()
      vm.$mount()
      expect(spy).toHaveBeenCalled()
    })

    // #3898
    it('should call for manually mounted instance with parent', () => {
      const parent = new Vue()
      expect(spy).not.toHaveBeenCalled()
      new Vue({
        parent,
        template: '<div></div>',
        mounted() {
          spy()
        }
      }).$mount()
      expect(spy).toHaveBeenCalled()
    })

    it('should mount child parent in correct order', () => {
      const calls: any[] = []
      new Vue({
        template: '<div><test></test></div>',
        mounted() {
          calls.push('parent')
        },
        components: {
          test: {
            template: '<nested></nested>',
            mounted() {
              expect(this.$el.parentNode).toBeTruthy()
              calls.push('child')
            },
            components: {
              nested: {
                template: '<div></div>',
                mounted() {
                  expect(this.$el.parentNode).toBeTruthy()
                  calls.push('nested')
                }
              }
            }
          }
        }
      }).$mount()
      expect(calls).toEqual(['nested', 'child', 'parent'])
    })
  })

  describe('beforeUpdate', () => {
    it('should be called before update', done => {
      const vm = new Vue({
        template: '<div>{{ msg }}</div>',
        data: { msg: 'foo' },
        beforeUpdate() {
          spy()
          expect(this.$el.textContent).toBe('foo')
        }
      }).$mount()
      expect(spy).not.toHaveBeenCalled()
      vm.msg = 'bar'
      expect(spy).not.toHaveBeenCalled() // should be async
      waitForUpdate(() => {
        expect(spy).toHaveBeenCalled()
      }).then(done)
    })

    it('should be called before render and allow mutating state', done => {
      const vm = new Vue({
        template: '<div>{{ msg }}</div>',
        data: { msg: 'foo' },
        beforeUpdate() {
          this.msg += '!'
        }
      }).$mount()
      expect(vm.$el.textContent).toBe('foo')
      vm.msg = 'bar'
      waitForUpdate(() => {
        expect(vm.$el.textContent).toBe('bar!')
      }).then(done)
    })

    // #8076
    it('should not be called after destroy', done => {
      const beforeUpdate = vi.fn()
      const destroyed = vi.fn()

      Vue.component('todo', {
        template: '<div>{{todo.done}}</div>',
        props: ['todo'],
        destroyed,
        beforeUpdate
      })

      const vm = new Vue({
        template: `
          <div>
            <todo v-for="t in pendingTodos" :todo="t" :key="t.id"></todo>
          </div>
        `,
        data() {
          return {
            todos: [{ id: 1, done: false }]
          }
        },
        computed: {
          pendingTodos() {
            return this.todos.filter(t => !t.done)
          }
        }
      }).$mount()

      vm.todos[0].done = true
      waitForUpdate(() => {
        expect(destroyed).toHaveBeenCalled()
        expect(beforeUpdate).not.toHaveBeenCalled()
      }).then(done)
    })
  })

  describe('updated', () => {
    it('should be called after update', done => {
      const vm = new Vue({
        template: '<div>{{ msg }}</div>',
        data: { msg: 'foo' },
        updated() {
          spy()
          expect(this.$el.textContent).toBe('bar')
        }
      }).$mount()
      expect(spy).not.toHaveBeenCalled()
      vm.msg = 'bar'
      expect(spy).not.toHaveBeenCalled() // should be async
      waitForUpdate(() => {
        expect(spy).toHaveBeenCalled()
      }).then(done)
    })

    it('should be called after children are updated', done => {
      const calls: any[] = []
      const vm = new Vue({
        template: '<div><test ref="child">{{ msg }}</test></div>',
        data: { msg: 'foo' },
        components: {
          test: {
            template: `<div><slot></slot></div>`,
            updated() {
              expect(this.$el.textContent).toBe('bar')
              calls.push('child')
            }
          }
        },
        updated() {
          expect(this.$el.textContent).toBe('bar')
          calls.push('parent')
        }
      }).$mount()

      expect(calls).toEqual([])
      vm.msg = 'bar'
      expect(calls).toEqual([])
      waitForUpdate(() => {
        expect(calls).toEqual(['child', 'parent'])
      }).then(done)
    })

    // #8076
    it('should not be called after destroy', done => {
      const updated = vi.fn()
      const destroyed = vi.fn()

      Vue.component('todo', {
        template: '<div>{{todo.done}}</div>',
        props: ['todo'],
        destroyed,
        updated
      })

      const vm = new Vue({
        template: `
          <div>
            <todo v-for="t in pendingTodos" :todo="t" :key="t.id"></todo>
          </div>
        `,
        data() {
          return {
            todos: [{ id: 1, done: false }]
          }
        },
        computed: {
          pendingTodos() {
            return this.todos.filter(t => !t.done)
          }
        }
      }).$mount()

      vm.todos[0].done = true
      waitForUpdate(() => {
        expect(destroyed).toHaveBeenCalled()
        expect(updated).not.toHaveBeenCalled()
      }).then(done)
    })
  })

  describe('beforeDestroy', () => {
    it('should be called before destroy', () => {
      const vm = new Vue({
        render() {},
        beforeDestroy() {
          spy()
          expect(this._isBeingDestroyed).toBe(false)
          expect(this._isDestroyed).toBe(false)
        }
      }).$mount()
      expect(spy).not.toHaveBeenCalled()
      vm.$destroy()
      vm.$destroy()
      expect(spy).toHaveBeenCalled()
      expect(spy.mock.calls.length).toBe(1)
    })
  })

  describe('destroyed', () => {
    it('should be called after destroy', () => {
      const vm = new Vue({
        render() {},
        destroyed() {
          spy()
          expect(this._isBeingDestroyed).toBe(true)
          expect(this._isDestroyed).toBe(true)
        }
      }).$mount()
      expect(spy).not.toHaveBeenCalled()
      vm.$destroy()
      vm.$destroy()
      expect(spy).toHaveBeenCalled()
      expect(spy.mock.calls.length).toBe(1)
    })
  })

  it('should emit hook events', () => {
    const created = vi.fn()
    const mounted = vi.fn()
    const destroyed = vi.fn()
    const vm = new Vue({
      render() {},
      beforeCreate() {
        this.$on('hook:created', created)
        this.$on('hook:mounted', mounted)
        this.$on('hook:destroyed', destroyed)
      }
    })

    expect(created).toHaveBeenCalled()
    expect(mounted).not.toHaveBeenCalled()
    expect(destroyed).not.toHaveBeenCalled()

    vm.$mount()
    expect(mounted).toHaveBeenCalled()
    expect(destroyed).not.toHaveBeenCalled()

    vm.$destroy()
    expect(destroyed).toHaveBeenCalled()
  })
})

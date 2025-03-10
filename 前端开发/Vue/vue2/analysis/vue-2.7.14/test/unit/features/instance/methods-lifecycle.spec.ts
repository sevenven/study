import Vue from 'vue'
import Dep from 'core/observer/dep'

describe('Instance methods lifecycle', () => {
  describe('$mount', () => {
    it('empty mount', () => {
      const vm = new Vue({
        data: { msg: 'hi' },
        template: '<div>{{ msg }}</div>'
      }).$mount()
      expect(vm.$el.tagName).toBe('DIV')
      expect(vm.$el.textContent).toBe('hi')
    })

    it('mount to existing element', () => {
      const el = document.createElement('div')
      el.innerHTML = '{{ msg }}'
      const vm = new Vue({
        data: { msg: 'hi' }
      }).$mount(el)
      expect(vm.$el.tagName).toBe('DIV')
      expect(vm.$el.textContent).toBe('hi')
    })

    it('mount to id', () => {
      const el = document.createElement('div')
      el.id = 'mount-test'
      el.innerHTML = '{{ msg }}'
      document.body.appendChild(el)
      const vm = new Vue({
        data: { msg: 'hi' }
      }).$mount('#mount-test')
      expect(vm.$el.tagName).toBe('DIV')
      expect(vm.$el.textContent).toBe('hi')
    })

    it('Dep.target should be undefined in lifecycle', () => {
      new Vue({
        template: '<div><my-component></my-component></div>',
        components: {
          myComponent: {
            template: '<div>hi</div>',
            mounted() {
              this.msg
              expect(Dep.target).toBe(undefined)
            },
            computed: {
              msg() {
                return 1
              }
            }
          }
        }
      }).$mount()
    })

    it('Dep.target should be undefined during invocation of child immediate watcher', done => {
      let calls = 0
      const childData = { a: 1 }
      const parentUpdate = vi.fn()
      new Vue({
        template: '<div><my-component></my-component></div>',
        updated: parentUpdate,
        components: {
          myComponent: {
            template: '<div>{{ a }}</div>',
            data() {
              return childData
            },
            watch: {
              anything: {
                handler() {
                  ++calls
                  this.a
                },
                immediate: true
              }
            }
          }
        }
      }).$mount()
      expect(calls).toBe(1)
      childData.a++
      waitForUpdate(() => {
        expect(parentUpdate).not.toHaveBeenCalled()
      }).then(done)
    })
  })

  describe('$destroy', () => {
    it('remove self from parent', () => {
      const vm = new Vue({
        template: '<test></test>',
        components: {
          test: { template: '<div></div>' }
        }
      }).$mount()
      vm.$children[0].$destroy()
      expect(vm.$children.length).toBe(0)
    })

    it('teardown watchers', () => {
      const vm = new Vue({
        data: { a: 123 },
        template: '<div></div>'
      }).$mount()
      vm.$watch('a', () => {})
      vm.$destroy()
      expect(vm._watcher.active).toBe(false)
      expect(vm._scope.effects.every(w => !w.active)).toBe(true)
    })

    it('remove self from data observer', () => {
      const vm = new Vue({ data: { a: 1 } })
      vm.$destroy()
      expect(vm.$data.__ob__.vmCount).toBe(0)
    })

    it('avoid duplicate calls', () => {
      const spy = vi.fn()
      const vm = new Vue({
        beforeDestroy: spy
      })
      vm.$destroy()
      vm.$destroy()
      expect(spy.mock.calls.length).toBe(1)
    })
  })

  describe('$forceUpdate', () => {
    it('should force update', done => {
      const vm = new Vue({
        data: {
          a: {}
        },
        template: '<div>{{ a.b }}</div>'
      }).$mount()
      expect(vm.$el.textContent).toBe('')
      vm.a.b = 'foo'
      waitForUpdate(() => {
        // should not work because adding new property
        expect(vm.$el.textContent).toBe('')
        vm.$forceUpdate()
      })
        .then(() => {
          expect(vm.$el.textContent).toBe('foo')
        })
        .then(done)
    })
  })

  describe('$nextTick', () => {
    it('should be called after DOM update in correct context', done => {
      const vm = new Vue({
        template: '<div>{{ msg }}</div>',
        data: {
          msg: 'foo'
        }
      }).$mount()
      vm.msg = 'bar'
      vm.$nextTick(function () {
        expect(this).toBe(vm)
        expect(vm.$el.textContent).toBe('bar')
        done()
      })
    })

    if (typeof Promise !== 'undefined') {
      it('should be called after DOM update in correct context, when using Promise syntax', done => {
        const vm = new Vue({
          template: '<div>{{ msg }}</div>',
          data: {
            msg: 'foo'
          }
        }).$mount()
        vm.msg = 'bar'
        vm.$nextTick().then(ctx => {
          expect(ctx).toBe(vm)
          expect(vm.$el.textContent).toBe('bar')
          done()
        })
      })
    }
  })
})

import Vue from 'vue'

describe('Options errorCaptured', () => {
  let globalSpy

  beforeEach(() => {
    globalSpy = Vue.config.errorHandler = vi.fn()
  })

  afterEach(() => {
    Vue.config.errorHandler = undefined
  })

  it('should capture error from child component', () => {
    const spy = vi.fn()

    let child
    let err
    const Child = {
      created() {
        child = this
        err = new Error('child')
        throw err
      },
      render() {}
    }

    new Vue({
      errorCaptured: spy,
      render: h => h(Child)
    }).$mount()

    expect(spy).toHaveBeenCalledWith(err, child, 'created hook')
    // should propagate by default
    expect(globalSpy).toHaveBeenCalledWith(err, child, 'created hook')
  })

  it('should be able to render the error in itself', done => {
    let child
    const Child = {
      created() {
        child = this
        throw new Error('error from child')
      },
      render() {}
    }

    const vm = new Vue({
      data: {
        error: null
      },
      errorCaptured(e, vm, info) {
        expect(vm).toBe(child)
        this.error = e.toString() + ' in ' + info
      },
      render(h) {
        if (this.error) {
          return h('pre', this.error)
        }
        return h(Child)
      }
    }).$mount()

    waitForUpdate(() => {
      expect(vm.$el.textContent).toContain('error from child')
      expect(vm.$el.textContent).toContain('in created hook')
    }).then(done)
  })

  it('should not propagate to global handler when returning true', () => {
    const spy = vi.fn()

    let child
    let err
    const Child = {
      created() {
        child = this
        err = new Error('child')
        throw err
      },
      render() {}
    }

    new Vue({
      errorCaptured(err, vm, info) {
        spy(err, vm, info)
        return false
      },
      render: h => h(Child, {})
    }).$mount()

    expect(spy).toHaveBeenCalledWith(err, child, 'created hook')
    // should not propagate
    expect(globalSpy).not.toHaveBeenCalled()
  })

  it('should propagate to global handler if itself throws error', () => {
    let child
    let err
    const Child = {
      created() {
        child = this
        err = new Error('child')
        throw err
      },
      render() {}
    }

    let err2
    const vm = new Vue({
      errorCaptured() {
        err2 = new Error('foo')
        throw err2
      },
      render: h => h(Child, {})
    }).$mount()

    expect(globalSpy).toHaveBeenCalledWith(err, child, 'created hook')
    expect(globalSpy).toHaveBeenCalledWith(err2, vm, 'errorCaptured hook')
  })

  it('should work across multiple parents, mixins and extends', () => {
    const calls: any[] = []

    const Child = {
      created() {
        throw new Error('child')
      },
      render() {}
    }

    const ErrorBoundaryBase = {
      errorCaptured() {
        calls.push(1)
      }
    }

    const mixin = {
      errorCaptured() {
        calls.push(2)
      }
    }

    const ErrorBoundaryExtended = {
      extends: ErrorBoundaryBase,
      mixins: [mixin],
      errorCaptured() {
        calls.push(3)
      },
      render: h => h(Child)
    }

    Vue.config.errorHandler = () => {
      calls.push(5)
    }

    new Vue({
      errorCaptured() {
        calls.push(4)
      },
      render: h => h(ErrorBoundaryExtended)
    }).$mount()

    expect(calls).toEqual([1, 2, 3, 4, 5])
  })

  it('should work across multiple parents, mixins and extends with return false', () => {
    const calls: any[] = []

    const Child = {
      created() {
        throw new Error('child')
      },
      render() {}
    }

    const ErrorBoundaryBase = {
      errorCaptured() {
        calls.push(1)
      }
    }

    const mixin = {
      errorCaptured() {
        calls.push(2)
      }
    }

    const ErrorBoundaryExtended = {
      extends: ErrorBoundaryBase,
      mixins: [mixin],
      errorCaptured() {
        calls.push(3)
        return false
      },
      render: h => h(Child)
    }

    Vue.config.errorHandler = () => {
      calls.push(5)
    }

    new Vue({
      errorCaptured() {
        calls.push(4)
      },
      render: h => h(ErrorBoundaryExtended)
    }).$mount()

    expect(calls).toEqual([1, 2, 3])
  })

  // ref: https://github.com/vuejs/vuex/issues/1505
  it('should not add watchers to render deps if they are referred from errorCaptured callback', done => {
    const store = new Vue({
      data: {
        errors: []
      }
    })

    const Child = {
      computed: {
        test() {
          throw new Error('render error')
        }
      },

      render(h) {
        return h('div', {
          attrs: {
            'data-test': this.test
          }
        })
      }
    }

    new Vue({
      errorCaptured(error) {
        store.errors.push(error)
      },
      render: h => h(Child)
    }).$mount()

    // Ensure not to trigger infinite loop
    waitForUpdate(() => {
      expect(store.errors.length).toBe(1)
      expect(store.errors[0]).toEqual(new Error('render error'))
    }).then(done)
  })

  it('should capture error from watcher', done => {
    const spy = vi.fn()

    let child
    let err
    const Child = {
      data() {
        return {
          foo: null
        }
      },
      watch: {
        foo() {
          err = new Error('userWatcherCallback error')
          throw err
        }
      },
      created() {
        child = this
      },
      render() {}
    }

    new Vue({
      errorCaptured: spy,
      render: h => h(Child)
    }).$mount()

    child.foo = 'bar'

    waitForUpdate(() => {
      expect(spy).toHaveBeenCalledWith(err, child, 'callback for watcher "foo"')
      expect(globalSpy).toHaveBeenCalledWith(
        err,
        child,
        'callback for watcher "foo"'
      )
    }).then(done)
  })

  it('should capture promise error from watcher', done => {
    const spy = vi.fn()

    let child
    let err
    const Child = {
      data() {
        return {
          foo: null
        }
      },
      watch: {
        foo() {
          err = new Error('userWatcherCallback error')
          return Promise.reject(err)
        }
      },
      created() {
        child = this
      },
      render() {}
    }

    new Vue({
      errorCaptured: spy,
      render: h => h(Child)
    }).$mount()

    child.foo = 'bar'

    child.$nextTick(() => {
      waitForUpdate(() => {
        expect(spy).toHaveBeenCalledWith(
          err,
          child,
          'callback for watcher "foo" (Promise/async)'
        )
        expect(globalSpy).toHaveBeenCalledWith(
          err,
          child,
          'callback for watcher "foo" (Promise/async)'
        )
      }).then(done)
    })
  })

  it('should capture error from immediate watcher', done => {
    const spy = vi.fn()

    let child
    let err
    const Child = {
      data() {
        return {
          foo: 'foo'
        }
      },
      watch: {
        foo: {
          immediate: true,
          handler() {
            err = new Error('userImmediateWatcherCallback error')
            throw err
          }
        }
      },
      created() {
        child = this
      },
      render() {}
    }

    new Vue({
      errorCaptured: spy,
      render: h => h(Child)
    }).$mount()

    waitForUpdate(() => {
      expect(spy).toHaveBeenCalledWith(
        err,
        child,
        'callback for immediate watcher "foo"'
      )
      expect(globalSpy).toHaveBeenCalledWith(
        err,
        child,
        'callback for immediate watcher "foo"'
      )
    }).then(done)
  })

  it('should capture promise error from immediate watcher', done => {
    const spy = vi.fn()

    let child
    let err
    const Child = {
      data() {
        return {
          foo: 'foo'
        }
      },
      watch: {
        foo: {
          immediate: true,
          handler() {
            err = new Error('userImmediateWatcherCallback error')
            return Promise.reject(err)
          }
        }
      },
      created() {
        child = this
      },
      render() {}
    }

    new Vue({
      errorCaptured: spy,
      render: h => h(Child)
    }).$mount()

    waitForUpdate(() => {
      expect(spy).toHaveBeenCalledWith(
        err,
        child,
        'callback for immediate watcher "foo" (Promise/async)'
      )
      expect(globalSpy).toHaveBeenCalledWith(
        err,
        child,
        'callback for immediate watcher "foo" (Promise/async)'
      )
    }).then(done)
  })
})

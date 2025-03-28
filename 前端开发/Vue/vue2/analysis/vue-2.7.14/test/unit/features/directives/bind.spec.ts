import Vue from 'vue'

describe('Directive v-bind', () => {
  it('normal attr', done => {
    const vm = new Vue({
      template: '<div><span :test="foo">hello</span></div>',
      data: { foo: 'ok' }
    }).$mount()
    expect(vm.$el.firstChild.getAttribute('test')).toBe('ok')
    vm.foo = 'again'
    waitForUpdate(() => {
      expect(vm.$el.firstChild.getAttribute('test')).toBe('again')
      vm.foo = null
    })
      .then(() => {
        expect(vm.$el.firstChild.hasAttribute('test')).toBe(false)
        vm.foo = false
      })
      .then(() => {
        expect(vm.$el.firstChild.hasAttribute('test')).toBe(false)
        vm.foo = true
      })
      .then(() => {
        expect(vm.$el.firstChild.getAttribute('test')).toBe('true')
        vm.foo = 0
      })
      .then(() => {
        expect(vm.$el.firstChild.getAttribute('test')).toBe('0')
      })
      .then(done)
  })

  it('should set property for input value', done => {
    const vm = new Vue({
      template: `
        <div>
          <input type="text" :value="foo">
          <input type="checkbox" :checked="bar">
        </div>
      `,
      data: {
        foo: 'ok',
        bar: false
      }
    }).$mount()
    expect(vm.$el.firstChild.value).toBe('ok')
    expect(vm.$el.lastChild.checked).toBe(false)
    vm.bar = true
    waitForUpdate(() => {
      expect(vm.$el.lastChild.checked).toBe(true)
    }).then(done)
  })

  it('xlink', done => {
    const vm = new Vue({
      template: '<svg><a :xlink:special="foo"></a></svg>',
      data: {
        foo: 'ok'
      }
    }).$mount()
    const xlinkNS = 'http://www.w3.org/1999/xlink'
    expect(vm.$el.firstChild.getAttributeNS(xlinkNS, 'special')).toBe('ok')
    vm.foo = 'again'
    waitForUpdate(() => {
      expect(vm.$el.firstChild.getAttributeNS(xlinkNS, 'special')).toBe('again')
      vm.foo = null
    })
      .then(() => {
        expect(vm.$el.firstChild.hasAttributeNS(xlinkNS, 'special')).toBe(false)
        vm.foo = true
      })
      .then(() => {
        expect(vm.$el.firstChild.getAttributeNS(xlinkNS, 'special')).toBe(
          'true'
        )
      })
      .then(done)
  })

  it('enumerated attr', done => {
    const vm = new Vue({
      template: '<div><span :contenteditable="foo">hello</span></div>',
      data: { foo: true }
    }).$mount()
    expect(vm.$el.firstChild.getAttribute('contenteditable')).toBe('true')
    vm.foo = 'plaintext-only' // allow special values
    waitForUpdate(() => {
      expect(vm.$el.firstChild.getAttribute('contenteditable')).toBe(
        'plaintext-only'
      )
      vm.foo = null
    })
      .then(() => {
        expect(vm.$el.firstChild.getAttribute('contenteditable')).toBe('false')
        vm.foo = ''
      })
      .then(() => {
        expect(vm.$el.firstChild.getAttribute('contenteditable')).toBe('true')
        vm.foo = false
      })
      .then(() => {
        expect(vm.$el.firstChild.getAttribute('contenteditable')).toBe('false')
        vm.foo = 'false'
      })
      .then(() => {
        expect(vm.$el.firstChild.getAttribute('contenteditable')).toBe('false')
      })
      .then(done)
  })

  it('boolean attr', done => {
    const vm = new Vue({
      template: '<div><span :disabled="foo">hello</span></div>',
      data: { foo: true }
    }).$mount()
    expect(vm.$el.firstChild.getAttribute('disabled')).toBe('disabled')
    vm.foo = 'again'
    waitForUpdate(() => {
      expect(vm.$el.firstChild.getAttribute('disabled')).toBe('disabled')
      vm.foo = null
    })
      .then(() => {
        expect(vm.$el.firstChild.hasAttribute('disabled')).toBe(false)
        vm.foo = ''
      })
      .then(() => {
        expect(vm.$el.firstChild.hasAttribute('disabled')).toBe(true)
      })
      .then(done)
  })

  it('.prop modifier', () => {
    const vm = new Vue({
      template:
        '<div><span v-bind:text-content.prop="foo"></span><span :inner-html.prop="bar"></span></div>',
      data: {
        foo: 'hello',
        bar: '<span>qux</span>'
      }
    }).$mount()
    expect(vm.$el.children[0].textContent).toBe('hello')
    expect(vm.$el.children[1].innerHTML).toBe('<span>qux</span>')
  })

  it('.prop modifier with normal attribute binding', () => {
    const vm = new Vue({
      template: '<input :some.prop="some" :id="id">',
      data: {
        some: 'hello',
        id: false
      }
    }).$mount()
    expect(vm.$el.some).toBe('hello')
    expect(vm.$el.getAttribute('id')).toBe(null)
  })

  if (process.env.VBIND_PROP_SHORTHAND) {
    it('.prop modifier shorthand', () => {
      const vm = new Vue({
        template:
          '<div><span .text-content="foo"></span><span .inner-html="bar"></span></div>',
        data: {
          foo: 'hello',
          bar: '<span>qux</span>'
        }
      }).$mount()
      expect(vm.$el.children[0].textContent).toBe('hello')
      expect(vm.$el.children[1].innerHTML).toBe('<span>qux</span>')
    })
  }

  it('.camel modifier', () => {
    const vm = new Vue({
      template: '<svg :view-box.camel="viewBox"></svg>',
      data: {
        viewBox: '0 0 1 1'
      }
    }).$mount()
    expect(vm.$el.getAttribute('viewBox')).toBe('0 0 1 1')
  })

  it('.sync modifier', done => {
    const vm = new Vue({
      template: `<test :foo-bar.sync="bar"/>`,
      data: {
        bar: 1
      },
      components: {
        test: {
          props: ['fooBar'],
          template: `<div @click="$emit('update:fooBar', 2)">{{ fooBar }}</div>`
        }
      }
    }).$mount()

    document.body.appendChild(vm.$el)
    expect(vm.$el.textContent).toBe('1')
    triggerEvent(vm.$el, 'click')
    waitForUpdate(() => {
      expect(vm.$el.textContent).toBe('2')
      document.body.removeChild(vm.$el)
    }).then(done)
  })

  it('.sync modifier with kebab case event', done => {
    const vm = new Vue({
      template: `<test ref="test" :foo-bar.sync="bar"/>`,
      data: {
        bar: 1
      },
      components: {
        test: {
          props: ['fooBar'],
          template: `<div>{{ fooBar }}</div>`,
          methods: {
            update() {
              this.$emit('update:foo-bar', 2)
            }
          }
        }
      }
    }).$mount()

    expect(vm.$el.textContent).toBe('1')
    vm.$refs.test.update()
    waitForUpdate(() => {
      expect(vm.$el.textContent).toBe('2')
    }).then(done)
  })

  it('bind object', done => {
    const vm = new Vue({
      template: '<input v-bind="test">',
      data: {
        test: {
          id: 'test',
          class: 'ok',
          value: 'hello'
        }
      }
    }).$mount()
    expect(vm.$el.getAttribute('id')).toBe('test')
    expect(vm.$el.getAttribute('class')).toBe('ok')
    expect(vm.$el.value).toBe('hello')
    vm.test.id = 'hi'
    vm.test.value = 'bye'
    waitForUpdate(() => {
      expect(vm.$el.getAttribute('id')).toBe('hi')
      expect(vm.$el.getAttribute('class')).toBe('ok')
      expect(vm.$el.value).toBe('bye')
    }).then(done)
  })

  it('bind object with explicit overrides', () => {
    const vm = new Vue({
      template: `<test v-bind="test" data-foo="foo" dataBar="bar"/>`,
      components: {
        test: {
          template: '<div>{{ dataFoo }} {{ dataBar }}</div>',
          props: ['dataFoo', 'dataBar']
        }
      },
      data: {
        test: {
          dataFoo: 'hi',
          dataBar: 'bye'
        }
      }
    }).$mount()
    expect(vm.$el.textContent).toBe('foo bar')
  })

  it('.sync modifier with bind object', done => {
    const vm = new Vue({
      template: `<test v-bind.sync="test"/>`,
      data: {
        test: {
          fooBar: 1
        }
      },
      components: {
        test: {
          props: ['fooBar'],
          template: `<div @click="handleUpdate">{{ fooBar }}</div>`,
          methods: {
            handleUpdate() {
              this.$emit('update:fooBar', 2)
            }
          }
        }
      }
    }).$mount()
    document.body.appendChild(vm.$el)
    expect(vm.$el.textContent).toBe('1')
    triggerEvent(vm.$el, 'click')
    waitForUpdate(() => {
      expect(vm.$el.textContent).toBe('2')
      vm.test.fooBar = 3
    })
      .then(() => {
        expect(vm.$el.textContent).toBe('3')
        document.body.removeChild(vm.$el)
      })
      .then(done)
  })

  it('bind object with overwrite', done => {
    const vm = new Vue({
      template: '<input v-bind="test" id="foo" :class="test.value">',
      data: {
        test: {
          id: 'test',
          class: 'ok',
          value: 'hello'
        }
      }
    }).$mount()
    expect(vm.$el.getAttribute('id')).toBe('foo')
    expect(vm.$el.getAttribute('class')).toBe('hello')
    expect(vm.$el.value).toBe('hello')
    vm.test.id = 'hi'
    vm.test.value = 'bye'
    waitForUpdate(() => {
      expect(vm.$el.getAttribute('id')).toBe('foo')
      expect(vm.$el.getAttribute('class')).toBe('bye')
      expect(vm.$el.value).toBe('bye')
    }).then(done)
  })

  it('bind object with class/style', done => {
    const vm = new Vue({
      template: '<input class="a" style="color:red" v-bind="test">',
      data: {
        test: {
          id: 'test',
          class: ['b', 'c'],
          style: { fontSize: '12px' }
        }
      }
    }).$mount()
    expect(vm.$el.id).toBe('test')
    expect(vm.$el.className).toBe('a b c')
    expect(vm.$el.style.color).toBe('red')
    expect(vm.$el.style.fontSize).toBe('12px')
    vm.test.id = 'hi'
    vm.test.class = ['d']
    vm.test.style = { fontSize: '14px' }
    waitForUpdate(() => {
      expect(vm.$el.id).toBe('hi')
      expect(vm.$el.className).toBe('a d')
      expect(vm.$el.style.color).toBe('red')
      expect(vm.$el.style.fontSize).toBe('14px')
    }).then(done)
  })

  it('bind object as prop', done => {
    const vm = new Vue({
      template: '<input v-bind.prop="test">',
      data: {
        test: {
          id: 'test',
          className: 'ok',
          value: 'hello'
        }
      }
    }).$mount()
    expect(vm.$el.id).toBe('test')
    expect(vm.$el.className).toBe('ok')
    expect(vm.$el.value).toBe('hello')
    vm.test.id = 'hi'
    vm.test.className = 'okay'
    vm.test.value = 'bye'
    waitForUpdate(() => {
      expect(vm.$el.id).toBe('hi')
      expect(vm.$el.className).toBe('okay')
      expect(vm.$el.value).toBe('bye')
    }).then(done)
  })

  it('bind array', done => {
    const vm = new Vue({
      template: '<input v-bind="test">',
      data: {
        test: [{ id: 'test', class: 'ok' }, { value: 'hello' }]
      }
    }).$mount()
    expect(vm.$el.getAttribute('id')).toBe('test')
    expect(vm.$el.getAttribute('class')).toBe('ok')
    expect(vm.$el.value).toBe('hello')
    vm.test[0].id = 'hi'
    vm.test[1].value = 'bye'
    waitForUpdate(() => {
      expect(vm.$el.getAttribute('id')).toBe('hi')
      expect(vm.$el.getAttribute('class')).toBe('ok')
      expect(vm.$el.value).toBe('bye')
    }).then(done)
  })

  it('warn expect object', () => {
    new Vue({
      template: '<input v-bind="test">',
      data: {
        test: 1
      }
    }).$mount()
    expect(
      'v-bind without argument expects an Object or Array value'
    ).toHaveBeenWarned()
  })

  it('set value for option element', () => {
    const vm = new Vue({
      template: '<select><option :value="val">val</option></select>',
      data: {
        val: 'val'
      }
    }).$mount()
    // check value attribute
    expect(vm.$el.options[0].getAttribute('value')).toBe('val')
  })

  // a vdom patch edge case where the user has several un-keyed elements of the
  // same tag next to each other, and toggling them.
  it('properly update for toggling un-keyed children', done => {
    const vm = new Vue({
      template: `
        <div>
          <div v-if="ok" id="a" data-test="1"></div>
          <div v-if="!ok" id="b"></div>
        </div>
      `,
      data: {
        ok: true
      }
    }).$mount()
    expect(vm.$el.children[0].id).toBe('a')
    expect(vm.$el.children[0].getAttribute('data-test')).toBe('1')
    vm.ok = false
    waitForUpdate(() => {
      expect(vm.$el.children[0].id).toBe('b')
      expect(vm.$el.children[0].getAttribute('data-test')).toBe(null)
    }).then(done)
  })

  describe('bind object with special attribute', () => {
    function makeInstance(options) {
      return new Vue({
        template: `<div>${options.parentTemp}</div>`,
        data: {
          attrs: {
            [options.attr]: options.value
          }
        },
        components: {
          comp: {
            template: options.childTemp
          }
        }
      }).$mount()
    }

    it('key', () => {
      const vm = makeInstance({
        attr: 'key',
        value: 'test',
        parentTemp: '<div v-bind="attrs"></div>'
      })
      expect(vm._vnode.children[0].key).toBe('test')
    })

    it('ref', () => {
      const vm = makeInstance({
        attr: 'ref',
        value: 'test',
        parentTemp: '<div v-bind="attrs"></div>'
      })
      expect(vm.$refs.test).toBe(vm.$el.firstChild)
    })

    it('slot', () => {
      const vm = makeInstance({
        attr: 'slot',
        value: 'test',
        parentTemp: '<comp><span v-bind="attrs">123</span></comp>',
        childTemp: '<div>slot:<slot name="test"></slot></div>'
      })
      expect(vm.$el.innerHTML).toBe('<div>slot:<span>123</span></div>')
    })

    it('is', () => {
      const vm = makeInstance({
        attr: 'is',
        value: 'comp',
        parentTemp: '<component v-bind="attrs"></component>',
        childTemp: '<div>comp</div>'
      })
      expect(vm.$el.innerHTML).toBe('<div>comp</div>')
    })
  })

  describe('dynamic arguments', () => {
    it('basic', done => {
      const vm = new Vue({
        template: `<div v-bind:[key]="value"></div>`,
        data: {
          key: 'id',
          value: 'hello'
        }
      }).$mount()
      expect(vm.$el.id).toBe('hello')
      vm.key = 'class'
      waitForUpdate(() => {
        expect(vm.$el.id).toBe('')
        expect(vm.$el.className).toBe('hello')
        // explicit null value
        vm.key = null
      })
        .then(() => {
          expect(vm.$el.className).toBe('')
          expect(vm.$el.id).toBe('')
          vm.key = undefined
        })
        .then(() => {
          expect(
            `Invalid value for dynamic directive argument`
          ).toHaveBeenWarned()
        })
        .then(done)
    })

    it('shorthand', done => {
      const vm = new Vue({
        template: `<div :[key]="value"></div>`,
        data: {
          key: 'id',
          value: 'hello'
        }
      }).$mount()
      expect(vm.$el.id).toBe('hello')
      vm.key = 'class'
      waitForUpdate(() => {
        expect(vm.$el.className).toBe('hello')
      }).then(done)
    })

    it('with .prop modifier', done => {
      const vm = new Vue({
        template: `<div :[key].prop="value"></div>`,
        data: {
          key: 'id',
          value: 'hello'
        }
      }).$mount()
      expect(vm.$el.id).toBe('hello')
      vm.key = 'textContent'
      waitForUpdate(() => {
        expect(vm.$el.textContent).toBe('hello')
      }).then(done)
    })

    if (process.env.VBIND_PROP_SHORTHAND) {
      it('.prop shorthand', done => {
        const vm = new Vue({
          template: `<div .[key]="value"></div>`,
          data: {
            key: 'id',
            value: 'hello'
          }
        }).$mount()
        expect(vm.$el.id).toBe('hello')
        vm.key = 'textContent'
        waitForUpdate(() => {
          expect(vm.$el.textContent).toBe('hello')
        }).then(done)
      })
    }

    it('handle class and style', () => {
      const vm = new Vue({
        template: `<div :[key]="value" :[key2]="value2"></div>`,
        data: {
          key: 'class',
          value: ['hello', 'world'],
          key2: 'style',
          value2: {
            color: 'red'
          }
        }
      }).$mount()
      expect(vm.$el.className).toBe('hello world')
      expect(vm.$el.style.color).toBe('red')
    })

    it('handle shouldUseProp', done => {
      const vm = new Vue({
        template: `<input :[key]="value">`,
        data: {
          key: 'value',
          value: 'foo'
        }
      }).$mount()
      expect(vm.$el.value).toBe('foo')
      vm.value = 'bar'
      waitForUpdate(() => {
        expect(vm.$el.value).toBe('bar')
      }).then(done)
    })

    it('with .sync modifier', done => {
      const vm = new Vue({
        template: `<foo ref="child" :[key].sync="value"/>`,
        data: {
          key: 'foo',
          value: 'bar'
        },
        components: {
          foo: {
            props: ['foo'],
            template: `<div>{{ foo }}</div>`
          }
        }
      }).$mount()
      expect(vm.$el.textContent).toBe('bar')
      vm.$refs.child.$emit('update:foo', 'baz')
      waitForUpdate(() => {
        expect(vm.value).toBe('baz')
        expect(vm.$el.textContent).toBe('baz')
      }).then(done)
    })
  })
})

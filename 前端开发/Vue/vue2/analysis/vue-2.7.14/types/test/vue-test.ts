import Vue, { VNode, defineComponent } from '../index'
import { ComponentOptions } from '../options'

class Test extends Vue {
  a: number = 0

  testProperties() {
    this.$data
    this.$el
    this.$options
    this.$parent
    this.$root
    this.$children
    this.$refs
    this.$slots
    this.$isServer
    this.$ssrContext
    this.$vnode
    this.$root.$children[0].$children[0]
  }

  // test property reification
  $el!: HTMLElement | SVGElement
  $refs!: {
    vue: Vue
    element: HTMLInputElement
    vues: Vue[]
    elements: HTMLInputElement[]
  }
  testReification() {
    this.$refs.vue.$data
    this.$refs.element.value
    this.$refs.vues[0].$data
    this.$refs.elements[0].value
  }

  testMethods() {
    this.$mount('#app', false)
    this.$forceUpdate()
    this.$destroy()
    this.$set({}, 'key', 'value')
    this.$delete({}, 'key')
    this.$watch('a', (val: number, oldVal: number) => {}, {
      immediate: true,
      deep: false
    })()
    this.$watch(
      () => this.a,
      (val: number) => {}
    )
    this.$on('', () => {})
    this.$once('', () => {})
    this.$off('', () => {})
    this.$emit('', 1, 2, 3)
    this.$nextTick(function () {
      this.$nextTick
    })
    this.$nextTick().then(() => {})
    this.$createElement('div', {}, 'message')
  }

  static testConfig() {
    const { config } = this
    config.silent
    config.optionMergeStrategies
    config.devtools
    config.errorHandler = (err, vm) => {
      if (vm instanceof Test) {
        vm.testProperties()
        vm.testMethods()
      }
    }
    config.warnHandler = (msg, vm) => {
      if (vm instanceof Test) {
        vm.testProperties()
        vm.testMethods()
      }
    }
    config.keyCodes = { esc: 27 }
    config.ignoredElements = ['foo', /^ion-/]
    config.async = false
  }

  static testMethods() {
    this.extend({
      data() {
        return {
          msg: ''
        }
      }
    })
    this.nextTick(() => {})
    this.nextTick(
      function () {
        console.log(this.text === 'test')
      },
      { text: 'test' }
    )
    this.nextTick().then(() => {})
    this.set({}, '', '')
    this.set({}, 1, '')
    this.set([true, false, true], 1, true)
    this.delete({}, '')
    this.delete({}, 1)
    this.delete([true, false], 0)
    this.directive('', { bind() {} })
    this.filter('', (value: number) => value)
    this.component('', { data: () => ({}) })
    this.component('', {
      functional: true,
      render(h) {
        return h('div', 'hello!')
      }
    })
    this.use
    this.mixin(Test)
    this.compile('<div>{{ message }}</div>')
    this.use(() => {})
      .use(() => {})
      .mixin({})
      .mixin({})
  }
}

const HelloWorldComponent = Vue.extend({
  props: ['name'],
  data() {
    return {
      message: 'Hello ' + this.name
    }
  },
  computed: {
    shouted(): string {
      return this.message.toUpperCase()
    }
  },
  methods: {
    getMoreExcited() {
      this.message += '!'
    }
  },
  watch: {
    message(a: string) {
      console.log(`Message ${this.message} was changed!`)
    }
  }
})

const FunctionalHelloWorldComponent = Vue.extend({
  functional: true,
  props: ['name'],
  render(createElement, ctxt) {
    return createElement('div', 'Hello ' + ctxt.props.name)
  }
})

const FunctionalScopedSlotsComponent = Vue.extend({
  functional: true,
  render(h, ctx) {
    return (
      (ctx.scopedSlots.default && ctx.scopedSlots.default({})) ||
      h('div', 'functional scoped slots')
    )
  }
})

const Parent = Vue.extend({
  data() {
    return { greeting: 'Hello' }
  }
})

const Child = Parent.extend({
  methods: {
    foo() {
      console.log(this.greeting.toLowerCase())
    }
  }
})

const GrandChild = Child.extend({
  computed: {
    lower(): string {
      return this.greeting.toLowerCase()
    }
  }
})

new GrandChild().lower.toUpperCase()
for (let _ in new Test().$options) {
}
declare const options: ComponentOptions<Vue>
Vue.extend(options)
Vue.component('test-comp', options)
new Vue(options)

// cyclic example
Vue.extend({
  props: {
    bar: {
      type: String
    }
  },
  methods: {
    foo() {}
  },
  mounted() {
    this.foo()
  },
  // manual annotation
  render(h): VNode {
    const a = this.bar
    return h('canvas', {}, [a])
  }
})

declare function decorate<VC extends typeof Vue>(v: VC): VC

@decorate
class Decorated extends Vue {
  a = 123
}

const obj = Vue.observable({ a: 1 })
obj.a++

// VNodeData style tests.
const ComponentWithStyleInVNodeData = Vue.extend({
  render(h) {
    const elementWithStyleAsString = h('div', {
      style: '--theme-color: black;'
    })

    const elementWithStyleCSSProperties = h('div', {
      style: { ['--theme-color' as any]: 'black' }
    })

    const elementWithStyleAsArrayOfStyleValues = h('div', {
      style: [{ ['--theme-color' as any]: 'black' }]
    })

    return h('div', undefined, [
      elementWithStyleAsString,
      elementWithStyleCSSProperties,
      elementWithStyleAsArrayOfStyleValues
    ])
  }
})

// infer mixin type with new Vue() #12730
new Vue({
  mixins: [
    defineComponent({
      props: {
        p1: String,
        p2: {
          type: Number,
          default: 0
        }
      },
      data() {
        return {
          foo: 123
        }
      },
      computed: {
        bar() {
          return 123
        }
      }
    }),
    {
      methods: {
        hello(n: number) {}
      }
    }
  ],
  created() {
    this.hello(this.foo)
    this.hello(this.bar)
    // @ts-expect-error
    this.hello(this.p1)
    this.hello(this.p2)
  }
})

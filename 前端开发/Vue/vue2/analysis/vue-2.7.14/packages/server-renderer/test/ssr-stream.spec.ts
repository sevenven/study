// @vitest-environment node

import Vue from 'vue'
import { createRenderer } from 'server/index'
const { renderToStream } = createRenderer()

describe('SSR: renderToStream', () => {
  it('should render to a stream', done => {
    const stream = renderToStream(
      new Vue({
        template: `
        <div>
          <p class="hi">yoyo</p>
          <div id="ho" :class="[testClass, { red: isRed }]"></div>
          <span>{{ test }}</span>
          <input :value="test">
          <b-comp></b-comp>
          <c-comp></c-comp>
        </div>
      `,
        data: {
          test: 'hi',
          isRed: true,
          testClass: 'a'
        },
        components: {
          bComp(resolve) {
            return resolve({
              render(h) {
                return h('test-async-2')
              },
              components: {
                testAsync2(resolve) {
                  return resolve({
                    created() {
                      this.$parent.$parent.testClass = 'b'
                    },
                    render(h) {
                      return h(
                        'div',
                        { class: [this.$parent.$parent.testClass] },
                        'test'
                      )
                    }
                  })
                }
              }
            })
          },
          cComp: {
            render(h) {
              return h('div', { class: [this.$parent.testClass] }, 'test')
            }
          }
        }
      })
    )
    let res = ''
    stream.on('data', chunk => {
      res += chunk
    })
    stream.on('end', () => {
      expect(res).toContain(
        '<div data-server-rendered="true">' +
          '<p class="hi">yoyo</p> ' +
          '<div id="ho" class="a red"></div> ' +
          '<span>hi</span> ' +
          '<input value="hi"> ' +
          '<div class="b">test</div> ' +
          '<div class="b">test</div>' +
          '</div>'
      )
      done()
    })
  })

  it('should catch error', done => {
    const stream = renderToStream(
      new Vue({
        render() {
          throw new Error('oops')
        }
      })
    )
    stream.on('error', err => {
      expect(err.toString()).toMatch(/oops/)
      expect(`oops`).toHaveBeenWarned()
      done()
    })
    stream.on('data', _ => _)
  })

  it('should not mingle two components', done => {
    const padding = new Array(20000).join('x')
    const component1 = new Vue({
      template: `<div>${padding}<div></div></div>`,
      _scopeId: '_component1'
    })
    const component2 = new Vue({
      template: `<div></div>`,
      _scopeId: '_component2'
    })
    const stream1 = renderToStream(component1)
    const stream2 = renderToStream(component2)
    let res = ''
    stream1.on('data', text => {
      res += text.toString('utf-8').replace(/x/g, '')
    })
    stream1.on('end', () => {
      expect(res).not.toContain('_component2')
      done()
    })
    stream1.read(1)
    stream2.read(1)
  })

  it('should call context.rendered', done => {
    let a = 0
    const stream = renderToStream(
      new Vue({
        template: `
        <div>Hello</div>
      `
      }),
      {
        rendered: () => {
          a = 42
        }
      }
    )
    let res = ''
    stream.on('data', chunk => {
      res += chunk
    })
    stream.on('end', () => {
      expect(res).toContain('<div data-server-rendered="true">Hello</div>')
      expect(a).toBe(42)
      done()
    })
  })
})

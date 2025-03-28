import { createWriteFunction } from './write'
import { createRenderFunction } from './render'
import type { RenderOptions } from './create-renderer'
import type { Component } from 'types/component'

export function createBasicRenderer({
  modules = [],
  directives = {},
  isUnaryTag = () => false,
  cache
}: RenderOptions = {}) {
  const render = createRenderFunction(modules, directives, isUnaryTag, cache)

  return function renderToString(
    component: Component,
    context?: any,
    done?: any
  ): void {
    if (typeof context === 'function') {
      done = context
      context = {}
    }
    let result = ''
    const write = createWriteFunction(text => {
      result += text
      return false
    }, done)
    try {
      //@ts-expect-error
      render(component, write, context, () => {
        done(null, result)
      })
    } catch (e: any) {
      done(e)
    }
  }
}

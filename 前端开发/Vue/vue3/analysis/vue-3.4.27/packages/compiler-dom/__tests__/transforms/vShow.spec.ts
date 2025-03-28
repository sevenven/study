import {
  type CompilerOptions,
  generate,
  baseParse as parse,
  transform,
} from '@vue/compiler-core'
import { transformElement } from '../../../compiler-core/src/transforms/transformElement'
import { transformShow } from '../../src/transforms/vShow'
import { DOMErrorCodes } from '../../src/errors'

function transformWithShow(template: string, options: CompilerOptions = {}) {
  const ast = parse(template)
  transform(ast, {
    nodeTransforms: [transformElement],
    directiveTransforms: {
      show: transformShow,
    },
    ...options,
  })
  return ast
}

describe('compiler: v-show transform', () => {
  test('simple expression', () => {
    const ast = transformWithShow(`<div v-show="a"/>`)

    expect(generate(ast).code).toMatchSnapshot()
  })

  test('should raise error if has no expression', () => {
    const onError = vi.fn()
    transformWithShow(`<div v-show/>`, { onError })

    expect(onError).toHaveBeenCalledTimes(1)
    expect(onError).toHaveBeenCalledWith(
      expect.objectContaining({
        code: DOMErrorCodes.X_V_SHOW_NO_EXPRESSION,
      }),
    )
  })
})

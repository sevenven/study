import type { Data } from '../component'
import type { RawSlots, Slots } from '../componentSlots'
import {
  type ContextualRenderFn,
  currentRenderingInstance,
} from '../componentRenderContext'
import {
  Comment,
  Fragment,
  type VNode,
  type VNodeArrayChildren,
  createBlock,
  isVNode,
  openBlock,
} from '../vnode'
import { PatchFlags, SlotFlags } from '@vue/shared'
import { warn } from '../warning'
import { createVNode } from '@vue/runtime-core'
import { isAsyncWrapper } from '../apiAsyncComponent'

/**
 * Compiler runtime helper for rendering `<slot/>`
 * @private
 */
export function renderSlot(
  slots: Slots,
  name: string,
  props: Data = {},
  // this is not a user-facing function, so the fallback is always generated by
  // the compiler and guaranteed to be a function returning an array
  fallback?: () => VNodeArrayChildren,
  noSlotted?: boolean,
): VNode {
  if (
    currentRenderingInstance!.isCE ||
    (currentRenderingInstance!.parent &&
      isAsyncWrapper(currentRenderingInstance!.parent) &&
      currentRenderingInstance!.parent.isCE)
  ) {
    if (name !== 'default') props.name = name
    return createVNode('slot', props, fallback && fallback())
  }

  let slot = slots[name]

  if (__DEV__ && slot && slot.length > 1) {
    warn(
      `SSR-optimized slot function detected in a non-SSR-optimized render ` +
        `function. You need to mark this component with $dynamic-slots in the ` +
        `parent template.`,
    )
    slot = () => []
  }

  // a compiled slot disables block tracking by default to avoid manual
  // invocation interfering with template-based block tracking, but in
  // `renderSlot` we can be sure that it's template-based so we can force
  // enable it.
  if (slot && (slot as ContextualRenderFn)._c) {
    ;(slot as ContextualRenderFn)._d = false
  }
  openBlock()
  const validSlotContent = slot && ensureValidVNode(slot(props))
  const rendered = createBlock(
    Fragment,
    {
      key:
        props.key ||
        // slot content array of a dynamic conditional slot may have a branch
        // key attached in the `createSlots` helper, respect that
        (validSlotContent && (validSlotContent as any).key) ||
        `_${name}`,
    },
    validSlotContent || (fallback ? fallback() : []),
    validSlotContent && (slots as RawSlots)._ === SlotFlags.STABLE
      ? PatchFlags.STABLE_FRAGMENT
      : PatchFlags.BAIL,
  )
  if (!noSlotted && rendered.scopeId) {
    rendered.slotScopeIds = [rendered.scopeId + '-s']
  }
  if (slot && (slot as ContextualRenderFn)._c) {
    ;(slot as ContextualRenderFn)._d = true
  }
  return rendered
}

function ensureValidVNode(vnodes: VNodeArrayChildren) {
  return vnodes.some(child => {
    if (!isVNode(child)) return true
    if (child.type === Comment) return false
    if (
      child.type === Fragment &&
      !ensureValidVNode(child.children as VNodeArrayChildren)
    )
      return false
    return true
  })
    ? vnodes
    : null
}

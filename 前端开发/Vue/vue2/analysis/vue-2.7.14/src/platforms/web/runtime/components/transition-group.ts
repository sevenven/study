// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

import { warn, extend } from 'core/util/index'
import { addClass, removeClass } from 'web/runtime/class-util'
import { transitionProps, extractTransitionData } from './transition'
import { setActiveInstance } from 'core/instance/lifecycle'

import {
  hasTransition,
  getTransitionInfo,
  transitionEndEvent,
  addTransitionClass,
  removeTransitionClass
} from 'web/runtime/transition-util'
import VNode from 'core/vdom/vnode'
import { VNodeWithData } from 'types/vnode'
import { getComponentName } from 'core/vdom/create-component'

const props = extend(
  {
    tag: String,
    moveClass: String
  },
  transitionProps
)

delete props.mode

export default {
  props,

  beforeMount() {
    const update = this._update
    this._update = (vnode, hydrating) => {
      const restoreActiveInstance = setActiveInstance(this)
      // force removing pass
      this.__patch__(
        this._vnode,
        this.kept,
        false, // hydrating
        true // removeOnly (!important, avoids unnecessary moves)
      )
      this._vnode = this.kept
      restoreActiveInstance()
      update.call(this, vnode, hydrating)
    }
  },

  render(h: Function) {
    const tag: string = this.tag || this.$vnode.data.tag || 'span'
    const map: Record<string, any> = Object.create(null)
    const prevChildren: Array<VNode> = (this.prevChildren = this.children)
    const rawChildren: Array<VNode> = this.$slots.default || []
    const children: Array<VNode> = (this.children = [])
    const transitionData = extractTransitionData(this)

    for (let i = 0; i < rawChildren.length; i++) {
      const c: VNode = rawChildren[i]
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c)
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData
        } else if (__DEV__) {
          const opts = c.componentOptions
          const name: string = opts
            ? getComponentName(opts.Ctor.options as any) || opts.tag || ''
            : c.tag
          warn(`<transition-group> children must be keyed: <${name}>`)
        }
      }
    }

    if (prevChildren) {
      const kept: Array<VNode> = []
      const removed: Array<VNode> = []
      for (let i = 0; i < prevChildren.length; i++) {
        const c: VNode = prevChildren[i]
        c.data!.transition = transitionData
        // @ts-expect-error .getBoundingClientRect is not typed in Node
        c.data!.pos = c.elm.getBoundingClientRect()
        if (map[c.key!]) {
          kept.push(c)
        } else {
          removed.push(c)
        }
      }
      this.kept = h(tag, null, kept)
      this.removed = removed
    }

    return h(tag, null, children)
  },

  updated() {
    const children: Array<VNodeWithData> = this.prevChildren
    const moveClass: string = this.moveClass || (this.name || 'v') + '-move'
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs)
    children.forEach(recordPosition)
    children.forEach(applyTranslation)

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight

    children.forEach((c: VNode) => {
      if (c.data!.moved) {
        const el: any = c.elm
        const s: any = el.style
        addTransitionClass(el, moveClass)
        s.transform = s.WebkitTransform = s.transitionDuration = ''
        el.addEventListener(
          transitionEndEvent,
          (el._moveCb = function cb(e) {
            if (e && e.target !== el) {
              return
            }
            if (!e || /transform$/.test(e.propertyName)) {
              el.removeEventListener(transitionEndEvent, cb)
              el._moveCb = null
              removeTransitionClass(el, moveClass)
            }
          })
        )
      }
    })
  },

  methods: {
    hasMove(el: any, moveClass: string): boolean {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      const clone: HTMLElement = el.cloneNode()
      if (el._transitionClasses) {
        el._transitionClasses.forEach((cls: string) => {
          removeClass(clone, cls)
        })
      }
      addClass(clone, moveClass)
      clone.style.display = 'none'
      this.$el.appendChild(clone)
      const info: any = getTransitionInfo(clone)
      this.$el.removeChild(clone)
      return (this._hasMove = info.hasTransform)
    }
  }
}

function callPendingCbs(
  c: VNodeWithData & { elm?: { _moveCb?: Function; _enterCb?: Function } }
) {
  /* istanbul ignore if */
  if (c.elm!._moveCb) {
    c.elm!._moveCb()
  }
  /* istanbul ignore if */
  if (c.elm!._enterCb) {
    c.elm!._enterCb()
  }
}

function recordPosition(c: VNodeWithData) {
  c.data!.newPos = c.elm.getBoundingClientRect()
}

function applyTranslation(c: VNodeWithData) {
  const oldPos = c.data.pos
  const newPos = c.data.newPos
  const dx = oldPos.left - newPos.left
  const dy = oldPos.top - newPos.top
  if (dx || dy) {
    c.data.moved = true
    const s = c.elm.style
    s.transform = s.WebkitTransform = `translate(${dx}px,${dy}px)`
    s.transitionDuration = '0s'
  }
}

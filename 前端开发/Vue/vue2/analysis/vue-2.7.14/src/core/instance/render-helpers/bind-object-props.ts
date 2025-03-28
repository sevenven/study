import config from 'core/config'

import {
  warn,
  isObject,
  toObject,
  isReservedAttribute,
  camelize,
  hyphenate,
  isArray
} from 'core/util/index'
import type { VNodeData } from 'types/vnode'

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
export function bindObjectProps(
  data: any,
  tag: string,
  value: any,
  asProp: boolean,
  isSync?: boolean
): VNodeData {
  if (value) {
    if (!isObject(value)) {
      __DEV__ &&
        warn('v-bind without argument expects an Object or Array value', this)
    } else {
      if (isArray(value)) {
        value = toObject(value)
      }
      let hash
      for (const key in value) {
        if (key === 'class' || key === 'style' || isReservedAttribute(key)) {
          hash = data
        } else {
          const type = data.attrs && data.attrs.type
          hash =
            asProp || config.mustUseProp(tag, type, key)
              ? data.domProps || (data.domProps = {})
              : data.attrs || (data.attrs = {})
        }
        const camelizedKey = camelize(key)
        const hyphenatedKey = hyphenate(key)
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key]

          if (isSync) {
            const on = data.on || (data.on = {})
            on[`update:${key}`] = function ($event) {
              value[key] = $event
            }
          }
        }
      }
    }
  }
  return data
}

import { makeMap } from 'shared/util'

// these are reserved for web because they are directly compiled away
// during template compilation
export const isReservedAttr = makeMap('style,class')

// attributes that should be using props for binding
const acceptValue = makeMap('input,textarea,option,select,progress')
export const mustUseProp = (
  tag: string,
  type?: string | null,
  attr?: string
): boolean => {
  return (
    (attr === 'value' && acceptValue(tag) && type !== 'button') ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
}

export const isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck')

const isValidContentEditableValue = makeMap(
  'events,caret,typing,plaintext-only'
)

export const convertEnumeratedValue = (key: string, value: any) => {
  return isFalsyAttrValue(value) || value === 'false'
    ? 'false'
    : // allow arbitrary string value for contenteditable
    key === 'contenteditable' && isValidContentEditableValue(value)
    ? value
    : 'true'
}

export const isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
    'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
    'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
    'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
    'required,reversed,scoped,seamless,selected,sortable,' +
    'truespeed,typemustmatch,visible'
)

export const xlinkNS = 'http://www.w3.org/1999/xlink'

export const isXlink = (name: string): boolean => {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
}

export const getXlinkProp = (name: string): string => {
  return isXlink(name) ? name.slice(6, name.length) : ''
}

export const isFalsyAttrValue = (val: any): boolean => {
  return val == null || val === false
}

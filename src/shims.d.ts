import * as React from 'react'
declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    flex?: boolean
    relative?: boolean
    text?: string
    grid?: boolean
    absolute?: boolean
    top?: string
    before?: string
    after?: string
    left?: string
    shadow?: boolean
    w?: string
    z?: string
    h?: string
    bg?: string
    block?: boolean
    rounded?: string
    fixed?: boolean
    b?: string
    'focus:shadow'?: boolean
  }
  interface SVGProps<T> extends SVGAttributes<T>, ClassAttributes<T> {
    w?: string
    h?: string
  }
}
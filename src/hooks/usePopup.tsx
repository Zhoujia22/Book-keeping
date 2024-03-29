import type { ReactNode } from 'react'
import { useState } from 'react'
import ReactDOM from 'react-dom'
import { rootDiv } from '../main'
import { Popup } from '../components/Popup'

type Options = {
  initVisible?: boolean
  children: ReactNode
  position?: 'bottom' | 'center'
  zIndex?: string
}

export function usePopup(options: Options) {
  const { initVisible = false, children, position, zIndex } = options
  const [visible, setVisible] = useState(initVisible)
  const popup = ReactDOM.createPortal(<Popup visible={visible}
    zIndex={zIndex}
    position={position}
    onClickMask={() => setVisible(false)} >{children}</Popup>, rootDiv)
  return {
    popup,
    show() {
      setVisible(true)
    },
    hide() {
      setVisible(false)
    },
    toggle() {
      setVisible(!visible)
    }
  }
}

import { useState } from 'react'
import ReactDOM from 'react-dom'
import { rootDiv } from '../main'
import { Popup } from '../components/Popup'

export function usePopup() {
  const [visible, setVisible] = useState(false)
  const popup = ReactDOM.createPortal(<Popup visible={visible} onClickMask={() => setVisible(false)} />, rootDiv)
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

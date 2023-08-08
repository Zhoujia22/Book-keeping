import { usePopup } from '../../hooks/usePopup'
import { time } from '../../lib/time'
import { DatePicker } from '../Datepicker'

type Props = {
  value?: string
  onChange?: (v: string) => void
  placeholder?: string
}
export const DateInput: React.FC<Props> = (props) => {
  const { value, onChange, placeholder } = props
  const { popup, toggle, hide } = usePopup({
    children: <DatePicker onConfirm={d => { onChange?.(time(d).isoString); hide() }} onCancel={() => hide()} />
  })
  return (
    <>
      {popup}
      <input j-input-text type="text" readOnly onClick={() => toggle()} placeholder={placeholder} value={time(value).format()} />
    </>
  )
}

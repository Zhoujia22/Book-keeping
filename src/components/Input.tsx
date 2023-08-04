import type { ReactNode } from 'react'
import { EmojiInput } from './Input/EmojiInput'
import { SmsCodeInput } from './Input/SmsCodeInput'

type Props = {
  label?: string | ReactNode
  error?: string
  placeholder?: string
  value?: string
  disableError?: boolean
  onChange?: (value: string) => void
} & (
  | { type?: 'text' }
  | { type: 'emoji' }
  | { type: 'sms_code'; request: () => Promise<unknown> }
  | { type: 'select'; options: { value: string; text: string }[] }
)
export const Input: React.FC<Props> = (props) => {
  const { label, error, placeholder, value, type, onChange, disableError } = props
  const renderInput = () => {
    switch (props.type) {
      case undefined:
      case 'text':
        return <input j-input-text type={type} placeholder={placeholder}
          value={value} onChange={e => onChange?.(e.target.value)} />
      case 'emoji':
        return <EmojiInput value={value} onChange={value => onChange?.(value)} />
      case 'sms_code':
        return (
          <SmsCodeInput value={value} placeholder={placeholder}
            onChange={onChange} request={props.request} />
        )
      case 'select':
        return <select value={value} onChange={e => onChange?.(e.target.value)}
          className="h-36px rounded-8px">
          {props.options.map(option =>
            <option key={option.value} value={option.value}>{option.text}</option>)
          }
        </select>
      default:
        return null
    }
  }
  return (
    <>
      <div flex flex-col gap-y-8px >
        <span text-18px>{label}</span>
        {renderInput()}
        {disableError ? null : <span text-red text-12px>{error || ''}</span>}
      </div>
    </>
  )
}

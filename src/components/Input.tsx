import type { ChangeEvent, ReactNode } from 'react'
import { EmojiInput } from './Input/EmojiInput'
import { SmsCodeInput } from './Input/SmsCodeInput'
import { DateInput } from './Input/DateInput'

type Props = {
  label?: string | ReactNode
  error?: string
  placeholder?: string
  value?: string
  disableError?: boolean
  onChange?: (value: string) => void
  className?: string
} & (
  | { type?: 'text' }
  | { type: 'emoji' }
  | { type: 'myDate' }
  | { type: 'sms_code'; request: () => Promise<unknown> }
  | { type: 'select'; options: { value: string; text: string }[] }
)
export const Input: React.FC<Props> = (props) => {
  const { label, error, placeholder, value, onChange: _onChange, disableError, className } = props
  const onChange = (e: string | ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (typeof e === 'string') {
      _onChange?.(e)
    } else {
      _onChange?.(e.target.value)
    }
  }
  const common = { value, onChange, placeholder }
  const renderInput = () => {
    switch (props.type) {
      case undefined:
      case 'text':
        return <input j-input-text type='text' {...common} />
      case 'emoji':
        return <EmojiInput {...common} />
      case 'sms_code':
        return (
          <SmsCodeInput className={className} {...common} />
        )
      case 'myDate':
        return <DateInput {...common} />
      case 'select':
        return <select {...common} className='h-36px,rounded-8px'>
          {
            props.options.map(option =>
              <option key={option.value} value={option.value}>{option.text}</option>)
          }
        </select >
      default:
        return null
    }
  }
  return (
    <>
      <div flex flex-col gap-y-8px className={className} >
        <span text-18px>{label}</span>
        {renderInput()}
        {disableError ? null : <span text-red text-12px>{error || ''}</span>}
      </div>
    </>
  )
}

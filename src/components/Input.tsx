import type { ReactNode } from 'react'
import { EmojiInput } from './Input/EmojiInput'

type Props = {
  label: string | ReactNode
  error?: string
  placeholder?: string
  type?: 'text' | 'emoji' | 'sms_code'
  value?: string
  onChange?: (value: string) => void
}

export const Input: React.FC<Props> = (props) => {
  const { label, error, placeholder, type = 'text', value, onChange } = props
  const renderInput = () => {
    switch (type) {
      case 'text':
        return <input j-input-text type={type} placeholder={placeholder}
          value={value} onChange={e => onChange?.(e.target.value)} />
      case 'emoji':
        return <EmojiInput value={value} onChange={value => onChange?.(value)} />
      case 'sms_code':
        return (
          <div flex gap-x-16px>
            <input shrink-1 max-w="[calc(40%-8px)]" j-input-text type="text" placeholder='请输入验证码'
              value={value} onChange={e => onChange?.(e.target.value)} />
            <button shrink-0 max-w='[calc(60%-8px)]' j-btn >发送验证码</button>
          </div>
        )
      default:
        return null
    }
  }
  return (
    <>
      <div flex flex-col gap-y-8px >
        <span text-18px>{label}</span>
        {renderInput()}
        <span text-red text-12px>{error || ''}</span>
      </div>
    </>
  )
}

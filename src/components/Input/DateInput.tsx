type Props = {
  value?: string
  onChange?: (v: string) => void
  placeholder?: string
}
export const DateInput: React.FC<Props> = (props) => {
  const { value, onChange, placeholder } = props
  return (
    <input j-input-text type="text" readOnly
      placeholder={placeholder} value={value} />
  )
}

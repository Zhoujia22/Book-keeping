import { useState } from 'react'
import { emojis } from '../../lib/emojis'
import s from './EmojiInput.module.scss'

type Props = {
  value?: string
  onChange?: (value: string) => void
}
export const EmojiInput: React.FC<Props> = (props) => {
  const [emojiKind, setEmojiKind] = useState('表情')
  const { value, onChange } = props
  return (
        <div className={s.wrapper} b-1 rounded-8px>
            <div flex p-8px gap-x-16px overflow-auto text='#999'>
                {emojis.map((emoji) => <span key={emoji.name} whitespace-nowrap
                    className={emoji.name === emojiKind ? s.selectedTag : ''}
                    onClick={() => setEmojiKind(emoji.name)}>{emoji.name}
                </span>)}
            </div>
            <div text-24px p-t-8px p-b-16px h-400px overflow-auto text-center>
                {emojis.map((emoji) =>
                    <div grid grid-cols="[repeat(auto-fit,34px)]" grid-rows="[repeat(auto-fit,34px)]"
                        justify-center key={emoji.name} style={{ display: emoji.name === emojiKind ? '' : 'none' }}>
                        {emoji.chars.map((char) => <span b-2 b-transparent className={char === value ? s.selected : ''}
                            rounded-8px
                            onClick={() => value !== char && onChange?.(char)}
                        >
                            {char}
                        </span>)}
                    </div>)
                }
            </div>
        </div >
  )
}

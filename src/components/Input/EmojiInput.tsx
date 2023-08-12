import { useState } from 'react'
import cs from 'classnames'
import { emojis } from '../../lib/emojis'
import s from './EmojiInput.module.scss'

type Props = {
  value?: string
  onChange?: (value: string) => void
  className?: string
}
export const EmojiInput: React.FC<Props> = (props) => {
  const [emojiKind, setEmojiKind] = useState('表情')
  const { value, onChange, className } = props
  return (
        <div className={cs(s.wrapper, className)} b-1 rounded-8px>
            <div flex p-8px gap-x-16px overflow-auto text='#999'>
                {emojis.map((emoji) => <span b-1 b-b-solid b-transparent rounded-2px
                    p-r-1 p-l-1 key={emoji.name} whitespace-nowrap
                    className={emoji.name === emojiKind ? s.selectedTab : ''}
                    onClick={() => setEmojiKind(emoji.name)}>{emoji.name}
                </span>)}
            </div>
            <div text-24px p-t-8px p-b-16px h-400px overflow-auto text-center>
                {emojis.map((emoji) =>
                    <div grid grid-cols="[repeat(auto-fit,34px)]" grid-rows="[repeat(auto-fit,34px)]"
                        justify-center key={emoji.name} style={{ display: emoji.name === emojiKind ? '' : 'none' }}>
                        {emoji.chars.map((char) => <span b-2 b-transparent className={char === value ? s.selected : ''}
                            rounded-8px key={char}
                            onClick={() => value !== char && onChange?.(char ?? '')}
                        >
                            {char}
                        </span>)}
                    </div>)
                }
            </div>
        </div >
  )
}

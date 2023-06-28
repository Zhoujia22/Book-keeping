import { useState } from 'react'
import { emojis } from '../lib/emojis'
import { Gradient } from '../components/Gradient'
import { TopNav } from '../components/TopNav'
import { Icon } from '../components/Icon'
import s from './TagsNewPage.module.scss'

export const TagsNewPage: React.FC = () => {
  const onSubmit = () => { }
  const [emojiKind, setEmojiKind] = useState('表情')
  return (
        <div>
            <Gradient >
                <TopNav title="新建标签" icon={<Icon name="back" />} />
            </Gradient>
            <form onSubmit={onSubmit} px-16px py-32px flex flex-col gap-y-8px >
                <div flex flex-col gap-y-8px >
                    <span text-18px>标签名</span>
                    <input j-input-text />
                    <span text-red text-12px>标签名太长</span>
                </div>
                <div flex flex-col gap-y-8px>
                    <span text-18px>符号 <span text-24px>😀</span></span>
                    <div b-1 rounded-8px>
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
                                    {emoji.chars.map((char) => <span>{char}</span>)}
                                </div>)
                            }
                        </div>
                    </div>
                </div>
                <p text-center py-24px>记账时长按标签，即可进行编辑</p>
                <div>
                    <button j-btn>确定</button>
                </div>
            </form>

        </div>
  )
}

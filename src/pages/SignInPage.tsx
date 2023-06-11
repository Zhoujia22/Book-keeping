import type { FormEventHandler } from 'react'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { TopNav } from '../components/TopNav'
import { useSignInStore } from '../stores/useSignInStore'
import { hasError, validate } from '../lib/validate'
import { ajax } from '../lib/ajax'

export const SignInPage: React.FC = () => {
  const { data, error, setData, setError } = useSignInStore()
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const error = validate(data, [
      { key: 'email', type: 'required', message: '请输入邮箱地址' },
      { key: 'email', type: 'pattern', regex: /^.+@.+$/, message: '邮箱地址格式不正确' },
      { key: 'code', type: 'required', message: '请输入验证码' },
      { key: 'code', type: 'length', min: 6, max: 6, message: '验证码必须是6个字符' },
    ])
    setError(error)
    if (!hasError(error)) {
      ajax.post('/api/v1/session', data)
    }
  }
  return (<div>
        <Gradient>
            <TopNav title='登录' icon={<Icon className='w-24px h-24px' name="back" />} />
        </Gradient>
        <div text-center pt-40px pb-16px>
            <Icon name='logo' className='w-84px h-84px' />
            <h1 text-32px font-bold>小太阳账簿</h1>
        </div>
        <form j-form onSubmit={onSubmit} >
            <div>
                <span j-form-label>邮箱地址 {error.email?.[0] && <span text-red>{error.email[0]}</span>}</span>
                <input j-input-text type="text" placeholder='请输入正确的邮箱地址'
                    value={data.email} onChange={e => setData({ email: e.target.value })} />
            </div>
            <div>
                <span j-form-label>验证码{error.code?.[0] && <span text-red>{error.code[0]}</span>}</span>
                <div flex gap-x-16px>
                    <input shrink-1 max-w="[calc(40%-8px)]" j-input-text type="text" placeholder='请输入验证码'
                        value={data.code} onChange={e => setData({ code: e.target.value })} />
                    <button shrink-0 max-w='[calc(60%-8px)]' j-btn >发送验证码</button>
                </div>
            </div>
            <div m-100px>
                <button j-btn type='submit'>登录</button>
            </div>
        </form>
    </div>)
}

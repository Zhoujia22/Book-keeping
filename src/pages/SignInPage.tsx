import type { FormEventHandler } from 'react'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { TopNav } from '../components/TopNav'
import { useSignInStore } from '../stores/useSignInStore'
import { hasError, validate } from '../lib/validate'
import { ajax } from '../lib/ajax'
import { Input } from '../components/Input'

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
            <Input label='邮箱地址' placeholder='请输入邮箱，然后点击发送验证码' value={data.email}
                onChange={value => setData({ email: value })} error={error.email?.[0]} />
            <Input label='验证码' type='sms_code' placeholder='6位数字' value={data.code}
                onChange={value => setData({ code: value })} error={error.code?.[0]} />
            <div m-100px>
                <button j-btn type='submit'>登录</button>
            </div>
        </form>
    </div>)
}

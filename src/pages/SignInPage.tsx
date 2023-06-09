import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { TopNav } from '../components/TopNav'

export const SignInPage: React.FC = () => {
  return (<div>
        <Gradient>
            <TopNav title='登录' icon={<Icon className='w-24px h-24px' name="back" />} />
        </Gradient>
        <div text-center pt-40px pb-16px>
            <Icon name='logo' className='w-84px h-84px' />
            <h1 text-32px font-bold>小太阳账簿</h1>
        </div>
        <form j-form >
            <div>
                <span j-form-label>邮箱地址</span>
                <input j-input-text type="text" placeholder='请输入正确的邮箱地址' />
            </div>
            <div>
                <span j-form-label>验证码</span>
                <div flex gap-x-16px>
                    <input j-input-text type="text" placeholder='请输入验证码' />
                    <button j-btn >发送验证码</button>
                </div>
            </div>
            <div m-100px>
                <button j-btn type='submit'>登录</button>
            </div>
        </form>
    </div>)
}

import useSWR from 'swr'
import { Link, useLocation } from 'react-router-dom'
import { useAjax } from '../../lib/ajax'
import { confirmable } from '../confirmable'

interface Props {
  className?: string
}

export const CurrentUser: React.FC<Props> = ({ className }) => {
  const { get } = useAjax({ showLoading: false, handleError: false })
  const { data: me, error } = useSWR('/api/v1/me', async (path) =>
    (await get<Resource<User>>(path)).data.resource
  )
  const name = me?.name ?? me?.email
  const loc = useLocation()
  const from = encodeURIComponent(`${loc.pathname}${loc.search}`)
  const signOut = confirmable('确定要退出登录吗？', () => {
    window.localStorage.removeItem('jwt')
    window.location.reload()
  })
  return (
    <div className={className} bg="#ffd103" text-white w='100%' pt-33px pb-44px px-16px>
      {error
        ? (
          <Link to={`/sign_in?from=${from}`} >
            <h2 text-24px p-b-8px>未登录用户</h2>
            <div >点击这里登录</div>
          </Link>
          )
        : (
          <div onClick={signOut} >
            <h2 text-24px title={name} overflow-hidden text-ellipsis p-b-8px>{name}</h2>
            <div >点击这里退出登录</div>
          </div>
          )
      }
    </div>
  )
}

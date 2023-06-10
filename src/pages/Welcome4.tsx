import { Link } from 'react-router-dom'
import p from '../assets/images/welcome4.svg'

export const Welcome4: React.FC = () => {
  return (
    <div text-center>
      <img w-129px h-83px src={p} />
      <h2 text-28px mt-48px>
        云备份 <br />
        再也不怕数据丢失
      </h2>
      <div mt-64px>
        <Link text-32px font-bold to='/welcome/xxx'>开启应用</Link>
      </div>
    </div>
  )
}

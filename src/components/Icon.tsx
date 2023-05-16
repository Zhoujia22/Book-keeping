import c from 'classnames'
import s from './Icon.module.scss'

interface Porps {
  name: string
  className?: string
}

export const Icon: React.FC<Porps> = ({ name, className }) => {
  return (
    <svg className={c(className, s.icon)}>
      <use xlinkHref={`#${name}`} ></use>
    </svg>
  )
}

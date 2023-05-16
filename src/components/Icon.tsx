import c from 'classnames'

interface Porps {
  name: string
  className?: string
}

export const Icon: React.FC<Porps> = ({ name, className }) => {
  return (
    <svg className={c(className, 'j-icon')}>
      <use xlinkHref={`#${name}`} ></use>
    </svg>
  )
}

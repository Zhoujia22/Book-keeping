import c from 'classnames'

interface Porps {
  name: string
  className?: string
  onClick?: (e: React.MouseEvent) => void
}

export const Icon: React.FC<Porps> = ({ name, className, onClick }) => {
  return (
    <svg className={c(className, 'j-icon')} onClick={onClick}>
      <use xlinkHref={`#${name}`} ></use>
    </svg>
  )
}

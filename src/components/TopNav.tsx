import { useContext } from 'react'
import { menuContext } from '../context/menuContext'
import { Icon } from './Icon'

interface Props {
  title?: string
}

export const TopNav: React.FC<Props> = ({ title = '太阳账簿' }) => {
  const { setVisible } = useContext(menuContext)
  return (
    <div flex items-center pt-24px pb-8px px-24px>
      <Icon name="menu" className='w-24px h-24px mr-16px' onClick={() => { setVisible(true) }}></Icon>
      <h1 text-24px>{title}</h1>
    </div>
  )
}

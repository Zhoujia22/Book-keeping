import { useMenuStore } from '../stores/useMenuStore'
import { Icon } from './Icon'

interface Props {
  title?: string
}

export const TopNav: React.FC<Props> = ({ title = '太阳账簿' }) => {
  const { visible, setVisible } = useMenuStore()
  return (
    <div flex items-center pt-24px pb-8px px-24px>
      <Icon name="menu" className='w-24px h-24px mr-16px' onClick={() => { setVisible(!visible) }}></Icon>
      <h1 text-24px>{title}</h1>
    </div>
  )
}

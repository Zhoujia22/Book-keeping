import { Icon } from './Icon'

export const AddItemFloatButton: React.FC = () => {
  return (
    <button b-none w-56px h-56px rounded="50%" bg='#ffd103' flex items-center justify-center fixed bottom-16px right-16px >
      <Icon name='add' className='w-42px h-42px ' />
    </button>
  )
}

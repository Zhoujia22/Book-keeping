import add from '../assets/icons/add.svg'

export const AddItemFloatButton: React.FC = () => {
  return (
        <button b-none w-56px h-56px rounded="50%" bg='#ffd103' p-4px text-6xl fixed bottom-16px right-16px >
            <img max-w="100%" max-h="100%" src={add} />
        </button>
  )
}

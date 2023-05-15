export const AddItemFloatButton: React.FC = () => {
  return (
        <button b-none w-56px h-56px rounded="50%" bg='#ffd103' p-4px  fixed bottom-16px right-16px >
            <svg style={{ fill: 'white', width: '1.2em', height: '1.2em' }}>
                <use xlinkHref="#add" ></use>
            </svg>
        </button>
  )
}

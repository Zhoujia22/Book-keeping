import p from '../assets/images/logo.svg'
import add from '../assets/icons/add.svg'

export const Home: React.FC = () => {
  return (
    <div>
      <div flex justify-center items-center>
        <img src={p} mt-20vh mb-20vh width="180px" height="180px"></img>
      </div>
      <div px-16px >
        <button text-18px h-48px w="100%" bg='#ffd103' b-none text-black rounded-8px >开始记账</button>
      </div>
      <button b-none w-56px h-56px rounded="50%" bg='#ffd103' p-4px text-6xl fixed bottom-16px right-16px >
        <img max-w="100%" max-h="100%" src={add} />
      </button>
    </div>
  )
}

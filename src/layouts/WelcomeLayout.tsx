import { animated, useTransition } from '@react-spring/web'
import type { ReactNode } from 'react'
import { useRef, useState } from 'react'
import { Link, useLocation, useOutlet } from 'react-router-dom'
import logo from '../assets/images/logo.svg'

const linkMap: Record<string, string> = {
  '/welcome/1': '/welcome/2',
  '/welcome/2': '/welcome/3',
  '/welcome/3': '/welcome/4',
  '/welcome/4': '/welcome/xxx',
}
export const WelcomeLayout: React.FC = () => {
  const map = useRef<Record<string, ReactNode>>({})
  const location = useLocation()
  const outlet = useOutlet()
  const [extraStyle, setExtraStyle] = useState<{ position: 'relative' | 'absolute' }>({ position: 'relative' })
  map.current[location.pathname] = outlet
  const transitions = useTransition(location.pathname, {
    from: { transform: location.pathname === '/welcome/1' ? 'translateX(0%)' : 'translateX(100%)' },
    enter: { transform: 'translateX(0%)' },
    leave: { transform: 'translateX(-100%)' },
    config: { duration: 300 },
    onStart: () => {
      setExtraStyle({ position: 'absolute' })
    },
    onRest: () => {
      setExtraStyle({ position: 'relative' })
    },
  })
  return (
    <div className='bg-#ffd103' flex h-screen flex-col items-stretch pb-16px>
      <header shrink-0 text-center pt-64px >
        <img w-84px h-84px src={logo} />
        <h1 text-32px >太阳账簿</h1>
      </header>
      <main shrink-1 grow-1 relative>
        {transitions((style, pathname) =>
          <animated.div key={pathname} style={{ ...style, ...extraStyle }} w="100%" h="100%" p-16px flex>
            <div grow-1 bg-white flex justify-center items-center rounded-8px>
              {map.current[pathname]}
            </div>
          </animated.div>,
        )}
      </main>
      <footer text-24px text-center grid grid-cols-3 grid-rows-1 shrink-0 text-white >
        <Link style={{ gridArea: '1 / 2 / 2 / 3' }} to={linkMap[location.pathname]}>下一页</Link>
        <Link style={{ gridArea: '1 / 3 / 2 / 4' }} to="/welcome/xxx">跳过</Link>
      </footer>
    </div >
  )
}

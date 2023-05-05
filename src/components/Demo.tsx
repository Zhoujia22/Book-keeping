import { animated, useSpring } from '@react-spring/web'

export const Demo: React.FC = () => {
  const [springs, api] = useSpring(() => ({
    from: { x: 0 },
  }))
  const handleClick = () => {
    api.start({
      from: {
        x: 0,
      },
      to: {
        x: 100,
      },
    })
  }
  return (
    <animated.div
      onClick={handleClick}
      style={{
        width: 80,
        height: 80,
        background: '#ff6d6d',
        borderRadius: 8,
        ...springs,
      }}
    />
  )
}

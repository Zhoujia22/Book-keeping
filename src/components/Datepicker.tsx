import { useEffect, useRef, useState } from 'react'
import { time } from '../lib/time'

type Props = {
  start?: Date
  end?: Date
  value?: Date
  onChange?: (value: Date) => void
}

export const DatePicker: React.FC<Props> = (props) => {
  const { start, end, value, onChange } = props
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, update] = useState({})
  const startTime = start ? time(start) : time().add(-10, 'years')
  const endTime = end ? time(end) : time().add(10, 'year')
  const valueTime = useRef(value ? time(value) : time())
  if (endTime.timestamp <= startTime.timestamp) {
    throw new Error('结束时间必须晚于开始时间')
  }
  const yearList = Array.from({ length: endTime.year - startTime.year + 1 })
    .map((_, index) => startTime.year + index)
  const monthList = Array.from({ length: 12 }).map((_, index) => index + 1)
  const dayList = Array.from({ length: valueTime.current.lastDayOfMonth.day }).map((_, index) => index + 1)
  return (
    <div flex >
      <Clumn className='grow-1' items={yearList} value={valueTime.current.year}
        onChange={(year) => {
          valueTime.current.year = year
          update({})
          onChange?.(valueTime.current.date)
        }} />
      <Clumn className='grow-1' items={monthList} value={valueTime.current.month}
        onChange={(month) => {
          valueTime.current.month = month
          update({})
          onChange?.(valueTime.current.date)
        }} />
      <Clumn className='grow-1' items={dayList} value={valueTime.current.day}
        onChange={(day) => {
          valueTime.current.day = day
          update({})
          onChange?.(valueTime.current.date)
        }} />
    </div>
  )
}

type ColumProps = {
  itemHeight?: number
  className?: string
  items: number[]
  value: number
  onChange: (value: number) => void
}

export const Clumn: React.FC<ColumProps> = (props) => {
  const { itemHeight = 36, className, items, value, onChange } = props
  const index = items.indexOf(value)
  const [isTouching, setIsTouching] = useState(false)
  useEffect(() => {
    const index = items.indexOf(value)
    setTranslateY(index * -itemHeight)
  }, [value])
  const [lastY, setLastY] = useState(-1)
  const [translateY, _setTranslateY] = useState(index * -itemHeight)
  const setTranslateY = (y: number) => {
    y = Math.min(y, 0)
    y = Math.max(y, (items.length - 1) * -itemHeight)
    _setTranslateY(y)
  }
  return (
    <div className={className} h="50vh" overflow-hidden relative
      onTouchStart={(e) => {
        setIsTouching(true)
        setLastY(e.touches[0].clientY)
      }}
      onTouchMove={(e) => {
        if (isTouching) {
          const y = e.touches[0].clientY
          const dy = y - lastY
          setTranslateY(translateY + dy)
          setLastY(y)
        }
      }}
      onTouchEnd={() => {
        setIsTouching(false)
        const remainder = translateY % itemHeight
        let y = translateY - remainder
        if (Math.abs(remainder) > itemHeight / 2) {
          y += itemHeight * (remainder > 0 ? 1 : -1)
        }
        setTranslateY(y)
        setIsTouching(false)
        onChange(items[Math.abs(y / itemHeight)])
      }}
    >
      <div border-b-1 border-t-1 b="#eee" style={{ height: itemHeight, transform: `translateY(${-itemHeight / 2}px)` }} absolute top="50%" w-full />
      <div absolute top="50%" w-full style={{ transform: `translateY(${-itemHeight / 2}px)` }} >
        <ol style={{ transform: `translateY(${translateY}px)` }}
          text-center children-flex children-items-center children-justify-center>
          {items.map(item => <li key={item} style={{ height: itemHeight }}>{item}</li>)}
        </ol>
      </div>
    </div >
  )
}
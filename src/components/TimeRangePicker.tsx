import { useState } from 'react'
import { usePopup } from '../hooks/usePopup'
import { type Time, time } from '../lib/time'
import { Input } from './Input'
import { Tabs } from './Tabs'

export type TimeRange = {
  start: Time
  end: Time
  name: | 'thisMonth' | 'lastMonth' | 'thisYear' | 'custom' | 'twoMonthsAgo' | 'threeMonthsAgo'

}

type Props = {
  selected: TimeRange
  onSelect: (selected: TimeRange) => void
  timeRanges?: { key: TimeRange; text: string }[]
}

const defaultTimeRanges: { key: TimeRange; text: string }[] = [
  {
    key: {
      name: 'thisMonth',
      start: time().firstDayOfMonth,
      end: time().lastDayOfMonth.add(1, 'day')
    },
    text: '本月'
  },
  {
    key: {
      name: 'lastMonth',
      start: time().add(-1, 'month').firstDayOfMonth,
      end: time().add(-1, 'month').lastDayOfMonth.add(1, 'day'),
    },
    text: '上月'
  },
  {
    key: {
      name: 'thisYear',
      start: time().set({ month: 1 }).firstDayOfMonth,
      end: time().set({ month: 12 }).lastDayOfMonth.add(1, 'day')
    },
    text: '今年'
  },
  {
    key: {
      name: 'custom',
      start: time(),
      end: time()
    },
    text: '自定义时间'
  },
]
export const TimeRangePicker: React.FC<Props> = (props) => {
  const { selected, onSelect: _onSelect, timeRanges = defaultTimeRanges } = props
  const [start, setStart] = useState<string>('')
  const [end, setEnd] = useState<string>('')

  const onConfirm = () => {
    _onSelect({
      start: time(start),
      end: time(end).add(1, 'day'),
      name: 'custom'
    })
    hide()
  }

  const { popup, show, hide } = usePopup({
    zIndex: 'var(--z-dialog)',
    children: <div text='#1d1d1f'>
      <header text-18px bg="f5f5f7" py-13px p-l-16px >
        请选择时间
      </header>
      <main text-12px text-ellipsis p-16px bg="#f3f2f5">
        <Input disableError label='开始时间' type='myDate' value={start} onChange={(d) => setStart(d)} />
        <Input className="mt-8px" disableError label='结束时间' type='myDate' value={end} onChange={(d) => setEnd(d)} />
      </main>
      <footer text-right>
        <button border-none bg-transparent px-16px py-8px onClick={() => hide()}>取消</button>
        <button border-none bg-transparent px-16px py-8px onClick={onConfirm}>确定</button>
      </footer>
    </div>,

    position: 'center'
  })

  const onSelect = (timeRange: TimeRange) => {
    if (timeRange.name === 'custom') {
      show()
    } else {
      _onSelect(timeRange)
    }
  }

  return (
    <>
      {popup}
      < Tabs tabItems={timeRanges} value={selected} onChange={onSelect} />
    </>
  )
}

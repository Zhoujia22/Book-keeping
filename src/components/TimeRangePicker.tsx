import { usePopup } from '../hooks/usePopup'
import { type Time, time } from '../lib/time'
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

  const onConfirm = () => {
    _onSelect({
      start: time(),
      end: time(),
      name: 'custom'
    })
  }

  const { popup, show } = usePopup({ children: <div onClick={onConfirm}>弹框</div>, position: 'center' })

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

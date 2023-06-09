import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

type Props = {
  className?: string
  items?: { x: number | string; y: number }[]
}

export const PieChart: React.FC<Props> = (props) => {
  const { className, items } = props
  const div = useRef<HTMLDivElement>(null)
  const initialized = useRef(false)
  useEffect(() => {
    if (!div.current) { return }
    if (initialized.current) { return }
    const myChart = echarts.init(div.current)
    initialized.current = true
    const option: echarts.EChartsOption = {
      grid: {
        top: 0,
        right: 0,
        left: 0,
        bottom: 0
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          type: 'pie',
          radius: '80%',
          data: items?.map(item => ({ value: item.y, name: item.x })),
        }
      ]
    }

    myChart.setOption(option)
  }, [])
  return (
    <div ref={div} className={className} />
  )
}

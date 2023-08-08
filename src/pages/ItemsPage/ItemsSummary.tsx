import useSWR from 'swr'
import { useAjax } from '../../lib/ajax'
import type { Time } from '../../lib/time'
import { Money } from '../../components/Money'

type Props = {
  start: Time
  end: Time
}

export const ItemsSummary: React.FC<Props> = (props) => {
  const { start, end } = props

  const { get } = useAjax({ showLoading: false, handleError: false })

  const { data } = useSWR(start && end && `/api/v1/items/balance?happened_after=${start.isoString}&happened_before=${end.isoString}`, async (path) =>
    (await get<{ balance: number; expenses: number; income: number }>(path)).data
  )
  const { balance, expenses, income } = data ?? { balance: 0, expenses: 0, income: 0 }

  return (
    <ol flex justify-between items-center m-16px rounded-8px py-12px px-16px children-px-24px
      text-center bg-gradient-to-r from="#141e30" to="#243a54">
      <li text="#FE7275" >
        <div>收入</div>
        <div m-t-2px><Money value={income} /></div>
      </li>
      <li text="#53A867" >
        <div>支出</div>
        <div m-t-2px><Money value={expenses} /></div>
      </li>
      <li text-white>
        <div>净收入</div>
        <div m-t-2px><Money value={balance} /></div>
      </li>
    </ol>
  )
}

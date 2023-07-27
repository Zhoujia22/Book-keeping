import type { ReactNode } from 'react'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { Tabs } from '../components/Tabs'
import { TopNav } from '../components/TopNav'
import { useCreateItemStore } from '../stores/useCreateItemStore'
import s from './ItemsNewPage.module.scss'
import { Tags } from './ItemNewPage/Tags'
import { DateAndAmounts } from './ItemNewPage/DateAndAmount'
import { ItemDate } from './ItemNewPage/ItemDate'

export const ItemsNewPage: React.FC = () => {
  const { data, error, setData, setError } = useCreateItemStore()

  const tabItems: { key: Item['kind']; text: string; element: ReactNode }[]
    = [{
      key: 'expenses',
      text: '支出',
      element: <Tags kind='expenses'
        value={data.tag_ids} onChange={(ids) => setData({ tag_ids: ids })} />
    },
    {
      key: 'income',
      text: '收入',
      element: <Tags kind='income'
        value={data.tag_ids} onChange={(ids) => setData({ tag_ids: ids })} />
    }]

  return (
    <div className={s.wrapper} h-screen flex flex-col>
      <Gradient className='grow-0 shrink-0'>
        <TopNav title="记一笔" icon={<Icon name="back" />} />
      </Gradient>
      <Tabs tabItems={tabItems}
        className="text-center grow-1 shrink-1 overflow-hidden"
        value={data.kind!}
        classPrefix='itemsNewPage'
        onChange={(tabItem) => { setData({ kind: tabItem }) }} />
      <div text-28px>{JSON.stringify(data)}</div>
      <DateAndAmounts className='grow-0 shrink-0' itemDate={<ItemDate />} />
    </div>
  )
}

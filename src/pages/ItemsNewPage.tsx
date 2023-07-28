import type { ReactNode } from 'react'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { Tabs } from '../components/Tabs'
import { TopNav } from '../components/TopNav'
import { useCreateItemStore } from '../stores/useCreateItemStore'
import s from './ItemsNewPage.module.scss'
import { Tags } from './ItemNewPage/Tags'
import { ItemAmount } from './ItemNewPage/ItemAmount'
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

  const onSubmit = () => {
    console.log('我是提交的按钮')
  }

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
      <ItemAmount className='grow-0 shrink-0' value={data.amount}
        onChange={amount => setData({ amount })}
        onSubmit={onSubmit}
        itemDate={<ItemDate value={data.happen_at}
          onChange={(happen_at) => setData({ happen_at })}
        />} />
    </div>
  )
}

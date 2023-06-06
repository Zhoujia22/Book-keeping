import useSWRInfinite from 'swr/infinite'
import { ajax } from '../../lib/ajax'

interface Props {
}

function getKey(pageIndex: number) {
  return `/api/v1/items?page=${pageIndex + 1}`
}

const items: Item[] = []
export const ItemsList: React.FC<Props> = () => {
  const { data, error } = useSWRInfinite(
    getKey, async path => (await ajax.get<Resources<Item>>(path)).data
  )
  console.log(data, error)
  return (
    <div>
      <ol>
        {items.map(item => <li key={item.id} grid grid-cols="[auto_1fr_auto]" grid-rows-2 px-16px py-8px gap-x-12px border-b-1 b="#EEE">
          <div row-start-1 col-start-1 row-end-3 col-end-2 w-48px h-48px text-24px flex justify-center items-center bg="#D8D8D8" rounded="50%">
            😘
          </div>
          <div row-start-1 col-start-2 row-end-2 col-end-3>
            旅行
          </div>
          <div row-start-2 col-start-2 row-end-3 col-end-4 text="#999999">
            2023年1月1日
          </div>
          <div row-start-1 col-start-3 row-end-2 col-end-4 text="#53A867">
            $999
          </div>
        </li>)}
      </ol>
      <div p-16px>
        <button j-btn>加载更多</button>
      </div>
    </div>
  )
}

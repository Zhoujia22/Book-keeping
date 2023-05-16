import styled from 'styled-components'
import { AddItemFloatButton } from '../components/AddItemFloatButton'
import { TimeRangePicker } from '../components/TimeRangePicker'
import { Topnav } from '../components/Topnav'
import { ItemsList } from './ItemsPage/ItemsList'
import { ItemsSummary } from './ItemsPage/ItemsSummary'

const Div = styled.div`
background: linear-gradient(180deg, rgba(255,208,0,1) 0%, rgba(255,232,37,1) 100%);`

export const ItemsPage: React.FC = () => {
  return (
        <div>
            <Div>
                <Topnav />
                <TimeRangePicker />
            </Div>
            <ItemsSummary />
            <ItemsList />
            <AddItemFloatButton />
        </div>
  )
}

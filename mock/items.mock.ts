import type { MockMethod } from 'vite-plugin-mock'
import { faker } from '@faker-js/faker'

let id = 0

function createId() {
  id += 1
  return id
}

function create(attrs?: Partial<Item>): Item {
  return {
    id: createId(),
    user_id: 1,
    amount: faker.number.int({ min: 99, max: 1000_00 }),
    tag_ids: [1, 2],
    happen_at: faker.date.past().toISOString(),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.past().toISOString(),
    kind: 'expenses',
    ...attrs
  }
}

function createList(n: number, attrs?: Partial<Item>): Item[] {
  return Array.from({ length: n }).map(() => create(attrs))
}

function createResponse({ page = 1, perPage = 10, count = 10 }, attrs?: Partial<Item>): Resources<Item> {
  const sendCount = (page - 1) * perPage
  const left = count - sendCount
  return {
    resources: left > 0 ? createList(Math.min(left, perPage), attrs) : [],
    pager: {
      page,
      per_page: perPage,
      count
    }
  }
}

export const itemsMock: MockMethod = {
  url: '/api/v1/items',
  statusCode: 200,
  method: 'get',
  response: ({ query }: ResponseParams): Resources<Item> =>
    createResponse({ count: 0, perPage: 10, page: parseInt(query.page) || 1 })
}

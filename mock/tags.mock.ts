import { faker } from '@faker-js/faker'
import type { MockMethod } from 'vite-plugin-mock'

let id = 0

function createId() {
  id += 1
  return id
}

function create(attrs?: Partial<Tag>): Tag {
  return {
    id: createId(),
    name: '标签',
    sign: faker.internet.emoji(),
    deleted_at: null,
    user_id: 1,
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.past().toISOString(),
    kind: 'expenses',
    ...attrs
  }
}

function createList(n: number, attrs?: Partial<Tag>): Tag[] {
  return Array.from({ length: n }).map(() => create(attrs))
}

function createResponse({ page = 1, perPage = 10, count = 10 }, attrs?: Partial<Tag>): Resources<Tag> {
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

export const tagsMock: MockMethod[] = [{
  url: '/api/v1/tags',
  method: 'get',
  statusCode: 200,
  response: ({ query }: ResponseParams): Resources<Tag> => {
    return createResponse({ count: 66, perPage: 50, page: parseInt(query.page) || 1 })
  }
},
{
  url: '/api/v1/tags',
  method: 'post',
  statusCode: 200,
  response: ({ query }: ResponseParams): any => {
    return { resource: create() }
  }
}]

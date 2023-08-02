import type { MockMethod } from 'vite-plugin-mock'

export const summaryMock: MockMethod[] = [{
  url: '/api/v1/items/summary',
  statusCode: 200,
  method: 'get',
  response: () => {
    return {
      groups: [
        { happen_at: '2018-06-18', tag: null, amount: 300 },
        { happen_at: '2018-06-19', tag: null, amount: 300 },
        { happen_at: '2018-06-20', tag: null, amount: 300 }
      ],
      total: 900
    }
  },
}]
import type { MockMethod } from 'vite-plugin-mock'

export const summaryMock: MockMethod[] = [{
  url: '/api/v1/items/summary',
  statusCode: 200,
  method: 'get',
  response: () => {
    return {
      groups: [
        { happen_at: '2023-08-18', tag: null, amount: 300 },
        { happen_at: '2023-08-19', tag: null, amount: 200 },
        { happen_at: '2023-08-20', tag: null, amount: 100 }
      ],
      total: 900
    }
  },
}]

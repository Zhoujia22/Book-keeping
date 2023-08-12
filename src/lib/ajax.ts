import type { AxiosError, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useLoadingStore } from '../stores/useLoadingStore'

// 封装 axios

export const ajax = axios.create({
  baseURL: isDev ? '/' : 'http://121.196.236.94:8080/',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

ajax.interceptors.request.use((config) => {
  const jwt = localStorage.getItem('jwt') || ''
  config.headers = config.headers || {}
  if (jwt) { config.headers.Authorization = `Bearer ${jwt}` }
  return config
})

type Options = {
  showLoading?: boolean
  handleError?: boolean
}
export function useAjax(options?: Options) {
  const showLoading = options?.showLoading || false
  const handleError = options?.handleError ?? true
  const { setVisible } = useLoadingStore()
  const nav = useNavigate()
  const table: Record<string, undefined | (() => void)> = {
    401: () => {
      nav('/sign_in')
    },
    402: () => {
      window.alert('请付费后观看')
    },
    403: () => {
      window.alert('没有权限')
    },
  }

  const onError = (error: AxiosError) => {
    if (error.response) {
      if (handleError) {
        const { status } = error.response
        const fn = table[status]
        fn?.()
      }
    }
    throw error
  }

  return {
    get: <T>(path: string, config?: AxiosRequestConfig<any>) => {
      return ajax.get<T>(path, config).catch(onError)
    },
    post: <T>(path: string, data: JSONValue) => {
      if (showLoading) { setVisible(true) }
      return ajax.post<T>(path, data).catch(onError).finally(() => {
        if (showLoading) { setVisible(false) }
      })
    },
    patch: <T>(path: string, data: JSONValue) => {
      if (showLoading) { setVisible(true) }
      return ajax.patch<T>(path, data).catch(onError).finally(() => {
        if (showLoading) { setVisible(false) }
      })
    },
    destroy: <T>(path: string, config?: AxiosRequestConfig<any>) => {
      return ajax.delete<T>(path, config).catch(onError)
    },
  }
}

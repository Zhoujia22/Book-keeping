import { useEffect } from 'react'

export function useTitle(title?: string) {
  useEffect(() => {
    if (title === undefined || title === null) {
      return }
    document.title = title
  }, [])
}

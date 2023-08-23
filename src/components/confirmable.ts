export function confirmable(title: string, fn: () => void) {
  return () => {
    const result = window.confirm(title)
    if (result) { fn() }
  }
}

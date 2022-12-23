export const debounce = <T = unknown>(fn: (...args: T[]) => void, delay: number) => {
  let timer: NodeJS.Timeout
  return (...args: T[]) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
    return timer
  }
}

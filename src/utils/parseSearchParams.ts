export const parseSearchParams = <K extends string, V = string>(
  searchStr: string
): Record<K, V> => {
  const str = searchStr[0] === "?" ? searchStr.slice(1) : searchStr
  if (!str) return {} as any

  const strArr = str.split("&")

  const params = {} as Record<K, V>

  strArr.forEach(item => {
    const [k, v] = item.split("=") as [K, V]
    params[k] = v
  })
  return params
}

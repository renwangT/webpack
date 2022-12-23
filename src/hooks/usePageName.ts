import { useMemo } from "react"
import { useLocation } from "react-router-dom"

export const usePageName = () => {
  const { pathname } = useLocation()
  const pageName = useMemo(
    () =>
      (pathname.split("/").at(-1) as string).replace(/^[a-z]{1}/, (v: string, _i: number) =>
        v.toUpperCase()
      ),
    [pathname]
  )
  return pageName
}

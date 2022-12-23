import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export const useRedirect = (cur: string, to: string) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (
      pathname
        .split("/")
        .filter(item => !!item)
        .at(-1) === cur
    ) {
      navigate(to)
    }
  }, [pathname])
}

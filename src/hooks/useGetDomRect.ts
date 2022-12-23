import { useEffect, useState, RefObject, useRef } from "react"
import { objKeys } from "../utils"

const initRect = {
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
  x: 0,
  y: 0
}
export const useGetDomRect = (ref: RefObject<HTMLDivElement>) => {
  const [rect, setRect] = useState<typeof initRect>(initRect)
  const rectRef = useRef<typeof initRect>(initRect)

  function handleResize() {
    handleUpdate()
  }

  function handleUpdate() {
    if (ref.current) {
      const curRect = ref.current.getBoundingClientRect()
      const { x, y, width, height, left, right, top, bottom } = curRect
      let diff = false
      const oldRect = rectRef.current

      objKeys(oldRect).forEach(k => {
        if (curRect[k] !== oldRect[k]) {
          diff = true
        }
      })
      if (diff) {
        setRect({ x, y, width, height, left, right, top, bottom })
        rectRef.current = { x, y, width, height, left, right, top, bottom }
      }
    }
  }
  useEffect(() => {
    handleUpdate()
  })

  useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])
  return rect
}

export default useGetDomRect

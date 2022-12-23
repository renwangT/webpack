import React from "react"

export function combineRefs<T = any>(
  ...refs: Array<React.MutableRefObject<T | null> | React.RefCallback<T> | null>
): React.RefCallback<T> {
  return el => {
    refs.forEach(ref => {
      if (typeof ref === "function") {
        ref(el)
      } else if (ref !== null) {
        ref.current = el
      }
    })
  }
}

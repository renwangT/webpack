import React, { useMemo, forwardRef, ForwardedRef, useRef, useEffect } from "react"
import { combineRefs } from "@/utils"

export interface IEvent {
  target: {
    value: string
  }
}
interface IProps {
  onEnter?: (v: string) => void
  name?: string
  onChange?: (e: IEvent) => void
  value?: string
  type?: string
  maxLen?: number
  autoComplete?: "off" | "on"
  onBlur?: () => void
  onFocus?: () => void
  disabled?: boolean
  placeholder?: string
  transform?: "Upper"
  stopPreventDefault?: boolean
}
export const Input = forwardRef(function Component(
  args: IProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const {
    name,
    value,
    onChange,
    disabled = false,
    type = "text",
    maxLen,
    autoComplete = "off",
    onBlur,
    onFocus,
    placeholder,
    transform,
    onEnter,
    stopPreventDefault = false
  } = args
  const inputRef = useRef<HTMLInputElement>(null)
  const selectionStartRef = useRef<number | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    selectionStartRef.current = e.currentTarget.selectionStart
    let val = e.currentTarget.value.trimStart()

    if (maxLen) {
      val = val.slice(0, maxLen)
    }
    // 转换大写
    if (transform === "Upper") {
      val = val.toUpperCase()
    }
    onChange && onChange({ target: { value: val } })
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const val = e.currentTarget.value.trimEnd()
    onChange && onChange({ target: { value: val } })
  }

  useEffect(() => {
    const start = selectionStartRef.current
    const input = inputRef.current
    if (start && input) {
      input.setSelectionRange && input.setSelectionRange(start, start)
    }
  }, [value])

  return useMemo(
    () => (
      <input
        name={name}
        autoComplete={autoComplete}
        type={type}
        placeholder={placeholder}
        value={value}
        ref={combineRefs(ref, inputRef)}
        disabled={disabled}
        onBlur={e => {
          handleBlur(e)
          onBlur && onBlur()
        }}
        onFocus={() => {
          onFocus && onFocus()
        }}
        onChange={handleChange}
        onKeyPress={e => {
          console.log(e.key)

          if (e.key === "Enter") {
            const val = e.currentTarget.value

            onEnter && onEnter(val)
            // handleBlur(e.currentTarget.value)

            e.stopPropagation()

            if (stopPreventDefault) {
              e.preventDefault()
            }
          }
        }}
      />
    ),
    [value, disabled]
  )
})

export default Input

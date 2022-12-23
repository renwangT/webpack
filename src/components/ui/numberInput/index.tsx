import React, { useRef, useEffect, forwardRef, useMemo } from "react"

import { combineRefs } from "@/utils"

interface IEvent {
  target: {
    value: string
  }
}
interface IProps {
  autoComplete?: "off" | "on"
  name?: string
  disabled?: boolean
  onBlur?: () => void
  onFocus?: () => void
  onChange?: (v: IEvent) => void
  value?: string | number
  min?: number
  max?: number
  toFixed?: number
}

export const NumberInput = forwardRef<HTMLInputElement | React.RefCallback<any> | null, IProps>(
  function Component(props, ref) {
    const {
      autoComplete = "off",
      name,
      disabled = false,
      onBlur,
      onFocus,
      onChange,
      value,
      min,
      max,
      toFixed
    } = props

    const inputRef = useRef<HTMLInputElement>(null)
    const lastBlurValue = useRef<string>("")

    const handleMinOrMax = (v: string) => {
      let val = v

      if (v) {
        if (min !== undefined) {
          val = +val <= min ? min + "" : val
        }
        if (max !== undefined) {
          val = +val >= max ? max + "" : val
        }

        if (toFixed !== undefined) {
          if (toFixed === 0) {
            val = String(parseInt(val))
          } else {
            if (val.includes(".") && val.split(".")[1].length > toFixed) {
              val = val.split(".")[0] + "." + val.split(".")[1].slice(0, toFixed)
            }
          }
        }
      }

      return val
    }

    const handleChange = (v: string) => {
      const value = handleMinOrMax(v)
      onChange && onChange({ target: { value } })
    }

    const handleBlur = (v: string) => {
      console.log(v)
      let val: string | number = parseFloat(v)
      if (isNaN(val)) {
        val = lastBlurValue.current
      } else {
        lastBlurValue.current = String(val)
      }
      onChange && onChange({ target: { value: String(val) } })
    }

    useEffect(() => {
      if (typeof value === "string") {
        if (!lastBlurValue.current) {
          lastBlurValue.current = value
        }
      } else if (typeof value === "number") {
        if (!isNaN(value)) {
          if (!lastBlurValue.current) {
            lastBlurValue.current = String(value)
          }
        } else {
          throw Error("NumberInput value should string or number, but got value is NaN!")
        }
      }
    }, [value])

    return useMemo(
      () => (
        <input
          autoComplete={autoComplete}
          name={name}
          disabled={!!disabled}
          ref={combineRefs(ref, inputRef)}
          type="text"
          value={value}
          onBlur={e => {
            handleBlur(e.currentTarget.value)
            onBlur && onBlur()
          }}
          onFocus={() => {
            onFocus && onFocus()
          }}
          onChange={e => {
            handleChange(e.currentTarget.value)
          }}
          onKeyPress={e => {
            if (e.key === "Enter") {
              e.stopPropagation()
            }
          }}
        />
      ),
      [value, disabled]
    )
  }
)

export default NumberInput

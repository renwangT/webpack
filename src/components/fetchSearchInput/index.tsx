import React, { useState, forwardRef, useRef, useMemo, useEffect } from "react"
import styled from "styled-components"
import { useGetDomRect } from "@/hooks"

import PullSelect from "./PullSelect"

import { combineRefs, debounce } from "@/utils"

export interface IEvent {
  target: {
    value: string
  }
}

interface IProps<T extends Record<PropertyKey, string> = Record<PropertyKey, string>> {
  autoComplete?: "off" | "on"
  style?: React.CSSProperties
  onChange?: (e: IEvent) => void
  value?: string
  onFocus?: () => void
  disabled?: boolean
  onBlur?: () => void
  onEnter?: (v: string) => void
  name?: string
  maxLen?: number
  stopPreventDefault?: boolean
  handleValue?: (val: any) => any
  fetchList?: (val: string) => Promise<Array<T>>
  fetchStart?: boolean
  placeholder?: string
  transform?: "Upper"
  optionLabel: keyof T
}

const InputBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`

export default forwardRef<HTMLInputElement | React.RefCallback<any> | null, IProps>(
  function Component(props, ref) {
    const {
      name,
      onEnter,
      fetchList,
      value,
      onChange,
      disabled = false,
      maxLen,
      autoComplete = "off",
      onBlur,
      onFocus,
      placeholder,
      transform,
      optionLabel
    } = props

    const [options, setOptions] = useState<Record<PropertyKey, string>[]>([])
    const [visible, setVisible] = useState<boolean>(false)

    const inputRef = useRef<HTMLInputElement>(null)
    const selectionStartRef = useRef<number | null>(null)
    const inputBoxRef = useRef<HTMLDivElement>(null)
    const timerRef = useRef<NodeJS.Timeout>()

    const { width, top, height, left } = useGetDomRect(inputBoxRef)

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
      timerRef.current && clearTimeout(timerRef.current)
      timerRef.current = debounceFetcher(val)
    }

    const handleBlur = (v: string) => {
      console.log(v)
      const val = v.trimEnd()
      onChange && onChange({ target: { value: val } })
    }
    const debounceFetcher = debounce<string | undefined>(val => {
      if (val && fetchList) {
        fetchList(val).then(data => {
          setOptions(data)
        })
      } else {
        setOptions([])
      }
    }, 500)
    const handleSelect = (v: string) => {
      onEnter && onEnter(v)
      setOptions(options.filter(item => item[optionLabel] === v))
    }

    // useEffect(() => {}, [])

    const activedIndex = options.findIndex(item => item[optionLabel] === value)

    useEffect(() => {
      const start = selectionStartRef.current
      const input = inputRef.current
      if (start && input) {
        input.setSelectionRange && input.setSelectionRange(start, start)
      }
    }, [value])

    useEffect(() => {
      return () => {
        timerRef.current && clearTimeout(timerRef.current)
      }
    }, [])
    return useMemo(
      () => (
        <InputBox ref={inputBoxRef}>
          <input
            autoComplete={autoComplete}
            name={name}
            type="text"
            placeholder={placeholder}
            value={value}
            ref={combineRefs(ref, inputRef)}
            disabled={disabled}
            onBlur={e => {
              handleBlur(e.currentTarget.value)
              onBlur && onBlur()
              setVisible(false)
            }}
            onFocus={() => {
              onFocus && onFocus()
              setVisible(true)
            }}
            onChange={handleChange}
            onKeyPress={e => {
              if (e.key === "Enter") {
                const value =
                  activedIndex > -1
                    ? options[activedIndex][optionLabel]
                    : options.length > 0
                    ? options[0][optionLabel]
                    : e.currentTarget.value
                handleSelect(value)
                inputRef.current?.blur()
                e.stopPropagation()
              }
            }}
          />
          <PullSelect
            visible={visible}
            activedIndex={activedIndex}
            options={options.map(item => item[optionLabel])}
            onSelect={handleSelect}
            width={width}
            top={top + height + 1}
            left={left}
          />
        </InputBox>
      ),
      [value, disabled, visible, options]
    )
  }
)

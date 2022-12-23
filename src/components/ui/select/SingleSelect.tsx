import { forwardRef, useRef, useState, startTransition, useEffect } from "react"
import PullList from "./PullList"
import { SelectWrapper, DownOutLineWrapper } from "./Styles"
import { DownOutLine } from "../../icons"
import { combineRefs } from "@/utils"
import { useGetDomRect } from "@/hooks/useGetDomRect"

import type { CommonProps, SinglePropsKeys } from "./types"

type ValueType = string | number

export const SingleSelect = forwardRef<
  HTMLInputElement | React.RefCallback<any> | null,
  Pick<CommonProps<ValueType>, SinglePropsKeys>
>(function Component(props, ref) {
  const {
    style,
    value,
    disabled,
    name,
    showSearch,
    placeholder,
    onChange,
    options = [],
    optionLabelProp = "label",
    filterKey = "value",
    onBlur,
    onFocus
  } = props

  const [visible, setVisible] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>("")
  const [searchList, setSearchList] = useState<Item[] | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)
  const inputBoxRef = useRef<HTMLDivElement>(null)
  const inputFocusTime = useRef<number>(0)

  const { top, left, width, height } = useGetDomRect(inputBoxRef)

  function handleChange(val: string) {
    setInputValue(val.toLocaleUpperCase())

    if (showSearch) {
      if (!val) {
        startTransition(() => {
          setSearchList(null)
        })
        return false
      }
      const searchList = options.filter(item => {
        const index = (item[filterKey] as string).toLowerCase().indexOf(val.toLowerCase())
        return index >= 0
      })
      startTransition(() => {
        setSearchList(searchList)
      })
    }
  }

  function handleEnter() {
    if (inputValue && searchList) {
      const selectItem = searchList.find(item => item.value === inputValue)
      if (selectItem) {
        inputRef.current?.blur()
        setTimeout(() => {
          onSelect(selectItem.value)
        }, 0)
      }
    }
  }
  function onSelect(val: ValueType) {
    console.log("value:", val)
    onChange &&
      onChange({
        target: {
          value: val
        }
      })
    inputRef.current?.blur()
    setVisible(false)
    setInputValue(val + "")
  }
  // function handleCustomClose() {
  //   const curTime = new Date().getTime()
  //   console.log(curTime)
  //   console.log(inputFocusTime.current)
  //   console.log(visible)

  //   if (visible && curTime - inputFocusTime.current > 500) {
  //     console.log("cusotm 失焦")
  //     inputRef.current?.blur()
  //   }
  // }

  function handleFocus() {
    console.log("focus")
    // handleClick("show")
    setVisible(true)
    onFocus && onFocus()
    inputFocusTime.current = new Date().getTime()
    if (showSearch) {
      handleChange("")
    }
  }

  function handleBlur() {
    console.log("blur")
    // handleClick("hidden")
    setVisible(false)
    onBlur && onBlur()
    setInputValue(value + "")
  }

  const val = options.find(item => item.value === value)?.label || value

  useEffect(() => {
    setInputValue((value as string) || "")
  }, [value])

  return (
    <SelectWrapper
      style={style}
      ref={inputBoxRef}
      onMouseDown={e => {
        e.stopPropagation()
        e.preventDefault()
        if (!disabled) {
          setVisible(!visible)
          if (visible) {
            inputRef.current?.blur()
          } else {
            inputRef.current?.focus()
          }
        }
      }}
    >
      <input
        autoComplete="off"
        name={name}
        ref={combineRefs(ref, inputRef)}
        disabled={!!disabled}
        type="text"
        readOnly={!showSearch}
        placeholder={showSearch ? (value as string) || placeholder : placeholder}
        value={showSearch ? inputValue : val}
        onChange={e => handleChange(e.target.value)}
        onFocus={() => {
          handleFocus()
        }}
        onKeyDown={e => {
          e.stopPropagation()
          console.log("code", e.code)
          if (e.code === "Enter" || (e.code === "NumpadEnter" && showSearch)) {
            handleEnter()
          }
        }}
        onBlur={() => {
          handleBlur()
        }}
      />
      <PullList
        visible={visible}
        onSelect={onSelect}
        options={showSearch ? searchList || options : options}
        top={top + height + 1}
        left={left}
        width={width}
        value={showSearch ? inputValue : val}
        optionLabelProp={optionLabelProp}
      />
      <DownOutLineWrapper hidden={false} disabled={!!disabled}>
        <DownOutLine />
      </DownOutLineWrapper>
    </SelectWrapper>
  )
})

export default SingleSelect

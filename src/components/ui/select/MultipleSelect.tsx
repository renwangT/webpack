import { forwardRef, useRef, useState, startTransition, useId } from "react"
import { Tag } from "../tag"
import PullList from "./PullList"
import {
  MultipleSelectWrapper,
  MultipleWrapper,
  TagsWrapper,
  InputWrapper,
  InputBox,
  DownOutLineWrapper,
  DeleteIcon
} from "./Styles"
import { useGetDomRect } from "@/hooks/useGetDomRect"

import { DownOutLine } from "../../icons"

import { combineRefs } from "@/utils"

import type { CommonProps, MultiplePropsKeys } from "./types"

type ValueType = any[]

export const MultipleSelect = forwardRef<
  HTMLInputElement | React.RefCallback<any> | null,
  Pick<CommonProps<ValueType>, MultiplePropsKeys>
>(function Component(props, ref) {
  const {
    style,
    value = [],
    disabled,
    name,
    onChange,
    options = [],
    tagLabelProp = "label",
    optionLabelProp = "label",
    filterKey = "value",
    onBlur,
    onFocus
  } = props
  const id = useId()
  const [visible, setVisible] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>("")
  const [searchList, setSearchList] = useState<Item[] | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)
  const inputBoxRef = useRef<HTMLDivElement>(null)
  const inputFocusTime = useRef<number>(0)
  const typeRef = useRef<string>("")

  const { top, left, width, height } = useGetDomRect(inputBoxRef)

  function handleChange(val: string) {
    setInputValue(val.toLocaleUpperCase())

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

  function onSelect(val: string | number) {
    const index = value.indexOf(val)
    if (index > -1) {
      value.splice(index, 1)
    } else {
      value.push(val)
    }
    onChange &&
      onChange({
        target: {
          value: [...value]
        }
      })

    handleChange("")
  }

  function handleFocus() {
    console.log("focus")
    // handleClick("show")
    setVisible(true)
    onFocus && onFocus()
    inputFocusTime.current = new Date().getTime()
    handleChange("")
  }

  function handleBlur() {
    console.log("blur")
    if (typeRef.current === id + "deleteTag" || typeRef.current === id + "clear") {
      inputRef.current?.focus()
    } else {
      setVisible(false)
      setInputValue("")
      onBlur && onBlur()
    }
    typeRef.current = ""
  }

  function handleClose(i: number) {
    const newArr = [...value]
    newArr.splice(i, 1)
    if (onChange) {
      onChange({ target: { value: newArr } })
    }
    typeRef.current = id + "deleteTag"
  }

  function handleClear() {
    if (onChange) {
      onChange({ target: { value: [] } })
    }
    if (visible) {
      typeRef.current = id + "clear"
    }

    handleChange("")
  }

  function handleDelete() {
    if (onChange) {
      value.pop()
      onChange({ target: { value: [...value] } })
    }
  }

  const tags = value.map(v => options.find(item => item.value === v) || { value: v, label: v })
  return (
    <MultipleSelectWrapper
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
      <MultipleWrapper>
        <TagsWrapper>
          {tags.map((item, index) => (
            <Tag key={item.value} disabled={disabled} onClose={() => handleClose(index)}>
              {item[tagLabelProp]}
            </Tag>
          ))}
          <InputWrapper visible={visible}>
            <span className="text">{inputValue}</span>
            <InputBox>
              <input
                autoComplete="off"
                name={name}
                ref={combineRefs(ref, inputRef)}
                disabled={!!disabled}
                type="text"
                readOnly={false}
                value={inputValue}
                onChange={e => handleChange(e.target.value)}
                onFocus={() => {
                  handleFocus()
                }}
                onKeyDown={e => {
                  e.stopPropagation()
                  console.log(e.code)
                  if (e.code === "Backspace") {
                    handleDelete()
                  }
                }}
                onBlur={() => {
                  handleBlur()
                }}
              />
            </InputBox>
          </InputWrapper>
        </TagsWrapper>
      </MultipleWrapper>

      <PullList
        visible={visible}
        onSelect={onSelect}
        options={searchList || options}
        top={top + height + 1}
        left={left}
        width={width}
        value={value}
        optionLabelProp={optionLabelProp}
      />
      {tags.length > 0 ? (
        <DeleteIcon
          onMouseDown={e => {
            e.stopPropagation()
            handleClear()
          }}
        />
      ) : (
        <DownOutLineWrapper hidden={false} disabled={!!disabled}>
          <DownOutLine />
        </DownOutLineWrapper>
      )}
    </MultipleSelectWrapper>
  )
})

export default MultipleSelect

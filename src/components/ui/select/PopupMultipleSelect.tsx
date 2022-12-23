import { forwardRef, useRef, useState } from "react"
import styled from "styled-components"
import { Popup, Tag } from "@/components"
import { DownOutLine } from "../../icons"

import {
  MultipleSelectWrapper,
  MultipleWrapper,
  TagsWrapper,
  InputWrapper,
  InputBox,
  DownOutLineWrapper,
  DeleteIcon
} from "./Styles"
import { combineRefs } from "@/utils"

import type { CommonProps, MultiplePropsKeys } from "./types"

const Content = styled.div`
  height: 500px;
  overflow-y: auto;
`
const Li = styled.li<{ checked: boolean }>`
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
  height: 80px;
  line-height: 80px;
  background: ${props => (props.checked ? "#355EDE" : "#fff")};
  color: ${props => (props.checked ? "#fff" : "#333")};
  background: ${props => (props.checked ? "#355EDE" : "#e5eff8")};
  text-align: center;
  font-size: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-bottom: 1px solid #d2d2d2;
  &:last-child {
    border: none;
  }
`

const Ul = styled.ul`
  box-sizing: border-box;
  overflow: hidden;
`

export const PopupMultipleSelect = forwardRef<
  HTMLInputElement | React.RefCallback<any> | null,
  Pick<CommonProps<any[]>, Exclude<MultiplePropsKeys, "filterKey">>
>(function Component(props, ref) {
  const {
    style,
    value = [],
    options = [],
    name,
    disabled,
    onBlur,
    onFocus,
    onChange,
    tagLabelProp = "label",
    optionLabelProp = "label"
  } = props

  // const [searchList, setSearchList] = useState<Item[] | null>(null)
  // const [inputValue, setInputValue] = useState<string>("")
  const [visible, setVisible] = useState<boolean>(false)

  const inputRef = useRef<HTMLInputElement>(null)

  function handleClear() {
    if (onChange) {
      onChange({ target: { value: [] } })
    }
  }

  function handleClose(i: number) {
    const newArr = [...value]
    newArr.splice(i, 1)
    if (onChange) {
      onChange({ target: { value: newArr } })
    }
  }

  const tags = value.map(v => options.find(item => item.value === v) || { value: v, label: v })

  return (
    <>
      <MultipleSelectWrapper
        style={style}
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
              <InputBox>
                <input
                  autoComplete="off"
                  name={name}
                  ref={combineRefs(ref, inputRef)}
                  disabled={!!disabled}
                  type="text"
                  readOnly={true}
                  // value={inputValue}
                  // onChange={e => handleChange(e.target.value)}
                  onFocus={() => {
                    console.log("focus")
                    setVisible(true)
                    onFocus && onFocus()
                  }}
                  onKeyDown={e => {
                    e.stopPropagation()
                    console.log("code", e.code)
                  }}
                  onBlur={() => {
                    console.log("blur")
                    setVisible(false)
                    onBlur && onBlur()
                  }}
                />
              </InputBox>
            </InputWrapper>
          </TagsWrapper>
        </MultipleWrapper>
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
      <Popup
        zIndex={999}
        visible={visible}
        onCancel={() => {
          setVisible(false)
          inputRef.current?.blur()
        }}
        defaultValue={value}
        onConfirm={val => {
          onChange &&
            onChange({
              target: {
                value: val as any[]
              }
            })
          // inputRef.current?.blur()
        }}
        position="bottom"
      >
        {({ value, setValue }) => {
          const isChecked = (val: string | number) => {
            if (Array.isArray(value)) {
              return value.indexOf(val) > -1
            }
            return false
          }
          return (
            <Content>
              <Ul>
                {options.map(item => (
                  <Li
                    checked={isChecked(item.value)}
                    onMouseDown={e => {
                      e.stopPropagation()
                      e.preventDefault()
                      setValue(item.value)
                    }}
                    key={item.value}
                  >
                    {item[optionLabelProp]}
                    {/* {isChecked(item.value) && <Check />} */}
                  </Li>
                ))}
              </Ul>
            </Content>
          )
        }}
      </Popup>
    </>
  )
})

export default PopupMultipleSelect

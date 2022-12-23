import { useState, forwardRef, useRef } from "react"
import styled from "styled-components"
import { Popup } from "@/components"
import { DownOutLine } from "../../icons"

import { SelectWrapper, DownOutLineWrapper } from "./Styles"
import { combineRefs } from "@/utils"

import type { CommonProps, SinglePropsKeys } from "./types"

type ValueType = string | number

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
export const PopupSelect = forwardRef<
  HTMLInputElement | React.RefCallback<any> | null,
  Pick<CommonProps<ValueType>, Exclude<SinglePropsKeys, "showSearch" | "filterKey">>
>(function Component(props, ref) {
  const {
    style,
    value,
    options = [],
    name,
    disabled,
    onBlur,
    onFocus,
    onChange,
    placeholder,
    optionLabelProp = "label"
  } = props

  const [visible, setVisible] = useState<boolean>(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const val = options.find(item => item.value === value)?.label || value

  return (
    <>
      <SelectWrapper
        style={style}
        onMouseDown={e => {
          e.stopPropagation()
          e.preventDefault()
          setVisible(!visible)
          if (!disabled) {
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
          placeholder={placeholder}
          type="text"
          readOnly={true}
          value={val}
          onFocus={() => {
            console.log("focus")
            // handleClick("show")
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
        <DownOutLineWrapper hidden={false} disabled={!!disabled}>
          <DownOutLine />
        </DownOutLineWrapper>
      </SelectWrapper>
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
                value: val as ValueType
              }
            })
          inputRef.current?.blur()
        }}
        position="bottom"
      >
        {({ value, setValue }) => {
          const isChecked = (val: ValueType) => {
            if (val === value) {
              return true
            }
            return false
          }
          return (
            <Content>
              <Ul>
                {options &&
                  options.map(item => (
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

export default PopupSelect

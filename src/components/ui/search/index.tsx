import React, { FormEvent, useState, useRef, useMemo, useEffect } from "react"
import styled, { css } from "styled-components"
import Input from "../input"
import Select from "../select"
import { pxTovw } from "@/utils"

import clear from "@/assets/imgs/clear.png"

import type { IEvent } from "../input"

export type SearchEvent = IEvent

interface Props {
  label: string
  value?: string
  onChange?: (e: IEvent) => void
  onSearch?: (v: string) => void
  options?: Item[]
  showSearch?: boolean
  placeholder?: string
  maxLen?: number
  suffix?: React.ReactNode
}
const DeleteIcon = styled.img.attrs({
  src: clear,
  className: "icon-delete"
})``
const SearchIcon = () => (
  <svg
    className="icon icon-search"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="3857"
    width="32"
    height="32"
  >
    <path
      d="M1024 963.7L756.8 696.5c60.2-73.6 96.5-167.5 96.5-269.8C853.3 191.4 661.9 0 426.7 0S0 191.4 0 426.7s191.4 426.7 426.7 426.7c102.3 0 196.3-36.3 269.8-96.5L963.7 1024l60.3-60.3zM426.7 768C238.5 768 85.3 614.9 85.3 426.7S238.5 85.3 426.7 85.3 768 238.5 768 426.7 614.9 768 426.7 768z"
      p-id="3858"
    />
  </svg>
)
// const DeleteIcon = () => (
//   <svg
//     className="icon icon-delete"
//     viewBox="0 0 1024 1024"
//     version="1.1"
//     xmlns="http://www.w3.org/2000/svg"
//     p-id="5548"
//     width="38"
//     height="38"
//   >
//     <path
//       d="M649.824 604.576a31.968 31.968 0 1 1-45.248 45.248L505.6 550.848l-98.976 98.976a31.904 31.904 0 0 1-45.248 0 32 32 0 0 1 0-45.248l98.976-98.976-98.976-98.976a32 32 0 0 1 45.248-45.248l98.976 98.976 98.976-98.976a32 32 0 0 1 45.248 45.248L550.848 505.6l98.976 98.976zM512 128C300.288 128 128 300.288 128 512c0 211.744 172.288 384 384 384 211.744 0 384-172.256 384-384 0-211.712-172.256-384-384-384z"
//       p-id="5549"
//       fill="#333333"
//     />
//   </svg>
// )
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  @media only screen and (min-width: 750px) {
    height: ${pxTovw(50, 1280)};
  }
`
const SearchInputWrapper = styled.div<{ focus: boolean }>`
  display: flex;
  // justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 90px;
  box-sizing: border-box;
  background: #ffffff;
  margin: 0 auto;
  border: 2px solid #d2d2d2;
  border-radius: 42px;
  @media only screen and (min-width: 750px) {
    flex: 1;
    width: auto;
    height: ${pxTovw(49, 1280)};
    margin: auto;
    border: 1px solid #d2d2d2;
  }
  ${props =>
    props.focus &&
    css`
      border-color: #40a9ff;
      box-shadow: 0 0 0 2px rgb(24 144 255 / 20%);
      @media only screen and (min-width: 750px) {
        box-shadow: 0 0 0 ${pxTovw(2, 1280)} rgb(24 144 255 / 20%);
      }
    `}
`
const Label1280 = styled.div`
  display: none;
  color: var(--igt-color-txt);
  @media only screen and (min-width: 750px) {
    display: block;
    padding-right: ${pxTovw(18, 1280)};
    font-size: ${pxTovw(20, 1280)};
    font-weight: bold;
    line-height: ${pxTovw(50, 1280)};
  }
`
const Label = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  height: 44px;
  box-sizing: border-box;
  border-right: ${2}px solid #d2d2d2;
  text-align: center;
  color: #333;
  font-size: ${pxTovw(31)};
  font-weight: bold;
  @media only screen and (min-width: 750px) {
    display: none;
  }
`
const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  box-sizing: border-box;
  margin: 0 1em;
  // overflow: hidden;
  input {
    width: 100%;
    vertical-align: middle;
    font-size: 42px;
    font-weight: bold;
    border: none;
    outline: none;
  }
  @media only screen and (min-width: 750px) {
    height: 100%;
    input {
      font-size: ${pxTovw(25, 1280)};
    }
  }
`
const SearchIconBox = styled.div<{ disabled: boolean }>`
  padding-left: 35px;

  .icon-search {
    width: 40px;
    margin-top: 4px;
    fill: ${props => (props.disabled ? "#d2d2d2" : "#333")};
  }
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  @media only screen and (min-width: 750px) {
    padding-left: ${pxTovw(20, 1280)};
    .icon-search {
      margin-top: ${pxTovw(4, 1280)};
      width: ${pxTovw(28, 1280)};
    }
  }
`
const IconBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0;
  padding-right: 35px;
  cursor: pointer;

  .icon-delete {
    width: 42px;
    height: 42px;
    vertical-align: middle;
  }
  @media only screen and (min-width: 750px) {
    padding-right: ${pxTovw(20, 1280)};
    .icon-delete {
      width: ${pxTovw(30, 1280)};
      height: ${pxTovw(30, 1280)};
    }
  }
`

export const Search: React.FC<Props> = props => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [focus, onFocus] = useState(false)
  const { label, value, onChange, onSearch, showSearch = false, maxLen = 99, suffix } = props
  const [inputValue, setInputValue] = useState("")
  const handleChange = (e: IEvent) => {
    const { value } = e.target
    setInputValue(value)
    onChange && onChange(e)
    if (showSearch) {
      onSearch && onSearch(value)
    }
  }

  const handleClearValue = () => {
    onChange && onChange({ target: { value: "" } })
    setInputValue("")
  }
  const handleIcon = () => {
    if (v) {
      handleClearValue()
      inputRef.current?.focus()
      onFocus(true)
    } else {
      onSearch && onSearch(v)
    }
  }
  const v = useMemo(() => {
    if (typeof value === "undefined") {
      return inputValue
    } else {
      return value
    }
  }, [value, inputValue])

  useEffect(() => {
    setInputValue(value || "")
  }, [value])
  return (
    <Wrapper
      as="form"
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        onSearch && onSearch(v)
        e.preventDefault()
      }}
    >
      <Label1280>{label}</Label1280>
      <SearchInputWrapper focus={focus}>
        <Label>{label}</Label>

        <SearchIconBox disabled={!inputValue}>
          <a
            onClick={() => {
              onSearch && onSearch(v)
            }}
          >
            <SearchIcon />
          </a>
        </SearchIconBox>
        <InputWrapper>
          {props.options ? (
            <Select
              ref={inputRef}
              value={inputValue}
              showSearch={showSearch}
              onChange={e => handleChange({ target: { value: e.target.value as string } })}
              onFocus={() => {
                onFocus(true)
              }}
              onBlur={() => {
                onFocus(false)
              }}
              options={props.options}
              placeholder={props.placeholder}
            />
          ) : (
            <Input
              transform="Upper"
              ref={inputRef}
              value={v}
              onChange={handleChange}
              onFocus={() => {
                onFocus(true)
              }}
              onBlur={() => {
                onFocus(false)
              }}
              placeholder={props.placeholder}
              maxLen={maxLen}
            />
          )}
        </InputWrapper>
        {v ? (
          <IconBox>
            <a onClick={handleIcon}>
              <DeleteIcon />
            </a>
          </IconBox>
        ) : suffix ? (
          <IconBox>{suffix}</IconBox>
        ) : null}

        <input type="submit" hidden />
      </SearchInputWrapper>
    </Wrapper>
  )
}

export default Search

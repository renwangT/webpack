import React, { useState } from "react"
import styled from "styled-components"
import { FormInputWrapper } from "@/components/styleComponents"
import { pxTovw } from "@/utils"
export interface FormSearchProps {
  disabled?: boolean
  style?: React.CSSProperties
  error?: boolean
  onSearch?: (v: string) => void
  children: JSX.Element | null
}
const SearchIcon = () => (
  <svg
    className="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="3857"
  >
    <path
      d="M1024 963.7L756.8 696.5c60.2-73.6 96.5-167.5 96.5-269.8C853.3 191.4 661.9 0 426.7 0S0 191.4 0 426.7s191.4 426.7 426.7 426.7c102.3 0 196.3-36.3 269.8-96.5L963.7 1024l60.3-60.3zM426.7 768C238.5 768 85.3 614.9 85.3 426.7S238.5 85.3 426.7 85.3 768 238.5 768 426.7 614.9 768 426.7 768z"
      p-id="3858"
    ></path>
  </svg>
)
const SearchIconWrapper = styled.div<{ disabled: boolean; focus: boolean; error: boolean }>`
  position: absolute;
  width: 35px;
  height: 35px;
  right: 8px;
  top: 50%;
  transform: translate(0, -50%);
  font-size: 0;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  svg {
    width: 35px;
    height: 35px;
    fill: ${props => (props.error ? "var(--igt-color-error)" : "#D2D2D2")};
  }
  @media only screen and (min-width: 750px) {
    right: ${pxTovw(5, 1280)};
    width: ${pxTovw(28, 1280)};
    height: ${pxTovw(28, 1280)};
    text-indent: 0;
    svg {
      width: ${pxTovw(28, 1280)};
      height: ${pxTovw(28, 1280)};
      fill: ${props => (props.error ? "var(--igt-color-error)" : "#D2D2D2")};
    }
  }
  ${props =>
    props.focus &&
    `
    svg {
      fill: ${props.error ? "var(--igt-color-error)" : "#548df6"};
    }
  `}
`
const SearchWrapper = styled(FormInputWrapper)`
  position: relative;
  padding-right: 50px;
  @media only screen and (min-width: 750px) {
    padding-right: ${pxTovw(40, 1280)};
  }
  &:hover {
    border-color: ${props =>
      props.error ? "var(--igt-color-error)" : props.disabled ? "#D2D2D2" : "#548df6"};
    ${SearchIconWrapper} {
      svg {
        fill: ${props =>
          props.error ? "var(--igt-color-error)" : props.disabled ? "#D2D2D2" : "#548df6"};
      }
    }
  }
`

export const FormSearch = ({ disabled, style, error, onSearch, children }: FormSearchProps) => {
  const [focus, setFocus] = useState<boolean>(false)

  const handleSearchIcon = () => {
    if (disabled) return
    onSearch && onSearch(children?.props.value)
  }
  const { onBlur, onFocus } = children?.props || {}

  return (
    <SearchWrapper error={!!error} style={style} disabled={!!disabled} focus={focus}>
      {children &&
        React.cloneElement(children, {
          ...children.props,
          onFocus() {
            setFocus(true)
            onFocus && onFocus()
          },
          onBlur() {
            setFocus(false)
            onBlur && onBlur()
          },
          disabled,
          stopPreventDefault: true,
          onEnter: onSearch
        })}
      <SearchIconWrapper
        error={!!error}
        disabled={!!disabled}
        focus={focus}
        onClick={handleSearchIcon}
      >
        <SearchIcon />
      </SearchIconWrapper>
    </SearchWrapper>
  )
}

export default FormSearch

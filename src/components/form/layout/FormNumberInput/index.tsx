import React, { useState } from "react"
import styled, { css } from "styled-components"
import { FormInputWrapper } from "@/components/styleComponents"
import { UpArrow } from "../../../icons"
import { pxTovw } from "@/utils"

export interface FormInputProps {
  onChange?: (e: { target: { value: string } }) => void
  value?: string
  disabled?: boolean
  style?: React.CSSProperties
  error?: boolean
  children: JSX.Element
  controls?: boolean
}
type MouseType = "add" | "sub"
const Controls = styled.div<{ focus: boolean; disabled: boolean }>`
  display: none;
  position: absolute;
  right: 0;
  height: 100%;
  background: #fff;
  opacity: ${props => (props.focus ? 1 : 0)};
  overflow: hidden;
  transition: all 0.1s linear;

  @media only screen and (min-width: 750px) {
    display: ${props => (props.disabled ? "none" : "block")};
    width: ${pxTovw(24, 1280)};
  }
`

const Add = styled.div<{ mouseType?: MouseType; disabled: boolean }>`
  display: flex;
  align-items: center;
  height: 50%;
  font-size: 0;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  border-left: 1px solid #bfbfbf;
  border-bottom: 1px solid #bfbfbf;
  transition: all 0.1s linear;
  ${props =>
    props.mouseType
      ? props.mouseType === "add"
        ? css`
            height: 60%;
          `
        : css`
            height: 40%;
          `
      : css`
          height: 50%;
        `}
  svg {
    fill: #bfbfbf;
  }
  &:hover {
    svg {
      fill: #548df6;
    }
  }
  &:active {
    background: #f4f4f4;
  }
  @media only screen and (min-width: 750px) {
    svg {
      vertical-align: middle;
      width: ${pxTovw(24, 1280)};
      height: ${pxTovw(24, 1280)};
    }
  }
`
const Sub = styled.div<{ mouseType?: MouseType; disabled: boolean }>`
  display: flex;
  align-items: center;
  height: 50%;
  font-size: 0;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  border-left: 1px solid #bfbfbf;
  transition: all 0.1s linear;
  ${props =>
    props.mouseType
      ? props.mouseType === "sub"
        ? css`
            height: 60%;
          `
        : css`
            height: 40%;
          `
      : css`
          height: 50%;
        `}
  svg {
    fill: #bfbfbf;
  }
  &:hover {
    svg {
      fill: #548df6;
    }
  }
  &:active {
    background: #f4f4f4;
  }
  @media only screen and (min-width: 750px) {
    svg {
      transform: rotate(180deg);
      vertical-align: middle;
      width: ${pxTovw(24, 1280)};
      height: ${pxTovw(24, 1280)};
    }
  }
`
export const FormNumberInput = ({
  error,
  disabled,
  style,
  children,
  controls = true
}: FormInputProps) => {
  const [focus, setFocus] = useState<boolean>(false)
  const [mouseType, setMouseType] = useState<MouseType | undefined>(undefined)

  const onMouseOver = (type: "add" | "sub") => {
    setMouseType(type)
  }
  const onMouseOut = () => {
    setMouseType(undefined)
  }
  const { max, min, value, onChange, onBlur, onFocus } = children.props
  return (
    <FormInputWrapper
      style={{ ...style, overflow: "hidden" }}
      disabled={!!disabled}
      error={!!error}
      focus={focus}
    >
      {children &&
        React.cloneElement(children, {
          ...children.props,
          onFocus() {
            setFocus(true)
            onFocus && onFocus()
          },
          disabled,
          onBlur() {
            setFocus(false)
            onBlur && onBlur()
          }
        })}

      {controls && (
        <Controls className="number-controls" focus={focus} disabled={!!disabled}>
          <Add
            disabled={max && max === value}
            mouseType={mouseType}
            onMouseOver={() => onMouseOver("add")}
            onMouseOut={() => onMouseOut()}
            onClick={() => {
              if (onChange) {
                const val = +value + 1
                // onChange(String(val > max ? max : val))
                onChange({ target: { value: String(val > max ? max : val) } })
              }
            }}
          >
            <UpArrow />
          </Add>
          <Sub
            disabled={min && min === value}
            mouseType={mouseType}
            onMouseOver={() => onMouseOver("sub")}
            onMouseOut={() => onMouseOut()}
            onClick={() => {
              if (onChange) {
                const val = +value - 1
                // onChange(String(val < min ? min : val))
                onChange({ target: { value: String(val < min ? min : val) } })
              }
            }}
          >
            <UpArrow />
          </Sub>
        </Controls>
      )}
    </FormInputWrapper>
  )
}

export default FormNumberInput

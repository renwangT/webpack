import React, { useState, cloneElement, useEffect } from "react"
import styled, { css } from "styled-components"
import { pxTovw } from "@/utils"

interface RadioProps {
  children: JSX.Element | React.ReactNode
  value: string | number
  checked?: boolean
  onChecked?: (v: string | number) => void
  disabled?: boolean
}

interface GroupProps {
  children: JSX.Element[]
  value?: string | number
  onChange?: (v: string | number) => void
  disabled?: boolean
}
type DivProps = {
  disabled: boolean
}
const RadioWrapper = styled.label<DivProps>`
  display: flex;
  align-items: center;
  margin-right: 20px;
  font-size: 24px;
  cursor: pointer;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  @media only screen and (min-width: 750px) {
    margin-right: ${pxTovw(15, 1280)};
    font-size: ${pxTovw(24, 1280)};
  }
`
const RadioInner = styled.span<DivProps>`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 50%;
  border: 1px solid #d9d9d9;
  transition: all 0.3s;
  ${props =>
    props.disabled &&
    css`
      background-color: rgba(0, 0, 0, 0.04);
      border-color: #d9d9d9;
    `}
  &:hover {
    border-color: ${props => (props.disabled ? "#d9d9d9" : "#1890ff")};
  }
  @media only screen and (min-width: 750px) {
    width: ${pxTovw(30, 1280)};
    height: ${pxTovw(30, 1280)};
  }
  &:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -20px;
    margin-top: -20px;
    width: 40px;
    height: 40px;
    background: ${props => (props.disabled ? "rgba(0,0,0,.25)" : "#1890ff")};

    border-radius: 50%;
    transform: scale(0);
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
    @media only screen and (min-width: 750px) {
      width: ${pxTovw(30, 1280)};
      height: ${pxTovw(30, 1280)};
      margin-left: -${pxTovw(15, 1280)};
      margin-top: -${pxTovw(15, 1280)};
    }
  }
`
const RadioInput = styled.input.attrs(props => ({
  type: props.type,
  checked: props.checked
}))`
  display: none;
  &:checked + ${RadioInner} {
    border-color: ${props => (props.disabled ? "#d9d9d9" : "#1890ff")};
    &:after {
      transform: scale(0.5);
      opacity: 1;
      transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
    }
  }
`
const Text = styled.span`
  display: inline-block;
  padding: 0 10px;
  color: var(--igt-color-txt);
  @media only screen and (min-width: 750px) {
    padding: 0 ${pxTovw(10, 1280)};
  }
`
const GroupWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Group = ({ children, value, onChange, disabled = false }: GroupProps) => {
  const [select, setSelect] = useState<string | number>("")

  const onChecked = (value: string | number) => {
    setSelect(value)
    onChange && onChange(value)
  }
  useEffect(() => {
    setSelect(value || "")
  }, [value])
  return (
    <GroupWrapper>
      {children.map((item: React.ReactElement<RadioProps>) => {
        return cloneElement(item, {
          ...item.props,
          key: item.props.value,
          checked: select === item.props.value,
          onChecked,
          disabled
        })
      })}
    </GroupWrapper>
  )
}
export class Radio extends React.PureComponent<RadioProps> {
  static Group: typeof Group
  render() {
    const { children, checked, onChecked, value, disabled = false } = this.props
    return (
      <RadioWrapper disabled={disabled} onClick={() => onChecked && !disabled && onChecked(value)}>
        <RadioInput type="radio" disabled={disabled} readOnly checked={checked} />
        <RadioInner disabled={disabled}></RadioInner>
        <Text>{children}</Text>
      </RadioWrapper>
    )
  }
}

Radio.Group = Group

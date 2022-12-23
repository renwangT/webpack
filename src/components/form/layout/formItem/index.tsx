import React from "react"
import styled, { css } from "styled-components"
import { pxTovw } from "@/utils"

export type LabelAlign = "left" | "right"
type Rule = {
  required: boolean
  message?: string
}
interface FormItemProps {
  label?: string | React.ReactNode
  layout?: "vertical" | "inline"
  labelAlign?: LabelAlign
  children?: JSX.Element | null
  rules?: Rule[]
  labelCol?: {
    span: number
  }
  wrapperCol?: {
    span: number
  }
  hiddenRequiredFlag?: boolean
}
const FormItemWrapper = styled.div<{ layout?: FormItemProps["layout"] }>`
  width: 100%;
  height: 100%;
  ${props => {
    if (props.layout === "inline") {
      return css`
        display: flex;
      `
    }
    if (props.layout === "vertical") {
      return css`
        display: block;
      `
    }
    return ""
  }}
  @media only screen and (min-width: 750px) {
    height: 100%;
    flex: 1;
    display: flex;
    // justify-content: center;
    align-items: start;
    ${props => {
      if (props.layout === "vertical") {
        return css`
          display: block;
        `
      }
      return ""
    }}
  }
`

const Label = styled.div<{
  span?: number
  labelAlign: LabelAlign
  layout?: FormItemProps["layout"]
}>`
  ${props =>
    props.span === 0 &&
    css`
      display: none;
    `};
  position: relative;
  padding: 15px 0;
  font-size: 31px;
  color: var(--igt-color-txt);
  margin-bottom: 0;
  box-sizing: border-box;
  ${props => {
    if (props.layout === "inline") {
      return css`
        display: flex;
        justify-content: ${props.labelAlign === "right" ? "flex-end" : "flex-start"};
        align-items: center;
        padding: 0;
        width: ${props.span ? props.span * 10 + "%" : "auto"};
        padding-right: 0.5em;
        padding-left: 0.5em;
      `
    }
    if (props.layout === "vertical") {
      return css`
        display: block;
      `
    }
    return ""
  }}
  @media only screen and (min-width: 750px) {
    display: ${props => (props.span === 0 ? "none" : "flex")};
    justify-content: ${props => (props.labelAlign === "right" ? "flex-end" : "flex-start")};
    align-items: center;
    height: ${pxTovw(52, 1280)};
    // line-height: ${pxTovw(52, 1280)};
    ${props =>
      props.span
        ? css`
            width: ${props.span * 10}%;
          `
        : css`
            flex: 1;
          `}
    padding: 0;
    padding-right: ${pxTovw(15, 1280)};
    padding-left: ${pxTovw(15, 1280)};
    font-size: ${pxTovw(20, 1280)};
    text-align: ${props => props.labelAlign};
    margin-bottom: 0;
    ${props => {
      if (props.layout === "vertical") {
        return css`
          display: block;
          text-align: left;
          height: auto;
          // line-height: ${pxTovw(52, 1280)};
          padding: 0;
        `
      }
      return ""
    }}
  }
`
const Required = styled.span<{ required: boolean; hiddenRequiredFlag: boolean }>`
  position: relative;
  &:after {
    display: ${props => (props.required && !props.hiddenRequiredFlag ? "block" : "none")};
    position: absolute;
    right: -15px;
    top: 0;
    content: "*";
    color: #ea6c10;
    @media only screen and (min-width: 750px) {
      top: ${pxTovw(5, 1280)};
      right: ${pxTovw(5, 1280)};
    }
  }
  @media only screen and (min-width: 750px) {
    position: initial;
  }
`
const FormItemInputWrapper = styled.div<{ span?: number }>`
  width: 100%;
  @media only screen and (min-width: 750px) {
    ${props =>
      props.span
        ? css`
            width: ${props.span * 10}%;
          `
        : css`
            flex: 1;
          `}
    display: flex;
    flex-direction: column;
  }
`
const ErrorDesc = styled.p`
  color: var(--igt-color-error);
  font-size: 30px;
  margin-top: 5px;
  @media only screen and (min-width: 750px) {
    font-size: ${pxTovw(18, 1280)};
    margin-top: ${pxTovw(5, 1280)};
  }
`
export const FormItem: React.FC<FormItemProps> = props => {
  const {
    layout,
    label = "",
    children,
    rules,
    labelCol,
    wrapperCol,
    labelAlign = "right",
    hiddenRequiredFlag = false
  } = props
  const message = rules && rules[0].message
  const required = rules && rules[0].required
  return (
    <FormItemWrapper layout={layout}>
      <Label span={labelCol?.span} labelAlign={labelAlign} layout={layout}>
        <Required required={!!required} hiddenRequiredFlag={hiddenRequiredFlag}>
          {label && label}
        </Required>
      </Label>
      <FormItemInputWrapper span={wrapperCol?.span}>
        <>
          {children && children}
          {message && <ErrorDesc>{message}</ErrorDesc>}
        </>
      </FormItemInputWrapper>
    </FormItemWrapper>
  )
}

export default FormItem

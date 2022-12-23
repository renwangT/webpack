import styled, { css } from "styled-components"
import { pxTovw } from "@/utils"

export const FormInputWrapper = styled.div<{
  focus: boolean
  disabled: boolean
  error: boolean
  mode?: string
}>`
  position: relative;
  display: flex;
  align-items: center;
  ${props =>
    props.mode === "multiple"
      ? css`
          min-height: 83px;
        `
      : css`
          height: 83px;
        `}
  background: ${props => (props.disabled ? "var(--igt-color-input-disabled-bg)" : "#fff")};
  box-sizing: border-box;
  padding: 0 20px;
  font-size: 42px;
  font-weight: bold;
  color: #355ede;
  border-radius: 7px;
  border: 1px solid #d2d2d2;
  ${props =>
    props.disabled &&
    css`
      user-select: none;
      cursor: not-allowed;
    `}
  border-color: ${props => (props.error ? "var(--igt-color-error)" : "var(--igt-color-border)")};
  ${props =>
    props.focus &&
    css`
      border-color: ${props.disabled
        ? "var(--igt-color-border)"
        : props.error
        ? "var(--igt-color-error)"
        : "#548df6"};
      box-shadow: ${props.error ? 0 : `0 0 ${pxTovw(10)} rgba(24, 144, 255, 0.2)`};
    `}
  input {
    width: 100%;
    font-size: 42px;
    font-weight: bold;
    color: ${props => (props.disabled ? "var(--igt-color-txt)" : "#355ede")};
    vertical-align: middle;
    background-color: transparent;
    ${props =>
      props.disabled &&
      css`
        user-select: none;
        cursor: not-allowed;
      `}
  }
  @media only screen and (min-width: 750px) {
    width: 100%;
    ${props =>
      props.mode === "multiple"
        ? css`
            min-height: ${pxTovw(52, 1280)};
          `
        : css`
            height: ${pxTovw(52, 1280)};
          `}
    padding: 0 ${pxTovw(17, 1280)};
    font-size: ${pxTovw(25, 1280)};
    ${props =>
      props.focus &&
      css`
        border-color: ${props.error
          ? "var(--igt-color-error)"
          : props.disabled
          ? "var(--igt-color-border)"
          : "#548df6"};
        box-shadow: ${props.error ? 0 : `0 0 ${pxTovw(3)} rgba(24, 144, 255, 0.2)`};
      `}
    border-radius: ${pxTovw(10, 1280)};
    input {
      font-size: ${pxTovw(25, 1280)};
    }
  }
  &:hover {
    border-color: ${props =>
      props.error
        ? "var(--igt-color-error)"
        : props.disabled
        ? "var(--igt-color-border)"
        : "#548df6"}!important;
    .number-controls {
      opacity: 1;
    }
  }
`

export default FormInputWrapper

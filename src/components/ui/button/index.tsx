import styled, { css } from "styled-components"
import { pxTovw } from "@/utils"

export const Button = styled.button<{ disabled?: boolean }>`
  height: 83px;
  background: ${props =>
    props.disabled ? "#d2d2d2" : "linear-gradient(to top, #345dde, #609fff)"};
  border: 0;
  outline: none;
  border-color: ${props => (props.disabled ? "#d2d2d2" : "#548df6")};
  border-radius: 10px;
  font-size: 31px;
  font-weight: bold;
  color: ${props => (props.disabled ? "#666" : "#f4f4f4")};
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  @media only screen and (min-width: 750px) {
    height: ${pxTovw(50, 1280)};
    border-radius: ${pxTovw(10, 1280)};
    font-size: ${pxTovw(18, 1280)};
  }
  ${props =>
    !props.disabled &&
    css`
      &:hover {
        background: linear-gradient(to top, #548df6, #609fff);
      }
      &:active {
        background: linear-gradient(to top, #0e37b9, #528be2);
      }
    `}
`
export default Button

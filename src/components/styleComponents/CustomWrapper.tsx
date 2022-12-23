import styled from "styled-components"
import { pxTovw } from "@/utils"

interface IProps {
  textAlign?: string
  size?: number
  paddingTop?: number
  paddingRight?: number
  paddingBottom?: number
  paddingLeft?: number
}

export const CustomWrapper = styled.div<IProps>`
  text-align: ${props => props.textAlign || "left"};
  padding: ${props =>
    `${pxTovw(props.paddingTop || 0)} ${pxTovw(props.paddingRight || 0)} ${pxTovw(
      props.paddingBottom || 0
    )} ${pxTovw(props.paddingLeft || 0)}`};
  font-size: ${props => pxTovw(props.size || 16)};
`

export default CustomWrapper

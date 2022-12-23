import styled, { css } from "styled-components"

type Align = "right" | "center" | "left"
type Vertical = "top" | "middle" | "bottom"
export const Col = styled.div<{ span?: number; vertical?: Vertical; align?: Align }>`
  width: ${props => (props.span ? `${props.span * 10}%` : "100%")};
  display: flex;
  ${props => {
    let align = "flex-start"
    if (props.vertical === "top") {
      align = "flex-end"
    }
    if (props.vertical === "middle") {
      align = "center"
    }
    if (props.vertical === "bottom") {
      align = "flex-start"
    }
    return css`
      align-items: ${align};
    `
  }}
  ${props => {
    let align = "flex-start"
    if (props.align === "right") {
      align = "flex-end"
    }
    if (props.align === "center") {
      align = "center"
    }
    if (props.align === "left") {
      align = "flex-start"
    }
    return css`
      justify-content: ${align};
    `
  }}
`

export default Col

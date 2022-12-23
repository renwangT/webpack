import React from "react"
import styled, { css } from "styled-components"
import { pxTovw } from "@/utils"

interface IProps {
  content: number
  children: JSX.Element | null
}

const BadgeWrapper = styled.div<{ content?: number | string }>`
  position: relative;
  ${props =>
    props.content &&
    css`
      &:after {
        content: "${props.content}";
        position: absolute;
        top: -30%;
        right: -50%;
        padding: 10px;
        width: ${pxTovw(29)};
        height: ${pxTovw(29)};
        background: #ea6c10;
        border-radius: 50%;
        font-size: 20px;
        color: #ffffff;
        text-align: center;
        line-height: ${pxTovw(29)};

        font-weight: bold;
        transform-origin: right top;
        transform: scale(0.6);
        @media only screen and (min-width: 750px) {
          width: ${pxTovw(24, 1280)};
          height: ${pxTovw(24, 1280)};
          padding: ${pxTovw(7, 1280)};
          font-size: ${pxTovw(17, 1280)};
          line-height: ${pxTovw(24, 1280)};
          transform: scale(0.8);
        }
      }
    `}
`
export const Badge: React.FC<IProps> = props => {
  const { content, children } = props
  return <BadgeWrapper content={content || ""}>{children}</BadgeWrapper>
}

export default Badge

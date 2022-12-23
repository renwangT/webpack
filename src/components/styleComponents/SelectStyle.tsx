import styled, { css } from "styled-components"
import { pxTovw } from "@/utils"

export const Option = styled.div<{ actived: boolean; height: number }>`
  position: relative;
  text-indent: 0;
  @media only screen and (min-width: 750px) {
    height: ${props => pxTovw(props.height, 1280)};
    line-height: ${props => pxTovw(props.height, 1280)}!important;
    font-size: ${pxTovw(24, 1280)};
    padding: 0 0.8em;
    padding-right: 2em;
    outline: none;
    appearance: none;
    border: 0;
    border-radius: ${pxTovw(5, 1280)};
    background-color: ${props => (props.actived ? "#e6f7ff" : "#fff")};
    &:hover {
      background-color: ${props => (props.actived ? "#e6f7ff" : "#eee")};
      outline: none;
    }
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .check {
      position: absolute;
      right: 1em;
      top: 0;
      svg {
        vertical-align: middle;
        margin-bottom: 0.3em;
        ${props =>
          props.actived &&
          css`
            fill: var(--igt-color-primary);
          `}
      }
    }
  }
`

const OptionsWrapper = styled.div<{
  height: number
  hidden: boolean
  top?: number
  left?: number
  width?: number
}>`
  display: none;
  position: absolute;
  width: ${props => props.width}px;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  transition: height 0.1s ease-in-out;
  background: #fff;
  overflow: hidden;
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%),
    0 9px 28px 8px rgb(0 0 0 / 5%);
  box-sizing: content-box;
  z-index: 999;
  @media only screen and (min-width: 750px) {
    display: ${props => (props.hidden ? "none" : "block")};
    transform: translate(0, ${pxTovw(2, 1280)});
    height: ${props => pxTovw(props.height, 1280)};
    border-radius: ${pxTovw(10, 1280)};
    padding: ${props => (props.height ? `${pxTovw(5, 1280)}` : "0")};
    padding-right: 0;
  }
`

export const SelectStyle = {
  OptionsWrapper,
  Option
}

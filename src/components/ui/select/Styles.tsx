import styled, { css } from "styled-components"
import clear from "@/assets/imgs/clear.png"
import { pxTovw } from "@/utils"

export const DeleteIcon = styled.img.attrs({
  src: clear,
  className: "icon-delete"
})`
  width: 20px;
  cursor: pointer;
  @media only screen and (min-width: 750px) {
    width: ${pxTovw(30, 1280)};
  }
`

export const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  // padding-right: 46px;
  line-height: 100%;
  border: none;
  outline: none;
  box-sizing: border-box;
  @media only screen and (min-width: 750px) {
    height: 100%;
    font-size: ${pxTovw(24, 1280)};
    // padding-right: ${pxTovw(32, 1280)};
  }
  input {
    width: 100%;
    // text-indent: 0.5em;
    background: transparent;
    // caret-color: transparent;
    @media only screen and (min-width: 750px) {
      text-indent: 0;
    }
  }
`

export const DownOutLineWrapper = styled.div<{ hidden: boolean; disabled: boolean }>`
  // display: ${props => (props.hidden ? "none" : "block")};
  position: absolute;
  right: 0;
  top: 50%;
  text-align: left;
  transform: translate(0, -50%);
  overflow: hidden;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  text-indent: 0 !important;
  @media only screen and (min-width: 750px) {
    width: ${pxTovw(32, 1280)};
    height: ${pxTovw(32, 1280)};
    text-indent: 0;
    svg {
      width: ${pxTovw(32, 1280)};
      height: ${pxTovw(32, 1280)};
    }
  }
  @media only screen and (max-width: 749px) {
    width: 46px;
    height: 46px;
    text-indent: 0;
    svg {
      width: 46px;
      height: 46px;
    }
  }
`

export const MultipleSelectWrapper = styled(SelectWrapper)`
  height: auto;
`
export const MultipleWrapper = styled.div`
  width: 100%;
`
export const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  padding: 5px 0;
  padding-bottom: 0;
  @media only screen and (min-width: 750px) {
    padding: ${pxTovw(5, 1280)} 0;
    padding-bottom: 0;
  }
`
export const InputWrapper = styled.div<{ visible?: boolean }>`
  display: inline-block;
  position: relative;
  width: max-content;
  min-width: 1px;
  height: 38px;
  line-height: 38px;
  margin: 5px 0;
  margin-right: 10px;
  margin-top: 0;
  color: transparent;
  ${props =>
    !props.visible &&
    css`
      // min-width: 0;
      margin: 0;
    `}
  input {
    width: 100%;
  }
  @media only screen and (min-width: 750px) {
    height: ${pxTovw(38, 1280)};
    margin: ${pxTovw(5, 1280)} 0;
    margin-right: ${pxTovw(10, 1280)};
    margin-top: 0;
    line-height: ${pxTovw(38, 1280)};
    ${props =>
      !props.visible &&
      css`
        min-width: 0;
        margin: 0;
      `}
  }
`
export const InputBox = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`

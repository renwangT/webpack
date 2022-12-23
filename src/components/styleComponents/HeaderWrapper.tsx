import styled from "styled-components"
import { pxTovw } from "@/utils"

export const HeaderWrapper = styled.div`
  position: fixed;
  top: 100px;
  width: 100%;
  padding: 33px;
  background: var(--igt-color-deep-bg);
  box-sizing: border-box;
  box-shadow: 0px 0px 11px 0px rgba(6, 3, 3, 0.42);
  z-index: 990;
  @media only screen and (min-width: 750px) {
    top: ${pxTovw(70, 1280)};
    padding: ${pxTovw(13, 1280)} ${pxTovw(48, 1280)};
    display: flex;
    justify-content: space-between;
    box-shadow: 0px 0px ${pxTovw(13, 1280)} 0px rgba(6, 3, 3, 0.3);
    // & > div:first-child {
    //   width: 40%;
    // }
    // & > div:last-child {
    //   width: 60%;
    // }
  }
`

export default HeaderWrapper

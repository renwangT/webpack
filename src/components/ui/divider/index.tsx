import styled from "styled-components"
import { pxTovw } from "@/utils"

export const Divider = styled.div`
  height: 1px;
  margin: 40px 0;
  background: var(--igt-color-deep-bg);
  @media only screen and (min-width: 750px) {
    margin: ${pxTovw(30, 1280)} 0;
  }
`

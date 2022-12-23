import React from "react"
import styled from "styled-components"
import { pxTovw } from "@/utils"

interface Props {
  children: string | React.ReactNode
}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`
const Contnet = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, 0);
  font-size: 30px;
  color: var(--igt-color-txt);
  @media only screen and (min-width: 750px) {
    font-size: ${pxTovw(24, 1280)};
  }
`

export const NoData = ({ children }: Props) => {
  return (
    <Wrapper>
      <Contnet>{children}</Contnet>
    </Wrapper>
  )
}

export default NoData

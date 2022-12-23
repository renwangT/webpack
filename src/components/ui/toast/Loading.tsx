import React from "react"
import styled, { keyframes, css } from "styled-components"
import store from "@/store"
import { pxTovw } from "@/utils"

import loadingLight from "@/assets/imgs/loading-light.gif"
import loadingDark from "@/assets/imgs/loading-dark.gif"

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100vw;
  background: transparent;
  z-index: 999;
`
const IconBox = styled.div`
  position: relative;
  font-size: 0;
  img {
    width: 120px;
    height: 120px;
    @media only screen and (min-width: 750px) {
      width: ${pxTovw(120, 1280)};
      height: ${pxTovw(120, 1280)};
    }
  }
  &:after {
    content: "";
    position: absolute;
    width: 95%;
    height: 95%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: transparent;
    border-radius: 50%;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1), 0 2px 2px rgba(0, 0, 0, 0.1),
      0 3px 4px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1), 0 5px 8px rgba(0, 0, 0, 0.1),
      0 6px 10px rgba(0, 0, 0, 0.1), 0 8px 12px rgba(0, 0, 0, 0.1), 0 10px 14px rgba(0, 0, 0, 0.1),
      0 12px 16px rgba(0, 0, 0, 0.1), 0 14px 18px rgba(0, 0, 0, 0.1), 0 16px 20px rgba(0, 0, 0, 0.1),
      0 18px 22px rgba(0, 0, 0, 0.1), 0 20px 24px rgba(0, 0, 0, 0.1);
  }
`
const Text = styled.div`
  position: relative;
  margin-top: 30px;
  font-weight: bold;
  color: var(--igt-color-loading);
  @media only screen and (min-width: 750px) {
    margin-top: ${pxTovw(30, 1280)};
    font-size: ${pxTovw(30, 1280)};
  }
`
const DotBox = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  bottom: 0;
  transform: translate(100%, 0);
  @media only screen and (min-width: 750px) {
    bottom: ${pxTovw(5, 1280)};
  }
`
const fade = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`
const fade2 = keyframes`
0% {
  opacity: 0;
}
33% {
  opacity: 1;
}
100% {
  opacity: 0;
}
`
const fade3 = keyframes`
0% {
  opacity: 0;
}
66% {
  opacity: 1;
}
99% {
  opacity: 0;
}
100% {
  opacity: 0;
}
`
const Dot = styled.div<{ delay: number }>`
  width: 2px;
  height: 2px;
  background: var(--igt-color-loading);
  border-radius: 50%;
  opacity: 0;
  @media only screen and (min-width: 750px) {
    width: ${pxTovw(10, 1280)};
    height: ${pxTovw(10, 1280)};
    margin: 0 ${pxTovw(5, 1280)};
  }
  ${props =>
    props.delay &&
    css`
      // animation: ${fade} 0.2s ${props.delay}s none infinite;
    `}

  &:nth-child(1) {
    opacity: 1;
    animation: ${fade} 1s ease-out infinite;
  }
  &:nth-child(2) {
    animation: ${fade2} 1s ease-out infinite;
  }
  &:nth-child(3) {
    animation: ${fade3} 1s ease-out infinite;
  }
`
export class Loading extends React.Component {
  render() {
    const { theme } = store.mode
    return (
      <LoadingWrapper>
        <IconBox>
          <img src={theme === "light" ? loadingLight : loadingDark} />
        </IconBox>
        <Text>
          Loading
          <DotBox>
            <Dot delay={0.5}></Dot>
            <Dot delay={1}></Dot>
            <Dot delay={1.5}></Dot>
          </DotBox>
        </Text>
      </LoadingWrapper>
    )
  }
}

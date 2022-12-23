import React from "react"
import styled, { css } from "styled-components"
import { pxTovw } from "@/utils"

interface Props {
  current: number
  children?: JSX.Element[] | JSX.Element
}
interface StepProps {
  title: React.ReactNode
  icon: React.ReactNode
  current?: boolean
  pass?: boolean
}
const StepsdWrapper = styled.div<{ current: number }>`
  position: relative;
  height: 126px;
  width: 100%;
  background: var(--igt-color-steps-bg);
  box-shadow: 0px 0px 11px 0px rgba(6, 3, 3, 0.42);
  @media only screen and (min-width: 750px) {
    height: ${pxTovw(72, 1280)};
    box-shadow: 0px 0px ${pxTovw(10, 1280)} 0px rgba(6, 3, 3, 0.3);
  }
`
const StepBox = styled.div`
  position: absolute;
  bottom: -15px;
  width: 100%;
  box-sizing: border-box;
  padding: 0 67px;
  display: flex;
  justify-content: space-between;
  @media only screen and (min-width: 750px) {
    bottom: -${pxTovw(11, 1280)};
    padding: 0 ${pxTovw(338, 1280)};
  }
`
const Title = styled.div`
  position: absolute;
  top: -86px;
  left: -25px;
  width: max-content;
  color: var(--igt-color-primary);
  font-weight: bold;
  font-size: 33px;
  @media only screen and (min-width: 750px) {
    font-size: ${pxTovw(18, 1280)};
    top: -${pxTovw(48, 1280)};
    left: -${pxTovw(6, 1280)};
    right: 0;
    margin: 0 auto;
    transform: translate(calc(-50% + ${pxTovw(10, 1280)}), 0);
  }
`
const StepItem = styled.div<{ pass: boolean }>`
  position: relative;
  height: 30px;
  width: 30px;
  box-sizing: border-box;
  background: var(--igt-color-steps-bg);
  border: 6px solid #d9d9d9;
  border-radius: 50%;
  text-align: center;
  @media only screen and (min-width: 750px) {
    width: ${pxTovw(22, 1280)};
    height: ${pxTovw(22, 1280)};
    border-width: ${pxTovw(6, 1280)};
  }
  @media only screen and (max-width: 749px) {
    &:nth-child(2) {
      ${Title} {
        left: -6px;
        transform: translate(calc(-50% + 15px), 0);
      }
    }
    &:last-child {
      ${Title} {
        left: -16px;
      }
    }
  }
  ${props =>
    props.pass &&
    css`
      border-color: #355ede;
      background: #355ede;
    `}
`

const Icon = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  transform: translate(-25px, -26px);
  img {
    width: 69px;
    height: 69px;
  }
  @media only screen and (min-width: 750px) {
    transform: translate(-${pxTovw(19, 1280)}, -${pxTovw(19, 1280)});
    img {
      width: ${pxTovw(48, 1280)};
      height: ${pxTovw(48, 1280)};
    }
  }
`
export const Step = (props: StepProps) => {
  const { title, icon, current, pass } = props
  return (
    <StepItem pass={!!pass}>
      {current && (
        <>
          <Title>{title}</Title>
          <Icon>{icon}</Icon>
        </>
      )}
    </StepItem>
  )
}

export class Steps extends React.PureComponent<Props> {
  static Step: typeof Step

  render() {
    const { current, children } = this.props
    if (!children) return null
    return (
      <StepsdWrapper current={current}>
        <StepBox>
          {Array.isArray(children)
            ? children.map((child, index) => {
                const { props } = child
                return React.cloneElement(child, {
                  ...props,
                  key: index,
                  pass: current > index + 1,
                  current: current === index + 1
                })
                // <Step key={index} {...props} pass={current > index + 1} current={current === index + 1} />
              })
            : // <Step {...children.props} pass={current > 1} current={current === 1} />
              React.cloneElement(children, {
                ...children.props,
                pass: current > 1,
                current: current === 1
              })}
        </StepBox>
      </StepsdWrapper>
    )
  }
}
Steps.Step = Step
export default Steps

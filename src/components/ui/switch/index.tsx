import { useState, useEffect, useMemo, forwardRef, ForwardedRef } from "react"
import styled, { css } from "styled-components"

import { pxTovw } from "@/utils"

interface IEvent {
  target: {
    value: boolean
  }
}
interface Args {
  onChange?: (e: IEvent) => void
  value?: boolean
  disabled?: boolean
}
interface DomProps {
  switch: "on" | "off"
  disabled?: boolean
}
const SwitchWrapper = styled.div<DomProps>`
  position: relative;
  width: 124px;
  height: 68px;
  box-sizing: border-box;
  padding: 12px;
  background: ${props => (props.switch === "on" ? "#355ede" : "#fff")};
  ${props =>
    props.disabled &&
    css`
      opacity: 0.4;
    `}
  border-radius: 34px;
  border: 1px solid #d2d2d2;
  ${({ theme }) =>
    theme.name === "dark" &&
    css`
      border: none;
    `}
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  @media only screen and (min-width: 750px) {
    width: ${pxTovw(79, 1280)};
    height: ${pxTovw(43, 1280)};
    padding: ${pxTovw(7, 1280)};
    border-radius: ${pxTovw(22, 1280)};
  }
`
const Layout = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`
const SwitchButton = styled.div<DomProps>`
  position: absolute;
  top: 50%;
  left: 0;
  ${props => css`
    transform: translate(${props.switch === "on" ? pxTovw("52px") : 0}, -50%);
  `}
  width: 40px;
  height: 40px;
  background: ${props => (props.switch === "on" ? "#fff" : "#355ede")};
  border-radius: 50%;
  transition: all 0.2s ease-in-out;
  @media only screen and (min-width: 750px) {
    width: ${pxTovw(27, 1280)};
    height: ${pxTovw(27, 1280)};
    ${props => css`
      transform: translate(${props.switch === "on" ? pxTovw(35, 1280) : 0}, -50%);
    `}
  }
`
export const Switch = forwardRef(function Component(args: Args, ref: ForwardedRef<HTMLDivElement>) {
  const { value, onChange, disabled = false } = args
  const [on, setON] = useState<boolean>(false)
  const handleSwitch = () => {
    if (disabled) return
    if (onChange) {
      onChange({ target: { value: !on } })
    } else {
      setON(!on)
    }
  }
  useEffect(() => {
    setON(value || false)
  }, [value])
  return useMemo(
    () => (
      <SwitchWrapper
        onClick={handleSwitch}
        disabled={disabled}
        switch={on ? "on" : "off"}
        ref={ref}
      >
        <Layout>
          <SwitchButton switch={on ? "on" : "off"} disabled={disabled} />
        </Layout>
      </SwitchWrapper>
    ),
    [on, disabled]
  )
})

export default Switch

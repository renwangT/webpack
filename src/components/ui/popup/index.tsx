import React, { useEffect, useState } from "react"
import ReactDom from "react-dom"
import styled, { css, keyframes } from "styled-components"
import PopupFormLayout from "./PopupFormLayout"

// import X from "@/assets/imgs/x.png"
// import Y from "@/assets/imgs/√.png"

interface IProps {
  width?: number | string
  visible: boolean
  title?: string
  defaultValue?: string | number | any[]
  position?: "top" | "middle" | "bottom" | "right"
  children?:
    | (({
        value,
        setValue
      }: {
        value: string | number | any[]
        setValue: (v: string | number) => void
      }) => JSX.Element)
    | JSX.Element
    | null
  onCancel?: () => void
  onConfirm?: (v?: string | number | any[]) => void | (() => Promise<void>)
  zIndex?: number
}

interface StyleProps {
  visible?: boolean
  position: "top" | "middle" | "bottom" | "right"
  width?: number | string
  zIndex?: number
  animatSwitch: boolean
}
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`
const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`
const PopupWrapper = styled.div<Omit<StyleProps, "position">>`
  display: ${props => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100vw;
  z-index: ${props => props.zIndex || 990};
  overflow: hidden;
  background: rgba(0, 0, 0, 0.6);
  animation-fill-mode: forwards;
  ${props =>
    props.animatSwitch
      ? css`
          animation: 0.3s ${fadeIn} ease-out;
        `
      : css`
          // animation-fill-mode: none;
          animation: 0.3s ${fadeOut} ease-out;
        `}
`

const fadeBottomIn = keyframes`
  0% {
    transform: translate(0, 500px);
  }
  100% {
    transform: translate(0, 0);
  }
`
const fadeBottomOut = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(0, 500px);
  }
`
const fadeTopIn = keyframes`
  0% {
    transform: translate(0, -500px);
  }
  100% {
    transform: translate(0, 0);
  }
`
const fadeTopOut = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(0, -500px);
  }
`
const fadeRightIn = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-60vw, 0);
  }
`
const fadeRightIn1280 = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-40vw, 0);
  }
`
const fadeRightOut = keyframes`
    0% {
      transform: translate(-60vw, 0);
    }
    100% {
      transform: translate(0, 0);
    }
`
const fadeRightOut1280 = keyframes`
  0% {
    transform: translate(-40vw, 0);
  }
  100% {
    transform: translate(0, 0);
  }
`
const ContentWrapper = styled.div<StyleProps>`
  position: absolute;
  transform: translate(0, 0);
  width: 100%;
  box-sizing: border-box;
  @media only screen and (min-width: 750px) {
  }
  ${props =>
    props.position === "top"
      ? css`
          top: 0;
        `
      : props.position === "bottom"
      ? css`
          bottom: 0;
        `
      : props.position === "right"
      ? css`
          width: 60vw;
          height: 100%;
          right: -60vw;
          transform: translate(-60vw, 0);
          @media only screen and (min-width: 750px) {
            width: 40vw;
            right: -40vw;
            transform: translate(-40vw, 0);
          }
        `
      : css`
          padding: 0 10px;
          top: 50%;
          border-radius: 10px;
          transform: translate(0, -50%);
          ${Content} {
            background: transparent;
          }
        `}
  overflow: hidden;
  ${props =>
    props.animatSwitch
      ? props.position === "bottom"
        ? css`
            animation: 0.3s ${fadeBottomIn} cubic-bezier(0.04, 0.64, 0.49, 1.04);
          `
        : props.position === "top"
        ? css`
            animation: 0.3s ${fadeTopIn} cubic-bezier(0.04, 0.64, 0.49, 1.04);
          `
        : props.position === "right"
        ? css`
            animation: 0.3s ${fadeRightIn};
            @media only screen and (min-width: 750px) {
              animation: 0.3s ${fadeRightIn1280};
            }
          `
        : ""
      : props.position === "bottom"
      ? css`
          animation: 0.3s ${fadeBottomOut} cubic-bezier(0.04, 0.64, 0.49, 1.04);
        `
      : props.position === "top"
      ? css`
          animation: 0.3s ${fadeTopOut} cubic-bezier(0.04, 0.64, 0.49, 1.04);
        `
      : props.position === "right"
      ? css`
          animation: 0.3s ${fadeRightOut};
          @media only screen and (min-width: 750px) {
            animation: 0.3s ${fadeRightOut1280};
          }
        `
      : ""};
  animation-fill-mode: forwards;
`
const Content = styled.div<Pick<StyleProps, "position"> & { maxHeight: number }>`
  border-radius: 35px;
  ${props =>
    props.position === "top"
      ? css`
          max-height: ${props.maxHeight}px;
          border-top-right-radius: 0;
          border-top-left-radius: 0;
          padding-bottom: 80px;
          overflow: hidden;
        `
      : props.position === "bottom"
      ? css`
          max-height: ${props.maxHeight}px;
          padding-top: 80px;
          border-bottom-right-radius: 0;
          border-bottom-left-radius: 0;
          overflow: hidden;
        `
      : props.position === "right"
      ? css`
          height: 100%;
          border-radius: 0;
        `
      : css`
          height: 100%;
          padding: 40px 0;
        `}
  background: var(--igt-color-bg);
`
type PopupType = {
  (p: IProps): React.ReactPortal
  FormLayout: (p: Parameters<typeof PopupFormLayout>[0]) => JSX.Element
}
export const Popup: PopupType = props => {
  const {
    onCancel,
    visible,
    onConfirm,
    children = null,
    position = "bottom",
    width,
    zIndex,
    defaultValue
  } = props
  // const [value, setValue] = useState<string | number | any[]>("")
  const [animatSwitch, setAnimatSwitch] = useState<boolean>(false)
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const [maxHeight, setMaxHeight] = useState<number>(0)

  const setValue = (v: string | number) => {
    if (Array.isArray(defaultValue)) {
      const index = defaultValue.indexOf(v)
      const newArr = [...defaultValue]
      if (index > -1) {
        newArr.splice(index, 1)
      } else {
        newArr.push(v)
      }
      onConfirm && onConfirm(newArr)
    } else {
      onConfirm && onConfirm(v)
    }
  }

  useEffect(() => {
    if (visible) {
      setShowPopup(true)
      setAnimatSwitch(true)
    } else {
      setAnimatSwitch(false)
      setTimeout(() => {
        setShowPopup(false)
      }, 300)
    }
  }, [visible])
  const onReSize = () => {
    setMaxHeight(window.innerHeight * 0.8)
  }
  useEffect(() => {
    onReSize()
    window.addEventListener("resize", onReSize)
    return () => {
      window.removeEventListener("resize", onReSize)
    }
  }, [])
  return ReactDom.createPortal(
    <PopupWrapper
      animatSwitch={animatSwitch}
      visible={showPopup}
      onClick={e => {
        e.stopPropagation()
        onCancel && onCancel()
      }}
      zIndex={zIndex}
      onTouchMove={e => {
        e.stopPropagation()
        e.preventDefault()
      }}
    >
      <ContentWrapper width={width} animatSwitch={animatSwitch} position={position}>
        {/* <Header>
          <Close onClick={onCancel}>
            <img src={X} />
          </Close>
          <Title>{title}</Title>
          <Confirm
            onClick={() => {
              onConfirm(value)
              onCancel()
            }}>
            <img src={Y} />
          </Confirm>
        </Header> */}
        <Content position={position} maxHeight={maxHeight} onClick={e => e.stopPropagation()}>
          {children
            ? typeof children === "function"
              ? children({ value: defaultValue || [], setValue })
              : React.cloneElement(children, { ...children.props, height: maxHeight })
            : null}
        </Content>
      </ContentWrapper>
    </PopupWrapper>,
    document.body
  )
}

Popup.FormLayout = PopupFormLayout

export default Popup

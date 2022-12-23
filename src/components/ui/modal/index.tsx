import { useState, useRef, useEffect } from "react"
import ReactDom from "react-dom"
import { useTranslation } from "react-i18next"
import styled, { keyframes, css } from "styled-components"
import Button from "../button"
import { pxTovw, debounce } from "@/utils"
import { Close } from "../../icons"

interface ModalProps {
  visible: boolean
  onCancel?: () => void
  children?: JSX.Element | null
  width?: number | string
  onOk?: () => Promise<any> | void
  footer?: JSX.Element
  title?: string
  maskClosable?: boolean
  zIndex?: number
}
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`
// const fadeOut = keyframes`
//   0% {
//     opacity: 1;
//   }
//   100% {
//     opacity: 0;
//   }
// `
const ModalWrapper = styled.div<{ zIndex: number; visible: boolean; animation: boolean }>`
  display: ${props => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  opacity: ${props => (props.animation ? 1 : 0)};
  background: rgba(0, 0, 0, 0.6);
  z-index: ${props => props.zIndex || 990};
  ${props =>
    props.animation &&
    css`
      animation: 0.2s ${fadeIn} ease-out;
    `}
`
const ModalContent = styled.div<{ width: number | string }>`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 95%;
  max-height: 80%;
  transform: translate(-50%, -50%);
  background: var(--igt-color-bg);
  border-radius: 10px;
  // padding-bottom: 60px;
  margin: 0 auto;
  @media only screen and (min-width: 750px) {
    border-radius: ${pxTovw(15, 1280)};
    width: ${props =>
      props.width
        ? typeof props.width === "number"
          ? pxTovw(props.width, 1280)
          : props.width
        : "100%"};
    // padding-bottom: ${pxTovw(50, 1280)};
  }
`
const Title = styled.div`
  position: relative;
  height: 80px;
  line-height: 80px;
  font-weight: bold;
  text-align: center;
  color: var(--igt-color-txt);
  font-size: 32px;
  border-bottom: 1px solid #d2d2d2;
  @media only screen and (min-width: 750px) {
    height: ${pxTovw(70, 1280)};
    font-size: ${pxTovw(30, 1280)};
    line-height: ${pxTovw(70, 1280)};
  }
`
const ModalTitle = styled.span`
  color: transparent;
`

const CloseBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
  font-size: 0;
  cursor: pointer;
  svg {
    width: 72px;
    height: 72px;
    fill: #8a8a8a;
  }
  &:hover {
    svg {
      fill: #548df6;
    }
  }
  &:active {
    svg: {
      fill: #528be2;
    }
  }
  @media only screen and (min-width: 750px) {
    right: ${pxTovw(5, 1280)};
    svg {
      width: ${pxTovw(50, 1280)};
      height: ${pxTovw(50, 1280)};
    }
  }
`
const Content = styled.div`
  height: calc(100% - 162px);
  width: 100%;
  box-sizing: border-box;
  padding: 20px 20px;
  overflow: auto;
  @media only screen and (min-width: 750px) {
    height: calc(100% - ${pxTovw(115, 1280)});
    padding: ${pxTovw(40, 1280)} ${pxTovw(20, 1280)};
  }
`
const ScrollBox = styled.div`
  // height: 100%;
  // overflow: auto;
`
const Footer = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  text-align: right;
  border-top: 1px solid #d2d2d2;

  button {
    width: 120px;
    height: 60px;
    margin-left: 10px;
  }
  @media only screen and (min-width: 750px) {
    padding: ${pxTovw(10, 1280)} ${pxTovw(20, 1280)};
    button {
      width: ${pxTovw(100, 1280)};
      height: ${pxTovw(50, 1280)};
      margin-left: ${pxTovw(10, 1280)};
    }
  }
`
export const Modal = (props: ModalProps) => {
  const {
    visible,
    onCancel,
    children = null,
    width = 500,
    onOk,
    footer,
    title,
    zIndex = 990,
    maskClosable = false
  } = props
  const { t } = useTranslation()
  const [disabledOkBtn, setDisabledOkBtn] = useState<boolean>(false)
  const [animation, setAnimat] = useState<boolean>(false)

  const TimerRef = useRef<NodeJS.Timeout>()
  const handleOk = () => {
    if (onOk && !disabledOkBtn) {
      setDisabledOkBtn(true)
      const returnOnOk = onOk()
      if (returnOnOk instanceof Promise) {
        returnOnOk
          .catch(error => console.error(error))
          .finally(() => {
            setDisabledOkBtn(false)
          })
      } else {
        TimerRef.current = debounce(() => setDisabledOkBtn(false), 500)()
      }
    }
  }
  useEffect(() => {
    return () => {
      if (TimerRef.current) clearTimeout(TimerRef.current)
    }
  }, [])
  useEffect(() => {
    setAnimat(visible)
  }, [visible])

  return ReactDom.createPortal(
    <ModalWrapper
      visible={visible}
      animation={animation}
      zIndex={zIndex}
      onClick={() => {
        maskClosable && onCancel && onCancel()
      }}
    >
      <ModalContent width={width}>
        <Title>
          {title ? <>{title}</> : <ModalTitle>title</ModalTitle>}
          <CloseBox onClick={onCancel}>
            <Close />
          </CloseBox>
        </Title>
        <Content>
          <ScrollBox>{children}</ScrollBox>
        </Content>
        {footer ? (
          <Footer>{footer}</Footer>
        ) : (
          (onOk || onCancel) && (
            <Footer>
              {onCancel && <Button onClick={onCancel}>{t("Close")}</Button>}
              {onOk && <Button onClick={handleOk}>{t("Save")}</Button>}
            </Footer>
          )
        )}
      </ModalContent>
    </ModalWrapper>,
    document.body
  )
}

export default Modal

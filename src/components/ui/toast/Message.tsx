import React, { useEffect, useRef, useState, startTransition } from "react"
import { useTranslation } from "react-i18next"
import styled, { css, keyframes } from "styled-components"
import { pxTovw } from "@/utils"
import store from "@/store"
import { Button } from "../button"

import success750 from "@/assets/imgs/success750.png"
import success1280 from "@/assets/imgs/success1280.png"
import warn750 from "@/assets/imgs/warn750.png"
import warn1280 from "@/assets/imgs/warn1280.png"
import error750 from "@/assets/imgs/error750.png"
import error1280 from "@/assets/imgs/error1280.png"

type NoticeType = "success" | "warning" | "error"

type SrcConfig = {
  src: any
  width: number
  height: number
}

const iconsConfig: {
  "750": Record<NoticeType, SrcConfig>
  "1280": Record<NoticeType, SrcConfig>
} = {
  750: {
    success: {
      src: success750,
      width: 63,
      height: 63
    },
    error: {
      src: error750,
      width: 63,
      height: 63
    },
    warning: {
      src: warn750,
      width: 63,
      height: 63
    }
  },
  1280: {
    success: {
      src: success1280,
      width: 54,
      height: 54
    },
    error: {
      src: error1280,
      width: 54,
      height: 54
    },
    warning: {
      src: warn1280,
      width: 54,
      height: 54
    }
  }
}
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 585px;
  // height: 267px;
  padding: 33px 0;
  transform: translate(-50%, -50%);
  background: #fff;
  color: #333;
  border-radius: 7px;
  @media only screen and (min-width: 750px) {
    width: ${pxTovw(500, 1280)};
    // height: ${pxTovw(230, 1280)};
    padding: ${pxTovw(30, 1280)} 0;
    border-radius: ${pxTovw(10, 1280)};
  }
`
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
const NoticeWrapper = styled.div<{ open: boolean; animat: boolean }>`
  display: ${props => (props.open ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100vw;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
  ${props =>
    props.animat
      ? css`
          animation: 0.2s ${fadeIn} ease-out;
        `
      : css`
          // animation-fill-mode: none;
          animation: 0.2s ${fadeOut} ease-out;
        `}
`
const Icon = styled.img<{ w: number; h: number }>`
  width: ${props => pxTovw(props.w)};
  height: ${props => pxTovw(props.h)};
  @media only screen and (min-width: 750px) {
    width: ${props => pxTovw(props.w, 1280)};
    height: ${props => pxTovw(props.h, 1280)};
  }
`
const Text = styled.div`
  width: 85%;
  padding-top: 27px;
  padding-bottom: 31px;
  color: #333;
  font-size: 28px;
  line-height: 30px;
  text-align: center;
  @media only screen and (min-width: 750px) {
    font-size: ${pxTovw(26, 1280)};
    padding-top: ${pxTovw(30, 1280)};
    padding-bottom: ${pxTovw(34, 1280)};
    line-height: ${pxTovw(30, 1280)};
  }
`
const ButtonWrapper = styled.div<{ len: number }>`
  width: 80%;
  display: flex;
  justify-content: ${props => (props.len === 2 ? "space-between" : "center")};
  margin: 0 auto;
`
const BackButton = styled(Button)`
  width: 175px;
  height: 58px;
  @media only screen and (min-width: 750px) {
    width: ${pxTovw(150, 1280)};
    height: ${pxTovw(50, 1280)};
  }
`
const ConfirmButton = styled(Button)`
  width: 175px;
  height: 58px;
  @media only screen and (min-width: 750px) {
    width: ${pxTovw(150, 1280)};
    height: ${pxTovw(50, 1280)};
  }
`

export interface MessageProps {
  content: string | React.ReactNode | null
  duration: number
  type: NoticeType
  onClose: (() => void) | (() => Promise<void>)
  onConfirm?: (() => Promise<void>) | (() => void)
  cancelText?: string
  okText?: string
}
export const Message = (props: MessageProps) => {
  const { t } = useTranslation()
  const { content, duration, type, onClose, onConfirm, cancelText, okText } = props
  // 开关控制：默认true,调用时会直接打开
  const { deviceAspectRatio } = store.deviceInfo
  const [open, setOpen] = useState(true)
  const [backroundAnimat, setBackroundAnimat] = useState(true)
  const timer = useRef<NodeJS.Timeout>()

  // 关闭消息提示
  const handleClose = () => {
    console.log("close")
    if (timer.current) clearTimeout(timer.current)
    setBackroundAnimat(false)
    startTransition(() => {
      setOpen(false)
      onClose()
    })
  }
  const handleConfirm = () => {
    if (onConfirm) {
      const result = onConfirm()
      if (result instanceof Promise) {
        result
          .catch(err => {
            console.error("confirm Ok", err)
          })
          .finally(() => {
            handleClose()
          })
      } else {
        handleClose()
      }
    }
  }
  const handleMask = () => {
    if (onConfirm) return
    handleClose()
  }
  useEffect(() => {
    if (duration !== 0) {
      timer.current = setTimeout(() => {
        handleClose()
      }, duration)
    }
    return () => {
      console.log("组件卸载")
      if (timer.current) clearTimeout(timer.current)
    }
  }, [duration])
  const iconData = iconsConfig[deviceAspectRatio >= 1 ? "1280" : "750"][type]
  return (
    <NoticeWrapper animat={backroundAnimat} open={open} onClick={handleMask}>
      <Content onClick={e => e.stopPropagation()}>
        <Icon src={iconData.src} w={iconData.width} h={iconData.height} />
        <Text>{content}</Text>
        <ButtonWrapper len={onConfirm ? 2 : 1}>
          <BackButton onClick={handleClose}>{cancelText || t("Close")}</BackButton>
          {onConfirm && <ConfirmButton onClick={handleConfirm}>{okText || t("Yes")}</ConfirmButton>}
        </ButtonWrapper>
      </Content>
    </NoticeWrapper>
  )
}

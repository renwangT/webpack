import React, { useEffect, cloneElement, useRef, useState } from "react"
import ReactDom from "react-dom"
import styled from "styled-components"
import store from "@/store"
import { pxTovw } from "@/utils"

export interface Action {
  text: string
  key: string
}
// ${props => {
//   if (props.type === "top") {
//     return css`
//       top: ${props.top};
//       left:${props.left};
//       transform: translate(-50%, -50%) rotate(45deg);
//     `
//   }
//   if (props.type === "top-start" || props.type === "top-end") {
//     return css`
//       top: ${props.top};
//       left: ${props.left};
//       transform: translate(-50%, -50%) rotate(45deg);
//     `
//   }

//   if (props.type === "bottom") {
//     return css`
//       top: ${props.top};
//       left: ${props.left};
//       transform: translate(-50%, -50%) rotate(45deg);
//     `
//   }
//   if (props.type === "bottom-start" || props.type === "bottom-end") {
//     return css`
//       top: ${props.top};
//       left: ${props.left};
//       transform: translate(-50%, -50%) rotate(45deg);
//     `
//   }

//   if (props.type === "left") {
//     return css`
//       left: ${props.left};
//       top: ${props.left};
//       transform: translate(-50%, -50%) rotate(45deg);
//     `
//   }
//   if (props.type === "left-start" || props.type === "left-end") {
//     return css`
//       left: ${props.left};
//       top: ${props.top};
//       transform: translate(-50%, -50%) rotate(45deg);
//     `
//   }
//   if (props.type === "right") {
//     return css`
//       left: ${props.left};
//       top: ${props.top};
//       transform: translate(-50%, -50%) rotate(45deg);
//     `
//   }
//   if (props.type === "right-start" || props.type === "right-end") {
//     return css`
//       left: ${props.left};
//       top: ${props.top};
//       transform: translate(-50%, -50%) rotate(45deg);
//     `
//   }
// }}
interface PopoverProps {
  children: JSX.Element
  actions: Action[]
  onAction(A: Action): void
  placement?:
    | "top"
    | "top-start"
    | "top-end"
    | "right"
    | "right-start"
    | "right-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end"
}

const PopoverWrapper = styled.div<{ left: number; top: number; visible: boolean }>`
  visibility: ${props => (props.visible ? "visible" : "hidden")};
  // display: ${props => (props.visible ? "block" : "none")};
  position: absolute;
  left: ${props => props.left + "px"};
  top: ${props => props.top + "px"};
  z-index: 990;
  transform: translate(0, 25px);
  @media only screen and (min-width: 750px) {
    transform: translate(0, ${pxTovw(10)});
  }
`
const ArrowIcon = () => (
  <svg viewBox="0 0 30 16" className="adm-popover-arrow-icon">
    <g>
      <path d="M0,0 L30,0 L18.07289,14.312538 C16.65863,16.009645 14.13637,16.238942 12.43926,14.824685 C12.25341,14.669808 12.08199,14.49839 11.92711,14.312538 L0,0 L0,0 Z"></path>
    </g>
  </svg>
)
const Arrow = styled.div<{ left: string; top: string }>`
  position: absolute;
  width: 20px;
  height: 20px;
  // background: #fff;

  left: ${props => props.left};
  top: ${props => props.top};
  // transform: translate(-50%, -50%);

  @media only screen and (min-width: 750px) {
    width: ${pxTovw(15)};
    height: ${pxTovw(15)};
  }
  svg {
    vertical-align: top;
    fill: #fff;
    transform: rotate(180deg);
  }
`
const Layout = styled.div`
  box-shadow: 0 0 30px 0 rgb(51 51 51 / 20%);
  border-radius: 12px;
  overflow: hidden;
  @media only screen and (min-width: 750px) {
    box-shadow: 0 0 ${pxTovw(80, 1280)} 0 rgb(51 51 51 / 20%);
    border-radius: ${pxTovw(8, 1280)};
  }
`
const ActionBox = styled.div``
const Content = styled.div`
  padding-left: 40px;
  background: #fff;
  @media only screen and (min-width: 750px) {
    padding-left: ${pxTovw(40, 1280)};
  }
`
const Text = styled.div`
  display: block;
  width: 140px;
  padding: 14px 20px 14px 0;
  border-bottom: 1px solid #eee;
  color: #333;
  font-size: 20px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  @media only screen and (min-width: 750px) {
    width: ${pxTovw(160, 1280)};
    font-size: ${pxTovw(25, 1280)};
    padding: ${pxTovw(20, 1280)} ${pxTovw(40, 1280)} ${pxTovw(20, 1280)} 0;
  }
`

export const Popover = (props: PopoverProps) => {
  const { clientWidth } = store.deviceInfo
  const [left, setLeft] = useState<number>(0)
  const [arrowLeft, setArrowLeft] = useState<string>("0px")
  const [arrowTop, setArrowTop] = useState<string>("0px")
  const [top, setTop] = useState<number>(0)
  const [visible, setVisible] = useState<boolean>(false)
  const btnRef = useRef<HTMLElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)
  const { children, actions, onAction, placement = "top" } = props

  const handleBtn = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    setVisible(!visible)
  }
  const handleClick = (item: Action) => {
    onAction(item)
  }
  const getPopoverPosition = (
    pos: PopoverProps["placement"],
    rect: DOMRect,
    rectPopover: DOMRect,
    rectArrow: DOMRect
  ): { left: number; top: number; arrowLeft: string; arrowTop: string } => {
    let l = 0
    let t = 0
    let aL: number | string = 0
    let aT: number | string = 0
    let move = 0
    if (rect.width < rectPopover.width) {
      move = rect.width > rectPopover.width / 2 ? rect.width / 2 : rect.width
    }
    console.log("move:", move)
    switch (pos) {
      case "top":
        t = rect.top - rect.height
        l = rect.left - rectPopover.width / 2 + rect.width / 2
        aL = "50%"
        aT = rectPopover.height
        break
      case "top-start":
        t = rect.top - rect.height
        l = rect.left - move / 2
        aT = rectPopover.height
        aL = "20%"
        break
      case "top-end":
        t = rect.top - rect.height
        l = rect.left + rect.width - rectPopover.width + rectArrow.width + move / 2
        aT = rectPopover.height
        aL = "75%"
        break
      case "bottom":
        t = rect.top + rect.height
        l = rect.left - rectPopover.width / 2 + rect.width / 2
        aL = "50%"
        aT = 0
        break
      case "bottom-start":
        t = rect.top + rect.height
        l = rect.left - move / 2
        aL = "20%"
        aT = 0
        break
      case "bottom-end":
        t = rect.top + rect.height
        l = rect.left + rect.width - rectPopover.width + move / 2
        aL = rectPopover.width - rectArrow.width - move / 2 - (rect.width - rectArrow.width) / 2
        aT = -(rectArrow.height - 1) / 2
        break
      case "left":
        t = rect.top - rectPopover.height / 2 + rect.height / 2
        l = rect.left - rectPopover.width - rectArrow.width
        aL = rectPopover.width
        aT = "50%"
        break
      case "left-start":
        t = rect.top
        l = rect.left - rectPopover.width
        aL = rectPopover.width
        aT = "75%"
        break
      case "left-end":
        t = rect.top
        l = rect.left - rectPopover.width
        aL = rectPopover.width
        aT = "20%"
        break
      case "right":
        t = rect.top - rectPopover.height / 2 + rect.height / 2
        l = rect.left + rect.width
        aL = rectPopover.width
        aT = "50%"
        break
      case "right-start":
        t = rect.top
        l = rect.left + rect.width
        aL = rectPopover.width
        aT = "75%"
        break
      case "right-end":
        t = rect.top
        l = rect.left + rect.width
        aL = rectPopover.width
        aT = "20%"
        break
      default:
    }

    return {
      left: l,
      top: t,
      arrowLeft: typeof aL === "number" ? aL + "px" : aL,
      arrowTop: typeof aT === "number" ? aT + "px" : aT
    }
  }
  useEffect(() => {
    if (btnRef.current && popoverRef.current && arrowRef.current) {
      const rect = btnRef.current.getBoundingClientRect()
      const rectPopover = popoverRef.current.getBoundingClientRect()
      const rectArrow = arrowRef.current.getBoundingClientRect()
      // let l = 0
      // if (rect.left + (rectPopover?.width || 0) > clientWidth) {
      //   l = clientWidth - (rectPopover?.width || 0) - (clientWidth - rect.right) / 2
      //   setArrowLeft(rect.left - l + rect.width / 2)
      // } else {
      //   l = rect.left
      //   setArrowLeft(rect.width / 2)
      // }
      const { left, top, arrowLeft, arrowTop } = getPopoverPosition(
        placement,
        rect,
        rectPopover,
        rectArrow
      )

      setLeft(left)
      setTop(top)
      setArrowLeft(arrowLeft)
      setArrowTop(arrowTop)
    }
  }, [clientWidth])

  useEffect(() => {
    const clickListener = () => {
      setVisible(false)
    }
    window.addEventListener("click", clickListener, false)
    return () => {
      window.removeEventListener("click", clickListener, false)
    }
  }, [])

  return (
    <>
      {cloneElement(children, { ref: btnRef, onClick: handleBtn })}
      {ReactDom.createPortal(
        <PopoverWrapper
          ref={popoverRef}
          visible={visible}
          left={left}
          top={top}
          onClick={e => e.stopPropagation()}
        >
          <Arrow left={arrowLeft} top={arrowTop} ref={arrowRef}>
            <ArrowIcon />
          </Arrow>
          <Layout>
            <ActionBox>
              {actions.map((item, key) => {
                return (
                  <Content onClick={() => handleClick(item)} key={item.key || key}>
                    <Text as="a">{item.text}</Text>
                  </Content>
                )
              })}
            </ActionBox>
          </Layout>
        </PopoverWrapper>,
        document.body
      )}
    </>
  )
}

export default Popover

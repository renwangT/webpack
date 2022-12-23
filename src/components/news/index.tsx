import { useEffect, useRef } from "react"

import styled from "styled-components"
import store from "@/store"
import { pxTovw } from "@/utils"

import news750 from "@/assets/imgs/news.png"
import news1280 from "@/assets/imgs/news2_1280.png"

const NewsWrapper = styled.div`
  display: flex;
  padding: 15px 32px;
  background: #ea6c10;
  border-radius: 14px;
  @media only screen and (min-width: 750px) {
    flex: 0 0 ${pxTovw(540, 1280)};
    padding: 0 ${pxTovw(24, 1280)} 0 0;
    background: transparent;
  }
`
const Img = styled.img`
  width: 40px;
  height: 32px;
  margin-right: 24px;
  margin-top: 5px;
  @media only screen and (min-width: 750px) {
    width: ${pxTovw(30, 1280)};
    height: ${pxTovw(24, 1280)};
    margin-right: ${pxTovw(16, 1280)};
    margin-top: ${pxTovw(3, 1280)};
  }
`
const Content = styled.p`
  font-weight: bold;
  font-size: 31px;
  color: #fff;
  line-height: 40px;
  word-break: break-all;
  word-wrap: break-word;
  @media only screen and (min-width: 750px) {
    color: #ea6c10;
    font-size: ${pxTovw(18, 1280)};
    line-height: ${pxTovw(25, 1280)};
  }
`
export const News = ({ content }: { content?: string }) => {
  const { deviceAspectRatio } = store.deviceInfo
  const msgContent = useRef<SpeechSynthesisUtterance | null>(
    "SpeechSynthesisUtterance" in window ? new window.SpeechSynthesisUtterance() : null
  )
  const handleMsg = () => {
    if (msgContent.current) {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.speak(msgContent.current)
      }
    } else {
      window.callNative.speak(content as string)
    }
  }

  useEffect(() => {
    if (msgContent.current && content) {
      msgContent.current.text = content
    }
  }, [content])

  return (
    <NewsWrapper onClick={handleMsg}>
      {content && <Img src={deviceAspectRatio >= 1 ? news1280 : news750} />}
      <Content>{content}</Content>
    </NewsWrapper>
  )
}

export default News

import React from "react"
import styled from "styled-components"
import { pxTovw, lessThanTenAddZero } from "@/utils"

import cardNumBg from "@/assets/imgs/cardNumbg.png"

const CardBox = styled.div`
  background: var(--igt-color-deep-bg);
  width: 100%;
  border-radius: 5px;
  padding: 0;
  color: var(--igt-color-txt);
  border-radius: 14px;
  border: 1px solid var(--igt-color-card-border);
  @media only screen and (min-width: 750px) {
    padding: ${pxTovw(16, 1280)} ${pxTovw(15, 1280)};
    border-radius: ${pxTovw(10, 1280)};
    border: none;
  }
`

const Content = styled.div`
  display: block;
  height: 100%;
  @media only screen and (min-width: 750px) {
    display: flex;
    align-items: center;
  }
`
const OrderNumBox = styled.div`
  display: none;
  width: 10%;
  height: 100%;
  @media only screen and (min-width: 750px) {
    display: block;
    width: 10%;
  }
`
const Num = styled.div`
  width: 50px;
  height: 100%;
  // line-height: 50px;
  border-radius: 50%;
  background: var(--igt-color-primary);
  text-align: center;
  color: #fff;
  font-weight: bold;
  font-size: 12px;
  background: url(${cardNumBg}) no-repeat;
  @media only screen and (min-width: 750px) {
    background-size: 100% auto;
    background-position: center;

    width: ${pxTovw(40, 1280)};
    height: ${pxTovw(52, 1280)};
    line-height: ${pxTovw(46, 1280)};
    font-size: ${pxTovw(22, 1280)};
  }
`
const CardItem = styled.div<{ width: string }>`
  // flex: ${props => `0 0 ${props.width}`}
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 20px 23px;
  border-bottom: 1px solid var(--igt-color-border);
  &:last-child {
    border: 0;
  }
  @media only screen and (min-width: 750px) {
    width: ${props => props.width};
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: ${pxTovw(0, 1280)} ${pxTovw(10, 1280)};
    border: none;
  }
`

const Title = styled.div`
  flex: 1;
  font-size: 33px;
  transform-origin: left bottom;
  transform: scale(1);
  @media only screen and (min-width: 750px) {
    // transform: scale(0.8);
    font-size: ${pxTovw(18, 1280)};
    padding: 0;
  }
  // @media only screen and (min-width: 960px) {
  //   transform: scale(0.9);
  // }
  // @media only screen and (min-width: 1280px) {
  //   transform: scale(1);
  // }
`

const Desc = styled.div<{ hasDesc: boolean }>`
  flex: 1;
  width: 100%;
  min-height: 20px;
  font-weight: bold;
  font-size: 33px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  @media only screen and (min-width: 750px) {
    min-height: ${pxTovw(17, 1280)};
    margin-top: ${pxTovw(10, 1280)};
    font-size: ${pxTovw(22, 1280)};
  }
  &:after {
    display: ${props => (props.hasDesc ? "none" : "block")};
    content: "DESC";
    color: transparent;
  }
`
const CntrWord = styled.span`
  color: var(--igt-color-primary);
  font-weight: lighter;
  font-size: 33px;
  @media only screen and (min-width: 750px) {
    display: inline;
    font-size: ${pxTovw(32, 1280)};
  }
`
const CntrNum = styled.span`
  color: var(--igt-color-primary);
  font-weight: bold;
  font-size: 28px;
  @media only screen and (min-width: 750px) {
    font-size: ${pxTovw(32, 1280)};
  }
`
interface CardProps<T> {
  columns: ColumnType<T>[]
  data: T
  rowIndex: number
  onClick?: (d?: T) => void
}

export function Card<T = any>(props: CardProps<T>) {
  const { columns, data, rowIndex, onClick } = props
  return (
    <CardBox
      onClick={() => {
        onClick && onClick(data)
      }}
    >
      <Content>
        <OrderNumBox>
          <Num>{lessThanTenAddZero(rowIndex)}</Num>
        </OrderNumBox>
        {columns.map((item, index) => {
          const { title, dataIndex, render, width } = item
          let desc: React.ReactNode | JSX.Element | string = data[dataIndex] as unknown as string

          if (render) {
            desc = render(data[dataIndex] as unknown as string, data, index)
          }

          if (dataIndex === "CONTAINERNO" && typeof desc === "string") {
            desc = (
              <>
                <CntrWord>{(desc as string).slice(0, 4)}</CntrWord>
                <CntrNum>{(desc as string).slice(4)}</CntrNum>
              </>
            )
          }

          return (
            <CardItem width={width} key={dataIndex as string}>
              <Title>{title}</Title>
              <Desc hasDesc={!!desc}>{desc}</Desc>
            </CardItem>
          )
        })}
      </Content>
    </CardBox>
  )
}

export default Card

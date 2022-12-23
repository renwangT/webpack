import { useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import styled, { css } from "styled-components"
import NoData from "../noData"
import { pxTovw } from "@/utils"

const TableWrapper = styled.div``

const Row = styled.div<{ actived?: boolean }>`
  ${props =>
    props.actived &&
    css`
      background: var(--igt-color-actived) !important;
    `}
`
const Cell = styled.div<{ width?: string; textAlign?: string }>`
  color: var(--igt-color-txt);
  ${props =>
    props.width &&
    css`
      width: ${props.width};
    `}
  text-align: ${props => props.textAlign || "left"};
  padding: 10px 20px;
  @media only screen and (min-width: 750px) {
    padding: ${pxTovw(5, 1280)} ${pxTovw(15, 1280)};
  }
`
const TableHeader = styled.div`
  width: 100%;
  // height: 70px;
  // line-height: 70px;
  font-size: 28px;
  border: none;
  overflow-y: overlay;
  ${Row} {
    background: ${({ theme }) =>
      theme.name === "light"
        ? "linear-gradient(to bottom, rgb(108, 108, 115), rgb(89, 90, 98))"
        : "linear-gradient(to bottom, #609FFF, #345DDE)"};
    ${Cell} {
      font-size: 24px;
      color: #fff;
      @media only screen and (min-width: 750px) {
        font-size: ${pxTovw(18, 1280)};
      }
    }
  }
  th {
    padding: 20px 20px;
  }
  @media only screen and (min-width: 750px) {
    th {
      padding: ${pxTovw(20, 1280)} ${pxTovw(15, 1280)};
    }
    // height: ${pxTovw(47, 1280)};
    // line-height: ${pxTovw(47, 1280)};
  }
`

const ScrollBox = styled.div<{ scroll: { x?: boolean; y?: number | boolean } }>`
  ${props =>
    props.scroll.y &&
    css`
      height: ${typeof props.scroll.y === "number" ? pxTovw(props.scroll.y, 750) : "auto"};
      overflow-y: overlay;
    `}
  @media only screen and (min-width: 750px) {
    ${props =>
      props.scroll.y &&
      css`
        height: ${typeof props.scroll.y === "number" ? pxTovw(props.scroll.y, 1280) : "auto"};
        overflow-y: overlay;
      `}
  }
`
const Tabled = styled.div`
  width: 100%;
  ${Row} {
    height: 100px;
    background: var(--igt-color-card-bg);
    ${Cell} {
      line-height: 100px;
      font-size: 24px;
    }
    &:nth-child(2n - 1) {
      background: ${({ theme }) =>
        theme.name === "light" ? "rgb(229, 239, 248)" : "var(--igt-color-card-even-bg)"};
    }
    @media only screen and (min-width: 750px) {
      height: ${pxTovw(70, 1280)};
      ${Cell} {
        line-height: ${pxTovw(70, 1280)};
        font-size: ${pxTovw(18, 1280)};
      }
    }
  }
`
type TableProps<T extends ColumnType<unknown>, D = T extends ColumnType<infer V> ? V : never> = {
  columns: T[]
  dataList: D[] | null | undefined
  onRowClick: (d: D) => void
  rowActived: (d: D) => boolean
  rowKey: keyof D
  scrollToIndex?: number
  scroll?: { x?: boolean; y?: number | boolean }
  hiddenTitle?: boolean
}
export function Table<T extends ColumnType<any>>(props: TableProps<T>) {
  const {
    columns,
    dataList,
    rowActived,
    onRowClick,
    rowKey,
    scrollToIndex = 0,
    scroll = { x: false, y: false },
    hiddenTitle = false
  } = props
  const { t } = useTranslation()
  const scrollBox = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const aBox = scrollBox.current
    if (aBox && dataList) {
      const scrollHeight = aBox.scrollHeight
      aBox.scrollTop = (scrollHeight / dataList.length) * scrollToIndex
      aBox.scrollTo({
        top: (scrollHeight / dataList.length) * scrollToIndex,
        behavior: "smooth"
      })
    }
  }, [scrollToIndex, dataList])
  return (
    <TableWrapper>
      {!hiddenTitle && (
        <TableHeader as="table">
          <thead>
            <Row as="tr">
              {columns.map(({ title, width, textAlign }, index) => (
                <Cell as="th" width={width} textAlign={textAlign} key={index}>
                  {title}
                </Cell>
              ))}
            </Row>
          </thead>
        </TableHeader>
      )}
      <ScrollBox ref={scrollBox} scroll={scroll}>
        {(dataList === null || dataList.length === 0) && <NoData>{t("NoData")}</NoData>}
        <Tabled as="table" className="my-table">
          <tbody>
            {dataList &&
              dataList.map((item, rowIndex) => {
                return (
                  <Row
                    as="tr"
                    key={item[rowKey]}
                    onClick={() => onRowClick(item)}
                    actived={rowActived(item)}
                  >
                    {columns.map(({ dataIndex, width, textAlign, render }, index) => (
                      <Cell as="td" width={width} textAlign={textAlign} key={index}>
                        {render ? render(item[dataIndex], item, rowIndex) : item[dataIndex]}
                      </Cell>
                    ))}
                  </Row>
                )
              })}
          </tbody>
        </Tabled>
      </ScrollBox>
    </TableWrapper>
  )
}

export default Table

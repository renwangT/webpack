import React, { useMemo } from "react"
import styled, { css } from "styled-components"
import { pxTovw } from "@/utils"

const PaginationWrapper = styled.div<{ align?: "left" | "right" }>`
  text-align: ${props => props.align || "left"};
  user-select: none;
`
const PaginationLayout = styled.div`
  display: inline-flex;
  align-items: center;
`
const RightArrowIcon = () => (
  <svg
    className="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="45682"
  >
    <path
      d="M731.733333 480l-384-341.333333c-17.066667-14.933333-44.8-14.933333-59.733333 4.266666-14.933333 17.066667-14.933333 44.8 4.266667 59.733334L640 512 292.266667 821.333333c-17.066667 14.933333-19.2 42.666667-4.266667 59.733334 8.533333 8.533333 19.2 14.933333 32 14.933333 10.666667 0 19.2-4.266667 27.733333-10.666667l384-341.333333c8.533333-8.533333 14.933333-19.2 14.933334-32s-4.266667-23.466667-14.933334-32z"
      p-id="45683"
    ></path>
  </svg>
)
const LeftArricon = () => (
  <svg
    className="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="46163"
  >
    <path
      d="M384 512L731.733333 202.666667c17.066667-14.933333 19.2-42.666667 4.266667-59.733334-14.933333-17.066667-42.666667-19.2-59.733333-4.266666l-384 341.333333c-10.666667 8.533333-14.933333 19.2-14.933334 32s4.266667 23.466667 14.933334 32l384 341.333333c8.533333 6.4 19.2 10.666667 27.733333 10.666667 12.8 0 23.466667-4.266667 32-14.933333 14.933333-17.066667 14.933333-44.8-4.266667-59.733334L384 512z"
      p-id="46164"
    ></path>
  </svg>
)
const Left = styled.div<{ disabled: boolean }>`
  text-align: center;
  svg {
    fill: ${props => (props.disabled ? "#d9d9d9" : "#8a8a8a")};
    vertical-align: middle;
    cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
    ${props =>
      !props.disabled &&
      css`
        &:hover {
          fill: #1890ff;
        }
      `}
  }
  @media only screen and (min-width: 750px) {
    padding-right: ${pxTovw(15, 1280)};
    svg {
      width: ${pxTovw(40, 1280)};
      height: ${pxTovw(40, 1280)};
    }
  }
`

const Right = styled(Left)`
  @media only screen and (min-width: 750px) {
    padding-right: 0;
    padding-left: ${pxTovw(15, 1280)};
  }
`

const PageWrapper = styled.div<{ showPage: number }>`
  display: grid;
  grid-template-columns: ${props => `repeat(${props.showPage}, 1fr)`};
  grid-gap: ${pxTovw(10, 1280)};
`
const Page = styled.div<{ actived: boolean }>`
  @media only screen and (min-width: 750px) {
    width: ${pxTovw(50, 1280)};
    height: ${pxTovw(50, 1280)};
    line-height: ${pxTovw(50, 1280)};
    font-size: ${pxTovw(23, 1280)};
    color: ${props => (props.actived ? "#1890ff" : "var(--igt-color-txt)")};
    text-align: center;
    box-sizing: border-box;
    border-radius: ${pxTovw(5, 1280)};
    border: 1px solid #d9d9d9;
    border-color: ${props => (props.actived ? "#1890ff" : "#d9d9d9")};
    cursor: pointer;
    &:hover {
      color: #1890ff;
      border-color: #1890ff;
    }
  }
`
const SonPage = styled(Page)``
interface PaginationProps {
  total: number
  align?: "left" | "right"
  current: number
  currentSonPage?: number
  onSonPage?: (parentPage: number, sonPage: number) => void
  onChange: (page: number) => void
  sonPageList?: Array<Array<any>>
}
export const Pagination = ({
  total,
  align,
  current,
  currentSonPage = 0,
  onChange,
  onSonPage,
  sonPageList = []
}: PaginationProps) => {
  const handleSonPageChange = (parentPage: number, sonPage: number) => {
    onSonPage && onSonPage(parentPage, sonPage)
  }
  const handlePage = (page: number) => {
    onChange(page)
  }
  const handleNextPage = () => {
    if (current === total) return
    onChange(current + 1)
  }
  const handlePrePage = () => {
    if (current === 1) return
    onChange(current - 1)
  }
  const count = useMemo(() => {
    let len = total
    sonPageList.forEach((item = []) => {
      len += item.length
    })
    return len
  }, [total, sonPageList])
  return useMemo(
    () => (
      <PaginationWrapper align={align}>
        <PaginationLayout>
          <Left onClick={handlePrePage} disabled={current === 1}>
            <LeftArricon />
          </Left>
          <PageWrapper showPage={count}>
            {Array(total)
              .fill(0)
              .map((_t, i) => (
                <React.Fragment key={i}>
                  <Page
                    onClick={() => handlePage(i + 1)}
                    actived={current === i + 1 && currentSonPage === 0}
                  >
                    {i + 1}
                  </Page>

                  {(sonPageList[i] || []).map((_son, sonIndex) => {
                    return (
                      <SonPage
                        onClick={() => handleSonPageChange(i + 1, sonIndex + 2)}
                        key={sonIndex}
                        actived={currentSonPage === sonIndex + 2}
                      >
                        {i + 1}.{sonIndex + 2}
                      </SonPage>
                    )
                  })}
                </React.Fragment>
              ))}
          </PageWrapper>
          <Right onClick={handleNextPage} disabled={current === total}>
            <RightArrowIcon />
          </Right>
        </PaginationLayout>
      </PaginationWrapper>
    ),
    [current, total, sonPageList, count, currentSonPage]
  )
}

export default Pagination

import styled from "styled-components"
import { useTranslation } from "react-i18next"
import { NoData } from "../ui"

import { pxTovw } from "@/utils"

interface NotifyListProps {
  notifys: NotifyType[]
}

const NotifyListWrapper = styled.div`
  height: 100%;
  background: var(--igt-color-bg);
  font-size: 30px;
  overflow: hidden;
  @media only screen and (min-width: 750px) {
    font-size: ${pxTovw(30, 1280)};
  }
`
const Header = styled.div`
  height: 100px;
  line-height: 100px;
  background: var(--igt-color-head-bg);
  text-align: center;
  font-size: 33px;
  color: #fff;
  font-weight: bold;
  @media only screen and (min-width: 750px) {
    height: ${pxTovw(70, 1280)};
    line-height: ${pxTovw(70, 1280)};
    font-size: ${pxTovw(30, 1280)};
  }
`
const Content = styled.div`
  height: calc(100% - 100px);
  padding: 20px 0;
  overflow-y: auto;
  @media only screen and (min-width: 750px) {
    height: calc(100% - ${pxTovw(70, 1280)});
    padding: ${pxTovw(20, 1280)} 0;
  }
`

const Item = styled.div`
  position: relative;
  // display: flex;
  // justify-content: space-between;
  padding: 20px 10px;
  background: var(--igt-color-card-bg);

  @media only screen and (min-width: 750px) {
    padding: ${pxTovw(20, 1280)} ${pxTovw(10, 1280)};
  }

  &:after {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: var(--igt-color-border);
    clear: both;
    @media only screen and (min-width: 750px) {
      left: ${pxTovw(10, 1280)};
      width: calc(100% - ${pxTovw(20, 1280)});
    }
  }
  &:last-child:after {
    display: none;
  }
`
const Left = styled.p`
  font-size: 23px;
  line-height: 28px;
  word-break: break-all;
  word-wrap: break-word;
  @media only screen and (min-width: 750px) {
    font-size: ${pxTovw(23, 1280)};
    line-height: ${pxTovw(28, 1280)};
  }
`
const Right = styled.div`
  font-size: 18px;
  text-align: right;
  margin-top: 10px;
  transform-origin: right bottom;
  transform: scale(0.8);
  color: ${props => (props.theme.name === "dark" ? "#fff" : "#00000099")};
  @media only screen and (min-width: 750px) {
    font-size: ${pxTovw(20, 1280)};
    margin-top: ${pxTovw(10, 1280)};
  }
`
export const NotifyList = (props: NotifyListProps) => {
  const { notifys } = props
  const { t } = useTranslation()
  return (
    <NotifyListWrapper>
      <Header>{t("Notifiy.History")}</Header>
      <Content>
        {notifys.length > 0 ? (
          notifys.map((item, index) => {
            return (
              <Item key={index}>
                <Left>{item.notify}</Left>
                <Right>{item.date}</Right>
              </Item>
            )
          })
        ) : (
          <NoData>{t("Notifiy.HasNotHistory")}</NoData>
        )}
      </Content>
    </NotifyListWrapper>
  )
}

export default NotifyList

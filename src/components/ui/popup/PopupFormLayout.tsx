import { useTranslation } from "react-i18next"
import styled from "styled-components"
import Button from "../button"

import { pxTovw } from "@/utils"

const PopupFormWrapper = styled.div<{ height: number }>`
  display: flex;
  flex-direction: column;
  max-height: ${props => `calc(${props.height}px - ${pxTovw(80)})`};
  position: relative;
  padding: 58px 0;
  padding-top: 0;
  padding-bottom: 140px;
`
const FormScrollWrapper = styled.div`
  position: relative;
  padding: 0 34px;
  overflow: auto;
`
const Content = styled.div``
const SaveButton = styled(Button)`
  position: absolute;
  bottom: 20px;
  left: 34px;
  width: calc(100vw - 68px);
  margin: 0 auto;
`
interface IProps {
  children: React.ReactNode
  height?: number
  onOk?: (() => void) | (() => Promise<void>)
}
export const PopupFormLayout = ({ children, onOk, height = 0 }: IProps) => {
  const { t } = useTranslation()
  return (
    <PopupFormWrapper height={height}>
      <FormScrollWrapper>
        <Content>{children}</Content>
      </FormScrollWrapper>
      {onOk && <SaveButton>{t("DamCtnPage.Save")}</SaveButton>}
    </PopupFormWrapper>
  )
}

export default PopupFormLayout

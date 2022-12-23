import styled from "styled-components"
import { pxTovw } from "@/utils"

const FormSwitchLayout = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 83px;
  @media only screen and (min-width: 750px) {
    height: ${pxTovw(52, 1280)};
  }
`

interface IProps {
  children: JSX.Element | null
}
export const FormSwitch = ({ children }: IProps) => {
  return <FormSwitchLayout>{children}</FormSwitchLayout>
}

export default FormSwitch

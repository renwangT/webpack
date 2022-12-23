import styled from "styled-components"
import { Empty } from "./empty"
import { Default } from "./default"
import { Disconnetcted } from "./disconnected"
import { Busy } from "./busy"
import Button from "../ui/button"
import { pxTovw } from "@/utils"

type Props = {
  status: "empty" | "default" | "disconnected" | "busy"
}

const ErrorBox = styled.div`
  font-size: 32px;
  text-align: center;
  & > div,
  button {
    margin-top: 15px;
  }
  @media only screen and (min-width: 750px) {
    font-size: ${pxTovw(20, 1280)};
    & > div,
    button {
      margin-top: ${pxTovw(20, 1280)};
    }
  }
`
const BackBtn = styled(Button)`
  padding: 0 30px;

  @media only screen and (max-width: 750px) {
    height: 60px;
    line-height: 60px;
  }
  @media only screen and (min-width: 750px) {
    padding: 0 ${pxTovw(20, 1280)};
  }
`

const ErrorBlock = (props: Props) => {
  const handleBack = () => {
    window.history.back()
  }
  return (
    <ErrorBox>
      {props.status === "empty" ? (
        <Empty />
      ) : props.status === "disconnected" ? (
        <Disconnetcted />
      ) : props.status === "busy" ? (
        <Busy />
      ) : (
        <Default />
      )}
      <BackBtn onClick={handleBack}>返回上一页</BackBtn>
    </ErrorBox>
  )
}
export default ErrorBlock

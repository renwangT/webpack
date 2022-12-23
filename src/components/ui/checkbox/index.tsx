import { pxTovw } from "@/utils"
import React from "react"
import styled from "styled-components"

interface Props {
  checked: boolean
  value: string | number
  onChange: (v: string | number) => void
  children?: React.ReactNode
}

const CheckBoxWrapper = styled.div<{ checked: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
`
const CheckOutLine = () => (
  <svg
    className="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="4306"
    width={pxTovw(32)}
    height={pxTovw(32)}
  >
    <path
      d="M783.68 214.08a64 64 0 0 1 101.568 77.44l-4.928 6.4-416.384 480a64 64 0 0 1-87.68 8.576l-5.824-5.12-223.616-222.784a64 64 0 0 1 84.288-96l6.08 5.312 174.912 174.272 371.584-428.16z"
      p-id="4307"
      fill="#355EDE"
    ></path>
  </svg>
)
const Checked = styled.div<{ checked: boolean }>`
  position: relative;
  width: 30px;
  height: 30px;
  border: 1px solid #a0a0a0;
  border-radius: 3px;
  border-color: ${props => (props.checked ? "#355EDE" : "#a0a0a0")};
  background: #fff;
  .icon {
    display: ${props => (props.checked ? "block" : "none")};
    // position: absolute;
    // width: 30px;
    // height: 15px;
    // border: 1px solid #a0a0a0;
    // border-top: 0;
    // border-right: 0;
    // transform: rotate(294deg);
  }
  // &:after {
  //   content: "";
  //   display: ${props => (props.checked ? "block" : "none")};
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   transform: translate(-50%, -50%);
  //   width: 20px;
  //   height: 20px;
  //   background:
  //   border: 1px solid #a0a0a0;
  // }
`

const Code = styled.div`
  font-weight: bold;
  font-size: 28px;
  margin: 0 0 0 31px;
`
export const Checkbox: React.FC<Props> = props => {
  const { value, checked, onChange, children } = props
  console.log(value, checked)
  return (
    <CheckBoxWrapper onClick={() => onChange(value)} checked={checked}>
      <Checked checked={checked}>
        <CheckOutLine />
      </Checked>
      {children && <Code>{children}</Code>}
    </CheckBoxWrapper>
  )
}

export default Checkbox

import styled from "styled-components"

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 90px;
  box-sizing: border-box;
  padding: 0 28px;
  margin: 0 auto;
  margin-top: 65px;
  margin-bottom: 26px;
  background: #ffffff;
  border: 2px solid #d2d2d2;
  border-radius: 45px;
  overflow: hidden;
  input {
    display: block;
    width: 100%;
    line-height: 100%;
    font-size: 33px;
    color: #000;
    font-weight: 500;
    outline: none;
    border: none;
  }
`
export default InputWrapper

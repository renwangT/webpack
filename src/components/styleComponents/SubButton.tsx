import styled from "styled-components"

interface IProps {
  width?: string
}

export const SubButton = styled.input.attrs<IProps>({
  type: "submit"
})`
  cursor: pointer;
  display: block;
  width: ${props => (props.width ? props.width : "100%")};
  height: 90px;
  margin: 0 auto;
  background: linear-gradient(to bottom, #4a4b54, #22232f);
  box-shadow: 0px 3px 3px 0px rgba(4, 4, 4, 0.15), 0px 0px 51px 0px rgba(208, 208, 208, 0.46);
  border-radius: 45px;
  font-size: 38px;
  font-weight: bold;
  color: #ffffff;
  outline: none;
  border: none;
`
export default SubButton

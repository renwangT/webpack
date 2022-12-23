import styled from "styled-components"

export const Network = styled.span<{ online?: boolean }>`
  color: ${props => (props.online ? "" : "var(--igt-color-error)")};
`

export default Network

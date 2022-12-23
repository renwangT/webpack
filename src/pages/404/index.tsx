import ErrorBlock from "@/components/errorBlock"
import styled from "styled-components"

const Wrapper = styled.div`
  height: 100%;
  position: relative;
`
const LayoutContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -70%);
`
const NoFound = () => {
  return (
    <Wrapper>
      <LayoutContainer>
        <ErrorBlock status="empty" />
      </LayoutContainer>
    </Wrapper>
  )
}

export default NoFound

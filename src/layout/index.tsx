import { Outlet } from "react-router"
import styled from "styled-components"

const AppContainer = styled.div`
  height: 100%;
  background-color: var(--igt-color-bg);
`
const Container = styled.div`
  height: 100%;
  background: ${props => props.theme.primaryBackground};
`

const Layout = () => {
 
  return (
    <AppContainer>
      <Container>
        <Outlet />
      </Container>
    </AppContainer>
  )
}

export default Layout

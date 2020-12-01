import styled from "styled-components"

import { Button, ButtonGroup } from "src/components/Button"
import { COLORS } from "src/constants"
import LogoIcon from "src/assets/logo.svg"

const Container = styled.div``
const Header = styled.header`
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 3px 3px ${COLORS.shadow};
  padding: 0 24px;
`
const Actions = styled.div`
  display: flex;

  & > button:first-child {
    margin-right: 48px;
  }
`
const Main = styled.main`
  padding: 24px 0;
  min-height: calc(100vh - 80px);
`

const MainLayout: React.FC = ({ children }) => {
  return (
    <Container>
      <Header>
        <LogoIcon />
        <Actions>
          <Button $variant="green">Publier une annonce</Button>
          <ButtonGroup>
            <Button $variant="white">Devenir vendeur</Button>
            <Button $variant="white">Se connecter</Button>
          </ButtonGroup>
        </Actions>
      </Header>
      <Main>{children}</Main>
    </Container>
  )
}

export default MainLayout

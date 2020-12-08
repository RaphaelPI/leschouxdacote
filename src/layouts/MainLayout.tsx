import styled from "styled-components"

import { Button, ButtonGroup } from "src/components/Button"
import { COLORS, LAYOUT } from "src/constants"
import LogoIcon from "src/assets/logo.svg"
import Link from "src/components/Link"
import SEO from "src/components/Seo"

const Container = styled.div``
const Header = styled.header`
  position: fixed;
  width: 100%;
  padding: 0 24px;
  z-index: 1;
  background-color: ${COLORS.white};
  height: ${LAYOUT.headerHeight}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 3px 3px ${COLORS.shadow.light};
`
const Actions = styled.div`
  display: flex;

  & > button:first-child {
    margin-right: 48px;
  }
`
const Main = styled.main`
  min-height: calc(100vh - ${LAYOUT.headerHeight}px);
  padding-top: 80px;
`

interface Props {
  description?: string
  title?: string
}

const MainLayout: React.FC<Props> = ({ description, title, children }) => {
  return (
    <>
      <SEO description={description} title={title} />
      <Container>
        <Header>
          <Link href="/">
            <LogoIcon />
          </Link>
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
    </>
  )
}

export default MainLayout

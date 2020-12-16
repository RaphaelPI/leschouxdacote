import { FC } from "react"
import styled from "styled-components"
import { useRouter } from "next/router"

import { Button, ButtonGroup } from "src/components/Button"
import { COLORS, LAYOUT } from "src/constants"
import Link from "src/components/Link"
import SEO from "src/components/Seo"
import SearchBar from "src/components/SearchBar"

const Container = styled.div``
const Header = styled.header`
  position: fixed;
  width: 100%;
  padding: 0 32px;
  z-index: 1;
  background-color: ${COLORS.white};
  height: ${LAYOUT.headerHeight}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 3px 3px ${COLORS.shadow.light};
`
const Logo = styled.img`
  width: 120px;
`
const Actions = styled.div`
  display: flex;
  align-items: center;
  & > button {
    margin: 0 36px;
  }
  form {
    width: 35vw;
  }
`
const Main = styled.main<{ $wide?: boolean }>`
  min-height: calc(100vh - ${LAYOUT.headerHeight}px);
  padding-top: 80px;
  ${({ $wide }) => ($wide ? `max-width: ${LAYOUT.maxWidth}px;margin: 0 auto;padding: 112px 32px 32px;` : ``)}
`

interface Props {
  description?: string
  title?: string
  wide?: boolean
}

const MainLayout: FC<Props> = ({ description, title, wide, children }) => {
  const router = useRouter()

  return (
    <>
      <SEO description={description} title={title} />
      <Container>
        <Header>
          <Link href="/">
            <Logo src="/logo.png" />
          </Link>
          <Actions>
            {router.pathname !== "/" && <SearchBar />}
            <Button $variant="green">Publier une annonce</Button>
            <ButtonGroup>
              <Button $variant="white">Devenir vendeur</Button>
              <Button $variant="white">Se connecter</Button>
            </ButtonGroup>
          </Actions>
        </Header>
        <Main $wide={wide}>{children}</Main>
      </Container>
    </>
  )
}

export default MainLayout

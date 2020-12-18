import { FC } from "react"
import styled from "styled-components"
import { useRouter } from "next/router"

import { Button, ButtonGroup } from "src/components/Button"
import { COLORS, LAYOUT } from "src/constants"
import Link from "src/components/Link"
import SEO, { SEOProps } from "src/components/Seo"
import SearchBar from "src/components/SearchBar"

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
const Container = styled.div<{ $bg: boolean }>`
  background-image: ${({ $bg }) => ($bg ? "url(/background.svg)" : "none")};
  background-repeat: no-repeat;
  background-position: bottom center;
  background-size: contain;
  min-height: 100vh;
`
const Main = styled.main<{ $wide?: boolean }>`
  padding-top: 80px;
  ${({ $wide }) => ($wide ? `max-width: ${LAYOUT.maxWidth}px;margin: 0 auto;padding: 112px 32px 32px;` : ``)}
`

interface Props {
  wide?: boolean
}

const MainLayout: FC<Props & SEOProps> = ({ wide, children, ...props }) => {
  const router = useRouter()
  const isHome = router.pathname === "/"

  return (
    <>
      <SEO {...props} />
      <Header>
        {isHome ? (
          <div />
        ) : (
          <Link href="/">
            <Logo src="/logo.png" />
          </Link>
        )}
        <Actions>
          {!isHome && <SearchBar />}
          <Button $variant="green">Publier une annonce</Button>
          <ButtonGroup>
            <Button $variant="white">Devenir vendeur</Button>
            <Button $variant="white">Se connecter</Button>
          </ButtonGroup>
        </Actions>
      </Header>
      <Container $bg={isHome}>
        <Main $wide={wide}>{children}</Main>
      </Container>
    </>
  )
}

export default MainLayout

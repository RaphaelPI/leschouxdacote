import { FC } from "react"
import styled from "styled-components"
import { useRouter } from "next/router"

import { Button, ButtonGroup } from "src/components/Button"
import { COLORS, LAYOUT } from "src/constants"
import Link, { ButtonLink } from "src/components/Link"
import SEO, { SEOProps } from "src/components/Seo"
import SearchBar from "src/components/SearchBar"
import { useUser } from "src/helpers/auth"

import LogoSvg from "src/assets/logo.svg"

const Header = styled.header`
  position: fixed;
  top: 0;
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
const Logo = styled(LogoSvg)`
  height: 45px;
  margin-left: -8px;
  display: block;
`
const Actions = styled.div`
  display: flex;
  align-items: center;
  & > a {
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
  padding-top: ${LAYOUT.headerHeight}px;
`
const Main = styled.main<{ $full?: boolean }>`
  ${({ $full }) => ($full ? `` : `max-width: ${LAYOUT.maxWidth}px; margin: 0 auto; padding: 32px;`)}
`

interface Props {
  full?: boolean
}

const MainLayout: FC<Props & SEOProps> = ({ full, children, ...props }) => {
  const router = useRouter()
  const { signout, user } = useUser()
  const isHome = router.pathname === "/"
  return (
    <>
      <SEO {...props} />
      <Header>
        {isHome ? (
          <div />
        ) : (
          <Link href="/">
            <Logo />
          </Link>
        )}
        <Actions>
          {!isHome && <SearchBar />}
          <ButtonLink href="/publier-une-annonce" $variant="green">
            Publier une annonce
          </ButtonLink>
          {user ? (
            <Button $variant="white" onClick={signout}>
              Se déconnecter
            </Button>
          ) : (
            <ButtonGroup>
              <ButtonLink href="/inscription">Devenir vendeur</ButtonLink>
              <ButtonLink href="/connexion">Se connecter</ButtonLink>
            </ButtonGroup>
          )}
        </Actions>
      </Header>
      <Container $bg={isHome}>
        <Main $full={full}>{children}</Main>
      </Container>
    </>
  )
}

export default MainLayout

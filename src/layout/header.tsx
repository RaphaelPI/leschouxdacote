import { useEffect, useState } from "react"
import styled from "@emotion/styled"
import { useRouter } from "next/router"
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer"
import IconButton from "@material-ui/core/IconButton"

import MenuIcon from "@material-ui/icons/Menu"
import SearchIcon from "@material-ui/icons/Search"

import Link, { ButtonLink } from "src/components/Link"
import SearchBar from "src/components/SearchBar"
import UserZone from "src/components/UserZone"
import Menu from "src/components/Menu"
import { COLORS, LAYOUT, USER_ROLE } from "src/constants"

import LogoSvg from "src/assets/logo.svg"
import { useUser } from "src/helpers/auth"

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--header-height);
`
const Desktop = styled(Content)`
  padding: 0 32px;
  @media (max-width: ${LAYOUT.mobile}px) {
    display: none;
  }
`
const Mobile = styled(Content)`
  padding: 0 16px;
  background-color: ${COLORS.green};
  color: ${COLORS.white};
  a {
    padding: 8px 10px;
    display: block;
    font-size: 1.2em;
    font-weight: 400;
  }
  svg {
    fill: ${COLORS.white};
    vertical-align: middle;
    width: 28px;
    height: 28px;
  }
  @media (min-width: ${LAYOUT.mobile}px) {
    display: none;
  }
`
const Container = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  background-color: ${COLORS.white};
  box-shadow: 0px 3px 3px ${COLORS.shadow.light};
`
const Logo = styled(LogoSvg)`
  height: 45px;
  margin-left: -8px;
  display: block;
  @media (max-width: ${LAYOUT.mobile}px) {
    height: 30px;
  }
`
const Actions = styled.div`
  display: flex;
  align-items: center;
  > a {
    margin: 0 36px;
  }
  form {
    width: 35vw;
    @media (max-width: ${LAYOUT.tablet}px) {
      display: none;
    }
  }
`

const Header = () => {
  const { pathname, events } = useRouter()
  const [openMenu, setOpen] = useState(false)
  const { user } = useUser()

  const isHome = pathname === "/"

  useEffect(() => {
    const handleChange = () => setOpen(false)
    events.on("routeChangeStart", handleChange)
    return () => events.off("routeChangeStart", handleChange)
  }, [events])

  return (
    <Container>
      <Desktop>
        {isHome ? (
          <div style={{ flex: 1 }} />
        ) : (
          <Link href="/">
            <Logo />
          </Link>
        )}
        <Actions>
          {!isHome && <SearchBar />}
          {user?.role === USER_ROLE.PRODUCER && (
            <ButtonLink href="/compte/producteur/annonce" $variant="green">
              Créer une annonce
            </ButtonLink>
          )}
          <UserZone />
        </Actions>
      </Desktop>
      <Mobile>
        <IconButton onClick={() => setOpen(!openMenu)}>
          <MenuIcon titleAccess="Menu" />
        </IconButton>
        <Link href="/">Les Choux d’à Côté</Link>
        <Link href="/">
          <SearchIcon titleAccess="Recherche" />
        </Link>
        <SwipeableDrawer open={openMenu} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}>
          <Menu />
        </SwipeableDrawer>
      </Mobile>
    </Container>
  )
}

export default Header

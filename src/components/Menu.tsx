import { FC } from "react"
import styled from "@emotion/styled"
import NextLink from "next/link"
import { useRouter } from "next/router"

import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Divider from "@material-ui/core/Divider"

import PersonAddIcon from "@material-ui/icons/PersonAdd"
import AddCircleIcon from "@material-ui/icons/AddCircle"
import PersonIcon from "@material-ui/icons/Person"
import LoginIcon from "@material-ui/icons/Login"
import LogoutIcon from "@material-ui/icons/Logout"

import Loader from "src/components/Loader"
import { useUser } from "src/helpers/auth"
import { COLORS, USER_ROLE } from "src/constants"
import CollectionsIcon from "@material-ui/icons/Collections"

const Container = styled.nav`
  width: 300px;
  max-width: 80vw;
  background-color: ${COLORS.menu};
  height: 100%;
  color: ${COLORS.white};
  h1 {
    margin: 24px 16px 24px;
    font-weight: normal;
    font-size: 1.4em;
  }
  h2 {
    margin: -18px 16px 24px;
    font-weight: 300;
    font-size: 1em;
  }
  svg {
    fill: ${COLORS.white};
    margin-right: 20px;
  }
  hr {
    border-color: ${COLORS.divider};
  }
  .Mui-selected {
    background-color: rgba(255, 255, 255, 0.1);
    color: ${COLORS.green};
    svg {
      fill: ${COLORS.green};
    }
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
`
const Center = styled.div`
  text-align: center;
  margin-top: 20vh;
`

interface LinkProps {
  href: string
}
const ListItemLink: FC<LinkProps> = ({ href, children }) => {
  const { pathname } = useRouter()

  return (
    <NextLink href={href} passHref>
      <ListItem button component="a" selected={pathname === href}>
        {children}
      </ListItem>
    </NextLink>
  )
}

const Menu = () => {
  const { loading, authUser, user, signout } = useUser()

  if (loading || (authUser && !user)) {
    return (
      <Container>
        <Center>
          <Loader />
        </Center>
      </Container>
    )
  }

  return (
    <Container>
      <h1>Les Choux d’à Côté</h1>
      {user && <h2>{user.role === USER_ROLE.PRODUCER ? user.name : `${user.firstname} ${user.lastname}`}</h2>}
      <Divider />
      <List>
        {!authUser && (
          <ListItemLink href="/inscription">
            <PersonAddIcon />
            <ListItemText>{`${"S'inscire"}`}</ListItemText>
          </ListItemLink>
        )}
        {user?.role === USER_ROLE.PRODUCER && (
          <ListItemLink href="/compte/producteur/annonce">
            <AddCircleIcon />
            <ListItemText>Créer une annonce</ListItemText>
          </ListItemLink>
        )}

        {authUser && (
          <>
            {user?.role === USER_ROLE.PRODUCER && (
              <ListItemLink href="/compte/producteur/annonces">
                <CollectionsIcon />
                <ListItemText>Mes annonces</ListItemText>
              </ListItemLink>
            )}
            <ListItemLink href="/compte/profil">
              <PersonIcon />
              <ListItemText>Mon profil</ListItemText>
            </ListItemLink>
          </>
        )}
      </List>
      <Divider />
      <List>
        {authUser ? (
          <ListItem button onClick={signout}>
            <LogoutIcon />
            <ListItemText>Se déconnecter</ListItemText>
          </ListItem>
        ) : (
          <ListItemLink href="/connexion">
            <LoginIcon />
            <ListItemText>Se connecter</ListItemText>
          </ListItemLink>
        )}
      </List>
    </Container>
  )
}

export default Menu

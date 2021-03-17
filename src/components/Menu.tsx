import { FC } from "react"
import styled from "@emotion/styled"
import NextLink from "next/link"

import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Divider from "@material-ui/core/Divider"

import PersonAddIcon from "@material-ui/icons/PersonAdd"
import AddCircleIcon from "@material-ui/icons/AddCircle"
import CollectionsIcon from "@material-ui/icons/Collections"
import PersonIcon from "@material-ui/icons/Person"
import LoginIcon from "@material-ui/icons/Login"
import LogoutIcon from "@material-ui/icons/Logout"

import Loader from "src/components/Loader"
import { useUser } from "src/helpers/auth"
import { COLORS } from "src/constants"

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
`
const Center = styled.div`
  text-align: center;
  margin-top: 20vh;
`

interface LinkProps {
  href: string
}
const ListItemLink: FC<LinkProps> = ({ href, children }) => (
  <NextLink href={href} passHref>
    <ListItem button component="a">
      {children}
    </ListItem>
  </NextLink>
)

const Menu = () => {
  const { loading, user, producer, signout } = useUser()

  if (loading || (user && !producer)) {
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
      {producer && <h2>{producer.name}</h2>}
      <Divider />
      <List>
        {!user && (
          <ListItemLink href="/inscription">
            <PersonAddIcon />
            <ListItemText>Devenir vendeur</ListItemText>
          </ListItemLink>
        )}
        <ListItemLink href="/compte/annonce">
          <AddCircleIcon />
          <ListItemText>Créer une annonce</ListItemText>
        </ListItemLink>
        {user && (
          <>
            <ListItemLink href="/compte/annonces">
              <CollectionsIcon />
              <ListItemText>Mes annonces</ListItemText>
            </ListItemLink>
            <ListItemLink href="/compte/profil">
              <PersonIcon />
              <ListItemText>Mon profil</ListItemText>
            </ListItemLink>
          </>
        )}
      </List>
      <Divider />
      <List>
        {user ? (
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

import { useUser } from "src/helpers/auth"
import Loader from "src/components/Loader"
import { Button, ButtonGroup } from "src/components/Button"
import Link, { ButtonLink } from "src/components/Link"

import DownIcon from "src/assets/down.svg"
import styled, { css } from "styled-components"
import { COLORS } from "src/constants"
import { useMenu } from "src/helpers/menu"

const Dropdown = styled.div`
  svg {
    vertical-align: middle;
    margin: -7px -5px -6px 2px;
    fill: ${COLORS.input};
  }
  position: relative;
`
const Placeholder = styled(Button)`
  visibility: hidden;
`
const ProducerButton = styled(Button)<{ $open: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  background-color: ${({ $open }) => ($open ? "#e6e6e6" : "initial")};
`
const Menu = styled.div`
  margin: 8px -16px -8px;
  background-color: ${COLORS.white};
  border-top: 1px solid ${COLORS.border};
`
const entryCss = css`
  border: none;
  outline: none;
  padding: 8px 16px;
  width: 100%;
  text-align: left;
  background-color: transparent;
  color: ${COLORS.input};
  transition: background-color 150ms, color 150ms;
  &:hover {
    background-color: ${COLORS.green};
    color: ${COLORS.white};
  }
`

const Entry = styled(Link)`
  ${entryCss}
  display: block;
`

const Logout = styled.button`
  ${entryCss}
  border-top: 1px solid ${COLORS.border};
`

const UserZone = () => {
  const { loading, user, producer, signout } = useUser()
  const { ref, open, setOpen } = useMenu()

  if (loading) {
    return <Loader />
  }

  const title = (
    <span>
      {producer?.name} <DownIcon />
    </span>
  )

  if (user) {
    return (
      <Dropdown ref={ref}>
        <Placeholder>{title}</Placeholder>
        <ProducerButton $variant="white" onClick={() => setOpen(!open)} $open={open}>
          {title}
          {open && (
            <Menu>
              <Entry href="/mes-annonces">Mes annonces</Entry>
              <Entry href="/mon-compte">Mon compte</Entry>
              <Logout onClick={signout}>Déconnexion</Logout>
            </Menu>
          )}
        </ProducerButton>
      </Dropdown>
    )
  }

  return (
    <ButtonGroup>
      <ButtonLink href="/inscription">Devenir vendeur</ButtonLink>
      <ButtonLink href="/connexion">Se connecter</ButtonLink>
    </ButtonGroup>
  )
}

export default UserZone

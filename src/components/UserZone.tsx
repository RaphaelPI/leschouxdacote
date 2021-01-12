import { FC } from "react"

import { useUser } from "src/helpers/auth"
import Loader from "src/components/Loader"
import { Button, ButtonGroup } from "src/components/Button"
import { ButtonLink } from "src/components/Link"

const UserZone: FC = () => {
  const { loading, user, signout } = useUser()

  if (loading) {
    return <Loader />
  }

  if (user) {
    return (
      <Button $variant="white" onClick={signout}>
        Se déconnecter
      </Button>
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

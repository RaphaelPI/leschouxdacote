import styled from "@emotion/styled"
import { useState } from "react"

import Layout from "src/layout"
import { COLORS, LAYOUT } from "src/constants"
import { useUser } from "src/helpers/auth"
import GreenSwitch from "src/components/GreenSwitch"

const Wrapper = styled.div`
  padding: 4rem 5rem;

  @media (max-width: ${LAYOUT.mobile}px) {
    padding: 30px 10px;
  }
`

const Card = styled.div`
  background-color: white;
  box-shadow: 5px 5px 20px #00000029;
  padding: 30px;
  margin-top: 20px;
`

const CardTitle = styled.h2`
  font-weight: bold;
  font-size: 20px;
`

const Padding = styled.div`
  padding: 20px 0px 20px 20px;
`

const SubTitle = styled.h3`
  color: ${COLORS.dark};
  opacity: 0.7;
  font-size: 18px;
  font-weight: normal;
`

const AlertsPage = () => {
  const { user } = useUser()

  const [checked, setChecked] = useState(user?.hasAcceptedFollowsEmail ?? false)

  console.log("USER", user)

  const handleReceiveMailChange = () => {
    setChecked((prev) => !prev)
  }

  return (
    <Layout title="Mes alertes" noindex fullWidth>
      <Wrapper>
        <h1>Mes alertes</h1>
        <Card>
          <CardTitle>Liste des producteurs favoris</CardTitle>
          <Padding>
            <SubTitle>Vous avez {user?.follows?.length} producteur(s) artisan(s) en favoris</SubTitle>
            {user && user.follows && user.follows.length > 0 && (
              <GreenSwitch
                checked={checked}
                handleChange={handleReceiveMailChange}
                name="receive-email"
                label="Recevoir un email des annonces de ces producteurs"
              />
            )}
          </Padding>
        </Card>
      </Wrapper>
    </Layout>
  )
}

export default AlertsPage

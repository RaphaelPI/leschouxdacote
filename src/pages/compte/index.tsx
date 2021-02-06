import styled from "styled-components"

import MainLayout from "src/layouts/MainLayout"
import { useUser } from "src/helpers/auth"

const Titles = styled.div`
  text-align: center;
  h1,
  h2 {
    margin: 0 0 10px;
  }
`

const MyAccountPage = () => {
  const { producer } = useUser()

  return (
    <MainLayout title="Mon compte" noindex>
      <Titles>
        <h1>Mon compte</h1>
        <h2>{producer?.name}</h2>
        <p>En construction</p>
      </Titles>
    </MainLayout>
  )
}

export default MyAccountPage

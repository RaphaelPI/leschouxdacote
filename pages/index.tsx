import { ChangeEvent, useState } from "react"
import styled from "styled-components"

import MainLayout from "src/layouts/MainLayout"
import LogoIcon from "src/assets/logo.svg"
import { Input, InputGroup } from "src/components/Input"

const Container = styled.section`
  text-align: center;
  padding-top: 96px;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
`
const Logo = styled(LogoIcon)`
  display: block;
  margin: 0 auto;
`
const SearchGroup = styled(InputGroup)`
  margin-top: 80px;
`

const Home = () => {
  const [state, setState] = useState({ what: "", where: "" })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  return (
    <MainLayout>
      <Container>
        <Logo width="80" />
        <SearchGroup>
          <Input name="what" value={state.what} onChange={handleChange} placeholder="Que recherchez-vous ?" />
          <Input name="where" value={state.where} onChange={handleChange} placeholder="Où ?" />
        </SearchGroup>
      </Container>
    </MainLayout>
  )
}

export default Home

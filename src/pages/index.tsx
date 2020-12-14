import styled from "styled-components"

import MainLayout from "src/layouts/MainLayout"
import SearchBar from "src/components/SearchBar"

import LogoIcon from "src/assets/logo.svg"

const Container = styled.section`
  padding-top: 96px;
`
const Logo = styled(LogoIcon)`
  display: block;
  margin: 0 auto;
  width: 80px;
`
const SearchGroup = styled(SearchBar)`
  margin: 80px auto 0;
  width: 80%;
  input {
    padding: 16px 32px;
    font-size: 1.5em;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  }
  button {
    width: 48px;
    height: 48px;
    right: 10px;
    top: 7px;
  }
`

const HomePage = () => {
  return (
    <MainLayout wide>
      <Container>
        <Logo />
        <SearchGroup />
      </Container>
    </MainLayout>
  )
}

export default HomePage

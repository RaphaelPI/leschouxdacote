import styled from "styled-components"

import MainLayout from "src/layouts/MainLayout"
import SearchBar from "src/components/SearchBar"

import LogoSvg from "src/assets/logo.svg"

const Logo = styled(LogoSvg)`
  display: block;
  margin: 10vh auto;
  width: 80%;
  max-width: 800px;
`
const SearchGroup = styled(SearchBar)`
  margin: 5vh auto;
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
    <MainLayout>
      <Logo />
      <SearchGroup />
    </MainLayout>
  )
}

export default HomePage

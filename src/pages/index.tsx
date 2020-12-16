import styled from "styled-components"

import MainLayout from "src/layouts/MainLayout"
import SearchBar from "src/components/SearchBar"

const Logo = styled.img`
  display: block;
  margin: 5vh auto;
  width: 250px;
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
    <MainLayout wide>
      <Logo src="/logo.png" />
      <SearchGroup />
    </MainLayout>
  )
}

export default HomePage

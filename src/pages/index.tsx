import styled from "@emotion/styled"

import Layout from "src/layout"
import SearchBar from "src/components/SearchBar"

import LogoSvg from "src/assets/logo.svg"

const Logo = styled(LogoSvg)`
  display: block;
  margin: 9vh auto 6vh;
  width: 75%;
  max-width: 800px;
`
const SearchGroup = styled(SearchBar)`
  margin: 5vh auto;
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
    <Layout>
      <Logo />
      <SearchGroup />
    </Layout>
  )
}

export default HomePage

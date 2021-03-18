import styled from "@emotion/styled"

import Layout from "src/layout"
import SearchBar from "src/components/SearchBar"
import { LAYOUT } from "src/constants"

import LogoSvg from "src/assets/logo.svg"

const Logo = styled(LogoSvg)`
  display: block;
  margin: 9vh auto 6vh;
  width: 75%;
  max-width: 800px;
  @media (max-width: ${LAYOUT.mobile}px) {
    margin: 0 auto;
    width: 100%;
  }
`
const SearchGroup = styled(SearchBar)`
  margin: 5vh auto;
  input {
    padding: 16px 32px;
    font-size: 1.5em;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    @media (max-width: ${LAYOUT.mobile}px) {
      padding: 12px 16px;
      font-size: 1.2em;
      margin: 8px 0;
    }
  }
  button {
    height: 48px;
    @media (max-width: ${LAYOUT.mobile}px) {
      width: auto;
      margin: 8px auto;
      padding: 0 20px;
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
      span {
        display: block;
        font-size: 1.2em;
        flex: 1;
        margin-right: 16px;
      }
    }
    @media (min-width: ${LAYOUT.mobile}px) {
      width: 48px;
      right: 10px;
      top: 7px;
    }
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

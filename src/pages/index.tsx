import styled from "@emotion/styled"

import Layout from "src/layout"
import SearchBar from "src/components/SearchBar"
import { LAYOUT } from "src/constants"

import LogoSvg from "src/assets/logo.svg"

const Logo = styled(LogoSvg)`
  display: block;
  margin: 2vh auto;
  max-width: 500px;
  @media (max-width: ${LAYOUT.mobile}px) {
    margin: 0 auto;
    width: 100%;
  }
`
const Title = styled.h1`
  text-align: center;
  font-size: 1.2em;
  font-weight: 400;
  @media (max-width: ${LAYOUT.mobile}px) {
    font-size: 14px;
    margin: 0.5em -16px;
  }
`
const SearchGroup = styled(SearchBar)`
  margin: 5vh auto;
  text-align: center;

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
      display: inline-flex;
      margin: 8px auto;
      padding: 0 20px;
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
      justify-content: space-between;
      span {
        display: block;
        font-size: 1.2em;
        margin-right: 16px;
      }
      svg {
        width: auto;
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
    <Layout bgImage>
      <Logo />
      <Title>
        <strong>Producteurs artisans</strong>, publiez des annonces de vos produits.
        <br />
        Acheteurs, découvrez les <strong>produits locaux</strong> autour de chez vous.
      </Title>
      <SearchGroup />
    </Layout>
  )
}

export default HomePage

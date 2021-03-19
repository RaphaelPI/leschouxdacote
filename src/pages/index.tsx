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
const Title = styled.h2`
  text-align: center;
  @media (max-width: ${LAYOUT.mobile}px) {
    font-size: 14px;
    margin: 0.5em -16px;
  }
`
const SearchGroup = styled(SearchBar)`
  margin: 5vh auto;
  text-align: center;
  @media (max-width: ${LAYOUT.mobile}px) {
    margin: 2vh auto;
  }

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
const Help = styled.div`
  text-align: center;
  ol {
    padding-inline-start: 0;
    list-style-position: inside;
    li {
      margin: 5px 0;
    }
  }
  a {
    text-decoration: underline;
  }
`

const HomePage = () => {
  return (
    <Layout>
      <Logo />
      <Title>
        <strong>
          1<sup>ère</sup> plateforme d’annonces pour l’alimentaire
        </strong>
        <br />
        VENTE DIRECTE entre producteurs et acheteurs
      </Title>
      <SearchGroup />
      <Help>
        <p>
          Productrices, producteurs,
          <br />
          pour utiliser la plateforme, il suffit de :
        </p>
        <ol>
          <li>
            <a href="https://assistance.leschouxdacote.fr/assistance/cr%C3%A9er-son-compte">Créer son compte</a>
          </li>
          <li>
            <a href="https://assistance.leschouxdacote.fr/assistance/se-connecter">Se connecter</a>
          </li>
          <li>
            <a href="https://assistance.leschouxdacote.fr/assistance/publier-une-annonce">Publier des annonces</a>
          </li>
          <li>
            <a href="https://assistance.leschouxdacote.fr/assistance/g%C3%A9rer-mes-annonces">Gérer ses annonces</a>
          </li>
        </ol>
      </Help>
    </Layout>
  )
}

export default HomePage

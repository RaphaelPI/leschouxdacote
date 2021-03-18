import styled from "@emotion/styled"

import { COLORS } from "src/constants"

import Facebook from "src/assets/facebook.svg"
import Twitter from "src/assets/twitter.svg"
import Linkedin from "src/assets/linkedin.svg"

const Container = styled.footer`
  border-top: 1px solid ${COLORS.border};
  padding: 24px 32px;
  color: ${COLORS.grey};
  font-size: 0.8em;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  > div {
    flex: 1;
    min-width: 200px;
  }
  p {
    margin: 5px 0;
  }
  a {
    svg {
      width: 36px;
      height: 36px;
      padding: 8px;
      fill: ${COLORS.green};
    }
  }
`
const Social = styled.div`
  text-align: right;
  margin-right: -8px;
`

const YEAR = new Date().getFullYear()

const Footer = () => {
  return (
    <Container>
      <div>
        <p>
          <a href="https://www.leschouxdacote.fr/notre-charte">Notre charte</a>
        </p>
        <p>
          <a href="https://www.leschouxdacote.fr/cgs">CGU</a>
        </p>
        <p>
          <a href="https://www.leschouxdacote.fr/mentions-l%C3%A9gales">Mentions légales</a>
        </p>
        <p>
          <a href="https://www.leschouxdacote.fr/%C3%A0-propos">À propos</a>
        </p>
      </div>
      <div>
        <p>
          <a href="https://assistance.leschouxdacote.fr/">Assistance</a>
        </p>
        <p>
          <a href="https://www.leschouxdacote.fr/actualit%C3%A9s">Actualité</a>
        </p>
        <p>
          <a href="mailto:contact@leschouxdacote.fr">Contact</a>
        </p>
        <p>© {YEAR} Les Choux d’à Côté</p>
      </div>
      <Social>
        <a href="https://www.facebook.com/leschouxdacote">
          <Facebook />
        </a>
        <a href="https://twitter.com/leschouxdacote">
          <Twitter />
        </a>
        <a href="https://www.linkedin.com/company/les-choux-d-%C3%A0-c%C3%B4t%C3%A9/">
          <Linkedin />
        </a>
      </Social>
    </Container>
  )
}

export default Footer

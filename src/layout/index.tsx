import { FC } from "react"
import styled from "@emotion/styled"
import { useRouter } from "next/router"

import Header from "./header"
import Footer from "./footer"
import SEO, { SEOProps } from "src/components/Seo"
import { Loading } from "src/components/Loader"
import { useUser } from "src/helpers/auth"
import { LAYOUT } from "src/constants"

const Empty = styled.div`
  min-height: 100vh;
  padding-top: var(--header-height);
`
const Background = styled(Empty)`
  background-image: url("/background.svg");
  background-repeat: no-repeat;
  background-position: bottom center;
  background-size: contain;
  @media (max-width: ${LAYOUT.mobile}px) {
    background-size: 180%;
  }
  @media (orientation: portrait) and (max-height: 800px) {
    background-size: 120%;
  }
  @media (orientation: portrait) and (max-height: 700px) {
    background-image: none;
  }
`

const MainColumn = styled.main`
  max-width: ${LAYOUT.maxWidth}px;
  margin: 0 auto;
  padding: 32px;
  @media (max-width: ${LAYOUT.mobile}px) {
    padding: 24px;
  }
`

interface Props {
  full?: boolean
  loading?: boolean
}

const Layout: FC<Props & SEOProps> = ({ full, loading, children, ...props }) => {
  const { pathname } = useRouter()
  const { wait } = useUser()

  const Container = pathname === "/" ? Background : Empty
  const Main = full ? "main" : MainColumn

  return (
    <>
      <SEO {...props} />
      <Header />
      <Container>
        <Main>{loading || wait ? <Loading /> : children}</Main>
      </Container>
      <Footer />
    </>
  )
}

export default Layout

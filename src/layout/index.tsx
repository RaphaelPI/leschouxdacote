import { FC } from "react"
import styled from "@emotion/styled"
import { useRouter } from "next/router"

import Header from "./header"
import Footer from "./footer"
import SEO, { SEOProps } from "src/components/Seo"
import { Loading } from "src/components/Loader"
import { useUser } from "src/helpers/auth"
import { LAYOUT } from "src/constants"

const Container = styled.div<{ $bg: boolean }>`
  background-image: ${({ $bg }) => ($bg ? "url(/background.svg)" : "none")};
  background-repeat: no-repeat;
  background-position: bottom center;
  background-size: contain;
  min-height: 100vh;
  padding-top: var(--header-height);
`
const Main = styled.main<{ $full?: boolean }>`
  ${({ $full }) => ($full ? `` : `max-width: ${LAYOUT.maxWidth}px; margin: 0 auto; padding: 32px;`)}
`

interface Props {
  full?: boolean
  loading?: boolean
}

const Layout: FC<Props & SEOProps> = ({ full, loading, children, ...props }) => {
  const { pathname } = useRouter()
  const { wait } = useUser()

  return (
    <>
      <SEO {...props} />
      <Header />
      <Container $bg={pathname === "/"}>
        <Main $full={full}>{loading || wait ? <Loading /> : children}</Main>
      </Container>
      <Footer />
    </>
  )
}

export default Layout

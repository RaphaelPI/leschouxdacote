import { useRouter } from "next/router"
import styled from "styled-components"

import MainLayout from "src/layouts/MainLayout"
import { Section } from "src/layouts/Grid"
import SearchBar from "src/components/SearchBar"

import LogoIcon from "src/assets/logo.svg"

const Container = styled(Section)`
  padding-top: 96px;
`
const Logo = styled(LogoIcon)`
  display: block;
  margin: 0 auto;
`
const SearchGroup = styled(SearchBar)`
  margin: 80px auto 0;
  width: 80%;
`

const HomePage = () => {
  const router = useRouter()

  const handleSearch = (what: string, where: string) => {
    if (!what || !where) {
      alert("veuillez saisir une recherche")
      return
    }

    router.push({
      pathname: "/recherche",
      query: { what, where },
    })
  }

  return (
    <MainLayout>
      <Container>
        <Logo width="80" />
        <SearchGroup onSearch={handleSearch} />
      </Container>
    </MainLayout>
  )
}

export default HomePage

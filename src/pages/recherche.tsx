import MainLayout from "src/layouts/MainLayout"
import MapResults from "src/components/MapResults"
import SearchResults from "src/components/SearchResults"
import styled from "styled-components"

const Row = styled.div`
  display: flex;
`
const LeftCol = styled.div`
  max-width: 840px;
  width: 100%;
`
const RightCol = styled.div`
  flex: 1;
`

const MOCK_DATA = Array.from(new Array(24).keys()).map((index) => ({
  id: index,
  producer: "Les jardins des Gallines",
  location: "Toulouse",
  desc: "Carottes",
  quantity: 500,
  price: 390,
  unit: "kg",
  image: "/carotte.png",
}))

const SearchPage = () => {
  return (
    <MainLayout>
      <Row>
        <LeftCol>
          <SearchResults products={MOCK_DATA} />
        </LeftCol>
        <RightCol>
          <MapResults />
        </RightCol>
      </Row>
    </MainLayout>
  )
}

export default SearchPage

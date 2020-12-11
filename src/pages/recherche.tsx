import MainLayout from "src/layouts/MainLayout"
import MapResults from "src/components/MapResults"
import SearchResults from "src/components/SearchResults"
import styled from "styled-components"
import { MOCK_DATA } from "src/constants/mock"

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

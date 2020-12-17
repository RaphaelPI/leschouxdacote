import styled from "styled-components"

import MainLayout from "src/layouts/MainLayout"
import ResultsMap from "src/components/ResultsMap"
import ResultsList from "src/components/ResultsList"

import { MOCK_PRODUCTS } from "src/constants/mock"

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
  const products = MOCK_PRODUCTS.filter(({ name }) => name.toLowerCase().includes("chou"))

  return (
    <MainLayout>
      <Row>
        <LeftCol>
          <ResultsList products={products} />
        </LeftCol>
        <RightCol>
          <ResultsMap products={products} />
        </RightCol>
      </Row>
    </MainLayout>
  )
}

export default SearchPage

import { useEffect, useState } from "react"
import styled from "styled-components"
import { useRouter } from "next/router"

import MainLayout from "src/layouts/MainLayout"
import ResultsMap from "src/components/ResultsMap"
import ResultsList from "src/components/ResultsList"
import algolia from "src/helpers/algolia"
import { handleError } from "src/helpers/errors"
import { SEARCH_RADIUS } from "src/constants"

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

const getOptions = (ll?: string) => {
  if (ll) {
    return {
      aroundLatLng: ll,
      aroundRadius: SEARCH_RADIUS,
    }
  }
}

const SearchPage = () => {
  const { query } = useRouter()
  const [results, setResults] = useState<Product[]>([])
  const { what, ll } = query as SearchQuery

  useEffect(() => {
    algolia
      .search<Product>(what || "", getOptions(ll))
      .then(({ hits }) => setResults(hits))
      .catch(handleError)
  }, [what, ll])

  return (
    <MainLayout title="Recherche" full>
      <Row>
        <LeftCol>
          <ResultsList products={results} />
        </LeftCol>
        <RightCol>
          <ResultsMap products={results} />
        </RightCol>
      </Row>
    </MainLayout>
  )
}

export default SearchPage

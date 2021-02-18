import { useEffect, useState } from "react"
import styled from "styled-components"
import { useRouter } from "next/router"
import { SearchOptions } from "@algolia/client-search"

import MainLayout from "src/layouts/MainLayout"
import ResultsMap from "src/components/ResultsMap"
import ResultsList from "src/components/ResultsList"
import algolia from "src/helpers/algolia"
import { handleError } from "src/helpers/errors"
import { HoverProvider } from "src/helpers/hover"
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
  const options: Mutable<SearchOptions> = {
    numericFilters: `expires > ${Date.now()}`,
  }
  if (ll) {
    options.aroundLatLng = ll
    options.aroundRadius = SEARCH_RADIUS.city
  }
  return options
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
      <HoverProvider>
        <Row>
          <LeftCol>
            <ResultsList products={results} />
          </LeftCol>
          <RightCol>
            <ResultsMap products={results} />
          </RightCol>
        </Row>
      </HoverProvider>
    </MainLayout>
  )
}

export default SearchPage

import { useEffect, useState } from "react"
import styled from "@emotion/styled"
import { useRouter } from "next/router"
import { SearchOptions } from "@algolia/client-search"

import Layout from "src/layout"
import ResultsMap from "src/components/ResultsMap"
import ResultsList from "src/components/ResultsList"
import algolia from "src/helpers/algolia"
import { handleError } from "src/helpers/errors"
import { HoverProvider } from "src/helpers/hover"
import { SEARCH_RADIUS, LAYOUT } from "src/constants"

const Row = styled.div`
  display: flex;
`
const LeftCol = styled.div`
  max-width: 840px;
  width: 100%;
`
const RightCol = styled.div`
  flex: 1;
  @media (max-width: ${LAYOUT.tablet}px) {
    display: none;
  }
`

const getOptions = (type: SearchQuery["type"] = "city", ll?: string) => {
  const options: Mutable<SearchOptions> = {
    numericFilters: `expires > ${Date.now()}`,
  }
  if (ll) {
    options.aroundLatLng = ll
    options.aroundRadius = SEARCH_RADIUS[type]
  }
  return options
}

const SearchPage = () => {
  const { query, isReady } = useRouter()
  const [results, setResults] = useState<Product[]>()
  const { what, type, ll } = query as SearchQuery

  useEffect(() => {
    if (!isReady) {
      return
    }
    algolia
      .search<Product>(what || "", getOptions(type, ll))
      .then(({ hits }) => setResults(hits))
      .catch(handleError)
  }, [isReady, what, ll, type])

  return (
    <Layout title="Recherche" full loading={!results}>
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
    </Layout>
  )
}

export default SearchPage

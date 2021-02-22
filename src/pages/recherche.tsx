import { useEffect, useState } from "react"
import styled from "styled-components"
import { useRouter } from "next/router"
import { SearchOptions } from "@algolia/client-search"

import MainLayout from "src/layouts/MainLayout"
import { Loading } from "src/components/Loader"
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
    <MainLayout title="Recherche" full>
      {results ? (
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
      ) : (
        <Loading />
      )}
    </MainLayout>
  )
}

export default SearchPage

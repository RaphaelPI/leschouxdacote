import { useEffect, useState } from "react"
import styled from "@emotion/styled"
import { useRouter } from "next/router"
import { SearchOptions } from "@algolia/client-search"
import Fab from "@material-ui/core/Fab"

import MapIcon from "@material-ui/icons/Map"
import ListIcon from "@material-ui/icons/ViewList"

import Layout from "src/layout"
import ResultsMap from "src/components/ResultsMap"
import ResultsList from "src/components/ResultsList"
import algolia from "src/helpers/algolia"
import { handleError } from "src/helpers/errors"
import { HoverProvider } from "src/helpers/hover"
import { SEARCH_RADIUS, COLORS } from "src/constants"

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
const MobileSwitches = styled.div`
  position: absolute;
  right: 12px;
  top: calc(var(--header-height) + 12px);
  z-index: 10;
  .MuiFab-root {
    background-color: ${COLORS.white};
  }
  svg {
    fill: ${COLORS.dark};
    margin-right: 2px;
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
  const [view, setView] = useState<"list" | "map" | "both">("list")
  const [results, setResults] = useState<Product[]>()
  const { what, type, ll } = query as SearchQuery

  useEffect(() => {
    if (window.innerWidth > 1000) {
      setView("both")
    }
  }, [])

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
        {view !== "both" && (
          <MobileSwitches>
            {view === "list" && (
              <Fab variant="extended" size="small" onClick={() => setView("map")}>
                <MapIcon />
                Carte
              </Fab>
            )}
            {view === "map" && (
              <Fab variant="extended" size="small" onClick={() => setView("list")}>
                <ListIcon />
                Liste
              </Fab>
            )}
          </MobileSwitches>
        )}
        <Row>
          {view !== "map" && (
            <LeftCol>
              <ResultsList products={results} />
            </LeftCol>
          )}
          {view !== "list" && (
            <RightCol>
              <ResultsMap products={results} />
            </RightCol>
          )}
        </Row>
      </HoverProvider>
    </Layout>
  )
}

export default SearchPage

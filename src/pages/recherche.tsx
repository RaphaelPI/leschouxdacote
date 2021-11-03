import type { Product } from "src/types/model"

import { useEffect, useState } from "react"
import styled from "@emotion/styled"
import { useRouter } from "next/router"
import { SearchOptions } from "@algolia/client-search"
import Fab from "@mui/material/Fab"

import MapIcon from "@mui/icons-material/Map"
import ListIcon from "@mui/icons-material/ViewList"

import Layout from "src/layout"
import ResultsMap from "src/components/ResultsMap"
import ResultsList from "src/components/ResultsList"
import { productsIndex } from "src/helpers/algolia"
import { handleError } from "src/helpers/errors"
import { HoverProvider } from "src/helpers/hover"
import { COLORS, SEARCH_RADIUS } from "src/constants"

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

const getOptions = (radius: number, latlng?: string) => {
  const options: Mutable<SearchOptions> = {
    numericFilters: `expires > ${Date.now()}`,
  }
  if (latlng) {
    options.aroundLatLng = latlng
    options.aroundRadius = radius
  }
  return options
}

const SearchPage = () => {
  const { query, isReady } = useRouter()
  const [view, setView] = useState<"list" | "map" | "both">("list")
  const [results, setResults] = useState<Product[]>()
  const { what, ll, r, type } = query as SearchQuery

  const radius = Number(r) || SEARCH_RADIUS[type || "dpt"]

  useEffect(() => {
    if (window.innerWidth > 1000) {
      setView("both")
    }
  }, [])

  useEffect(() => {
    if (!isReady) {
      return
    }
    productsIndex
      .search<Product>(what || "", getOptions(radius, ll))
      .then(({ hits }) => setResults(hits))
      .catch(handleError)
  }, [isReady, what, radius, ll])

  return (
    <Layout title="Recherche" fullWidth loading={!results}>
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
              <ResultsList products={results as Product[]} />
            </LeftCol>
          )}
          {view !== "list" && (
            <RightCol>
              <ResultsMap products={results as Product[]} />
            </RightCol>
          )}
        </Row>
      </HoverProvider>
    </Layout>
  )
}

export default SearchPage

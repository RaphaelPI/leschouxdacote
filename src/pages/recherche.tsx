import { useEffect, useState } from "react"
import styled from "styled-components"
import { useRouter } from "next/router"

import MainLayout from "src/layouts/MainLayout"
import ResultsMap from "src/components/ResultsMap"
import ResultsList from "src/components/ResultsList"
import algolia from "src/helpers/algolia"
import { handleError } from "src/helpers/errors"

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
  const { query } = useRouter()
  const [results, setResults] = useState<Product[]>([])

  useEffect(() => {
    if (typeof query.what === "string") {
      algolia
        .search<Product>(query.what) // TODO: where & filter out expired ads
        .then((res) => {
          setResults(res.hits)
        })
        .catch(handleError)
    }
  }, [query.what])

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

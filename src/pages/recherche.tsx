import { useEffect, useState } from "react"
import styled from "styled-components"

import MainLayout from "src/layouts/MainLayout"
import ResultsMap from "src/components/ResultsMap"
import ResultsList from "src/components/ResultsList"
import { firestore, getObject } from "src/helpers/firebase"

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
  const [results, setResults] = useState<Product[]>([])
  // TODO: replace with Algolia geo query
  useEffect(() => {
    firestore
      .collection("products")
      .get()
      .then((snapshot) => {
        setResults(snapshot.docs.map(getObject) as Product[])
      })
  }, [])

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

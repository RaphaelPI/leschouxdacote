import styled from "styled-components"
import dynamic from "next/dynamic"

import { COLORS, LAYOUT } from "src/constants"

const Map = dynamic(import("src/components/Map"), {
  ssr: false,
  loading() {
    return <Loader>Chargement de la carte…</Loader>
  },
})

const Container = styled.div`
  background-color: ${COLORS.border};
  position: sticky;
  top: ${LAYOUT.headerHeight}px;
  height: calc(100vh - ${LAYOUT.headerHeight}px);
`
const Loader = styled.div`
  padding-top: 40vh;
  text-align: center;
`

interface Props {
  products: Product[]
}

const ResultsMap = ({ products }: Props) => {
  return (
    <Container>
      <Map products={products} />
    </Container>
  )
}

export default ResultsMap

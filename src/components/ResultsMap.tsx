import dynamic from "next/dynamic"
import styled from "styled-components"

import { COLORS, LAYOUT } from "src/constants"

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
const PopupContent = styled.div`
  h1,
  h2 {
    margin: 0;
    text-align: center;
  }
  h1 {
    font-size: 1.5em;
  }
`

const Map = dynamic(import("src/components/Map"), {
  ssr: false,
  loading() {
    return <Loader>Chargement de la carte…</Loader>
  },
})

interface Props {
  products: Product[]
}

const ResultsMap = ({ products }: Props) => {
  const markers: MapMarker[] = products.map(({ _geoloc, title, producer }) => {
    return {
      position: _geoloc,
      content: (
        <PopupContent>
          <h2>{producer}</h2>
          <h1>{title}</h1>
        </PopupContent>
      ),
    }
  })

  return (
    <Container>
      <Map markers={markers} />
    </Container>
  )
}

export default ResultsMap

import dynamic from "next/dynamic"
import styled from "styled-components"

import { COLORS, LAYOUT } from "src/constants"
import { MOCK_PRODUCERS } from "src/constants/mock"

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

const Loading = () => <Loader>Chargement de la carte…</Loader>

const Map = dynamic(import("src/components/Map"), {
  ssr: false,
  loading: Loading,
})

interface Props {
  products: Product[]
}

const MapResults = ({ products }: Props) => {
  const markers: MapMarker[] = products.map((product) => {
    const producer = MOCK_PRODUCERS[product.producer]
    return {
      position: producer.position,
      content: (
        <PopupContent>
          <h2>{producer.name}</h2>
          <h1>{product.title}</h1>
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

export default MapResults

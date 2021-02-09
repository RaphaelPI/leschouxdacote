import { useState } from "react"
import styled from "styled-components"
import dynamic from "next/dynamic"

import { ProductInfos } from "src/cards/ProductCard"
import { COLORS, LAYOUT } from "src/constants"

import PrevIcon from "src/assets/prev.svg"
import NextIcon from "src/assets/next.svg"

const LeafletMap = dynamic(import("src/components/Map"), {
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
const PopupContent = styled.div`
  width: ${LAYOUT.mapPopupWidth}px;
  white-space: nowrap;
  overflow: hidden;
`
const Slider = styled.div`
  transition: transform 200ms ease-in-out;
  > a {
    display: inline-block;
    vertical-align: top;
    img {
      height: 120px;
    }
  }
`
const Nav = styled.nav`
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 13px;
  border-top: 1px solid ${COLORS.border};
  button {
    height: 34px;
    border: none;
    background-color: transparent;
    padding: 5px;
  }
  div {
    flex: 1;
  }
`

interface PlaceProps {
  list: Product[]
}

const PlaceProducts = ({ list }: PlaceProps) => {
  const [index, setIndex] = useState(0)

  return (
    <PopupContent>
      <Slider style={{ transform: `translateX(${-LAYOUT.mapPopupWidth * index}px)` }}>
        {list.map((product) => (
          <ProductInfos key={product.objectID} product={product} />
        ))}
      </Slider>
      {list.length > 1 && (
        <Nav>
          <button onClick={() => setIndex(Math.max(0, index - 1))}>
            <PrevIcon />
          </button>
          <div>
            {index + 1}/{list.length}
          </div>
          <button onClick={() => setIndex(Math.min(list.length - 1, index + 1))}>
            <NextIcon />
          </button>
        </Nav>
      )}
    </PopupContent>
  )
}

interface Props {
  products: Product[]
}

const ResultsMap = ({ products }: Props) => {
  const places: Record<Product["placeId"], Product[]> = {}
  products.forEach((product) => {
    if (!places[product.placeId]) {
      places[product.placeId] = []
    }
    places[product.placeId].push(product)
  })

  const markers: MapMarker[] = Object.keys(places).map((placeId) => {
    const list = places[placeId]
    return {
      position: list[0]._geoloc,
      content: <PlaceProducts list={list} />,
    }
  })

  return (
    <Container>
      <LeafletMap markers={markers} />
    </Container>
  )
}

export default ResultsMap

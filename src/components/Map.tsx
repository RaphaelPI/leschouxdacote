import { useEffect, useState } from "react"
import "leaflet/dist/leaflet.css"
import { icon, LatLngExpression } from "leaflet"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import styled from "styled-components"
import { useRouter } from "next/router"

import { ProductInfos } from "src/cards/ProductCard"
import { useHover } from "src/helpers/hover"
import { TOULOUSE, COLORS, LAYOUT } from "src/constants"

import PrevIcon from "src/assets/prev.svg"
import NextIcon from "src/assets/next.svg"

const TILES_URL = "https://api.maptiler.com/maps/bright/{z}/{x}/{y}.png?key=" + process.env.NEXT_PUBLIC_MAPTILER_KEY // TODO: use vector tiles
const TILES_ATTR = [
  '&copy; <a href="https://www.maptiler.com/copyright/" target="_blank">MapTiler</a>',
  '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
].join(" ")

const ICON_INACTIVE = icon({
  iconUrl: "/marker-inactive.png",
  iconSize: [32, 32],
  popupAnchor: [0, -10],
})
const ICON_ACTIVE = icon({
  iconUrl: "/marker.png",
  iconSize: [32, 32],
  popupAnchor: [0, -10],
})

const Container = styled(MapContainer)`
  width: 100%;
  height: 100%;
`
const StyledPopup = styled(Popup)`
  .leaflet-popup-content-wrapper {
    border-radius: 0;
    padding: 0;
  }
  .leaflet-popup-content {
    margin: 0 -1px 0 0;
  }
  a.leaflet-popup-close-button {
    color: white;
  }
  a.leaflet-popup-close-button:hover {
    color: black;
  }
  .leaflet-popup-content a {
    color: ${COLORS.dark};
  }
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
  products: Product[]
}

const PlacePopup = ({ products }: PlaceProps) => {
  const [index, setIndex] = useState(0)
  const { setProduct } = useHover()

  const current = products[index].objectID

  useEffect(() => {
    setProduct(current)
  }, [setProduct, current])

  return (
    <StyledPopup onOpen={() => setProduct(current)} onClose={() => setProduct(null)}>
      <PopupContent>
        <Slider style={{ transform: `translateX(${-LAYOUT.mapPopupWidth * index}px)` }}>
          {products.map((product) => (
            <ProductInfos key={product.objectID} product={product} />
          ))}
        </Slider>
        {products.length > 1 && (
          <Nav>
            <button onClick={() => setIndex(Math.max(0, index - 1))}>
              <PrevIcon />
            </button>
            <div>
              {index + 1}/{products.length}
            </div>
            <button onClick={() => setIndex(Math.min(products.length - 1, index + 1))}>
              <NextIcon />
            </button>
          </Nav>
        )}
      </PopupContent>
    </StyledPopup>
  )
}

interface CentererProps {
  center: LatLngExpression
}

const Centerer = ({ center }: CentererProps) => {
  const map = useMap()

  useEffect(() => {
    map.setView(center)
  }, [center, map])

  return null
}

const getCenter = ({ ll }: SearchQuery): LatLngExpression => {
  if (!ll) {
    return TOULOUSE
  }
  const [lat, lng] = ll.split(",")
  return [Number(lat), Number(lng)]
}

interface MapProps {
  products: Product[]
}

const Map = ({ products }: MapProps) => {
  const { query } = useRouter()
  const center = getCenter(query as SearchQuery)
  const { productId } = useHover()

  const places: Record<Product["placeId"], Product[]> = {}
  products.forEach((product) => {
    if (!places[product.placeId]) {
      places[product.placeId] = []
    }
    places[product.placeId].push(product)
  })

  return (
    <Container center={center} zoom={11}>
      <Centerer center={center} />
      <TileLayer url={TILES_URL} tileSize={512} zoomOffset={-1} minZoom={1} attribution={TILES_ATTR} crossOrigin />
      {Object.keys(places).map((placeId) => {
        const list = places[placeId]
        return (
          <Marker
            key={placeId}
            position={list[0]._geoloc}
            icon={productId && list.find(({ objectID }) => objectID === productId) ? ICON_ACTIVE : ICON_INACTIVE}
          >
            <PlacePopup products={list} />
          </Marker>
        )
      })}
    </Container>
  )
}

export default Map

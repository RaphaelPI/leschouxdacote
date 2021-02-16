import { useEffect } from "react"
import "leaflet/dist/leaflet.css"
import { icon, LeafletEventHandlerFnMap, LatLngExpression } from "leaflet"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import styled from "styled-components"

import { COLORS, TOULOUSE } from "src/constants"
import { useRouter } from "next/router"

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

const HANDLERS: LeafletEventHandlerFnMap = {
  mouseover({ target }) {
    target.setIcon(ICON_ACTIVE)
  },
  mouseout({ target }) {
    target.setIcon(ICON_INACTIVE)
  },
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
  markers: MapMarker[]
}

const Map = ({ markers }: MapProps) => {
  const { query } = useRouter()
  const center = getCenter(query as SearchQuery)

  return (
    <Container center={center} zoom={11}>
      <Centerer center={center} />
      <TileLayer url={TILES_URL} tileSize={512} zoomOffset={-1} minZoom={1} attribution={TILES_ATTR} crossOrigin />
      {markers.map(({ position, content }, index) => (
        <Marker key={index} position={position} icon={ICON_INACTIVE} eventHandlers={HANDLERS}>
          <StyledPopup>{content}</StyledPopup>
        </Marker>
      ))}
    </Container>
  )
}

export default Map

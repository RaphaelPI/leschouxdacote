import "leaflet/dist/leaflet.css"
import { icon } from "leaflet"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import styled from "styled-components"

import { COLORS } from "src/constants"

const TILES_URL = "https://api.maptiler.com/maps/bright/{z}/{x}/{y}.png?key=" + process.env.NEXT_PUBLIC_MAPTILER_KEY // TODO: use vector tiles
const TILES_ATTR = [
  '&copy; <a href="https://www.maptiler.com/copyright/" target="_blank">MapTiler</a>',
  '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
].join(" ")

const ICON = icon({
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

interface Props {
  markers: MapMarker[]
}

const Map = ({ markers }: Props) => {
  return (
    <Container center={[43.62, 1.42]} zoom={11}>
      <TileLayer url={TILES_URL} tileSize={512} zoomOffset={-1} minZoom={1} attribution={TILES_ATTR} crossOrigin />
      {markers.map(({ position, content }, index) => (
        <Marker key={index} position={position} icon={ICON}>
          <StyledPopup>{content}</StyledPopup>
        </Marker>
      ))}
    </Container>
  )
}

export default Map

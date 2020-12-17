import "leaflet/dist/leaflet.css"
import { icon } from "leaflet"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import styled from "styled-components"

const TILES_URL = "https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=" + process.env.NEXT_PUBLIC_MAPTILER_KEY // TODO: use vector tiles
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

interface Props {
  markers: MapMarker[]
}

const Map = ({ markers }: Props) => {
  return (
    <Container center={[43.62, 1.42]} zoom={11}>
      <TileLayer url={TILES_URL} tileSize={512} zoomOffset={-1} minZoom={1} attribution={TILES_ATTR} crossOrigin />
      {markers.map(({ position, content }, index) => (
        <Marker key={index} position={position} icon={ICON}>
          <Popup>{content}</Popup>
        </Marker>
      ))}
    </Container>
  )
}

export default Map

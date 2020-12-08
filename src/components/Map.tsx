import { memo } from "react"
import { GoogleMap, LoadScript } from "@react-google-maps/api"
import { GOOGLE_API_KEY } from "src/constants/config"

interface Props {
  defaultZoom?: number
  defaultCenter?: google.maps.LatLngLiteral
}

const Map = ({ defaultZoom, defaultCenter }: Props) => {
  return (
    <LoadScript googleMapsApiKey={GOOGLE_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={defaultZoom || 16}
        center={defaultCenter || { lat: 43.60023550347115, lng: 1.43901548566871 }}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

const containerStyle = {
  width: "100%",
  height: "100%",
}

export default memo(Map)

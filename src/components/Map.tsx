import { memo } from "react"
import { GoogleMap, LoadScript } from "@react-google-maps/api"

interface Props {
  defaultZoom?: number
  defaultCenter?: google.maps.LatLngLiteral
}

const Map = ({ defaultZoom, defaultCenter }: Props) => {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_KEY}>
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

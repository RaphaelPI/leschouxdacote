interface Signin {
  email: string
  password: string
}

interface LostPassword {
  email: string
}

interface MapMarker {
  position: import("leaflet").LatLngExpression
  content: import("react").ReactNode
}

interface Place {
  id: string
  lat: number
  lng: number
  city: string
}

interface Publish {
  id: Product["id"]
  days?: number
}

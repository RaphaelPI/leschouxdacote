interface Product {
  id: string
  name: string
  producer: string
  location: string
  quantity: number
  price: number
  image: string
  unit?: string // default "u"
}

interface Producer {
  name: string
  description: string
  email: string
  phone: string
  address: string
  position: [number, number]
}

interface MapMarker {
  position: import("leaflet").LatLngExpression
  content: import("react").ReactNode
}

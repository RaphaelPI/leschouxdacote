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
  address: string
  description: string
  email: string
  phone: string
  position: [number, number]
}

interface RegisteringProducer {
  siret: string
  name: string
  address: string
  firstname: string
  lastname: string
  description: string
  email: string
  phone: string
  password: string
}

interface MapMarker {
  position: import("leaflet").LatLngExpression
  content: import("react").ReactNode
}

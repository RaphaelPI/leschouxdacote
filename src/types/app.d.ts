interface Signin {
  email: string
  password: string
}

interface LostPassword {
  email: string
}

type ParsedUrlQueryInput = import("querystring").ParsedUrlQueryInput

interface SearchQuery extends ParsedUrlQueryInput {
  what?: string // product
  where?: string // place
  type?: "country" | "city" | "dpt" | "region"
  ll?: string // lat,lon
  r?: string // radius
  z?: string // zoom
  bio?: "1" // Bio or Agriculture raisonnée
}

interface Place {
  id: string
  lat: number
  lng: number
  city: string
  dpt: string
}

interface Publish {
  id: Product["id"]
  days?: number
}

type Coordinates = [number, number]
type Bounds = [number, number, number, number]

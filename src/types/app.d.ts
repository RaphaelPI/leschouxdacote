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
  type?: "city" | "dpt" | "region"
  ll?: string // lat,lon
  r?: string // radius
  z?: string // zoom
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

type Coordinates = [number, number]
type Bounds = [number, number, number, number]

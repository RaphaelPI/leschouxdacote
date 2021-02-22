interface Signin {
  email: string
  password: string
}

interface LostPassword {
  email: string
}

type ParsedUrlQueryInput = import("querystring").ParsedUrlQueryInput

interface SearchQuery extends ParsedUrlQueryInput {
  what?: string
  where?: string
  ll?: string
  type?: "city" | "dpt" | "region"
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

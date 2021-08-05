import { USER_ROLE } from "src/constants"

interface AuthUser {
  uid: string
  email: string
  name: string
}

interface Identified {
  objectID: string
  created: number // timestamp in ms
  updated?: number // timestamp in ms
}

type Registering<T> = Omit<T, "objectID" | "updated">
type Updating<T> = Omit<T, "objectID" | "created">

type Unit = "g" | "kg" | "l" | "u"

interface Geoloc {
  lat: number
  lng: number
}

interface RegisteringFollowsFields {
  userId: string
  authUserId: string
  producerId: string
}

interface RegisteringFollows {
  userId: string
  producerId: string
}

interface User extends Identified {
  siret?: string
  name?: string // company name
  firstname: string
  lastname: string
  address?: string
  // _geoloc: Geoloc
  description?: string
  email?: string
  phone: string
  follows?: string[]
  earlyAdopter?: boolean
  role: USER_ROLE
}

interface RegisteringUser extends Registering<User> {
  created: Date
  password?: string
  nocheck?: boolean
}

interface UpdatingUser extends Omit<Updating<User>, "siret"> {
  updated: Date
}

interface Product extends Identified {
  uid: string // user ID (producer)
  title: string
  quantity: number | null
  unit: Unit | null
  price: number // total, in cents
  address: string
  _geoloc: Geoloc
  placeId: string // from Google places
  city: string
  description: string
  photo: string
  email: string | null
  phone: string | null
  expires: number | null // timestamp in ms (null = disabled)
  // data fan-out:
  producer: string // producer.name
}

interface RegisteringProduct extends Registering<Product> {
  created: Date
  updated?: Date
  expires: Date
  _geoloc: GeoPoint
}

interface ProductPayload extends Omit<RegisteringProduct, "created" | "expires" | "_geoloc"> {
  id?: string
  days: string
  lat: string
  lng: string
}

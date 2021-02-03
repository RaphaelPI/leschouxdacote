interface User {
  uid: string
  email: string
  name: string
}

interface Identified {
  id: string
  created: number // timestamp in ms
  updated?: number // timestamp in ms
}

type Registering<T> = Omit<T, "id" | "updated">

type Unit = "g" | "kg" | "l" | "u"

interface Product extends Identified {
  uid: string // user ID (producer)
  title: string
  quantity: number | null
  unit: Unit | null
  price: number // total, in cents
  address: string
  location: [number, number] // latitude, longitude
  city: string
  description: string
  photo: string
  email: string | null
  phone: string | null
  expires: number | null // timestamp in ms (null = disabled)
  // data fan-out:
  producer: string // producer.name
}

interface FirebaseProduct extends Product {
  created: Timestamp
  updated?: Timestamp
  expires: Timestamp | null
  location: GeoPoint
}

interface RegisteringProduct extends Registering<FirebaseProduct> {
  created: Date
  expires: Date
}

interface Producer extends Identified {
  slug: string
  siret: string
  name: string // company name
  firstname: string
  lastname: string
  address: string
  // location: [number, number] // latitude, longitude
  description: string
  email: string
  phone: string
}

interface FirebaseProducer extends Producer {
  created: Timestamp
}

interface RegisteringProducer extends Registering<Producer> {
  created: Date
  password: string
}

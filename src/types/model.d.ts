interface User {
  uid: string
  email: string
  name: string
}

interface Identified {
  id: string
}

type Registering<T> = Omit<T, "id">

type Unit = "g" | "kg" | "l" | "u"

interface Product extends Identified {
  created: number // timestamp in ms
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
  expires: number // timestamp in ms
  // data fan-out:
  producer: string // producer.name
}

interface FirebaseProduct extends Product {
  created: Timestamp
  expires: Timestamp
  location: GeoPoint
}

interface RegisteringProduct extends Registering<FirebaseProduct> {
  created: Date
  expires: Date
}

interface Producer extends Identified {
  created: number // timestamp in ms
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

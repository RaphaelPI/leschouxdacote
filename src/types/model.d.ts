interface User {
  uid: string
  email: string
  name: string
}

interface Product {
  id: string
  created: number // timestamp
  uid: string // user ID (producer)
  title: string
  quantity?: number
  unit?: "g" | "kg" | "l" | "u"
  price: number // total, in cents
  address: string
  location: [number, number] // latitude, longitude
  city: string
  description: string
  photo: string
  email?: string
  phone?: string
  days: number
  // data fan-out:
  producer: string // producer.name
}

interface FirebaseProduct extends Product {
  created: import("firebase-admin").firestore.Timestamp
  location: import("firebase-admin").firestore.GeoPoint
}

interface RegisteringProduct extends Omit<FirebaseProduct, "id"> {
  created: Date
}

interface Producer {
  id: string
  created: number // timestamp
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
  created: import("firebase-admin").firestore.Timestamp
}

interface RegisteringProducer extends Omit<Producer, "id"> {
  created: Date
  password: string
}

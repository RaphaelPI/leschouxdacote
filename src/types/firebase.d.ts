// shorthands
type UserCredential = firebase.default.auth.UserCredential

type ID = string // generated from Firestore

// for getObject() helpers
interface DataObject {
  id: string
  [key: string]: any
}

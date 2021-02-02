/************************************** SHORTHAND TYPES **************************************/

type FirebaseUser = firebase.default.User
type UserCredential = firebase.default.auth.UserCredential

type FieldPath = firebase.default.firestore.FieldPath
type WhereFilterOp = firebase.default.firestore.WhereFilterOp
type DocumentData = firebase.default.firestore.DocumentData
type CollectionReference<D = DocumentData> = firebase.default.firestore.CollectionReference<D>
type Query<D = DocumentData> = firebase.default.firestore.Query<D>
type QuerySnapshot<D = DocumentData> = firebase.default.firestore.QuerySnapshot<D>
type Timestamp = firebase.default.firestore.Timestamp
type GeoPoint = firebase.default.firestore.GeoPoint

/*********************************************************************************************/

type ID = string // generated from Firestore

type WhereClause = [string | FieldPath, WhereFilterOp, any]

type CollectionOrQuery = CollectionReference<DocumentData> | Query<DocumentData>

// for getObject() helpers
interface DataObject {
  id: string
  [key: string]: any
}

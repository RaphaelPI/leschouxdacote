import * as admin from "firebase-admin"

const app = admin.apps.length
  ? admin.app()
  : admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT,
        clientEmail: process.env.FIREBASE_EMAIL,
        privateKey: `-----BEGIN PRIVATE KEY-----\n${process.env.FIREBASE_PRIVATE_KEY}\n-----END PRIVATE KEY-----\n`,
      }),
      storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT}.appspot.com`,
    })

export const auth = app.auth()
export const firestore = app.firestore()
export const storage = app.storage()
export const GeoPoint = admin.firestore.GeoPoint

export const getObject = (doc: admin.firestore.DocumentData) => {
  const data = doc.data()
  const obj: DataObject = {
    id: doc.id,
  }
  for (const key in data) {
    const value = data[key]
    if (value instanceof admin.firestore.GeoPoint) {
      obj[key] = [value.latitude, value.longitude]
    } else if (value instanceof admin.firestore.Timestamp) {
      obj[key] = value.toMillis()
    } else {
      obj[key] = value
    }
  }
  return obj
}

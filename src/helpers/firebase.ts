import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const app = firebase.apps.length
  ? firebase.app()
  : firebase.initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
      authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT}.firebaseapp.com`,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT,
      storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT}.appspot.com`,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING,
      appId: process.env.NEXT_PUBLIC_FIREBASE_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASURE,
    })

export const auth = app.auth()
export const firestore = app.firestore()

export const getObject = (doc: firebase.firestore.DocumentData) => {
  const data = doc.data()
  const obj: DataObject = {
    id: doc.id,
  }
  for (const key in data) {
    const value = data[key]
    if (value instanceof firebase.firestore.GeoPoint) {
      obj[key] = [value.latitude, value.longitude]
    } else if (value instanceof firebase.firestore.Timestamp) {
      obj[key] = value.toMillis()
    } else {
      obj[key] = value
    }
  }
  return obj
}

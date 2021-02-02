import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

import { useState, useEffect } from "react"

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

interface QueryProps<T> {
  data: T[]
  loading: boolean
}

export const useQuery = function <T extends Identified>(
  collection: string,
  where?: WhereClause | false
): QueryProps<T> {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<T[]>([])

  useEffect(() => {
    if (where === false) {
      // false => no query at this point
      return
    }

    let ref: CollectionOrQuery = firestore.collection(collection)

    if (where) {
      ref = ref.where(...where)
    }

    return ref.onSnapshot((snapshot) => {
      const list = snapshot.docs.map(getObject) as T[]
      setData(list)
      setLoading(false)
    })
  }, [collection, JSON.stringify(where)]) // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading }
}

interface ObjectQueryProps<T> {
  data?: T
  loading: boolean
}

export const useObjectQuery = function <T extends Identified>(collection: string, id: ID | false): ObjectQueryProps<T> {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<T>()

  useEffect(() => {
    if (id === false) {
      // false => no query at this point
      return
    }

    const ref = firestore.collection(collection).doc(id)

    return ref.onSnapshot((snapshot) => {
      setData(getObject(snapshot) as T)
      setLoading(false)
    })
  }, [collection, id])

  return { data, loading }
}

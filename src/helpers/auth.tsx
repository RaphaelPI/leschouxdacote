import { useRouter } from "next/router"
import { createContext, FC, useContext, useEffect, useState } from "react"

import { auth, firestore, getObject } from "src/helpers/firebase"

const ANONYMOUS_ROUTES = ["/connexion", "/inscription", "/confirmation", "/mot-de-passe-oublie"]

export interface IUserContext {
  loading: boolean
  redirecting: boolean
  user: User | null
  producer: Producer | null
  signin: (email: string, pass: string) => Promise<UserCredential>
  signout: () => void
}

const UserContext = createContext<IUserContext>({} as IUserContext)

export const UserProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [producer, setProducer] = useState<Producer | null>(null)
  const [loading, setLoading] = useState(true)
  const { pathname, query, replace } = useRouter()

  useEffect(() => {
    return auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email as string,
          name: firebaseUser.displayName as string,
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (user) {
      firestore
        .collection("producers")
        .doc(user.uid)
        .get()
        .then((doc) => {
          setProducer(getObject(doc) as Producer)
        })
    } else {
      setProducer(null)
    }
  }, [user])

  const signin = (email: string, password: string) => auth.signInWithEmailAndPassword(email, password)

  const isPrivateRoute = pathname.startsWith("/compte")

  const signout = () => {
    if (isPrivateRoute) {
      replace("/")
    }
    auth.signOut()
  }

  const redirectUrl = (() => {
    if (loading) {
      return null
    }
    const destination = query.next as string
    if (user && ANONYMOUS_ROUTES.includes(pathname)) {
      return destination || "/compte"
    }
    if (!user && isPrivateRoute) {
      return "/connexion?next=" + pathname
    }
  })()

  useEffect(() => {
    if (redirectUrl) {
      replace(redirectUrl)
    }
  }, [redirectUrl]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <UserContext.Provider value={{ loading, redirecting: Boolean(redirectUrl), user, producer, signin, signout }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext) as IUserContext

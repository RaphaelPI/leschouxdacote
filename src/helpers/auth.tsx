import { useRouter } from "next/router"
import { createContext, FC, useContext, useEffect, useState } from "react"

import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "src/constants"
import { auth } from "src/helpers/firebase"

export interface IUserContext {
  loading: boolean
  user: User | null
  signin: (email: string, pass: string) => Promise<UserCredential>
  signout: () => void
}

const UserContext = createContext<IUserContext>({} as IUserContext)
export const useUser = () => useContext(UserContext) as IUserContext

export const UserProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const { pathname, query, replace } = useRouter()

  useEffect(() => {
    return auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName,
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })
  }, [])

  const signin = (email: string, password: string) => auth.signInWithEmailAndPassword(email, password)

  const signout = () => {
    auth.signOut()
    if (PRIVATE_ROUTES.includes(pathname)) {
      replace("/")
    }
  }

  const redirectUrl = (() => {
    if (!loading) {
      const destination = query.next as string
      if (user && PUBLIC_ROUTES.includes(pathname)) {
        return destination || "/"
      }
      if (!user && PRIVATE_ROUTES.includes(pathname)) {
        return "/connexion?next=" + pathname
      }
    }
  })()

  useEffect(() => {
    if (redirectUrl) {
      replace(redirectUrl)
    }
  }, [redirectUrl]) // eslint-disable-line react-hooks/exhaustive-deps

  return <UserContext.Provider value={{ user, loading, signout, signin }}>{children}</UserContext.Provider>
}

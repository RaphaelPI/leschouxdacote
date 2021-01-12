import { useRouter } from "next/router"
import { createContext, FC, useContext, useEffect, useState } from "react"

import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "src/constants"
import { auth } from "src/helpers/firebase"

export interface IUserContext {
  loading: boolean
  user: ID | null
  signin: (email: string, pass: string) => Promise<UserCredential>
  signout: () => void
}

interface IAuthenticated extends IUserContext {
  user: ID
}

const UserContext = createContext<IUserContext>({} as IUserContext)
export const useUser = () => useContext(UserContext) as IAuthenticated

export const UserProvider: FC = ({ children }) => {
  const [user, setUser] = useState<ID | null>(null)
  const [loading, setLoading] = useState(true)
  const { pathname, replace } = useRouter()

  useEffect(() => {
    return auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser.uid)
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
      if (user && PUBLIC_ROUTES.includes(pathname)) {
        // TODO: redirect from login/register page to home if logged in, but only when auto login
        return "/"
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
  }, [redirectUrl, replace])

  return <UserContext.Provider value={{ user, loading, signout, signin }}>{children}</UserContext.Provider>
}

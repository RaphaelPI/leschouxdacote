import { useRouter } from "next/router"
import { createContext, FC, useContext, useEffect, useState } from "react"
import Loader from "src/components/Loader"
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
  const router = useRouter()

  useEffect(() => {
    return auth.onAuthStateChanged(async (firebaseUser) => {
      setLoading(true)
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
    if (PRIVATE_ROUTES.includes(router.pathname)) {
      router.replace("/")
    }
  }

  const getRedirectUrl = () => {
    let redirect = ""
    if (!loading && user && PUBLIC_ROUTES.includes(router.pathname)) {
      redirect = "/"
    } else if (!loading && !user && PRIVATE_ROUTES.includes(router.pathname)) {
      redirect = "/connexion?redirect"
    }
    return redirect
  }

  const redirect = getRedirectUrl()
  if (redirect) {
    router.replace(redirect)
  }

  const globalLoading = loading || Boolean(redirect)
  const values = { user, loading, signout, signin }
  return <UserContext.Provider value={values}>{globalLoading ? <Loader /> : children}</UserContext.Provider>
}

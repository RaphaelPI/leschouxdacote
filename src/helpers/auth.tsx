import { useRouter } from "next/router"
import { createContext, FC, useContext, useEffect, useState } from "react"

import { auth, firestore, getObject } from "src/helpers/firebase"
import { AuthUser, Product, UpdatingUser, User } from "src/types/model"
import { USER_ROLE } from "src/constants"
import { getIsProducerFollowed } from "src/helpers/follows"

const ANONYMOUS_ROUTES = ["/connexion", "/inscription", "/confirmation", "/mot-de-passe-oublie"]

export interface IUserContext {
  loading: boolean
  wait: boolean
  authUser: AuthUser | null
  user: User | null
  update: (values: UpdatingUser) => void
  signin: (email: string, pass: string) => Promise<UserCredential>
  signout: () => void
  toggleFollows: (product: Product) => void
  toggleActiveFollow: (producerName: string | undefined) => void
}

const UserContext = createContext<IUserContext>({} as IUserContext)

export const UserProvider: FC = ({ children }) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const { pathname, asPath, query, replace } = useRouter()

  useEffect(() => {
    return auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setAuthUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email as string,
          name: firebaseUser.displayName as string,
        })
      } else {
        setAuthUser(null)
      }
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (authUser) {
      firestore
        .collection("users")
        .doc(authUser.uid)
        .get()
        .then((doc) => {
          setUser(getObject(doc) as User)
        })
    } else {
      setUser(null)
    }
  }, [authUser])

  const signin = (email: string, password: string) => auth.signInWithEmailAndPassword(email, password)

  const isPrivateRoute = pathname.startsWith("/compte")
  const isProducerRoute = pathname.startsWith("/compte/producteur")

  const signout = () => {
    if (isPrivateRoute) {
      replace("/").then(() => auth.signOut())
    } else {
      auth.signOut()
    }
  }

  const redirectUrl = (() => {
    if (loading) {
      return null
    }
    const destination = query.next as string
    if (user && user.role !== USER_ROLE.PRODUCER && isProducerRoute) {
      return "/"
    }
    if (authUser && user?.role === USER_ROLE.PRODUCER && ANONYMOUS_ROUTES.includes(pathname)) {
      return destination || "/compte/producteur/annonces"
    }
    if (authUser && user?.role === USER_ROLE.BUYER && ANONYMOUS_ROUTES.includes(pathname)) {
      return destination || "/"
    }
    if (!authUser && isPrivateRoute) {
      return "/connexion?next=" + asPath
    }
  })()

  useEffect(() => {
    if (redirectUrl) {
      replace(redirectUrl)
    }
  }, [redirectUrl]) // eslint-disable-line react-hooks/exhaustive-deps

  const wait = Boolean(redirectUrl) || (isPrivateRoute && !user)

  const update = (values: UpdatingUser) => {
    setUser({
      ...(user as User),
      ...values,
      updated: Date.now(),
    })
  }

  const toggleFollows = async (product: Product) => {
    if (!user) return
    if (!user.follows) {
      setUser({
        ...(user as User),
        follows: [],
      })
      return
    }
    const hasFollowed = getIsProducerFollowed(product, user)
    if (hasFollowed) {
      setUser({
        ...(user as User),
        follows: user.follows.filter((follow) => follow.producerUID !== product.uid),
      })
      return
    }
    const producerDoc = await firestore.collection("users").doc(product.uid).get()
    const producer = getObject(producerDoc) as User
    const newFollow = {
      producerName: producer.name,
      producerUID: producer.objectID,
      producerAddress: producer.address,
      isActive: true,
    }
    setUser({
      ...(user as User),
      follows: [newFollow, ...user.follows],
    })
  }

  const toggleActiveFollow = (producerName: string | undefined) => {
    if (!user || producerName) return
    if (!user.follows) return
    setUser({
      ...(user as User),
      follows: user.follows.map((follow) => {
        if (follow.producerName === producerName) {
          follow.isActive = !follow.isActive
        }
        return follow
      }),
    })
  }

  return (
    <UserContext.Provider
      value={{ loading, wait, authUser, user, update, signin, signout, toggleFollows, toggleActiveFollow }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)

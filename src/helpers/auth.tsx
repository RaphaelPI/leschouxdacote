import { useRouter } from "next/router"
import React, { createContext, FC, useContext, useEffect, useState } from "react"

import { auth, firestore, getObject } from "src/helpers/firebase"
import { AuthUser, Follow, RegisteringFollowsFields, UpdatingUser, User } from "src/types/model"
import { USER_ROLE } from "src/constants"
import api from "./api"

const ANONYMOUS_ROUTES = ["/connexion", "/inscription", "/confirmation", "/mot-de-passe-oublie"]

export interface IUserContext {
  loading: boolean
  wait: boolean
  authUser: AuthUser | null
  user: User | null
  update: (values: UpdatingUser) => void
  signin: (email: string, pass: string) => Promise<UserCredential>
  signout: () => void
  toggleUserFollow: (producerUid: string) => void
  toggleActiveFollow: (follow: Follow) => void
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

  const toggleUserFollow = async (producerUid: string) => {
    if (!authUser || !user || !producerUid) {
      return replace("/connexion?next=" + asPath)
    }
    try {
      const response: any = await api.post("follows", {
        userId: user.objectID,
        producerUid: producerUid,
        authUserId: authUser.uid,
      } as RegisteringFollowsFields)
      setUser({
        ...(user as User),
        follows: response.follows as Follow[],
      })
    } catch (error) {
      return
    }
  }

  const toggleActiveFollow = async (follow: Follow) => {
    if (!user || !authUser) return
    if (!user.follows) return
    try {
      const response: any = await api.put("follows", {
        userId: user.objectID,
        authUserId: authUser.uid,
        producerName: follow.producerName,
        action: "toggleActive",
      })
      setUser({
        ...(user as User),
        follows: response.follows as Follow[],
      })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <UserContext.Provider
      value={{
        loading,
        wait,
        authUser,
        user,
        update,
        signin,
        signout,
        toggleUserFollow,
        toggleActiveFollow,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)

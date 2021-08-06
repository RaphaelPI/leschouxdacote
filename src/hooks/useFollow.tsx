import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"

import api from "src/helpers/api"
import { Product, RegisteringFollowsFields } from "src/types/model"
import { getIsProducerFollowed } from "src/helpers/follows"
import { useUser } from "src/helpers/auth"

const useFollow = (product: Product | null) => {
  const { authUser, user, setUserFollows } = useUser()
  const { asPath, replace } = useRouter()
  const [isFollowed, setIsFollowed] = useState(getIsProducerFollowed(product, user))

  useEffect(() => {
    setIsFollowed(getIsProducerFollowed(product, user))
  }, [user?.follows]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleFollow = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    if (!authUser || !user || !product) {
      return replace("/connexion?next=" + asPath)
    }
    try {
      await api.post("follows", {
        userId: user.objectID,
        product: product,
        authUserId: authUser.uid,
      } as RegisteringFollowsFields)
      setUserFollows(product)
    } catch (error) {
      return
    }
  }

  return {
    isFollowed,
    handleFollow,
  }
}

export default useFollow

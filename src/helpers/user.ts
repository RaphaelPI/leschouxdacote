import type { User } from "src/types/model"

import { USER_ROLE } from "src/constants"

export const isFollowed = (producerUid: string, currentUser: User | null) => {
  if (!currentUser || !currentUser.followedProducers) {
    return false
  }
  return Boolean(currentUser.followedProducers[producerUid])
}

export const getName = (user: User | null) => {
  if (!user) {
    return ""
  }
  if (user.role === USER_ROLE.PRODUCER) {
    return user.name
  }
  if (user.role === USER_ROLE.BUYER) {
    return `${user.firstname} ${user.lastname}`
  }
  return user.email
}

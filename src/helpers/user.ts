import { USER_ROLE } from "src/constants"
import type { User } from "src/types/model"

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
  return `${user.firstname} ${user.lastname}`
}

import { User } from "src/types/model"

export const getIsProducerFollowed = (producerId: string, currentUser: User | null) => {
  if (!currentUser) {
    return false
  }
  if (!currentUser.follows) {
    return false
  }
  return currentUser.follows.some((follow) => follow === producerId)
}

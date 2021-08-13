import { User } from "src/types/model"

export const getIsProducerFollowed = (producerUid: string | undefined, currentUser: User | null) => {
  if (!currentUser || !producerUid) {
    return false
  }
  if (!currentUser.follows) {
    return false
  }
  return currentUser.follows.some((follow) => follow.producerUID === producerUid)
}

import type { User } from "src/types/model"

export const isFollowed = (producerUid: string, currentUser: User | null) => {
  if (!currentUser || !currentUser.followedProducers) {
    return false
  }
  return Boolean(currentUser.followedProducers[producerUid])
}

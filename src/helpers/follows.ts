import { Product, User } from "src/types/model"

export const getIsProducerFollowed = (product: Product | null, currentUser: User | null) => {
  if (!currentUser || !product) {
    return false
  }
  if (!currentUser.follows) {
    return false
  }
  return currentUser.follows.some((follow) => follow === product.uid)
}

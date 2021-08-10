import { NextApiRequest, NextApiResponse } from "next"

import { badRequest, respond } from "src/helpers-api"
import { RegisteringFollows, RegisteringFollowsFields, User } from "src/types/model"
import { firestore, getObject, getToken } from "src/helpers-api/firebase"
import { getIsProducerFollowed } from "src/helpers/follows"

const handler = async (req: NextApiRequest, res: NextApiResponse<ApiResponse<RegisteringFollows>>) => {
  if (req.method === "POST") {
    const fields = req.body as RegisteringFollowsFields

    const token = await getToken(req)
    if (!token || token.uid !== fields.authUserId) {
      return badRequest(res, 403)
    }

    const producerId = fields.product.uid

    const producerDoc = await firestore.collection("users").doc(producerId).get()
    if (!producerDoc.exists) {
      throw new Error("Producer not found: " + producerId)
    }
    const producer = getObject(producerDoc) as User

    const userDocRef = await firestore.collection("users").doc(fields.userId)
    const userDoc = await userDocRef.get()
    const user = getObject(userDoc) as User

    const hasFollowThisProducer = getIsProducerFollowed(fields.product, user)

    const newFollow = {
      producerName: producer.name,
      producerUID: producer.objectID,
      address: producer.address,
      isActive: true,
    }

    if (!user.follows) {
      await userDocRef.set({ ...user, follows: [newFollow] })
      return respond(res)
    }

    if (user.hasAcceptedFollowsEmail === undefined) {
      await userDocRef.set({ ...user, hasAcceptedFollowsEmail: true })
    }

    if (!hasFollowThisProducer) {
      await userDocRef.set({ ...user, follows: [newFollow, ...user.follows] })
    } else {
      await userDocRef.set({ ...user, follows: user.follows.filter((follow) => follow.producerUID !== producerId) })
    }

    return respond(res)
  }
}

export default handler

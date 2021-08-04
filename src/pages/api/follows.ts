import { NextApiRequest, NextApiResponse } from "next"

import { badRequest, respond } from "src/helpers-api"
import { RegisteringFollows, RegisteringFollowsFields, User } from "src/types/model"
import { firestore, getObject, getToken } from "src/helpers-api/firebase"
import { getIsProductFollowed } from "src/helpers/follows"

const handler = async (req: NextApiRequest, res: NextApiResponse<ApiResponse<RegisteringFollows>>) => {
  if (req.method === "POST") {
    const fields = req.body as RegisteringFollowsFields

    const token = await getToken(req)
    if (!token || token.uid !== fields.authUserId) {
      return badRequest(res, 403)
    }

    const producerDoc = await firestore.collection("users").doc(fields.producerId).get()
    if (!producerDoc.exists) {
      throw new Error("Producer not found: " + fields.producerId)
    }

    const userDocRef = await firestore.collection("users").doc(fields.userId)
    const userDoc = await userDocRef.get()
    const user = getObject(userDoc) as User

    const hasFollowThisProducer = getIsProductFollowed(fields.producerId, user)

    if (!user.follows) {
      await userDocRef.set({ ...user, follows: [fields.producerId] })
      return respond(res)
    }

    if (!hasFollowThisProducer) {
      await userDocRef.set({ ...user, follows: [fields.producerId, ...user.follows] })
    } else {
      await userDocRef.set({ ...user, follows: user.follows.filter((follow) => follow !== fields.producerId) })
    }

    return respond(res)
  }
}

export default handler

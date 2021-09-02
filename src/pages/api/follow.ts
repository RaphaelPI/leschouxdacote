import type { NextApiRequest, NextApiResponse } from "next"
import type { FollowedProducer, User } from "src/types/model"

import { badRequest, respond } from "src/helpers-api"
import { firestore, getObject, getToken, FieldValue } from "src/helpers-api/firebase"
import { isFollowed } from "src/helpers/user"

interface FollowPayload {
  producerUid: string
  follow: boolean
}

interface EmailPayload {
  producerUid: string
  active: boolean
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken(req)
  if (!token) {
    return badRequest(res, 403)
  }

  if (req.method === "POST") {
    const fields = req.body as FollowPayload

    const producerId = fields.producerUid

    const producerDoc = await firestore.collection("users").doc(producerId).get()
    if (!producerDoc.exists) {
      throw new Error("Producer not found: " + producerId)
    }
    const producer = getObject(producerDoc) as User

    const userDocRef = firestore.collection("users").doc(token.uid)
    const userDoc = await userDocRef.get()
    const user = getObject(userDoc) as User

    const followed = isFollowed(fields.producerUid, user)

    if (fields.follow === followed) {
      // already up to date (e.g. late query)
      return respond(res)
    }

    if (fields.follow) {
      const item: FollowedProducer = {
        emailAlert: true,
        name: producer.name,
        address: producer.address,
      }
      await userDocRef.update({
        [`followedProducers.${fields.producerUid}`]: item,
      })
    } else {
      await userDocRef.update({
        [`followedProducers.${fields.producerUid}`]: FieldValue.delete(),
      })
    }

    return respond(res)
  }

  if (req.method === "PUT") {
    console.log("PUT")
    const fields = req.body as EmailPayload

    const userDocRef = firestore.collection("users").doc(token.uid)
    await userDocRef.update({
      [`followedProducers.${fields.producerUid}.emailAlert`]: fields.active,
    })

    return respond(res)
  }
}

export default handler

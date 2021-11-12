import type { NextApiRequest, NextApiResponse } from "next"
import { badRequest, respond } from "src/helpers-api"
import { FieldValue, firestore, getObject, getToken } from "src/helpers-api/firebase"
import { isFollowed } from "src/helpers/user"
import type { FollowedProducer, Follower, Producer, User } from "src/types/model"

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

    const producerDocRef = firestore.collection("users").doc(fields.producerUid)
    const producerDoc = await producerDocRef.get()
    if (!producerDoc.exists) {
      throw new Error("Producer not found: " + fields.producerUid)
    }
    const producer = getObject(producerDoc) as Producer

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
        name: producer.name, // TODO: keep in sync with name updates (use double data fan-out)
        address: producer.address,
      }
      const follower: Follower = {
        emailAlert: true,
      }
      await Promise.all([
        userDocRef.update({
          [`followedProducers.${fields.producerUid}`]: item,
        }),
        producerDocRef.update({
          [`followers.${token.uid}`]: follower,
        }),
      ])
    } else {
      await Promise.all([
        userDocRef.update({
          [`followedProducers.${fields.producerUid}`]: FieldValue.delete(),
        }),
        producerDocRef.update({
          [`followers.${token.uid}`]: FieldValue.delete(),
        }),
      ])
    }

    return respond(res)
  }

  if (req.method === "PUT") {
    const fields = req.body as EmailPayload

    const userDocRef = firestore.collection("users").doc(token.uid)
    const producerDocRef = firestore.collection("users").doc(fields.producerUid)

    await Promise.all([
      userDocRef.update({
        [`followedProducers.${fields.producerUid}.emailAlert`]: fields.active,
      }),
      producerDocRef.update({
        [`followers.${token.uid}.emailAlert`]: fields.active,
      }),
    ])

    return respond(res)
  }

  badRequest(res)
}

export default handler

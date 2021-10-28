import type { NextApiRequest, NextApiResponse } from "next"
import type { Follower, User } from "src/types/model"

import { badRequest, respond } from "src/helpers-api"
import { firestore, getObject } from "src/helpers-api/firebase"

// curl -X POST https://leschouxdacote.fr/api/follows

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const ref = firestore.collection("users")
    const users = await ref.get()
    const followers: Record<string, Record<string, Follower>> = {}
    users.forEach((doc) => {
      const user = getObject(doc) as User
      if (user.followedProducers) {
        for (const producerId in user.followedProducers) {
          if (!followers[producerId]) {
            followers[producerId] = {}
          }
          followers[producerId][user.objectID] = {
            emailAlert: user.followedProducers[producerId].emailAlert,
          }
        }
      }
    })

    const updates = []
    for (const producerId in followers) {
      updates.push(
        ref.doc(producerId).update({
          followers: followers[producerId],
        })
      )
    }
    await Promise.all(updates)

    return respond(res)
  }

  badRequest(res)
}

export default handler

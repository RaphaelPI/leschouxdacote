import type { User, RegisteringUser } from "src/types/model"

import { NextApiRequest, NextApiResponse } from "next"

import { firestore, getObject } from "src/helpers/firebase"
import { USER_ROLE } from "src/constants"
import { respond } from "src/helpers-api"

const handler = async (req: NextApiRequest, res: NextApiResponse<ApiResponse<RegisteringUser>>) => {
  try {
    const snapshot: QuerySnapshot = await firestore.collection("producers").get()
    const producers = snapshot.docs.map(getObject) as User[]
    if (producers.length === 0) return
    for (const doc of producers) {
      await firestore
        .collection("users")
        .doc(doc.objectID)
        .set({
          ...doc,
          role: USER_ROLE.PRODUCER,
        })
    }

    return respond(res)
  } catch (error) {
    return respond(res, { phone: error.message })
  }
}

export default handler

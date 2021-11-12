import type { NextApiRequest, NextApiResponse } from "next"
import { badRequest, respond } from "src/helpers-api"
import { firestore, getToken } from "src/helpers-api/firebase"

interface Payload {
  type: "expired"
  value: boolean
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken(req)
  if (!token) {
    return badRequest(res, 403)
  }

  if (req.method === "POST") {
    const fields = req.body as Payload

    if (fields.type === "expired") {
      await firestore.collection("users").doc(token.uid).update({
        alertsExpired: fields.value,
      })

      return respond(res)
    }
  }

  badRequest(res)
}

export default handler

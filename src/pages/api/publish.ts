import type { NextApiRequest, NextApiResponse } from "next"
import { addDays } from "date-fns"

import { firestore, getObject } from "src/helpers-api/firebase"
import { respond, badRequest } from "src/helpers-api"

const handler = async (req: NextApiRequest, res: NextApiResponse<ApiResponse<RegisteringProduct>>) => {
  const { id, days } = req.body as Publish
  const ref = firestore.collection("products").doc(id)
  const doc = await ref.get()
  if (!doc.exists) {
    return badRequest(res, 404)
  }
  const product = getObject(doc) as Product
  const now = new Date()

  // add days
  if (req.method === "POST") {
    if (!days) {
      return badRequest(res, 400)
    }
    await ref.update({
      updated: now,
      expires: addDays(product.expires || now, days),
    })

    return respond(res)
  }

  // unpublish
  if (req.method === "PUT") {
    await ref.update({
      updated: now,
      expires: null,
    })

    return respond(res)
  }

  // delete
  if (req.method === "DELETE") {
    await ref.delete()

    return respond(res)
  }

  badRequest(res)
}

export default handler

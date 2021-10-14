import type { NextApiRequest, NextApiResponse } from "next"
import type { Product } from "src/types/model"

import { badRequest, respond } from "src/helpers-api"
import { firestore, FieldValue, getObject } from "src/helpers-api/firebase"
import algolia from "src/helpers-api/algolia"

interface Payload {
  id: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { id } = req.body as Payload

    const ref = firestore.collection("products").doc(id)
    const doc = await ref.get()

    if (!doc.exists) {
      throw new Error("Product not found: " + id)
    }

    await ref.update({
      views: FieldValue.increment(1),
    })

    const product = getObject(doc) as Product

    await algolia.partialUpdateObject({
      objectID: id,
      views: (product.views || 0) + 1,
    })

    return respond(res)
  }

  badRequest(res)
}

export default handler

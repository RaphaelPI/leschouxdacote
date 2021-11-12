import type { NextApiRequest, NextApiResponse } from "next"
import { badRequest, respond } from "src/helpers-api"
import { productsIndex } from "src/helpers-api/algolia"
import { FieldValue, firestore, getObject } from "src/helpers-api/firebase"
import type { Product } from "src/types/model"

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

    const product = getObject(doc) as Product

    await Promise.all([
      ref.update({
        views: FieldValue.increment(1),
      }),
      productsIndex.partialUpdateObject({
        objectID: id,
        views: (product.views || 0) + 1,
      }),
    ])

    return respond(res)
  }

  badRequest(res)
}

export default handler

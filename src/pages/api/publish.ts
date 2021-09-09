import type { NextApiRequest, NextApiResponse } from "next"
import type { Product, RegisteringProduct } from "src/types/model"

import { addDays } from "date-fns"

import { firestore, getObject, getToken } from "src/helpers-api/firebase"
import { respond, badRequest } from "src/helpers-api"
import algolia from "src/helpers-api/algolia"

const getDate = (ts?: number | null) => (ts ? new Date(ts) : null)

const handler = async (req: NextApiRequest, res: NextApiResponse<ApiResponse<RegisteringProduct>>) => {
  const { id, days } = req.body as Publish
  const ref = firestore.collection("products").doc(id)
  const doc = await ref.get()
  if (!doc.exists) {
    return badRequest(res, 404)
  }
  const product = getObject(doc) as Product

  const token = await getToken(req)
  if (!token || token.uid !== product.uid) {
    return badRequest(res, 403)
  }

  const now = new Date()

  // add days
  if (req.method === "POST") {
    if (!days) {
      return badRequest(res, 400)
    }
    const online = product.expires != null && product.expires > now.getTime()
    const expires = addDays(product.expires && online ? product.expires : now, days)
    const published = online ? getDate(product.published) : now
    await ref.update({
      updated: now,
      published,
      expires,
    })
    product.updated = now.getTime()
    product.published = published && published.getTime()
    product.expires = expires.getTime()
    await algolia.saveObject(product)

    return respond(res)
  }

  // unpublish
  if (req.method === "PUT") {
    await ref.update({
      updated: now,
      published: null,
      expires: null,
    })
    await algolia.deleteObject(product.objectID)

    return respond(res)
  }

  // delete
  if (req.method === "DELETE") {
    await ref.delete()
    await algolia.deleteObject(product.objectID)

    return respond(res)
  }

  badRequest(res)
}

export default handler

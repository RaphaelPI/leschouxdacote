import { addDays } from "date-fns"
import type { NextApiRequest, NextApiResponse } from "next"
import { badRequest, respond } from "src/helpers-api"
import { productsIndex } from "src/helpers-api/algolia"
import { firestore, getObject, getToken } from "src/helpers-api/firebase"
import type { Product, RegisteringProduct } from "src/types/model"

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
    product.updated = now.getTime()
    product.published = published && published.getTime()
    product.expires = expires.getTime()

    await Promise.all([
      ref.update({
        updated: now,
        published,
        expires,
      }),
      productsIndex.saveObject(product),
    ])

    return respond(res)
  }

  // unpublish
  if (req.method === "PUT") {
    await Promise.all([
      ref.update({
        updated: now,
        published: null,
        expires: null,
      }),
      productsIndex.deleteObject(product.objectID),
    ])

    return respond(res)
  }

  // delete
  if (req.method === "DELETE") {
    await Promise.all([ref.delete(), productsIndex.deleteObject(product.objectID)])

    return respond(res)
  }

  badRequest(res)
}

export default handler

import type { NextApiRequest, NextApiResponse } from "next"
import type { Product } from "src/types/model"

import { firestore, getObject } from "src/helpers-api/firebase"
import { suggestionsIndex } from "src/helpers-api/algolia"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.headers["x-trigger"] !== "crontab") {
    return res.status(403).end()
  }

  const list = await firestore.collection("products").where("_tags", "!=", null).get()

  const tagCounts: Record<string, number> = {}

  list.forEach((doc) => {
    const product = getObject(doc) as Product
    const tags = product._tags as string[]

    tags.forEach((tag) => {
      if (!tagCounts[tag]) {
        tagCounts[tag] = 0
      }
      tagCounts[tag]++
    })
  })

  const updates = Object.keys(tagCounts).map((tag) => ({
    objectID: tag,
    query: tag,
    tag_popularity: tagCounts[tag],
  }))

  suggestionsIndex.partialUpdateObjects(updates, { createIfNotExists: true })
  suggestionsIndex.setSettings({ numericAttributesForFiltering: ["tag_popularity"] })

  res.end()
}

export default handler

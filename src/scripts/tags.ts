import type { Product } from "../types/model"

import { firestore, getObject } from "../helpers-api/firebase"
import { tagsIndex } from "../helpers-api/algolia"

const handler = async () => {
  const list = await firestore.collection("products").where("_tags", "!=", null).get()

  const tagCounts: Record<string, number> = {}

  list.forEach((doc) => {
    const product = getObject(doc) as Product & { _tags: string[] }
    const tags = product._tags

    tags.forEach((tag) => {
      if (!tagCounts[tag]) {
        tagCounts[tag] = 0
      }
      tagCounts[tag]++
    })
  })

  const updates = Object.keys(tagCounts).map((tag) => ({
    objectID: tag,
    tag,
    num: tagCounts[tag],
  }))

  await Promise.all([
    tagsIndex.partialUpdateObjects(updates),
    tagsIndex.setSettings({ numericAttributesForFiltering: ["num"] }),
  ])

  console.log(`Updated ${updates.length} tags.`)
}

handler()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

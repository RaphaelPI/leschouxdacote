import { tagsIndex } from "src/helpers-api/algolia"
import { firestore, getObject } from "src/helpers-api/firebase"
import type { Product } from "src/types/model"

const handler = async () => {
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

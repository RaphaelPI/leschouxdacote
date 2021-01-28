import type { NextApiRequest, NextApiResponse } from "next"

import { firestore } from "src/helpers-api/firebase"
import { respond } from "src/helpers-api"
import { getFormData } from "src/helpers-api/form"
import { resize, upload } from "src/helpers-api/image"

const handler = async (req: NextApiRequest, res: NextApiResponse<ApiResponse<RegisteringProducer>>) => {
  if (req.method === "POST") {
    const [fields, files] = await getFormData(req)
    const doc = firestore.collection("products").doc()
    try {
      const resized = await resize(files.photo.path)
      fields.photo = await upload(resized, doc.id)
    } catch (error) {
      return respond(res, {
        photo: error.message,
      })
    }

    doc.set(fields)

    return respond(res)
  }

  res.status(404)
}

export default handler

export const config = {
  api: {
    bodyParser: false,
  },
}

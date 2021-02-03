import type { NextApiRequest, NextApiResponse } from "next"
import { addDays } from "date-fns"

import { firestore, GeoPoint, getObject } from "src/helpers-api/firebase"
import { respond, badRequest } from "src/helpers-api"
import { getFormData } from "src/helpers-api/form"
import { resize, upload } from "src/helpers-api/image"

const checkRequired = (data: Record<string, any>, fields: string[]) => {
  const found = fields.find((field) => !data[field])
  if (found) {
    return {
      [found]: "Cette information est requise",
    }
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse<ApiResponse<RegisteringProduct>>) => {
  if (req.method === "POST") {
    const [fields, files] = await getFormData(req)

    const errors = checkRequired(fields, ["title", "price", "description", "days"])
    if (errors) {
      return respond(res, errors)
    }
    if (!fields.email && !fields.phone) {
      return respond(res, {
        email: "Vous devez au moins spécifier une adresse e-mail ou un numéro de téléphone",
      })
    }
    if (!files.photo) {
      return respond(res, {
        photo: "La photo est requise",
      })
    }
    const price = fields.price * 100 // store cents
    if (isNaN(price) || price < 0 || !Number.isInteger(price)) {
      return respond(res, {
        price: "Prix invalide",
      })
    }

    const producerDoc = await firestore.collection("producers").doc(fields.uid).get()
    if (!producerDoc.exists) {
      throw new Error("Producer not found: " + fields.uid)
    }
    const producer = getObject(producerDoc) as Producer

    const productDoc = firestore.collection("products").doc()
    let photo: string
    try {
      const resized = await resize(files.photo.path)
      photo = await upload(resized, productDoc.id)
    } catch (error) {
      return respond(res, {
        photo: error.message,
      })
    }

    const created = new Date()

    const product: RegisteringProduct = {
      created,
      uid: fields.uid,
      title: fields.title,
      quantity: Number(fields.quantity) || null,
      unit: fields.unit || null,
      price,
      address: fields.address,
      location: new GeoPoint(Number(fields.lat), Number(fields.lng)),
      city: fields.city,
      description: fields.description,
      photo,
      email: fields.email || null,
      phone: fields.phone || null,
      expires: addDays(created, Number(fields.days)),
      // data fan-out:
      producer: producer.name,
    }

    productDoc.set(product)

    return respond(res)
  }

  if (req.method === "PUT") {
    // TODO
    return badRequest(res, 501)
  }

  if (req.method === "DELETE") {
    // TODO
    return badRequest(res, 501)
  }

  badRequest(res)
}

export default handler

export const config = {
  api: {
    bodyParser: false,
  },
}

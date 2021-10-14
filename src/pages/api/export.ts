import type { NextApiRequest, NextApiResponse } from "next"
import type { Product, User } from "src/types/model"

import { formatISO9075 } from "date-fns"

import { firestore, getObject } from "src/helpers-api/firebase"
import getCsv from "src/helpers-api/csv"
import { USER_ROLE } from "src/constants"

const handler = async (req: NextApiRequest, res: NextApiResponse<string>) => {
  const query = req.query.q

  if (req.method === "GET" && query === "producers") {
    const productsSnapshot = await firestore.collection("products").get()
    const sums: Record<string, number> = {}
    productsSnapshot.forEach((doc) => {
      const product = getObject(doc) as Product
      if (!sums[product.uid]) {
        sums[product.uid] = 1
      } else {
        sums[product.uid]++
      }
    })

    const producersSnapshot = await firestore.collection("users").where("role", "==", USER_ROLE.PRODUCER).get()
    const producers = producersSnapshot.docs.map((doc) => {
      const producer = getObject(doc) as User
      return [
        producer.siret,
        producer.name,
        producer.firstname,
        producer.lastname,
        producer.email,
        producer.phone,
        producer.address,
        producer.created && formatISO9075(producer.created),
        sums[producer.objectID] || 0,
      ]
    })

    try {
      const output = await getCsv(producers, [
        "SIRET",
        "Producteur",
        "Prénom",
        "Nom",
        "E-mail",
        "Téléphone",
        "Adresse",
        "Date d'inscription",
        "Nombre d'annonces",
      ])
      const date = new Date().toISOString().substr(0, 10)
      res.setHeader("Content-Type", "text/csv")
      res.setHeader("Content-Disposition", `attachment; filename="producers-${date}.csv"`)
      res.status(200).send(output)
    } catch (err) {
      console.error(err)
      res.status(500).end()
    }

    return
  }

  res.status(400).send("Bad request")
}

export default handler

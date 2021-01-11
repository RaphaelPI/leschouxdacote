import type { NextApiRequest, NextApiResponse } from "next"
import fetch from "node-fetch"

import ALLOWED_CODES from "src/helpers-api/activityCodes"
import { auth, firestore } from "src/helpers-api/firebase"
import { respond } from "src/helpers-api"

const checkCompany = async (siret: string) => {
  const response = await fetch("https://api.insee.fr/entreprises/sirene/V3/siret/" + siret, {
    headers: {
      Authorization: `Bearer ${process.env.INSEE_TOKEN}`,
    },
  })
  if (response.status === 404) {
    return "Numéro de SIRET introuvable"
  }

  if (response.status >= 400) {
    console.warn("INSEE API HTTP Error", response.status, response.statusText)
    // TODO: report
    return (
      "Une erreur est survenue lors de l'obtention des informations sur votre société. Veuillez réessayer plus tard.\n" +
      "Si le problème persiste, contactez-nous à cette adresse : contact@leschouxdacote.fr"
    )
  }

  const data = await response.json()
  const activityCode = data.etablissement.uniteLegale.activitePrincipaleUniteLegale.replace(".", "")

  if (!ALLOWED_CODES.includes(activityCode)) {
    return (
      "Désolé, l'activité principale de votre société ne vous permet pas de publier des annonces sur notre plateforme.\n" +
      "Si vous avez des questions, contactez-nous à cette adresse : contact@leschouxdacote.fr"
    )
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse<ApiResponse<RegisteringProducer>>) => {
  if (req.method === "POST") {
    // user registration
    const producer = req.body as RegisteringProducer
    producer.siret = producer.siret.replace(/\s+/g, "") // remove spaces
    const checkError = await checkCompany(producer.siret)
    if (checkError) {
      return respond(res, {
        siret: checkError,
      })
    }

    try {
      const user = await auth.createUser({
        email: producer.email,
        password: producer.password,
        displayName: producer.name,
        phoneNumber: producer.phone.replace(/\s+/g, "").replace(/^0/, "+33"),
        emailVerified: false,
      })

      await firestore.collection("producers").doc(user.uid).set(producer)
    } catch (error) {
      if (error.code === "auth/email-already-exists") {
        return respond(res, {
          email: "Cette adresse e-mail est déjà utilisée",
        })
      }
      // TODO: report
      throw error
    }

    return respond(res)
  }

  res.status(404)
}

export default handler

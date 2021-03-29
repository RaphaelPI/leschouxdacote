import type { NextApiRequest, NextApiResponse } from "next"
import fetch from "node-fetch"

import ALLOWED_CODES from "src/helpers-api/activityCodes"
import { auth, firestore, getToken } from "src/helpers-api/firebase"
import { respond, badRequest } from "src/helpers-api"
import { sendEmail } from "src/helpers-api/mail"
import algolia from "src/helpers-api/algolia"
import { normalizeNumber } from "src/helpers/validators"
import { CONTACT_EMAIL } from "src/constants"

const checkCompany = async (siret: string, nocheck = false) => {
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
    return `Une erreur est survenue lors de l'obtention des informations sur votre société. Veuillez réessayer plus tard.
    Si le problème persiste, contactez-nous à cette adresse : ${CONTACT_EMAIL}`
  }

  if (!nocheck) {
    const data = await response.json()
    const activityCode = data.etablissement.uniteLegale.activitePrincipaleUniteLegale.replace(".", "")

    if (!ALLOWED_CODES.includes(activityCode)) {
      return `Désolé, l'activité principale de votre société ne vous permet pas de publier des annonces sur notre plateforme.
    Si vous avez des questions, contactez-nous à cette adresse : ${CONTACT_EMAIL}`
    }
  }

  const snapshot = await firestore.collection("producers").where("siret", "==", siret).get()
  if (snapshot.size > 0) {
    return `Le compte de cet établissement est déjà créé`
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse<ApiResponse<RegisteringProducer>>) => {
  if (req.method === "POST") {
    // user registration
    const producer = req.body as RegisteringProducer // TODO: validate fields
    producer.siret = producer.siret.replace(/\s+/g, "") // remove spaces
    const checkError = await checkCompany(producer.siret, producer.nocheck)
    if (checkError) {
      return respond(res, {
        siret: checkError,
      })
    }

    producer.created = new Date()
    producer.phone = normalizeNumber(producer.phone)

    try {
      const user = await auth.createUser({
        email: producer.email,
        password: producer.password,
        displayName: producer.name,
        // phoneNumber: producer.phone.replace(/\s+/g, "").replace(/^0/, "+33"),
      })

      delete producer.password
      await firestore.collection("producers").doc(user.uid).set(producer)

      const link = await auth.generateEmailVerificationLink(producer.email, {
        url: req.headers.origin + "/connexion",
      })

      const message = `Cliquez sur ce lien pour valider votre compte :\n\n${link}`
      await sendEmail(producer.email, "Validation de votre compte", message)
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        return respond(res, {
          email: "Adresse e-mail invalide",
        })
      }
      if (error.code === "auth/email-already-exists") {
        return respond(res, {
          email: "Cette adresse e-mail est déjà utilisée",
        })
      }
      if (error.code === "auth/phone-number-already-exists") {
        return respond(res, {
          phone: "Ce numéro de téléphone est déjà utilisé",
        })
      }
      // TODO: report
      throw error
    }

    return respond(res)
  }

  if (req.method === "PUT") {
    const token = await getToken(req)
    if (!token) {
      return badRequest(res, 403)
    }

    const producer = req.body as UpdatingProducer // TODO: validate fields
    producer.updated = new Date()
    producer.phone = normalizeNumber(producer.phone)

    const snapshot = await firestore.collection("products").where("uid", "==", token.uid).get()
    const updates: Readonly<Promise<any>>[] = []
    snapshot.forEach((doc) => {
      updates.push(doc.ref.update({ producer: producer.name }))
      updates.push(algolia.partialUpdateObject({ objectID: doc.id, producer: producer.name }))
    })
    await Promise.all(updates)
    await firestore.collection("producers").doc(token.uid).update(producer)

    return respond(res)
  }

  if (req.method === "DELETE") {
    const token = await getToken(req)
    if (!token) {
      return badRequest(res, 403)
    }

    const snapshot = await firestore.collection("products").where("uid", "==", token.uid).get()
    const deletions: Readonly<Promise<any>>[] = []
    snapshot.forEach((doc) => {
      deletions.push(doc.ref.delete())
      deletions.push(algolia.deleteObject(doc.id))
    })
    await Promise.all(deletions)
    await firestore.collection("producers").doc(token.uid).delete()
    await auth.deleteUser(token.uid)

    return respond(res)
  }

  badRequest(res)
}

export default handler

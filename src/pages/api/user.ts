import type { NextApiRequest, NextApiResponse } from "next"
import type { RegisteringUser, UpdatingUser } from "src/types/model"

import fetch from "node-fetch"

import { auth, firestore, getToken } from "src/helpers-api/firebase"
import { badRequest, respond } from "src/helpers-api"
import algolia from "src/helpers-api/algolia"
import { normalizeNumber } from "src/helpers/validators"
import { CONTACT_EMAIL, USER_ROLE } from "src/constants"

const checkCompany = async (siret: string, nocheck = false) => {
  const response = await fetch("https://api.insee.fr/entreprises/sirene/V3/siret/" + siret, {
    headers: {
      Authorization: `Bearer ${process.env.INSEE_TOKEN}`,
    },
  })
  if (response.status === 404) {
    return "Numéro de SIRET introuvable"
  }
  if (response.status === 403) {
    return "Ce numéro de SIRET n'existe pas ou plus, ou ses données ne sont pas consultables"
  }

  if (response.status >= 400) {
    console.warn("INSEE API HTTP Error", response.status, response.statusText)
    // TODO: report
    return `Une erreur est survenue lors de l'obtention des informations sur votre société. Veuillez réessayer plus tard.
    Si le problème persiste, contactez-nous à cette adresse : ${CONTACT_EMAIL}`
  }

  const snapshot = await firestore.collection("users").where("siret", "==", siret).get()
  if (snapshot.size > 0) {
    return `Le compte de cet établissement est déjà créé`
  }

  if (!nocheck) {
    const data: any = await response.json()
    const activityCode = data.etablissement.uniteLegale.activitePrincipaleUniteLegale.replace(".", "")

    const { exists } = await firestore.collection("activityCodes").doc(activityCode).get()

    if (!exists) {
      return `Désolé, l'activité principale de votre société ne vous permet pas de publier des annonces sur notre plateforme.
    Si vous avez des questions, contactez-nous à cette adresse : ${CONTACT_EMAIL}`
    }
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse<ApiResponse<RegisteringUser>>) => {
  if (req.method === "POST") {
    // user registration
    const user = req.body as RegisteringUser // TODO: validate fields
    const isProducer = user.role === USER_ROLE.PRODUCER
    if (isProducer && user.siret) {
      user.siret = user.siret.replace(/\s+/g, "") // remove spaces
      const checkError = await checkCompany(user.siret, user.nocheck)
      if (checkError) {
        return respond(res, {
          siret: checkError,
        })
      }
      user.phone = normalizeNumber(user.phone)
    }

    user.created = new Date()

    try {
      const createdUser = await auth.createUser({
        email: user.email,
        password: user.password,
        displayName: user.name,
        // phoneNumber: producer.phone.replace(/\s+/g, "").replace(/^0/, "+33"),
      })

      delete user.password
      await firestore
        .collection("users")
        .doc(createdUser.uid)
        .set(
          isProducer
            ? user
            : {
                created: user.created,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                nocheck: user.nocheck,
                role: USER_ROLE.BUYER,
              }
        )
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

    const user = req.body as UpdatingUser // TODO: validate fields
    user.updated = new Date()
    if (user.role === USER_ROLE.PRODUCER) {
      user.phone = normalizeNumber(user.phone)
    }

    const snapshot = await firestore.collection("products").where("uid", "==", token.uid).get()
    const updates: Readonly<Promise<any>>[] = []
    snapshot.forEach((doc) => {
      updates.push(doc.ref.update({ producer: user.name }))
      updates.push(algolia.partialUpdateObject({ objectID: doc.id, producer: user.name }))
    })
    await Promise.all(updates)
    await firestore.collection("users").doc(token.uid).update(user)

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
    await firestore.collection("users").doc(token.uid).delete()
    await auth.deleteUser(token.uid)

    return respond(res)
  }

  badRequest(res)
}

export default handler

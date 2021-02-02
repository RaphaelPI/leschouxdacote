import { useState } from "react"

import MainLayout from "src/layouts/MainLayout"
import { Form, TextInput, SubmitButton, ValidationError } from "src/components/Form"
import Link from "src/components/Link"
import { auth } from "src/helpers/firebase"
import { getAbsoluteUrl } from "src/helpers/text"
import { Register } from "src/pages/connexion"

const LostPasswordPage = () => {
  const [sent, setSent] = useState(false)

  const handleSubmit: Submit<LostPassword> = async (data) => {
    try {
      await auth.sendPasswordResetEmail(data.email, {
        url: getAbsoluteUrl("connexion"),
      })
      setSent(true)
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        throw new ValidationError("email", "Adresse e-mail invalide")
      }
      if (error.code === "auth/user-not-found") {
        throw new ValidationError("email", "Adresse e-mail inconnue")
      }
      throw error
    }
  }

  return (
    <MainLayout title="Mot de passe oublié">
      <Form onSubmit={handleSubmit}>
        <h1>Mot de passe oublié</h1>
        {sent ? (
          <p>Veuillez cliquer sur le lien de réinitialisation que nous venons de vous envoyer</p>
        ) : (
          <>
            <TextInput name="email" label="Adresse e-mail" type="email" required />
            <SubmitButton />
            <Register>
              <Link href="/inscription">Pas encore inscrit ? Créer un compte vendeur</Link>
            </Register>
          </>
        )}
      </Form>
    </MainLayout>
  )
}

export default LostPasswordPage

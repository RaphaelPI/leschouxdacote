import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

import MainLayout from "src/layouts/MainLayout"
import { Form, TextInput, SubmitButton } from "src/components/Form"
import Link from "src/components/Link"
import { auth } from "src/helpers/firebase"
import { getAbsoluteUrl } from "src/helpers/text"
import { handleError } from "src/helpers/errors"
import { Register } from "src/pages/connexion"

const LostPassword = () => {
  const { register, handleSubmit, setError, errors, formState } = useForm<Signin>()
  const [sent, setSent] = useState(false)

  const onValid: SubmitHandler<LostPassword> = async (data) => {
    try {
      await auth.sendPasswordResetEmail(data.email, {
        url: getAbsoluteUrl("connexion"),
      })
      setSent(true)
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setError("email", {
          message: "Adresse e-mail invalide",
          shouldFocus: true,
        })
      } else if (error.code === "auth/user-not-found") {
        setError("email", {
          message: "Adresse e-mail inconnue",
          shouldFocus: true,
        })
      } else {
        handleError(error)
      }
    }
  }

  return (
    <MainLayout title="Mot de passe oublié">
      <Form method="POST" onSubmit={handleSubmit(onValid)}>
        <h1>Mot de passe oublié</h1>
        {sent ? (
          <p>Veuillez cliquer sur le lien de réinitialisation que nous venons de vous envoyer</p>
        ) : (
          <>
            <TextInput ref={register} error={errors.email} name="email" label="Adresse e-mail" type="email" required />
            <SubmitButton type="submit" $variant="green" disabled={formState.isSubmitting}>
              {formState.isSubmitting ? "Chargement…" : "Valider"}
            </SubmitButton>
            <Register>
              <Link href="/inscription">Pas encore inscrit ? Créer un compte vendeur</Link>
            </Register>
          </>
        )}
      </Form>
    </MainLayout>
  )
}

export default LostPassword

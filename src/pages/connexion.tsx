import { SubmitHandler, useForm } from "react-hook-form"
import styled from "styled-components"
import { useRouter } from "next/router"

import { Form, SubmitButton, TextInput } from "src/components/Form"
import Link from "src/components/Link"
import { COLORS } from "src/constants"
import { useUser } from "src/helpers/auth"
import MainLayout from "src/layouts/MainLayout"
import { handleError } from "src/helpers/errors"

const Warning = styled.div`
  color: ${COLORS.error};
  text-align: center;
  border-bottom: 1px solid ${COLORS.border};
  margin-bottom: 40px;
`
const LostPassword = styled.div`
  font-size: 0.8em;
  color: ${COLORS.grey};
  text-align: right;
`
export const Register = styled.div`
  text-align: center;
`

const SignInPage = () => {
  const { register, handleSubmit, setError, errors, formState } = useForm<Signin>()
  const { signin } = useUser()
  const { query } = useRouter()

  const onValid: SubmitHandler<Signin> = async (data) => {
    try {
      await signin(data.email, data.password)
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setError("email", {
          message: "Adresse e-mail invalide",
          shouldFocus: true,
        })
      } else if (error.code === "auth/user-not-found") {
        setError("email", {
          message: "L'adresse e-mail est inconnue",
          shouldFocus: true,
        })
      } else if (error.code === "auth/user-disabled") {
        setError("email", {
          message: "Ce compte est désactivé",
          shouldFocus: true,
        })
      } else if (error.code === "auth/wrong-password") {
        setError("password", {
          message: "Le mot de passe est incorrect",
          shouldFocus: true,
        })
      } else {
        handleError(error)
      }
    }
  }

  return (
    <MainLayout title="Connexion">
      {query.next && (
        <Warning>
          <p>Désolé, vous devez être connecté pour accéder à cette page</p>
        </Warning>
      )}
      <Form method="POST" onSubmit={handleSubmit(onValid)}>
        <h1>Connexion au compte vendeur</h1>
        <TextInput ref={register} error={errors.email} name="email" label="Adresse e-mail" type="email" required />
        <TextInput
          ref={register}
          error={errors.password}
          name="password"
          label="Mot de passe"
          type="password"
          required
        />
        <LostPassword>
          <Link href="/mot-de-passe-oublie">Mot de passe oublié ?</Link>
        </LostPassword>
        <SubmitButton type="submit" $variant="green" disabled={formState.isSubmitting}>
          {formState.isSubmitting ? "Chargement…" : "Valider"}
        </SubmitButton>
        <Register>
          <Link href="/inscription">Pas encore inscrit ? Créer un compte vendeur</Link>
        </Register>
      </Form>
    </MainLayout>
  )
}

export default SignInPage

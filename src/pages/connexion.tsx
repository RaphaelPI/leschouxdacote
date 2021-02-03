import styled from "styled-components"
import { useRouter } from "next/router"

import { Form, SubmitButton, TextInput, ValidationError } from "src/components/Form"
import Link from "src/components/Link"
import { COLORS } from "src/constants"
import { useUser } from "src/helpers/auth"
import MainLayout from "src/layouts/MainLayout"

const Warning = styled.div`
  color: ${COLORS.red};
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

const LoginPage = () => {
  const { signin } = useUser()
  const { query } = useRouter()

  const handleSubmit: Submit<Signin> = async (data) => {
    try {
      await signin(data.email, data.password)
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        throw new ValidationError("email", "Adresse e-mail invalide")
      }
      if (error.code === "auth/user-not-found") {
        throw new ValidationError("email", "L'adresse e-mail est inconnue")
      }
      if (error.code === "auth/user-disabled") {
        throw new ValidationError("email", "Ce compte est désactivé")
      }
      if (error.code === "auth/wrong-password") {
        throw new ValidationError("password", "Le mot de passe est incorrect")
      }
      throw error
    }
  }

  return (
    <MainLayout title="Connexion">
      {query.next && (
        <Warning>
          <p>Désolé, vous devez être connecté pour accéder à cette page</p>
        </Warning>
      )}
      <Form onSubmit={handleSubmit}>
        <h1>Connexion au compte vendeur</h1>
        <TextInput name="email" label="Adresse e-mail" type="email" required />
        <TextInput name="password" label="Mot de passe" type="password" required />
        <LostPassword>
          <Link href="/mot-de-passe-oublie">Mot de passe oublié ?</Link>
        </LostPassword>
        <SubmitButton />
        <Register>
          <Link href="/inscription">Pas encore inscrit ? Créer un compte vendeur</Link>
        </Register>
      </Form>
    </MainLayout>
  )
}

export default LoginPage

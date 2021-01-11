import { SubmitHandler, useForm } from "react-hook-form"
import styled from "styled-components"
import { useRouter } from "next/router"

import { Form, SubmitButton, TextInput } from "src/components/Form"
import Link from "src/components/Link"
import { COLORS } from "src/constants"
import { useUser } from "src/helpers/auth"
import MainLayout from "src/layouts/MainLayout"

const LostPassword = styled(Link)`
  font-size: 0.8em;
  color: ${COLORS.grey};
  text-align: right;
`
const Align = styled.div<{ $align: "center" | "right" }>`
  text-align: ${({ $align }) => $align};
`
const HR = styled.hr`
  border-top: ${COLORS.grey};
  margin-bottom: 20px;
`

const SignInPage = () => {
  const { register, handleSubmit, setError, errors, formState } = useForm<Signin>()
  const { signin } = useUser()
  const router = useRouter()

  const onValid: SubmitHandler<Signin> = async (data) => {
    try {
      await signin(data.email, data.password)
      router.push("/")
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        setError("password", {
          message: "Le mot de passe est incorrect",
          shouldFocus: true,
        })
      }
    }
  }

  return (
    <MainLayout title="Connexion">
      {router.query.hasOwnProperty("redirect") && (
        <Align $align="center">
          <h1>Désolé, vous devez être connecté pour accéder à cette page</h1>
          <HR />
        </Align>
      )}
      <Form method="POST" onSubmit={handleSubmit(onValid)}>
        <h1>Connexion au compte vendeur</h1>
        <TextInput name="email" ref={register} error={errors.email} label="Adresse email" required />
        <TextInput
          ref={register}
          name="password"
          label="Mot de passe"
          error={errors.password}
          type="password"
          required
        />
        <Align $align="right">
          <LostPassword href="/mot-de-passe-oublie">Mot de passe oublié ?</LostPassword>
        </Align>
        <SubmitButton type="submit" $variant="green" disabled={formState.isSubmitting}>
          {formState.isSubmitting ? "Chargement…" : "Valider"}
        </SubmitButton>
        <Align $align="center">
          <Link href="inscription">Pas encore inscrit ? Créer un compte vendeur</Link>
        </Align>
      </Form>
    </MainLayout>
  )
}

export default SignInPage

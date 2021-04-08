import { useRouter } from "next/router"
import styled from "@emotion/styled"

import Layout from "src/layout"
import { Form, TextInput, SubmitButton } from "src/components/Form"
import api from "src/helpers/api"
import { validateSiret, validatePhoneNumber, validatePassword, MIN_PASSWORD_LENGTH } from "src/helpers/validators"

const Paragraph = styled.p`
  a {
    text-decoration: underline;
  }
`

const RegisterPage = () => {
  const { query, push } = useRouter()

  const handleSubmit: Submit<RegisteringProducer> = async (values) => {
    values.nocheck = Boolean(query.nocheck)
    await api.post("user", values)
    push("/confirmation")
  }

  return (
    <Layout title="Inscription">
      <Form title="Création du profil vendeur" hasRequired onSubmit={handleSubmit}>
        <TextInput name="siret" label="SIRET" required validate={validateSiret} />
        <TextInput name="name" label="Nom commercial" required maxLength={180} />
        <TextInput name="address" label="Adresse" rows={3} required />
        <TextInput name="firstname" label="Prénom" required maxLength={50} />
        <TextInput name="lastname" label="Nom" required maxLength={50} />
        <TextInput name="description" label="Description" rows={6} required minLength={15} maxLength={4000} />
        <TextInput name="phone" label="Téléphone" type="tel" required validate={validatePhoneNumber} />
        <TextInput name="email" label="E-mail" type="email" required />
        <TextInput
          name="password"
          label="Mot de passe"
          type="password"
          required
          minLength={MIN_PASSWORD_LENGTH}
          autoComplete="new-password"
          validate={validatePassword}
        />
        <Paragraph>
          En créant mon compte je reconnais avoir lu et accepté les{" "}
          <a href="https://info.leschouxdacote.fr/cgs" target="_blank" rel="noopener">
            Conditions Générales d’Utilisation
          </a>
          .
        </Paragraph>
        <SubmitButton />
      </Form>
    </Layout>
  )
}

export default RegisterPage

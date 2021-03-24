import { useRouter } from "next/router"

import Layout from "src/layout"
import { Form, TextInput, SubmitButton } from "src/components/Form"
import api from "src/helpers/api"
import { validateSiret, validatePhoneNumber, validatePassword, MIN_PASSWORD_LENGTH } from "src/helpers/validators"

const RegisterPage = () => {
  const { push } = useRouter()

  const handleSubmit: Submit<RegisteringProducer> = async (values) => {
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
        <SubmitButton />
      </Form>
    </Layout>
  )
}

export default RegisterPage

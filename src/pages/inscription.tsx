import { useRouter } from "next/router"

import MainLayout from "src/layouts/MainLayout"
import { Form, TextInput, SubmitButton } from "src/components/Form"
import api from "src/helpers/api"
import { validateLength, validatePassword } from "src/helpers/validators"

const RegisterPage = () => {
  const { push } = useRouter()

  const handleSubmit: Submit<RegisteringProducer> = async (data) => {
    await api.post("user", data)
    push("/confirmation")
  }

  return (
    <MainLayout title="Inscription">
      <Form onSubmit={handleSubmit}>
        <h1>Création du profil vendeur</h1>
        <TextInput
          name="siret"
          label="SIRET"
          required
          validate={validateLength(14, "Désolé, le SIRET doit comporter 14 chiffres")}
        />
        <TextInput name="name" label="Nom commercial" required maxLength={180} />
        <TextInput name="address" label="Adresse" rows={3} required />
        <TextInput name="firstname" label="Prénom" required maxLength={50} />
        <TextInput name="lastname" label="Nom" required maxLength={50} />
        <TextInput name="description" label="Description" rows={6} required minLength={15} maxLength={4000} />
        <TextInput
          name="phone"
          label="Téléphone"
          type="tel"
          required
          validate={validateLength(10, "Désolé, le numéro de téléphone doit comporter 10 chiffres")}
        />
        <TextInput name="email" label="E-mail" type="email" required />
        <TextInput
          name="password"
          label="Mot de passe"
          type="password"
          required
          minLength={12}
          autoComplete="new-password"
          validate={validatePassword}
        />
        <SubmitButton />
      </Form>
    </MainLayout>
  )
}

export default RegisterPage

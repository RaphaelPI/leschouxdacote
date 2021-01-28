import { SubmitHandler } from "react-hook-form"
import { useRouter } from "next/router"

import MainLayout from "src/layouts/MainLayout"
import { Form, TextInput, SubmitButton, ValidationError } from "src/components/Form"
import api from "src/helpers/api"

const validateLength = (length: number, message: string) => (value: string) =>
  value.replace(/\s+/g, "").length === length || message

const validatePassword = (value: string) => {
  const message =
    "Désolé, le mot de passe doit contenir 12 caractères minimum dont au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial"
  if (value.length < 12) {
    return message
  }
  const numUpperCaseChars = value.replace(/[^A-Z]/g, "").length
  const numLowerCaseChars = value.replace(/[^a-z]/g, "").length
  const numNumbers = value.replace(/[^0-9]/g, "").length
  const numSpecialChars = value.replace(/[A-Za-z0-9]/g, "").length
  if (numUpperCaseChars < 1 || numLowerCaseChars < 1 || numNumbers < 1 || numSpecialChars < 1) {
    return message
  }
  return true
}

const RegisterPage = () => {
  const { push } = useRouter()

  const handleSubmit: SubmitHandler<RegisteringProducer> = async (data) => {
    const response = await api.post<ApiResponse<RegisteringProducer>>("user", data)
    if (response.ok) {
      push("/confirmation")
    } else {
      Object.keys(response.errors).forEach((key) => {
        throw new ValidationError(key, response.errors[key])
      })
    }
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

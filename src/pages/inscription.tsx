import { useForm, SubmitHandler } from "react-hook-form"

import MainLayout from "src/layouts/MainLayout"
import { Form, TextInput, SubmitButton } from "src/components/Form"
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
  const { register, handleSubmit, errors, setError, formState } = useForm<RegisteringProducer>()

  const onValid: SubmitHandler<RegisteringProducer> = async (data) => {
    const response = await api.post<ApiResponse<RegisteringProducer>>("user", data)
    Object.keys(response.errors).forEach((key) => {
      setError(key, {
        message: response.errors[key],
        shouldFocus: true,
      })
    })
  }

  return (
    <MainLayout title="Inscription">
      <Form method="POST" onSubmit={handleSubmit(onValid)}>
        <h1>Création du profil vendeur</h1>
        <TextInput
          name="siret"
          ref={register({
            validate: validateLength(14, "Désolé, le SIRET doit comporter 14 chiffres"),
          })}
          error={errors.siret}
          label="SIRET"
          required
        />
        <TextInput ref={register} name="name" label="Nom commercial" required maxLength={180} />
        <TextInput ref={register} name="address" label="Adresse" rows={3} required />
        <TextInput ref={register} name="firstname" label="Prénom" required maxLength={50} />
        <TextInput ref={register} name="lastname" label="Nom" required maxLength={50} />
        <TextInput
          ref={register}
          name="description"
          label="Description"
          rows={6}
          required
          minLength={15}
          maxLength={4000}
        />
        <TextInput
          name="phone"
          ref={register({
            validate: validateLength(10, "Désolé, le numéro de téléphone doit comporter 10 chiffres"),
          })}
          error={errors.phone}
          label="Téléphone"
          type="tel"
          required
        />
        <TextInput ref={register} name="email" label="E-mail" type="email" required />
        <TextInput
          name="password"
          ref={register({
            validate: validatePassword,
          })}
          error={errors.password}
          label="Mot de passe"
          type="password"
          required
          minLength={12}
          autoComplete="new-password"
        />
        <SubmitButton type="submit" $variant="green" disabled={formState.isSubmitting}>
          {formState.isSubmitting ? "Chargement…" : "Valider"}
        </SubmitButton>
      </Form>
    </MainLayout>
  )
}

export default RegisterPage

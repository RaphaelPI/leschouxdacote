import { useRouter } from "next/router"
import styled from "@emotion/styled"
import Layout from "src/layout"
import { Form, SubmitButton, TextInput } from "src/components/Form"
import api from "src/helpers/api"
import { MIN_PASSWORD_LENGTH, validatePassword, validatePhoneNumber, validateSiret } from "src/helpers/validators"
import React, { useState } from "react"
import { USER_ROLE } from "../constants"
import { RegisteringUser } from "../types/model"

const Paragraph = styled.p`
  a {
    text-decoration: underline;
  }
`

const MarginY = styled.div`
  margin: 30px 0;
`

const MarginLeft = styled.div`
  margin-left: 10px;
  display: inline-block;
`

const Label = styled.label`
  margin-left: 5px;
`

const RegisterPage = () => {
  const { query, push } = useRouter()
  const [role, setRole] = useState(USER_ROLE.PRODUCER)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value as USER_ROLE)
  }

  const handleSubmit: Submit<RegisteringUser> = async (values) => {
    values.nocheck = Boolean(query.nocheck)
    await api.post("user", { ...values, role })
    push("/confirmation")
  }

  return (
    <Layout title="Inscription">
      <Form title="Création du compte" hasRequired onSubmit={handleSubmit} resetOnChange={role}>
        <MarginY>
          <input
            id="producer"
            type="radio"
            name="role"
            value={USER_ROLE.PRODUCER}
            onChange={handleChange}
            checked={role === USER_ROLE.PRODUCER}
          />
          <Label htmlFor="producer">Producteur</Label>
          <MarginLeft>
            <input
              id="user"
              type="radio"
              name="role"
              value={USER_ROLE.BUYER}
              onChange={handleChange}
              checked={role === USER_ROLE.BUYER}
            />
            <Label htmlFor="user">Acheteur</Label>
          </MarginLeft>
        </MarginY>
        {role === USER_ROLE.PRODUCER && (
          <>
            <TextInput name="siret" label="SIRET" required validate={validateSiret} />
            <TextInput name="name" label="Nom commercial" required maxLength={180} />
            <TextInput name="address" label="Adresse" rows={3} required />
            <TextInput name="description" label="Description" rows={6} required minLength={15} maxLength={4000} />
            <TextInput name="phone" label="Téléphone" type="tel" required validate={validatePhoneNumber} />
          </>
        )}
        <TextInput name="firstname" label="Prénom" required maxLength={50} />
        <TextInput name="lastname" label="Nom" required maxLength={50} />
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

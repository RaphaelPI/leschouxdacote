import type { RegisteringUser } from "src/types/model"

import React from "react"
import HttpError from "standard-http-error"
import { useRouter } from "next/router"
import styled from "@emotion/styled"
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import Layout from "src/layout"
import { StyledButton, ValidationError } from "src/components/Form"
import api from "src/helpers/api"
import { MIN_PASSWORD_LENGTH } from "src/helpers/validators"
import { LAYOUT, USER_ROLE } from "src/constants"
import { StyledForm, Title, Required, YupInput as Input, YupRadioInput as RadioInput } from "src/components/YupForm"
import { schemaSignUp } from "src/schemas/form.schemas"
import { handleError } from "src/helpers/errors"

const Paragraph = styled.p`
  a {
    text-decoration: underline;
  }
`

const Flex = styled.div`
  margin: 50px 0;
  display: flex;
  gap: 5px;

  @media (max-width: ${LAYOUT.mobile}px) {
    flex-direction: column;
    align-items: center;
  }
`

const RegisterPage = () => {
  const { query, push } = useRouter()

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schemaSignUp),
    defaultValues: { role: USER_ROLE.PRODUCER } as RegisteringUser,
  })

  const role = watch("role")

  const onSubmit: SubmitHandler<RegisteringUser> = async (values) => {
    values.nocheck = Boolean(query.nocheck)
    try {
      await api.post("user", { ...values, role })
      await push("/connexion?success=1")
    } catch (error) {
      if (error instanceof ValidationError) {
        setError(error.field as any, { message: error.message }, { shouldFocus: true })
      } else if (error instanceof HttpError && error.code === 413) {
        alert(`Désolé, votre fichier image est trop gros.
La limite est pour l'instant de 5 Mo par photo.

Nous espérons lever cette limitation dans les semaines à venir.`)
      } else {
        handleError(error)
      }
    }
  }

  return (
    <Layout title="Inscription">
      <StyledForm method="POST" onSubmit={handleSubmit(onSubmit)}>
        <Title>Création du compte </Title>
        <Required>* champs obligatoires</Required>
        <Flex>
          <RadioInput
            value={USER_ROLE.PRODUCER}
            id="producteur"
            label="Je suis un producteur"
            error={errors.role}
            name="role"
            register={register}
            required
          />
          <RadioInput
            value={USER_ROLE.BUYER}
            id="buyer"
            label="Je suis un acheteur"
            error={errors.role}
            name="role"
            register={register}
            required
          />
        </Flex>
        {role === USER_ROLE.PRODUCER && (
          <>
            <Input label="SIRET" error={errors.siret} required name="siret" register={register} />
            <Input
              label="Nom commercial"
              error={errors.name}
              required
              name="name"
              register={register}
              maxLength={180}
            />
            <Input label="Adresse" error={errors.name} required name="address" register={register} rows={3} />
            <Input
              label="Description"
              error={errors.description}
              required
              name="description"
              register={register}
              rows={6}
              minLength={15}
              maxLength={4000}
            />
            <Input label="Téléphone" error={errors.phone} required name="phone" register={register} />
          </>
        )}

        <Input label="Prénom" error={errors.firstname} required name="firstname" register={register} maxLength={50} />
        <Input label="Nom" error={errors.lastname} required name="lastname" register={register} maxLength={50} />
        <Input label="E-mail" error={errors.email} required name="email" register={register} type="email" />
        <Input
          label="Mot de passe"
          error={errors.password}
          required
          name="password"
          register={register}
          type="password"
          minLength={MIN_PASSWORD_LENGTH}
          autoComplete="new-password"
        />
        <Paragraph>
          En créant mon compte je reconnais avoir lu et accepté les{" "}
          <a href="https://info.leschouxdacote.fr/cgs" target="_blank" rel="noopener">
            Conditions Générales d’Utilisation
          </a>
          .
        </Paragraph>
        <StyledButton type="submit" $variant="green" disabled={isSubmitting}>
          {isSubmitting ? "Chargement…" : "Valider"}
        </StyledButton>
      </StyledForm>
    </Layout>
  )
}

export default RegisterPage

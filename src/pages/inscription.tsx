import { useRouter } from "next/router"
import styled from "@emotion/styled"
import Layout from "src/layout"
import { StyledButton } from "src/components/Form"
import api from "src/helpers/api"
import { MIN_PASSWORD_LENGTH } from "src/helpers/validators"
import React from "react"
import { USER_ROLE } from "src/constants"
import { RegisteringUser } from "src/types/model"
import { StyledForm, Title, Required, YupInput as Input, YupRadioInput as RadioInput } from "src/components/YupForm"
import { SubmitHandler, useForm, useWatch } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { schemaSignUp } from "src/schemas/form.schemas"

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

const RegisterPage = () => {
  const { query, push } = useRouter()

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schemaSignUp),
    defaultValues: { role: USER_ROLE.PRODUCER } as RegisteringUser,
  })

  const role = useWatch({
    control,
    name: "role",
  })

  const onSubmit: SubmitHandler<RegisteringUser> = async (values) => {
    values.nocheck = Boolean(query.nocheck)
    try {
      await api.post("user", { ...values, role })
      await push("/confirmation")
    } catch (err) {
      if (err.message === "Le compte de cet établissement est déjà créé") {
        setError("siret", { type: "manual", message: err.message })
      }
      if (err.message === "Cette adresse e-mail est déjà utilisée") {
        setError("email", { type: "manual", message: err.message })
      }
      if (
        err.message === "Numéro de SIRET introuvable" ||
        err.message === "Ce numéro de SIRET n'existe pas ou plus, ou ses données ne sont pas consultables"
      ) {
        setError("siret", { type: "manual", message: err.message })
      }
    }
  }

  return (
    <Layout title="Inscription">
      <StyledForm method="POST" onSubmit={handleSubmit(onSubmit)}>
        <Title>Création du compte </Title>
        <Required>* champs obligatoires</Required>
        <MarginY>
          <RadioInput
            value={USER_ROLE.PRODUCER}
            id="producteur"
            label="Producteur"
            error={errors.role}
            name="role"
            register={register}
            required
          />
          <MarginLeft>
            <RadioInput
              value={USER_ROLE.BUYER}
              id="buyer"
              label="Acheteur"
              error={errors.role}
              name="role"
              register={register}
              required
            />
          </MarginLeft>
        </MarginY>
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

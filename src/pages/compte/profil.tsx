import { DefaultValues } from "react-hook-form"
import styled from "styled-components"

import MainLayout from "src/layouts/MainLayout"
import { Form, TextInput, SubmitButton } from "src/components/Form"
import { Button } from "src/components/Button"
import { useUser } from "src/helpers/auth"
import { validatePhoneNumber } from "src/helpers/validators"
import api from "src/helpers/api"

const DangerZone = styled.div`
  margin-top: 4em;
  text-align: center;
`

const MyAccountPage = () => {
  const { producer, update, signout } = useUser()

  const defaultValues: DefaultValues<UpdatingProducer> | undefined = producer || undefined

  const handleSubmit: Submit<UpdatingProducer> = async (values) => {
    await api.put("user", values)
    update(values)
    alert("Modifications effectuées")
  }

  const handleDelete = async () => {
    if (confirm("Voulez-vous vraiment supprimer votre compte producteur et toutes vos annonces ?!")) {
      await api.delete("user")
      signout()
      alert("Votre compte a bien été supprimé")
    }
  }

  return (
    <MainLayout title="Mon compte" noindex>
      <Form title="Mon profil" hasRequired onSubmit={handleSubmit} defaultValues={defaultValues}>
        <TextInput name="name" label="Nom commercial" required maxLength={180} />
        <TextInput name="address" label="Adresse" rows={3} required />
        <TextInput name="firstname" label="Prénom" required maxLength={50} />
        <TextInput name="lastname" label="Nom" required maxLength={50} />
        <TextInput name="description" label="Description" rows={6} required minLength={15} maxLength={4000} />
        <TextInput name="phone" label="Téléphone" type="tel" required validate={validatePhoneNumber} />
        <TextInput name="email" label="E-mail" type="email" required />
        <SubmitButton />
        <DangerZone>
          <Button type="button" $variant="red" onClick={handleDelete}>
            Supprimer le compte
          </Button>
        </DangerZone>
      </Form>
    </MainLayout>
  )
}

export default MyAccountPage

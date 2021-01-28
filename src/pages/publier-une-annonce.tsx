import { useFormContext, SubmitHandler } from "react-hook-form"
import { addDays } from "date-fns"

import MainLayout from "src/layouts/MainLayout"
import { Form, TextInput, SubmitButton, SelectInput, Row, ValidationError } from "src/components/Form"
import api from "src/helpers/api"
import { useUser } from "src/helpers/auth"
import { usePlace } from "src/helpers/maps"

const formatEnd = (days: number) => addDays(new Date(), days).toLocaleDateString()

const Infos = () => {
  const { watch } = useFormContext()
  const days = watch("days") as string

  return days ? <p>Fin de publication le {formatEnd(Number(days))}</p> : null
}

const NewProductPage = () => {
  const { user } = useUser()
  const place = usePlace("place")

  const handleSubmit: SubmitHandler<RegisteringProduct> = async (_, { target }) => {
    const data = new FormData(target)

    if (!data.get("email") && !data.get("phone")) {
      throw new ValidationError("email", "Vous devez au moins spécifier une adresse e-mail ou un numéro de téléphone")
    }

    if (!place || !place.geometry) {
      throw new ValidationError("address", "L'adresse saisie est introuvable sur la carte")
    }

    const { lat, lng } = place.geometry.location

    data.append("lat", String(lat))
    data.append("lng", String(lng))
    data.append("uid", user.uid)

    const response = await api.post<ApiResponse<RegisteringProduct>>("product", data)
    if (response.ok) {
      alert("OK") // TODO
    } else {
      Object.keys(response.errors).forEach((key) => {
        throw new ValidationError(key, response.errors[key])
      })
    }
  }

  return (
    <MainLayout title="Publier une annonce">
      <Form onSubmit={handleSubmit}>
        <h1>Publier une annonce</h1>
        <TextInput name="title" label="Titre" required maxLength={100} />
        <Row>
          <TextInput name="quantity" label="Quantité" type="number" min={0} step={0.01} />
          <SelectInput name="unit" label="Unité">
            <option></option>
            <option value="kg">kg</option>
            <option value="l">litre(s)</option>
            <option value="u">pièce(s)</option>
          </SelectInput>
        </Row>
        <TextInput name="price" label="Prix total" required type="number" min={0} step={0.01} suffix="euros" />
        <TextInput name="address" label="Adresse" required placeholder="" id="place" />
        <TextInput name="description" label="Description" required rows={8} maxLength={4000} />
        <TextInput name="photo" label="Photo" type="file" required />
        <TextInput type="email" name="email" label="Adresse e-mail" defaultValue={user?.email} />
        <TextInput type="tel" name="phone" label="Téléphone" /* TODO: defaultValue */ />
        <TextInput
          name="days"
          label="Publier maintenant pour une durée de :"
          type="number"
          min={0}
          step={1}
          defaultValue={0}
          suffix="jour(s)"
        />
        <Infos />
        <SubmitButton />
      </Form>
    </MainLayout>
  )
}

export default NewProductPage

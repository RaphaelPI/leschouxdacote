import { useFormContext, SubmitHandler } from "react-hook-form"
import { addDays } from "date-fns"

import MainLayout from "src/layouts/MainLayout"
import { Form, TextInput, SubmitButton, SelectInput, Row, ValidationError } from "src/components/Form"
import api from "src/helpers/api"
import { useUser } from "src/helpers/auth"
import { usePlace } from "src/helpers/maps"
import { formatPricePerUnit } from "src/helpers/text"

const ACCEPTED_MIMETYPES = "image/jpeg,image/png,image/webp,image/tiff" // https://sharp.pixelplumbing.com/#formats

const formatEnd = (days: number) => addDays(new Date(), days).toLocaleDateString()

const PriceInfos = () => {
  const { watch } = useFormContext()
  const quantity = Number(watch("quantity"))
  const unit = watch("unit") as Unit
  const price = Number(watch("price")) * 100
  if (!quantity || !price) {
    return null
  }
  return <p>Soit {formatPricePerUnit({ price, quantity, unit })}</p>
}

const EndInfos = () => {
  const { watch } = useFormContext()
  const days = watch("days") as string

  return days ? <p>Fin de publication le {formatEnd(Number(days))}</p> : null
}

const NewProductPage = () => {
  const { user } = useUser<true>()
  const place = usePlace("place")

  const handleSubmit: SubmitHandler<RegisteringProduct> = async (_, { target }) => {
    const data = new FormData(target)

    if (!data.get("email") && !data.get("phone")) {
      throw new ValidationError("email", "Vous devez au moins spécifier une adresse e-mail ou un numéro de téléphone")
    }

    if (!place) {
      throw new ValidationError("address", "Veuillez sélectionner l'adresse dans la liste déroulante")
    }

    data.append("city", place.city)
    data.append("lat", String(place.lat))
    data.append("lng", String(place.lng))
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
            <option value="g">g</option>
            <option value="kg">kg</option>
            <option value="l">litre(s)</option>
            <option value="u">pièce(s)</option>
          </SelectInput>
        </Row>
        <TextInput name="price" label="Prix total" required type="number" min={0} step={0.01} suffix="euros" />
        <PriceInfos />
        <TextInput name="address" label="Adresse" required placeholder="" id="place" />
        <TextInput name="description" label="Description" required rows={8} maxLength={4000} />
        <TextInput name="photo" label="Photo" type="file" required accept={ACCEPTED_MIMETYPES} />
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
        <EndInfos />
        <SubmitButton />
        <p>* requis</p>
      </Form>
    </MainLayout>
  )
}

export default NewProductPage

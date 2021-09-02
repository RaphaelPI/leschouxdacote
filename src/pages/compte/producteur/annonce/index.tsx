import type { AuthUser, Product, ProductPayload, Unit } from "src/types/model"

import { useRef, useState, useEffect } from "react"
import { useFormContext, DefaultValues } from "react-hook-form"
import { differenceInCalendarDays } from "date-fns"
import styled from "@emotion/styled"
import { useRouter } from "next/router"

import Layout from "src/layout"
import { Form, TextInput, SubmitButton, SelectInput, Row, ValidationError } from "src/components/Form"
import ProductEndDate from "src/components/ProductEndDate"
import api from "src/helpers/api"
import { useUser } from "src/helpers/auth"
import { formatPricePerUnit } from "src/helpers/text"
import { validatePhoneNumber } from "src/helpers/validators"
import { useObjectQuery } from "src/helpers/firebase"
import { loadGmaps } from "src/helpers/scripts"

// https://sharp.pixelplumbing.com/#formats
const ACCEPTED_MIMETYPES = ["image/jpeg", "image/png", "image/webp", "image/tiff"]

const Photo = styled.img`
  width: 100%;
`

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

const EditProductPage = () => {
  const { authUser, user } = useUser()
  const { query, push } = useRouter()

  const productId = Array.isArray(query.id) ? undefined : query.id

  const { data, loading } = useObjectQuery<Product>("products", productId)

  const [place, setPlace] = useState<Place | null>()

  useEffect(() => {
    if (!place && data) {
      setPlace({ id: data.placeId, city: data.city, lat: data._geoloc.lat, lng: data._geoloc.lng })
    }
  }, [place, data])

  const title = productId ? "Modifier une annonce" : "Créer une annonce"

  const defaultValues: DefaultValues<ProductPayload> | undefined = data && {
    ...data,
    price: data.price / 100,
    days: String(data.expires && data.expires > Date.now() ? differenceInCalendarDays(data.expires, new Date()) : 0),
    photo: "",
  }

  const handleSubmit: Submit<ProductPayload> = async (values, target) => {
    const payload = new FormData(target)

    if (!payload.get("email") && !payload.get("phone")) {
      throw new ValidationError("email", "Vous devez au moins spécifier une adresse e-mail ou un numéro de téléphone")
    }

    if (!place) {
      throw new ValidationError("address", "Veuillez sélectionner l'adresse dans la liste déroulante")
    }

    payload.append("placeId", place.id)
    payload.append("lat", String(place.lat))
    payload.append("lng", String(place.lng))
    payload.append("city", place.city)
    payload.append("uid", (authUser as AuthUser).uid)

    if (productId) {
      payload.append("id", productId)
      await api.put("product", payload)
    } else {
      await api.post("product", payload)
    }

    push("/compte/producteur/annonces") // TODO: confirmation message
  }

  const autocomplete = useRef<google.maps.places.Autocomplete>()
  const handleRef = async (el: HTMLInputElement | null) => {
    if (!el || autocomplete.current) {
      return
    }

    // TODO: reset place on text change

    await loadGmaps()

    autocomplete.current = new google.maps.places.Autocomplete(el, {
      componentRestrictions: { country: "fr" },
      fields: ["geometry", "address_components", "place_id"], // TODO: get more infos?
      types: ["geocode", "establishment"], // https://developers.google.com/places/web-service/supported_types#table3
    })
    autocomplete.current.addListener("place_changed", () => {
      const res = autocomplete.current?.getPlace()
      if (!res || !res.geometry || !res.address_components || !res.place_id) {
        setPlace(null)
        return
      }
      const city = res.address_components.find((c) => c.types.includes("locality"))
      if (!city) {
        setPlace(null)
        return
      }
      const { location } = res.geometry
      setPlace({
        id: res.place_id,
        lat: location.lat(),
        lng: location.lng(),
        city: city.short_name,
      })
    })
  }

  return (
    <Layout title={title} loading={loading}>
      <Form
        title={title}
        hasRequired
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
        resetOnChange={data?.objectID}
      >
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
        <TextInput name="address" label="Adresse" required placeholder="" id="place" ref={handleRef} />
        <TextInput name="description" label="Description" required rows={8} maxLength={4000} />
        {data && <Photo src={data.photo} />}
        <TextInput
          name="photo"
          label={productId ? "Changer la photo" : "Photo"}
          type="file"
          required={productId ? false : true}
          accept={ACCEPTED_MIMETYPES.join(",")}
        />
        <TextInput type="email" name="email" label="Adresse e-mail" defaultValue={authUser?.email} />
        <TextInput
          type="tel"
          name="phone"
          label="Téléphone"
          validate={validatePhoneNumber}
          defaultValue={user?.phone}
        />
        <TextInput
          name="days"
          label="Publier maintenant pour une durée de :"
          type="number"
          min={0}
          step={1}
          defaultValue={0}
          suffix="jour(s)"
        />
        <ProductEndDate />
        <SubmitButton />
      </Form>
    </Layout>
  )
}

export default EditProductPage

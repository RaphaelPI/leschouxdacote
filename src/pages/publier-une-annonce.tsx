import { useForm, SubmitHandler } from "react-hook-form"
import { addDays } from "date-fns"

import MainLayout from "src/layouts/MainLayout"
import { Form, TextInput, SubmitButton, SelectInput } from "src/components/Form"
import api from "src/helpers/api"
import { handleError } from "src/helpers/errors"

const formatEnd = (days: number) => addDays(new Date(), days).toLocaleDateString()

const NewProductPage = () => {
  const { register, handleSubmit, errors, setError, formState, watch } = useForm<RegisteringProduct>()

  const onValid: SubmitHandler<RegisteringProduct> = async (data) => {
    try {
      const response = await api.post<ApiResponse<RegisteringProduct>>("product", data)
      if (response.ok) {
        alert("OK") // TODO
      } else {
        Object.keys(response.errors).forEach((key) => {
          setError(key, {
            message: response.errors[key],
            shouldFocus: true,
          })
        })
      }
    } catch (error) {
      handleError(error)
    }
  }

  const days = watch("days")

  return (
    <MainLayout title="Publier une annonce">
      <Form method="POST" onSubmit={handleSubmit(onValid)}>
        <h1>Publier une annonce</h1>
        <TextInput ref={register} error={errors.title} name="title" label="Titre" required maxLength={100} />
        <TextInput
          ref={register}
          error={errors.price}
          name="price"
          label="Prix en euros"
          required
          type="number"
          min={0}
          step={0.01}
        />
        <TextInput
          ref={register}
          error={errors.quantity}
          name="quantity"
          label="Quantité"
          type="number"
          min={0}
          step={0.01}
        />
        <SelectInput ref={register} error={errors.unit} name="unit" label="Unité">
          <option></option>
          <option value="kg">kg</option>
          <option value="l">litre(s)</option>
          <option value="u">pièce(s)</option>
        </SelectInput>
        <TextInput
          ref={register}
          error={errors.description}
          name="description"
          label="Description"
          required
          rows={8}
          maxLength={4000}
        />
        <TextInput ref={register} error={errors.photo} name="photo" label="Photo" type="file" required />
        <TextInput
          ref={register}
          error={errors.days}
          name="days"
          label="Jours"
          type="number"
          min={0}
          step={1}
          defaultValue={0}
        />
        {days && <p>Fin de publication le {formatEnd(Number(days))}</p>}
        <SubmitButton type="submit" $variant="green" disabled={formState.isSubmitting}>
          {formState.isSubmitting ? "Chargement…" : "Valider"}
        </SubmitButton>
      </Form>
    </MainLayout>
  )
}

export default NewProductPage

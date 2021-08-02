import * as yup from "yup"
import { USER_ROLE } from "src/constants"
import { MIN_PASSWORD_LENGTH, validatePassword, validatePhoneNumber, validateSiret } from "src/helpers/validators"

export const schemaSignUp = yup.object().shape({
  role: yup.string().required("Champs requis").oneOf([USER_ROLE.BUYER, USER_ROLE.PRODUCER], "Choisir une valeur"),
  siret: yup.string().when("role", {
    is: USER_ROLE.PRODUCER,
    then: yup
      .string()
      .required("Champs requis")
      .test("is-valid-siret", "SIRET invalide", (value) => (value ? validateSiret(value) === true : false)),
  }),
  name: yup.string().when("role", {
    is: USER_ROLE.PRODUCER,
    then: yup.string().max(180, "Ne doit pas dépasser 180 caractères").required("Champs requis"),
  }),
  address: yup.string().when("role", {
    is: USER_ROLE.PRODUCER,
    then: yup.string().required("Champs requis"),
  }),
  description: yup.string().when("role", {
    is: USER_ROLE.PRODUCER,
    then: yup
      .string()
      .min(15, "Doit contenir au moins 15 caractères")
      .max(4000, "Ne doit pas dépasser 4000 caractères")
      .required("Champs requis"),
  }),
  phone: yup.string().when("role", {
    is: USER_ROLE.PRODUCER,
    then: yup
      .string()
      .required("Champs requis")
      .test("is-valid-phone", "Désolé, le numéro de téléphone est invalide", (value) =>
        value ? validatePhoneNumber(value) === true : false
      ),
  }),
  firstname: yup.string().max(50, "Ne doit pas dépasser 50 caractères").required("Champs requis"),
  lastname: yup.string().max(50, "Ne doit pas dépasser 50 caractères").required("Champs requis"),
  email: yup.string().required("Champs requis"),
  password: yup
    .string()
    .min(MIN_PASSWORD_LENGTH, `Doit contenir au moins ${MIN_PASSWORD_LENGTH} caractères`)
    .required("Champs requis")
    .test(
      "is-valid-password",
      `Désolé, le mot de passe doit contenir ${MIN_PASSWORD_LENGTH} caractères minimum dont au moins 1 majuscule, 1 minuscule et 1 chiffre`,
      (value) => (value ? validatePassword(value) === true : false)
    ),
})

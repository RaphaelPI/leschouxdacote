export const validateSiret = (value: string) => {
  if (value.replace(/\s+/g, "").length !== 14) {
    return "Désolé, le SIRET doit comporter 14 chiffres"
  }
  return true
}

export const validatePassword = (value: string) => {
  const message =
    "Désolé, le mot de passe doit contenir 8 caractères minimum dont au moins 1 majuscule, 1 minuscule et 1 chiffre"

  if (value.length < 8) {
    return message
  }

  const numUpperCaseChars = value.replace(/[^A-Z]/g, "").length
  const numLowerCaseChars = value.replace(/[^a-z]/g, "").length
  const numNumbers = value.replace(/[^0-9]/g, "").length
  if (numUpperCaseChars < 1 || numLowerCaseChars < 1 || numNumbers < 1) {
    return message
  }

  return true
}

// Metropolitan France
const getCountryPrefixLength = (phoneNumber: string) => {
  if (phoneNumber.startsWith("+33")) {
    return 12 // France
  }
  if (phoneNumber.startsWith("+376")) {
    return 10 // Andorra
  }
  if (phoneNumber.startsWith("+377")) {
    return 12 // Monaco
  }
}

export const normalizeNumber = (num: string) =>
  num
    .replace(/[ \-\.]+/g, "") // remove spaces, dots and hyphens
    .replace(/^00/, "+") // normalize international prefix (00 is French for +)
    .replace(/^0/, "+33") // internationalize French numbers
    .replace("(0)", "") // remove useless details

export const validatePhoneNumber = (value: string) => {
  const normalized = normalizeNumber(value)
  const requiredLength = getCountryPrefixLength(normalized)
  if (!requiredLength || requiredLength !== normalized.length) {
    return "Désolé, le numéro de téléphone est invalide"
  }
  return true
}

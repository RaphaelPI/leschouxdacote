export const validateLength = (length: number, message: string) => (value: string) =>
  value.replace(/\s+/g, "").length === length || message

export const validatePassword = (value: string) => {
  const message =
    "Désolé, le mot de passe doit contenir 12 caractères minimum dont au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial"
  if (value.length < 12) {
    return message
  }
  const numUpperCaseChars = value.replace(/[^A-Z]/g, "").length
  const numLowerCaseChars = value.replace(/[^a-z]/g, "").length
  const numNumbers = value.replace(/[^0-9]/g, "").length
  const numSpecialChars = value.replace(/[A-Za-z0-9]/g, "").length
  if (numUpperCaseChars < 1 || numLowerCaseChars < 1 || numNumbers < 1 || numSpecialChars < 1) {
    return message
  }
  return true
}

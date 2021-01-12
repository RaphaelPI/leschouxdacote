export const handleError = (error: Error) => {
  console.error(error)
  // TODO: report
  alert(
    "Une erreur est survenue. Vérifiez votre connexion ou réessayez plus tard.\n" +
      "Si le problème persiste, contactez-nous à cette adresse : contact@leschouxdacote.fr"
  )
}

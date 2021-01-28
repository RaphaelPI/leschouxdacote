import { useState, useEffect } from "react"

import { loadScript } from "src/helpers/scripts"

const API_URL = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_FIREBASE_KEY}&libraries=places`

export const usePlace = (id = "place") => {
  const [place, setPlace] = useState<google.maps.places.PlaceResult>()

  useEffect(() => {
    loadScript("gmaps", API_URL).then(() => {
      const autocomplete = new google.maps.places.Autocomplete(document.getElementById(id) as HTMLInputElement, {
        componentRestrictions: { country: "fr" },
        fields: ["geometry"], // TODO: get more infos?
      })
      autocomplete.addListener("place_changed", () => {
        setPlace(autocomplete.getPlace())
      })
    })
  }, [id])

  return place
}

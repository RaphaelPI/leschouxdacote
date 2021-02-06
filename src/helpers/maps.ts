import { useState, useEffect } from "react"

import { loadScript } from "src/helpers/scripts"

const API_URL = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_FIREBASE_KEY}&libraries=places`

export const usePlace = (id: string | null) => {
  const [place, setPlace] = useState<Place | null>()

  useEffect(() => {
    if (!id) {
      return
    }
    loadScript("gmaps", API_URL).then(() => {
      const target = document.getElementById(id) as HTMLInputElement
      const autocomplete = new google.maps.places.Autocomplete(target, {
        componentRestrictions: { country: "fr" },
        fields: ["geometry", "address_components"], // TODO: get more infos?
      })
      autocomplete.addListener("place_changed", () => {
        const data = autocomplete.getPlace()
        if (!data || !data.geometry || !data.address_components) {
          setPlace(null)
          return
        }
        const city = data.address_components.find((c) => c.types.includes("locality"))
        if (!city) {
          setPlace(null)
          return
        }
        const { location } = data.geometry
        setPlace({
          lat: location.lat(),
          lng: location.lng(),
          city: city.short_name,
        })
      })
    })
  }, [id])

  return place
}

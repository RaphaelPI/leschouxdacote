import { ChangeEvent, useState, FormEvent, useRef, useEffect } from "react"
import styled from "@emotion/styled"
import { useRouter } from "next/router"

import SearchInput from "src/components/SearchInput"
import { Button } from "src/components/Button"
import { loadGmaps } from "src/helpers/scripts"
import { LAYOUT } from "src/constants"

import SearchIcon from "src/assets/search.svg"

const Form = styled.form`
  position: relative;
`
const Submit = styled(Button)`
  width: 25px;
  height: 25px;
  border-radius: 25px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    display: none;
  }
  svg {
    width: 50%;
    height: 50%;
    min-width: 12px;
    min-height: 12px;
  }
  @media (min-width: ${LAYOUT.mobile}px) {
    position: absolute;
    right: 6px;
    top: 4px;
  }
`

const getType = (types?: string[]) => {
  if (!types) {
    return "dpt"
  }
  if (types.includes("administrative_area_level_1")) {
    return "region"
  }
  if (types.includes("administrative_area_level_2")) {
    return "dpt"
  }
  return "city"
}

const ZOOM = {
  city: 11,
  dpt: 8,
  region: 6,
}

interface Props {
  className?: string
}

const SearchBar = ({ className }: Props) => {
  const router = useRouter()

  const [query, setQuery] = useState<SearchQuery>(router.query)

  useEffect(() => {
    setQuery(router.query)
  }, [router.query])

  const autocomplete = useRef<google.maps.places.Autocomplete>()
  const input = useRef<HTMLInputElement>()

  const handleRef = (el: HTMLInputElement | null) => {
    loadGmaps().then(() => {
      if (!el || autocomplete.current || input.current) {
        return
      }
      input.current = el
      autocomplete.current = new google.maps.places.Autocomplete(el, {
        componentRestrictions: { country: "fr" },
        fields: ["geometry", "name", "types"],
        types: ["(regions)"],
      })
      autocomplete.current.addListener("place_changed", () => {
        const place = autocomplete.current?.getPlace()
        if (!place || !place.geometry) {
          return
        }
        const { location } = place.geometry
        const type = getType(place.types)
        const zoom = ZOOM[type]
        setQuery((previous) => ({
          what: previous.what,
          where: place.name,
          type,
          ll: `${location.lat()},${location.lng()}`,
          z: String(zoom),
        }))
      })
    })
  }

  const handleChange = ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = currentTarget
    const newQuery = {
      ...query,
      [name]: value,
    }
    if (name === "where") {
      delete newQuery.type
      delete newQuery.ll
      delete newQuery.z
    }
    setQuery(newQuery)
  }

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!input.current) {
      return
    }
    if (!query.ll && input.current.value.length > 0) {
      input.current.value = ""
      query.where = ""
      return
    }

    router.push({
      pathname: "/recherche",
      query,
    })
  }

  return (
    <Form method="GET" action="/recherche" onSubmit={handleSearch} className={className}>
      <div>
        <SearchInput name="what" value={query.what || ""} onChange={handleChange} placeholder="Que recherchez-vous ?" />
        <SearchInput
          name="where"
          value={query.where || ""}
          onChange={handleChange}
          placeholder="Où ?"
          ref={handleRef}
        />
      </div>
      <Submit $variant="green" type="submit">
        <span>Rechercher</span>
        <SearchIcon />
      </Submit>
    </Form>
  )
}

export default SearchBar

import type { ParsedUrlQuery } from "querystring"

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

const getType = (types?: string[]): SearchQuery["type"] => {
  if (!types) {
    return "city"
  }
  if (types.includes("administrative_area_level_1")) {
    return "region"
  }
  if (types.includes("administrative_area_level_2")) {
    return "dpt"
  }
  return "city"
}

interface Props {
  className?: string
}

const INITIAL_QUERY: SearchQuery = { what: "", where: "", ll: "", type: "" }

const getQuery = (previous: SearchQuery, routerQuery: ParsedUrlQuery) => {
  const newQuery: SearchQuery = {}
  for (const key in INITIAL_QUERY) {
    newQuery[key] = routerQuery[key] || previous[key] || ""
  }
  return newQuery
}

const SearchBar = ({ className }: Props) => {
  const router = useRouter()

  const [query, setQuery] = useState<SearchQuery>(getQuery(INITIAL_QUERY, router.query))

  useEffect(() => {
    setQuery((previous) => getQuery(previous, router.query))
  }, [router.query])

  const autocomplete = useRef<google.maps.places.Autocomplete>()
  const handleRef = (el: HTMLInputElement | null) => {
    loadGmaps().then(() => {
      if (!el || autocomplete.current) {
        return
      }
      autocomplete.current = new google.maps.places.Autocomplete(el, {
        componentRestrictions: { country: "fr" },
        fields: ["geometry", "name", "types", "address_components"],
        types: ["(regions)"],
      })
      autocomplete.current.addListener("place_changed", () => {
        const place = autocomplete.current?.getPlace()
        if (!place || !place.geometry || !place.address_components) {
          return
        }
        const region = place.address_components.find(({ types }) => types.includes("administrative_area_level_1"))
        if (!region) {
          return
        }
        if (region.short_name !== "Occitanie") {
          alert("Désolé, la recherche est actuellement limitée à la région Occitanie.")
          setQuery((previous) => ({
            ...previous,
            where: "",
            ll: "",
          }))
          return
        }
        const { location } = place.geometry
        setQuery((previous) => ({
          ...previous,
          where: place.name,
          ll: `${location.lat()},${location.lng()}`,
          type: getType(place.types),
        }))
      })
    })
  }

  const handleChange = ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = currentTarget
    setQuery({
      ...query,
      [name]: value,
      ll: name === "where" ? "" : query.ll,
    })
  }

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    //TODO: FIXME: ll not emptied when place is emptied

    router.push({
      pathname: "/recherche",
      query,
    })
  }

  return (
    <Form method="GET" action="/recherche" onSubmit={handleSearch} className={className}>
      <div>
        <SearchInput name="what" value={query.what} onChange={handleChange} placeholder="Que recherchez-vous ?" />
        <SearchInput name="where" value={query.where} onChange={handleChange} placeholder="Où ?" ref={handleRef} />
      </div>
      <Submit $variant="green" type="submit">
        <span>Rechercher</span>
        <SearchIcon />
      </Submit>
    </Form>
  )
}

export default SearchBar

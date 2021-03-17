import { ChangeEvent, useState, FormEvent, useRef, useEffect } from "react"
import styled from "@emotion/styled"
import { useRouter } from "next/router"

import { Input } from "src/components/Input"
import { Button } from "src/components/Button"
import { loadGmaps } from "src/helpers/scripts"

import SearchIcon from "src/assets/search.svg"

const Form = styled.form`
  position: relative;
`
const InputGroup = styled.div`
  input {
    width: 50%;
    &:first-of-type {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    &:not(:first-of-type) {
      margin-left: -1px;
    }
    &:last-of-type {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      padding-right: 8%;
    }
  }
`
const Sumbit = styled(Button)`
  width: 25px;
  height: 25px;
  border-radius: 25px;
  padding: 0;
  right: 6px;
  top: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  svg {
    width: 50%;
    height: 50%;
    min-width: 12px;
    min-height: 12px;
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

const INITIAL_QUERY: SearchQuery = { what: "", where: "", ll: "" }

const SearchBar = ({ className }: Props) => {
  const router = useRouter()
  const [query, setQuery] = useState<SearchQuery>({ ...INITIAL_QUERY, ...router.query })

  useEffect(() => {
    setQuery((previous) => ({ ...previous, ...router.query }))
  }, [router.query])

  const autocomplete = useRef<google.maps.places.Autocomplete>()
  const handleRef = (el: HTMLInputElement | null) => {
    loadGmaps().then(() => {
      if (!el || autocomplete.current) {
        return
      }
      autocomplete.current = new google.maps.places.Autocomplete(el, {
        componentRestrictions: { country: "fr" },
        fields: ["geometry", "name", "types"],
        types: ["(regions)"],
      })
      autocomplete.current.addListener("place_changed", () => {
        const place = autocomplete.current?.getPlace()
        if (!place) {
          return
        }
        if (place.geometry) {
          const { location } = place.geometry
          setQuery((previous) => ({
            ...previous,
            where: place.name,
            ll: `${location.lat()},${location.lng()}`,
            type: getType(place.types),
          }))
        }
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
      <InputGroup>
        <Input name="what" value={query.what} onChange={handleChange} placeholder="Que recherchez-vous ?" />
        <Input name="where" value={query.where} onChange={handleChange} placeholder="Où ?" ref={handleRef} />
      </InputGroup>
      <Sumbit $variant="green" type="submit">
        <SearchIcon />
      </Sumbit>
    </Form>
  )
}

export default SearchBar

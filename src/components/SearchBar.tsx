import { ChangeEvent, useState, FormEvent } from "react"
import styled from "styled-components"
import { useRouter } from "next/router"

import { Input } from "./Input"
import { Button } from "./Button"
import SearchIcon from "src/assets/search.svg"

const Form = styled.form`
  position: relative;
`
const InputGroup = styled.div`
  & > input {
    width: 50%;
  }
  & > input:first-child {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  & > input:not(first-child) {
    margin-left: -1px;
  }
  & > input:last-child {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    padding-right: 70px;
  }
`
const Sumbit = styled(Button)`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 10px;
  top: 7px;
`

interface Props {
  className?: string
}

const SearchBar = (props: Props) => {
  const [state, setState] = useState({ what: "", where: "" })
  const router = useRouter()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!state.what || !state.where) {
      alert("veuillez saisir une recherche")
      return
    }

    router.push({
      pathname: "/recherche",
      query: state,
    })
  }

  return (
    <Form method="GET" action="/recherche" onSubmit={handleSearch} {...props}>
      <InputGroup>
        <Input name="what" value={state.what} onChange={handleChange} required placeholder="Que recherchez-vous ?" />
        <Input name="where" value={state.where} onChange={handleChange} required placeholder="Où ?" />
      </InputGroup>
      <Sumbit $variant="green" type="submit">
        <SearchIcon />
      </Sumbit>
    </Form>
  )
}

export default SearchBar

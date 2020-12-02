import { ChangeEvent, useState } from "react"
import styled from "styled-components"

import { Input } from "./Input"
import { Button } from "./Button"
import SearchIcon from "src/assets/search.svg"

const Container = styled.div`
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
  width: 50px;
  height: 50px;
  border-radius: 25px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 10px;
  top: 6px;
`

interface Props {
  onSearch: (what: string, where: string) => void
  className?: string // https://github.com/styled-components/styled-components/issues/8#issuecomment-262276155
}

const SearchBar = ({ onSearch, className }: Props) => {
  const [state, setState] = useState({ what: "", where: "" })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const handleSearch = () => {
    onSearch(state.what, state.where)
  }

  return (
    <Container className={className}>
      <InputGroup>
        <Input name="what" value={state.what} onChange={handleChange} placeholder="Que recherchez-vous ?" />
        <Input name="where" value={state.where} onChange={handleChange} placeholder="Où ?" />
      </InputGroup>
      <Sumbit $variant="green" onClick={handleSearch}>
        <SearchIcon />
      </Sumbit>
    </Container>
  )
}

export default SearchBar

import { useState, ChangeEvent, useRef, KeyboardEvent } from "react"
import { useFormContext } from "react-hook-form"
import styled from "@emotion/styled"

import { Label, ErrorMessage } from "src/components/Form"
import CustomSwitch from "src/components/CustomSwitch"
import { tagsIndex } from "src/helpers/algolia"
import { COLORS, BIO } from "src/constants"

const Tag = styled.span`
  display: inline-block;
  background-color: #dcd9d9;
  box-shadow: 0px 3px 3px ${COLORS.shadow.light};
  border-radius: 12px;
  margin: 4px 12px 8px 0;
  padding: 4px 8px 4px 10px;
  button {
    margin-left: 8px;
    background-color: ${COLORS.input};
    border-radius: 100%;
    color: white;
    line-height: 18px;
    font-weight: 100;
  }
`
const Suggestions = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid ${COLORS.border};
  padding: 4px 0;
  box-shadow: 0px 3px 3px ${COLORS.shadow.light};
  button {
    padding: 4px 8px;
    width: 100%;
    text-align: left;
    &:hover {
      background-color: ${COLORS.odd};
    }
  }
`

interface TagRecord {
  objectID: string
}

interface Props {
  name: string
  label?: string
}

const TagsInput = ({ name, label }: Props) => {
  const { register, formState, setValue, watch } = useFormContext()
  const inputRef = useRef<HTMLInputElement>(null)
  const [suggestions, setSuggestions] = useState<TagRecord[]>([])
  const error = formState.errors[name]
  register(name)
  const values: string[] = watch(name) || []

  const reset = () => {
    setSuggestions([])
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  const add = (value: string) => {
    setValue(name, [...values, value])
  }
  const remove = (value: string) => {
    setValue(
      name,
      values.filter((val) => val !== value)
    )
  }

  const handleSwitch = ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
    if (currentTarget.checked) {
      add(BIO)
    } else {
      remove(BIO)
    }
  }

  const handleChange = async ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
    const text = currentTarget.value
    if (!text) {
      reset()
      return
    }
    const { hits } = await tagsIndex.search<TagRecord>(text)
    setSuggestions(hits.filter((value) => !values.includes(value.objectID)))
  }

  const handleKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") {
      return
    }
    event.preventDefault()
    const text = event.currentTarget.value.trim().toLowerCase()
    if (!text || values.includes(text)) {
      return
    }
    add(text)
    reset()
  }

  const handleSelect = (objectID: string) => () => {
    add(objectID)
    reset()
  }

  return (
    <Label $error={Boolean(error)} htmlFor={name}>
      <div>{label}</div>
      <label>
        <CustomSwitch checked={values.includes(BIO)} onChange={handleSwitch} /> Bio ou agriculture raisonnée
      </label>
      <div>
        {values.map((value) => {
          if (value === BIO) {
            return null
          }
          return (
            <Tag key={value}>
              {value}
              <button type="button" onClick={() => remove(value)}>
                ×
              </button>
            </Tag>
          )
        })}
      </div>
      <input type="hidden" name={name} value={values.join(",")} />
      <input
        id={name}
        onChange={handleChange}
        ref={inputRef}
        onKeyPress={handleKey}
        placeholder="Exemples : légume, miel, fromage…" // TODO: get examples from Algolia
      />
      {suggestions.length > 0 && (
        <Suggestions>
          {suggestions.map(({ objectID }) => (
            <button key={objectID} onClick={handleSelect(objectID)} type="button">
              {objectID}
            </button>
          ))}
        </Suggestions>
      )}
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </Label>
  )
}

export default TagsInput

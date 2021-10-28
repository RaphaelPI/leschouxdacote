import { useState, ChangeEvent, useRef, KeyboardEvent } from "react"
import { useFormContext } from "react-hook-form"
import styled from "@emotion/styled"

import { Label } from "src/components/Form"
import CustomSwitch from "src/components/CustomSwitch"
import { suggestionsIndex } from "src/helpers/algolia"
import { COLORS } from "src/constants"

const SEARCH_OPTIONS = {
  numericFilters: ["tag_popularity > 1"],
}

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
  label?: string
}

const TagsInput = ({ label }: Props) => {
  const { register, getValues, setValue, watch } = useFormContext()
  const inputRef = useRef<HTMLInputElement>(null)
  const [suggestions, setSuggestions] = useState<TagRecord[]>([])
  register("_tags")
  const values: string[] = watch("_tags") || []

  const add = (value: string) => {
    setValue("_tags", [...values, value])
  }
  const remove = (value: string) => {
    setValue(
      "_tags",
      values.filter((val) => val !== value)
    )
  }
  const reset = () => {
    setSuggestions([])
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  const handleChange = async ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
    const text = currentTarget.value
    if (!text) {
      reset()
      return
    }
    const { hits } = await suggestionsIndex.search<TagRecord>(text, SEARCH_OPTIONS)
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
    <Label htmlFor={"_tags"}>
      <div>{label}</div>
      <label>
        <CustomSwitch name="bio" defaultChecked={getValues("bio")} /> Bio ou agriculture raisonnée
      </label>
      <div>
        {values.map((value) => (
          <Tag key={value}>
            {value}
            <button type="button" onClick={() => remove(value)}>
              ×
            </button>
          </Tag>
        ))}
      </div>
      <input type="hidden" name={"_tags"} value={values.join(",")} />
      <input
        id={"_tags"}
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
    </Label>
  )
}

export default TagsInput

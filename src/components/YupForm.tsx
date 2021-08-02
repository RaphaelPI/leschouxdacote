import React from "react"
import styled from "@emotion/styled"
import { COLORS, LAYOUT } from "src/constants"
import { ErrorMessage, Label, Row, Suffix } from "./Form"
import { FieldError } from "react-hook-form"

export const StyledForm = styled.form`
  width: 100%;
  max-width: ${LAYOUT.formWidth}px;
  margin: 0 auto;
`
export const Title = styled.h1`
  text-align: center;
`
export const Required = styled.p`
  font-style: italic;
  color: ${COLORS.grey};
  text-align: center;
  margin: -1em 0 1em;
`

const RadioSpan = styled.span`
  color: #0077cf;
  padding: 0.7rem 3rem;
  font-size: 14px;
  border-radius: 5px;
  background-color: white;
  border: 0.1px solid rgb(0, 119, 207, 10%);
  cursor: pointer;
  display: inline-block;

  &:hover {
    background-color: rgb(0, 119, 207, 10%);
  }
`

const RadioInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;

  &:checked + ${RadioSpan} {
    background-color: rgb(0, 119, 207, 10%);
  }
`

interface InputProps {
  id?: string
  label: string
  error: FieldError | undefined
  suffix?: string
  required: boolean
  type?: string
  name: string
  register: any
  value?: string
}

export const YupInput: React.FC<InputProps & Record<string, any>> = ({
  label,
  error,
  required,
  suffix,
  type = "text",
  name,
  register,
  ...rest
}) => {
  return (
    <Label $error={Boolean(error)}>
      {label} {required && "*"}
      <Row>
        {rest.rows ? (
          <textarea name={name} {...register(name)} {...rest} />
        ) : (
          <input type={type} name={name} {...register(name)} {...rest} />
        )}

        {suffix && <Suffix>{suffix}</Suffix>}
      </Row>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </Label>
  )
}

export const YupRadioInput: React.FC<InputProps & Record<string, any>> = ({
  label,
  id,
  name,
  value,
  register,
  ...rest
}) => {
  return (
    <label>
      <RadioInput id={id} type="radio" name="role" {...register(name)} value={value} {...rest} />
      <RadioSpan>{label}</RadioSpan>
    </label>
  )
}

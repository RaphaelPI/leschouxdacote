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

const RadioLabel = styled.label`
  margin-left: 5px;
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
    <>
      <input id={id} type="radio" name="role" {...register(name)} value={value} {...rest} />
      <RadioLabel htmlFor={id}>{label}</RadioLabel>
    </>
  )
}

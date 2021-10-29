import React from "react"
import { FieldError } from "react-hook-form"
import styled from "@emotion/styled"

import { COLORS, LAYOUT, SIZES } from "src/constants"
import { ErrorMessage, Label, Row, Suffix } from "src/components/Form"

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

const RadioButton = styled.div`
  color: ${COLORS.blue};
  padding: 12px 16px;
  font-size: ${SIZES.regular}px;
  border-radius: 5px;
  background-color: ${COLORS.white};
  border: 1px solid ${COLORS.background.info};
  cursor: pointer;
  text-align: center;
  width: 100%;
  position: relative;

  &:hover {
    background-color: ${COLORS.background.info};
  }
`
const RadioInput = styled.input`
  position: absolute;
  visibility: hidden;

  &:checked + ${RadioButton} {
    background-color: ${COLORS.background.info};
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

export const Input: React.FC<InputProps & Record<string, any>> = ({
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

export const Radio: React.FC<InputProps & Record<string, any>> = ({ label, id, name, value, register, ...rest }) => {
  return (
    <label>
      <RadioInput id={id} type="radio" name="role" {...register(name)} value={value} {...rest} />
      <RadioButton>{label}</RadioButton>
    </label>
  )
}

export const Radios = styled.div`
  margin: 48px 0;
  display: flex;
  gap: 16px;

  > * {
    flex: 1;
  }

  @media (max-width: ${LAYOUT.mobile}px) {
    flex-direction: column;
  }
`

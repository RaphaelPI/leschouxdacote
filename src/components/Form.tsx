import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef, ForwardedRef, SelectHTMLAttributes } from "react"
import styled from "styled-components"
import { FieldError } from "react-hook-form"

import { COLORS, LAYOUT } from "src/constants"
import { Button } from "src/components/Button"

export const Form = styled.form`
  width: 100%;
  max-width: ${LAYOUT.formWidth}px;
  margin: 0 auto;
`

export const Label = styled.label<{ $error: boolean }>`
  display: block;
  margin: 10px 0;
  color: ${({ $error }) => ($error ? COLORS.error : COLORS.black)};
  input,
  textarea,
  select {
    display: block;
    width: 100%;
    margin: 4px 0;
    border-radius: 4px;
    border: 1px solid ${COLORS.border};
    padding: 8px;
    font-size: 1em;
  }
  input,
  textarea {
  }
  select {
    padding: 7px 4px;
  }
`
export const ErrorMessage = styled.span`
  color: ${COLORS.error};
`

type CombinedAttributes = InputHTMLAttributes<HTMLInputElement> & TextareaHTMLAttributes<HTMLTextAreaElement>

interface InputProps {
  label: string
  error?: FieldError
}

export const TextInput = forwardRef(
  (
    { label, error, ...props }: InputProps & CombinedAttributes,
    ref: ForwardedRef<HTMLInputElement & HTMLTextAreaElement>
  ) => {
    const Tag = props.rows ? "textarea" : "input"

    return (
      <Label $error={Boolean(error)}>
        {label} {props.required && "*"}
        <Tag ref={ref} {...props} />
        {error && <ErrorMessage>{error.message}</ErrorMessage>}
      </Label>
    )
  }
)
TextInput.displayName = "ForwardedTextInput"

export const SelectInput = forwardRef(
  (
    { label, error, ...props }: InputProps & SelectHTMLAttributes<HTMLSelectElement>,
    ref: ForwardedRef<HTMLSelectElement>
  ) => {
    return (
      <Label $error={Boolean(error)}>
        {label} {props.required && "*"}
        <select ref={ref} {...props} />
        {error && <ErrorMessage>{error.message}</ErrorMessage>}
      </Label>
    )
  }
)
SelectInput.displayName = "ForwardedSelectInput"

export const SubmitButton = styled(Button)`
  display: block;
  margin: 30px auto;
  min-width: 150px;
`

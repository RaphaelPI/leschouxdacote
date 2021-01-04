import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef, ForwardedRef } from "react"
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
  textarea {
    border-radius: 4px;
    padding: 8px;
    margin: 4px 0;
    border: 1px solid ${COLORS.border};
    display: block;
    width: 100%;
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
        {label}
        <Tag ref={ref} {...props} />
        {error && <ErrorMessage>{error.message}</ErrorMessage>}
      </Label>
    )
  }
)
TextInput.displayName = "ForwardedTextInput"

export const SubmitButton = styled(Button)`
  display: block;
  margin: 30px auto;
  min-width: 150px;
`

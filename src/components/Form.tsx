import { PropsWithChildren, FormEvent, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react"
import styled from "styled-components"
import { useForm, FormProvider, useFormContext, FieldName } from "react-hook-form"

import { COLORS, LAYOUT } from "src/constants"
import { Button } from "src/components/Button"
import { handleError } from "src/helpers/errors"

export class ValidationError extends Error {
  name = "ValidationError"
  field: string

  constructor(field: string, message: string) {
    super(message)
    this.field = field
  }
}

export const StyledForm = styled.form`
  width: 100%;
  max-width: ${LAYOUT.formWidth}px;
  margin: 0 auto;
`

interface FormProps<T> {
  onSubmit: Submit<T>
}

export function Form<T>({ children, onSubmit }: PropsWithChildren<FormProps<T>>) {
  const form = useForm<T>()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      await form.handleSubmit((data) => onSubmit(data, event.target as HTMLFormElement))(event)
    } catch (error) {
      if (error instanceof ValidationError) {
        form.setError(error.field as FieldName<T>, {
          message: error.message,
          shouldFocus: true,
        })
      } else {
        handleError(error)
      }
    }
  }

  return (
    <FormProvider {...form}>
      <StyledForm method="POST" onSubmit={handleSubmit}>
        {children}
      </StyledForm>
    </FormProvider>
  )
}

export const Row = styled.div`
  display: flex;
  align-items: center;
  label {
    margin: 0;
    flex: 1;
    &:not(:first-of-type) {
      margin-left: 20px;
    }
  }
`

export const Label = styled.label<{ $error: boolean }>`
  display: block;
  margin: 20px 0;
  color: ${({ $error }) => ($error ? COLORS.error : COLORS.dark)};
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
const Suffix = styled.div`
  margin-left: 10px;
`

interface InputProps {
  name: string
  label?: string
  suffix?: string
  validate?: (value: string) => true | string
}

type CombinedAttributes = InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement> &
  SelectHTMLAttributes<HTMLSelectElement>

type WithTag = { Tag: "input" | "select" | "textarea" }

const BaseInput = ({ Tag, label, suffix, validate, ...props }: InputProps & CombinedAttributes & WithTag) => {
  const { register, errors } = useFormContext()
  const error = errors[props.name]

  return (
    <Label $error={Boolean(error)}>
      {label} {props.required && "*"}
      <Row>
        <Tag ref={register({ validate })} {...props} />
        {suffix && <Suffix>{suffix}</Suffix>}
      </Row>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </Label>
  )
}

export const TextInput = (props: InputProps & CombinedAttributes) => (
  <BaseInput Tag={props.rows ? "textarea" : "input"} {...props} />
)

export const SelectInput = (props: InputProps & CombinedAttributes) => <BaseInput Tag="select" {...props} />

export const StyledButton = styled(Button)`
  display: block;
  margin: 30px auto;
  min-width: 150px;
`

interface SubmitProps {
  label?: string
}

export const SubmitButton = ({ label = "Valider" }: SubmitProps) => {
  const { formState } = useFormContext()

  return (
    <StyledButton type="submit" $variant="green" disabled={formState.isSubmitting}>
      {formState.isSubmitting ? "Chargement…" : label}
    </StyledButton>
  )
}

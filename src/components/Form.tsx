import {
  useEffect,
  forwardRef,
  FormEvent,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
  FormHTMLAttributes,
  FC,
} from "react"
import styled from "styled-components"
import { useForm, useFormContext, FieldValues, FormProvider, FieldName, DefaultValues } from "react-hook-form"

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

const StyledForm = styled.form`
  width: 100%;
  max-width: ${LAYOUT.formWidth}px;
  margin: 0 auto;
`
const Title = styled.h1`
  text-align: center;
`
const Required = styled.p`
  font-style: italic;
  color: ${COLORS.grey};
  text-align: center;
  margin: -1em 0 1em;
`

interface FormProps<T extends FieldValues> extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  title?: string
  hasRequired?: boolean
  onSubmit: Submit<T>
  defaultValues?: DefaultValues<T>
}

export function Form<T extends FieldValues>({
  title,
  hasRequired,
  onSubmit,
  defaultValues,
  children,
  ...delegated
}: FormProps<T>) {
  const form = useForm<T>({ defaultValues })

  useEffect(() => {
    form.reset({ ...defaultValues } as DefaultValues<T>)
  }, [defaultValues]) // eslint-disable-line react-hooks/exhaustive-deps

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
      <StyledForm method="POST" onSubmit={handleSubmit} {...delegated}>
        {title && <Title>{title}</Title>}
        {hasRequired && <Required>* champs obligatoires</Required>}
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
  color: ${({ $error }) => ($error ? COLORS.red : COLORS.dark)};
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
  color: ${COLORS.red};
`
const Suffix = styled.div`
  margin-left: 10px;
`

interface InputProps {
  name: string
  label?: string
  suffix?: string
  validate?: (value: string) => true | string
  ref?: (el: any) => void
}

type CombinedAttributes = InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement> &
  SelectHTMLAttributes<HTMLSelectElement>

type WithTag = { Tag: "input" | "select" | "textarea" }

const BaseInput = forwardRef(
  ({ Tag, label, suffix, validate, ...props }: InputProps & CombinedAttributes & WithTag, ref) => {
    const { register, errors } = useFormContext()
    const error = errors[props.name]

    const handleRef = (el: any) => {
      register({ validate })(el)
      if (typeof ref === "function") {
        ref(el)
      }
    }

    return (
      <Label $error={Boolean(error)}>
        {label} {props.required && "*"}
        <Row>
          <Tag ref={handleRef} {...props} />
          {suffix && <Suffix>{suffix}</Suffix>}
        </Row>
        {error && <ErrorMessage>{error.message}</ErrorMessage>}
      </Label>
    )
  }
)
BaseInput.displayName = "BaseInput"

export const TextInput = forwardRef((props: InputProps & CombinedAttributes, ref) => (
  <BaseInput Tag={props.rows ? "textarea" : "input"} ref={ref} {...props} />
))
TextInput.displayName = "TextInput"

export const SelectInput = forwardRef((props: InputProps & CombinedAttributes, ref) => (
  <BaseInput Tag="select" ref={ref} {...props} />
))
SelectInput.displayName = "SelectInput"

export const StyledButton = styled(Button)`
  display: block;
  margin: 30px auto;
  min-width: 150px;
`

export const SubmitButton: FC = ({ children = "Valider" }) => {
  const { formState } = useFormContext()

  return (
    <StyledButton type="submit" $variant="green" disabled={formState.isSubmitting}>
      {formState.isSubmitting ? "Chargement…" : children}
    </StyledButton>
  )
}

export const BasicInput = (props: InputHTMLAttributes<HTMLInputElement>) => {
  const { register } = useFormContext()
  return <input ref={register} {...props} />
}

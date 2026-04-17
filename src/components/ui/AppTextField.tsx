import Form from 'react-bootstrap/Form'
import type { FormControlProps } from 'react-bootstrap/FormControl'

export type AppTextFieldProps = FormControlProps & {
  id: string
  label?: string
  /** Mensagem de erro (ex.: validação); exibe feedback inválido. */
  error?: string
}

/**
 * Campo de texto com label e erro opcionais — base para login e formulários.
 */
export function AppTextField({
  id,
  label,
  error,
  className,
  isInvalid,
  ...controlProps
}: AppTextFieldProps) {
  const invalid = Boolean(error) || isInvalid

  return (
    <Form.Group className={className} controlId={id}>
      {label ? <Form.Label>{label}</Form.Label> : null}
      <Form.Control {...controlProps} id={id} isInvalid={invalid} />
      {error ? (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      ) : null}
    </Form.Group>
  )
}

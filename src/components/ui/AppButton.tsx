import { forwardRef } from 'react'
import Button from 'react-bootstrap/Button'
import type { ButtonProps } from 'react-bootstrap/Button'

/**
 * Botão padrão da aplicação. Ajustes visuais globais devem ser feitos aqui ou em `styles/theme.css`.
 */
export const AppButton = forwardRef<HTMLButtonElement, ButtonProps>(
  function AppButton({ variant = 'primary', ...props }, ref) {
    return <Button ref={ref} variant={variant} {...props} />
  },
)

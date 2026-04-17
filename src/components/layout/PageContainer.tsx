import Container from 'react-bootstrap/Container'
import type { ContainerProps } from 'react-bootstrap/Container'

export type PageContainerProps = ContainerProps

/** Largura e padding padrão para páginas de conteúdo. */
export function PageContainer({
  className,
  children,
  ...rest
}: PageContainerProps) {
  return (
    <Container
      className={['py-4', 'py-md-5', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </Container>
  )
}

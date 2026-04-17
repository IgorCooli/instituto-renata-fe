import Card from 'react-bootstrap/Card'
import type { ReactNode } from 'react'

export type AppCardProps = {
  title?: ReactNode
  subtitle?: ReactNode
  children?: ReactNode
  className?: string
  bodyClassName?: string
  /** ex.: border-0 shadow-sm */
  borderless?: boolean
}

export function AppCard({
  title,
  subtitle,
  children,
  className,
  bodyClassName,
  borderless,
}: AppCardProps) {
  return (
    <Card
      className={[borderless ? 'border-0 shadow-sm' : '', className]
        .filter(Boolean)
        .join(' ')}
    >
      <Card.Body className={bodyClassName}>
        {title ? (
          <Card.Title as="h2" className="h5">
            {title}
          </Card.Title>
        ) : null}
        {subtitle ? (
          <Card.Subtitle className="mb-2 text-secondary small">{subtitle}</Card.Subtitle>
        ) : null}
        {children}
      </Card.Body>
    </Card>
  )
}

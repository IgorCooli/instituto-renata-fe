import type { ReactNode } from 'react'

export type PageHeaderProps = {
  title: ReactNode
  description?: ReactNode
  /** Ações à direita (desktop) ou abaixo (empilhado). */
  actions?: ReactNode
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <header className="mb-4 d-flex flex-column flex-md-row gap-3 align-items-md-start justify-content-md-between">
      <div>
        <h1 className="h2 mb-1">{title}</h1>
        {description ? (
          <p className="text-secondary mb-0 small">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex-shrink-0">{actions}</div> : null}
    </header>
  )
}

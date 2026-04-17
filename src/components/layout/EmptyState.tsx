import type { ReactNode } from 'react'
import Stack from 'react-bootstrap/Stack'

export type EmptyStateProps = {
  title: string
  description?: ReactNode
  /** Ícone ou ilustração opcional. */
  illustration?: ReactNode
  action?: ReactNode
}

/** Lista vazia, sem resultados de busca, etc. */
export function EmptyState({
  title,
  description,
  illustration,
  action,
}: EmptyStateProps) {
  return (
    <div className="rounded border border-2 border-dashed bg-body-secondary bg-opacity-10 p-5 text-center">
      <Stack gap={3} className="align-items-center">
        {illustration ? <div className="text-secondary">{illustration}</div> : null}
        <div>
          <h2 className="h5 mb-1">{title}</h2>
          {description ? (
            <p className="text-secondary small mb-0">{description}</p>
          ) : null}
        </div>
        {action ? <div>{action}</div> : null}
      </Stack>
    </div>
  )
}

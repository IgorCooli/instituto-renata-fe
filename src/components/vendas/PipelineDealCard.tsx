import Card from 'react-bootstrap/Card'
import type { PipelineDeal } from '../../mocks/vendas-pipeline'

const brl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
})

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

type Props = {
  deal: PipelineDeal
}

export function PipelineDealCard({ deal }: Props) {
  return (
    <div
      className="ir-pipeline-card-wrap"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('application/x-pipeline-deal', deal.id)
        e.dataTransfer.effectAllowed = 'move'
      }}
    >
      <Card className="ir-pipeline-card border-secondary-subtle shadow-sm mb-0">
        <Card.Body className="p-3 small">
        <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
          <div className="d-flex gap-2 min-w-0">
            <div
              className="ir-pipeline-card__avatar rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 fw-semibold"
              aria-hidden
            >
              {initials(deal.leadName)}
            </div>
            <div className="min-w-0">
              <div className="fw-semibold text-truncate">{deal.leadName}</div>
              <div className="text-secondary text-truncate" style={{ fontSize: '0.75rem' }}>
                {deal.subtitle}
              </div>
            </div>
          </div>
          {deal.badge === 'atrasada' ? (
            <span className="ir-pipeline-card__badge ir-pipeline-card__badge--late flex-shrink-0">
              Atrasada
            </span>
          ) : deal.badge === 'ganho' ? (
            <span className="ir-pipeline-card__badge ir-pipeline-card__badge--won flex-shrink-0">Ganho</span>
          ) : null}
        </div>
        <div className="text-secondary mb-2" style={{ fontSize: '0.75rem' }}>
          {deal.ownerName}
        </div>
        <div className="text-secondary mb-3" style={{ fontSize: '0.75rem' }}>
          {deal.activityLabel}
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <span className="fw-semibold">{brl.format(deal.valueBrl)}</span>
          <span className="d-inline-flex align-items-center gap-2 text-secondary" style={{ fontSize: '0.75rem' }}>
            <span className="d-inline-flex align-items-center gap-1" aria-hidden>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
              </svg>
              {deal.commentsCount}
            </span>
            <span>{deal.timeLabel}</span>
          </span>
        </div>
      </Card.Body>
      </Card>
    </div>
  )
}

import Dropdown from 'react-bootstrap/Dropdown'
import { type LeadFunnelLabel, LEAD_FUNNEL_LABELS } from '../../mocks/leadFunnelStages'

type Props = {
  /** Valor atual (etapa do funil). */
  value: LeadFunnelLabel
  onChange: (next: LeadFunnelLabel) => void
  /** id único para aria */
  ariaLabelledBy: string
}

function StageIcon({ stage }: { stage: LeadFunnelLabel }) {
  const common = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'currentColor' as const }
  switch (stage) {
    case 'Mensagem':
      return (
        <svg {...common} aria-hidden>
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
        </svg>
      )
    case 'Conversa':
      return (
        <svg {...common} aria-hidden>
          <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" />
          <path d="M7 9h10v2H7V9zm0-3h7v2H7V6z" opacity="0.9" />
        </svg>
      )
    case 'Agendamento':
      return (
        <svg {...common} aria-hidden>
          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z" />
        </svg>
      )
    case 'Confirmação':
      return (
        <svg {...common} aria-hidden>
          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm-6.29-3.29L10 13.59 8.71 14.88l3 3 6-6-1.41-1.42z" />
        </svg>
      )
    case 'No Show':
      return (
        <svg {...common} aria-hidden>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
      )
    case 'Consulta':
      return (
        <svg {...common} aria-hidden>
          <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
        </svg>
      )
    case 'Venda':
      return (
        <svg {...common} aria-hidden>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.62 0 2.35-.49 2.35-1.47 0-.75-.44-1.22-2.41-1.54-2.17-.34-3.71-1.01-3.71-3.08 0-1.84 1.39-2.92 3.11-3.28V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-.96-.67-1.7-2.28-1.7-1.39 0-2.11.52-2.11 1.43 0 .73.42 1.17 2.42 1.58 2.13.42 3.69 1.16 3.69 3.04 0 2.07-1.55 3.05-3.21 3.35z" />
        </svg>
      )
    case 'Perdido':
      return (
        <svg {...common} aria-hidden>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z" />
        </svg>
      )
  }
}

export function LeadStageDropdown({ value, onChange, ariaLabelledBy }: Props) {
  return (
    <Dropdown className="ir-vendas-stage-dd">
      <Dropdown.Toggle
        variant="outline-secondary"
        id={ariaLabelledBy}
        className="ir-vendas-stage-dd__toggle d-inline-flex align-items-center gap-2 text-start text-body shadow-none"
        aria-label={`Etapa: ${value}`}
      >
        <span className="ir-vendas-stage-dd__toggle-icon text-secondary">
          <StageIcon stage={value} />
        </span>
        <span className="text-truncate" style={{ maxWidth: '7.5rem' }}>
          {value}
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu
        className="ir-vendas-stage-dd__menu shadow"
        popperConfig={{ strategy: 'fixed' }}
        renderOnMount
      >
        {LEAD_FUNNEL_LABELS.map((stage) => {
          const active = stage === value
          return (
            <Dropdown.Item
              key={stage}
              as="button"
              type="button"
              active={false}
              className={[
                'ir-vendas-stage-dd__item d-flex align-items-center gap-2 border-0 w-100 text-start',
                active ? 'ir-vendas-stage-dd__item--active' : '',
              ].join(' ')}
              onClick={() => onChange(stage)}
            >
              {active ? (
                <span className="ir-vendas-stage-dd__check flex-shrink-0" aria-hidden>
                  ✓
                </span>
              ) : (
                <span className="ir-vendas-stage-dd__check ir-vendas-stage-dd__check--placeholder flex-shrink-0" aria-hidden />
              )}
              <span className="text-secondary flex-shrink-0">
                <StageIcon stage={stage} />
              </span>
              <span className={active ? 'fw-semibold' : ''}>{stage}</span>
            </Dropdown.Item>
          )
        })}
      </Dropdown.Menu>
    </Dropdown>
  )
}

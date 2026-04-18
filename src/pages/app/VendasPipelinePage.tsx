import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Table from 'react-bootstrap/Table'
import { useCallback, useMemo, useState, type DragEvent } from 'react'
import { PageContainer } from '../../components/layout'
import { PipelineDealCard } from '../../components/vendas/PipelineDealCard'
import {
  buildInitialPipelineDeals,
  MOCK_PIPELINE_KPIS,
  PIPELINE_STAGE_DEFS,
  type PipelineDeal,
  type PipelineStageId,
} from '../../mocks/vendas-pipeline'
import '../../styles/vendas-page.css'
import '../../styles/vendas-pipeline-page.css'

const brl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
})

function formatPipelineKpiBrl(n: number): string {
  if (n >= 1000) {
    const k = n / 1000
    return `R$ ${Number.isInteger(k) ? k.toFixed(0) : k.toFixed(1)}K`
  }
  return `R$ ${n.toFixed(1)}`
}

function matchesQuery(deal: PipelineDeal, q: string): boolean {
  if (!q.trim()) return true
  const s = q.trim().toLowerCase()
  return (
    deal.leadName.toLowerCase().includes(s) ||
    deal.subtitle.toLowerCase().includes(s) ||
    deal.ownerName.toLowerCase().includes(s) ||
    deal.activityLabel.toLowerCase().includes(s)
  )
}

function stageLabel(id: PipelineStageId): string {
  return PIPELINE_STAGE_DEFS.find((d) => d.id === id)?.label ?? id
}

function EmptyColumnIcon({ stageId }: { stageId: PipelineStageId }) {
  const common = { width: 40, height: 40, viewBox: '0 0 24 24', fill: 'currentColor' as const }
  switch (stageId) {
    case 'conversa':
      return (
        <svg {...common} aria-hidden>
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
        </svg>
      )
    case 'confirmacao':
      return (
        <svg {...common} aria-hidden>
          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
        </svg>
      )
    case 'no_show':
      return (
        <svg {...common} aria-hidden>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z" />
        </svg>
      )
    case 'consulta':
      return (
        <svg {...common} aria-hidden>
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6V7h12v12zM7 12h2v5H7v-5zm4-3h2v8h-2V9zm4 3h2v5h-2v-5z" />
        </svg>
      )
    default:
      return (
        <svg {...common} aria-hidden>
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
      )
  }
}

/** Rota `/app/vendas/pipeline`. */
export function VendasPipelinePage() {
  const [deals, setDeals] = useState<PipelineDeal[]>(() => buildInitialPipelineDeals())
  const [query, setQuery] = useState('')
  const [view, setView] = useState<'board' | 'list'>('board')
  const [dragOverStage, setDragOverStage] = useState<PipelineStageId | null>(null)

  const filteredDeals = useMemo(
    () => deals.filter((d) => matchesQuery(d, query)),
    [deals, query],
  )

  const byStage = useMemo(() => {
    const map = new Map<PipelineStageId, PipelineDeal[]>()
    for (const def of PIPELINE_STAGE_DEFS) {
      map.set(def.id, [])
    }
    for (const d of filteredDeals) {
      const list = map.get(d.stageId)
      if (list) list.push(d)
    }
    return map
  }, [filteredDeals])

  const negociacoesCount = filteredDeals.length

  const moveDeal = useCallback((dealId: string, stageId: PipelineStageId) => {
    setDeals((prev) =>
      prev.map((d) => (d.id === dealId ? { ...d, stageId } : d)),
    )
  }, [])

  const handleDragOver = useCallback(
    (e: DragEvent, stageId: PipelineStageId) => {
      e.preventDefault()
      e.dataTransfer.dropEffect = 'move'
      setDragOverStage(stageId)
    },
    [],
  )

  const handleDrop = useCallback(
    (e: DragEvent, stageId: PipelineStageId) => {
      e.preventDefault()
      setDragOverStage(null)
      const id = e.dataTransfer.getData('application/x-pipeline-deal')
      if (!id) return
      moveDeal(id, stageId)
    },
    [moveDeal],
  )

  return (
    <div className="ir-vendas-page ir-vendas-pipeline-page">
      <PageContainer fluid className="pb-5">
        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3 mb-3">
          <div className="d-flex gap-3 align-items-start">
            <span className="ir-vendas-title-icon" aria-hidden>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 13h2v8H3v-8zm4-6h2v14H7V7zm4-4h2v18h-2V3zm4 8h2v10h-2V11zm4-8h2v18h-2V3z" />
              </svg>
            </span>
            <div>
              <h1 className="h4 mb-1 fw-semibold">Pipeline</h1>
              <p className="text-secondary small mb-0">
                {negociacoesCount} negociaç{negociacoesCount === 1 ? 'ão' : 'ões'}
              </p>
            </div>
          </div>
          <Button type="button" className="ir-vendas-btn-gold" disabled title="Em breve">
            + Nova Negociação
          </Button>
        </div>

        <div className="ir-pipeline-kpi-strip">
          <div className="ir-pipeline-kpi-strip__item">
            <div className="ir-pipeline-kpi-strip__value">
              {formatPipelineKpiBrl(MOCK_PIPELINE_KPIS.pipelineBrl)}
            </div>
            <div className="ir-pipeline-kpi-strip__label">Pipeline</div>
          </div>
          <div className="ir-pipeline-kpi-strip__item">
            <div className="ir-pipeline-kpi-strip__value">
              {formatPipelineKpiBrl(MOCK_PIPELINE_KPIS.forecastBrl)}
            </div>
            <div className="ir-pipeline-kpi-strip__label">Forecast</div>
          </div>
          <div className="ir-pipeline-kpi-strip__item">
            <div className="ir-pipeline-kpi-strip__value">{MOCK_PIPELINE_KPIS.ganhosCount}</div>
            <div className="ir-pipeline-kpi-strip__label">Ganhos</div>
          </div>
          <div className="ir-pipeline-kpi-strip__item">
            <div className="ir-pipeline-kpi-strip__value">{MOCK_PIPELINE_KPIS.perdidosCount}</div>
            <div className="ir-pipeline-kpi-strip__label">Perdidos</div>
          </div>
          <div className="ir-pipeline-kpi-strip__item">
            <div className="ir-pipeline-kpi-strip__value">{MOCK_PIPELINE_KPIS.cicloDias}d</div>
            <div className="ir-pipeline-kpi-strip__label">Ciclo</div>
          </div>
        </div>

        <div className="ir-pipeline-toolbar">
          <Form.Select size="sm" disabled className="w-auto" style={{ minWidth: '7rem' }} title="Em breve">
            <option>Vendedor</option>
          </Form.Select>
          <Form.Select size="sm" disabled className="w-auto" style={{ minWidth: '7rem' }} title="Em breve">
            <option>Fonte</option>
          </Form.Select>
          <Form.Select size="sm" disabled className="w-auto" style={{ minWidth: '7rem' }} title="Em breve">
            <option>Período</option>
          </Form.Select>
          <Form.Select size="sm" disabled className="w-auto" style={{ minWidth: '6rem' }} title="Em breve">
            <option>$ Valor</option>
          </Form.Select>
          <Form.Select size="sm" disabled className="w-auto" style={{ minWidth: '7rem' }} title="Em breve">
            <option>Etiquetas</option>
          </Form.Select>
          <InputGroup size="sm" className="flex-grow-1" style={{ minWidth: '12rem', maxWidth: '20rem' }}>
            <InputGroup.Text className="bg-body-secondary">Buscar</InputGroup.Text>
            <Form.Control
              type="search"
              placeholder="Buscar lead…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Buscar lead"
            />
          </InputGroup>
          <div
            className="btn-group btn-group-sm ir-pipeline-view-toggle"
            role="group"
            aria-label="Vista"
          >
            <Button
              type="button"
              variant="outline-secondary"
              size="sm"
              className={view === 'board' ? 'active' : ''}
              onClick={() => setView('board')}
              aria-pressed={view === 'board'}
              title="Quadro"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M4 4h7v7H4V4zm9 0h7v4h-7V4zM4 13h7v7H4v-7zm9 3h7v4h-7v-4z" />
              </svg>
            </Button>
            <Button
              type="button"
              variant="outline-secondary"
              size="sm"
              className={view === 'list' ? 'active' : ''}
              onClick={() => setView('list')}
              aria-pressed={view === 'list'}
              title="Lista"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
              </svg>
            </Button>
          </div>
          <Form.Select size="sm" disabled className="w-auto" style={{ minWidth: '9rem' }} title="Em breve">
            <option>Mais recente</option>
          </Form.Select>
          <Button type="button" variant="outline-secondary" size="sm" disabled title="Em breve">
            Selecionar
          </Button>
        </div>

        {view === 'board' ? (
          <div
            className="ir-pipeline-board"
            role="list"
            aria-label="Colunas do pipeline"
          >
            {PIPELINE_STAGE_DEFS.map((def) => {
              const columnDeals = byStage.get(def.id) ?? []
              const count = columnDeals.length
              const totalBrl = columnDeals.reduce((s, d) => s + d.valueBrl, 0)
              const emptyDragHint =
                def.id === 'mensagem' || def.id === 'agendamento' || def.id === 'ganhos'
                  ? 'Solte aqui para mover'
                  : 'Arraste negociações aqui'

              return (
                <div
                  key={def.id}
                  className={[
                    'ir-pipeline-col',
                    dragOverStage === def.id ? 'ir-pipeline-col--drop-target' : '',
                  ].join(' ')}
                  role="listitem"
                  onDragOver={(e) => handleDragOver(e, def.id)}
                  onDragLeave={() => setDragOverStage(null)}
                  onDrop={(e) => handleDrop(e, def.id)}
                >
                  <div className="ir-pipeline-col__head">
                    <div className="ir-pipeline-col__title">{def.label}</div>
                    <div className="ir-pipeline-col__meta">
                      {count} negociaç{count === 1 ? 'ão' : 'ões'}
                      {count > 0 ? (
                        <>
                          {' '}
                          · {brl.format(totalBrl)}
                        </>
                      ) : null}
                    </div>
                  </div>
                  <div className="ir-pipeline-col__body">
                    {columnDeals.map((deal) => (
                      <PipelineDealCard key={deal.id} deal={deal} />
                    ))}
                    {count === 0 ? (
                      <div className="ir-pipeline-empty">
                        <EmptyColumnIcon stageId={def.id} />
                        <span>{emptyDragHint}</span>
                      </div>
                    ) : null}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="table-responsive border rounded">
            <Table hover size="sm" className="mb-0 align-middle">
              <thead className="table-light">
                <tr>
                  <th>Lead</th>
                  <th>Etapa</th>
                  <th className="text-end">Valor</th>
                  <th>Responsável</th>
                  <th>Atividade</th>
                </tr>
              </thead>
              <tbody>
                {filteredDeals.map((d) => (
                  <tr key={d.id}>
                    <td className="fw-medium">{d.leadName}</td>
                    <td>{stageLabel(d.stageId)}</td>
                    <td className="text-end text-nowrap">{brl.format(d.valueBrl)}</td>
                    <td className="small text-secondary">{d.ownerName}</td>
                    <td className="small text-secondary">{d.activityLabel}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </PageContainer>
    </div>
  )
}

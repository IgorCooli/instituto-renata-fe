import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'
import { useCallback, useMemo, useState } from 'react'
import { PageContainer } from '../../components/layout'
import { LeadStageDropdown } from '../../components/vendas/LeadStageDropdown'
import {
  coerceToFunnelStage,
  LEAD_FUNNEL_LABELS,
  type LeadFunnelLabel,
} from '../../mocks/leadFunnelStages'
import {
  rowsForSegment,
  VENDAS_LEADS_COUNTS,
  type VendasLeadRow,
  type VendasLeadSegment,
} from '../../mocks/vendas-leads'
import '../../styles/vendas-page.css'
import '../../styles/vendas-leads-page.css'

const brl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

function formatDateBr(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d) return iso
  const dd = String(d).padStart(2, '0')
  const mm = String(m).padStart(2, '0')
  return `${dd}/${mm}/${y}`
}

function matchesQuery(row: VendasLeadRow, q: string, funnelStage: string): boolean {
  if (!q.trim()) return true
  const s = q.trim().toLowerCase()
  return (
    row.name.toLowerCase().includes(s) ||
    row.subtitle.toLowerCase().includes(s) ||
    row.phone.replace(/\D/g, '').includes(s.replace(/\D/g, '')) ||
    row.originLabel.toLowerCase().includes(s) ||
    funnelStage.toLowerCase().includes(s) ||
    row.stageLabel.toLowerCase().includes(s) ||
    (row.tags?.toLowerCase().includes(s) ?? false) ||
    formatDateBr(row.dateIso).includes(s)
  )
}

/** Rota `/app/vendas/leads`. */
export function VendasLeadsPage() {
  const [segment, setSegment] = useState<VendasLeadSegment>('pipeline')
  const [query, setQuery] = useState('')
  const [stageFilter, setStageFilter] = useState<string>('all')
  /** Sobrescreve etapa do funil por lead (UI local até haver API). */
  const [stageByLeadId, setStageByLeadId] = useState<Record<string, LeadFunnelLabel>>({})

  const baseRows = useMemo(() => rowsForSegment(segment), [segment])

  const getStage = useCallback(
    (row: VendasLeadRow): LeadFunnelLabel =>
      stageByLeadId[row.id] ?? coerceToFunnelStage(row.stageLabel),
    [stageByLeadId],
  )

  const filtered = useMemo(() => {
    return baseRows.filter((row) => {
      const st = getStage(row)
      if (!matchesQuery(row, query, st)) return false
      if (stageFilter === 'all') return true
      return st === stageFilter
    })
  }, [baseRows, query, stageFilter, getStage])

  const stageOptions = useMemo(() => ['all', ...LEAD_FUNNEL_LABELS] as const, [])

  const tableTitleCount = filtered.length

  return (
    <div className="ir-vendas-page ir-vendas-leads-page">
      <PageContainer fluid className="pb-5">
        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3 mb-4">
          <div className="d-flex gap-3 align-items-start">
            <span className="ir-vendas-leads-title-icon" aria-hidden>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.29 0-2.38.81-2.82 1.95h-4.36C8.38 5.81 7.29 5 6 5 4.34 5 3 6.34 3 8s1.34 3 3 3c1.29 0 2.38-.81 2.82-1.95h4.36c.44 1.14 1.53 1.95 2.82 1.95 1.66 0 3-1.34 3-3s-1.34-3-3-3zm-8 0c-.83 0-1.5-.67-1.5-1.5S7.17 8 8 8s1.5.67 1.5 1.5S8.83 11 8 11zm8 0c-.83 0-1.5-.67-1.5-1.5S15.17 8 16 8s1.5.67 1.5 1.5S16.83 11 16 11zM8 13c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
              </svg>
            </span>
            <div>
              <h1 className="h4 mb-1 fw-semibold">Leads</h1>
              <p className="text-secondary small mb-0">
                Gerencie os leads do seu funil de vendas
              </p>
            </div>
          </div>
          <div className="d-flex flex-wrap gap-2 align-items-center">
            <Button
              type="button"
              variant="outline-secondary"
              size="sm"
              disabled
              title="Em breve"
              className="d-inline-flex align-items-center gap-1"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
              </svg>
              CSV
            </Button>
            <Button type="button" className="ir-vendas-btn-gold" disabled title="Em breve">
              + Lead
            </Button>
          </div>
        </div>

        <Row className="g-3 mb-3">
          <Col xs={12} md={4}>
            <button
              type="button"
              className={[
                'ir-vendas-leads-summary ir-vendas-leads-summary--leads',
                segment === 'leads' ? 'ir-vendas-leads-summary--active' : '',
              ].join(' ')}
              onClick={() => {
                setSegment('leads')
                setStageFilter('all')
              }}
            >
              <div className="ir-vendas-leads-summary__value" style={{ color: 'var(--ir-v-leads-blue)' }}>
                {VENDAS_LEADS_COUNTS.leads}
              </div>
              <div className="ir-vendas-leads-summary__label">Leads</div>
            </button>
          </Col>
          <Col xs={12} md={4}>
            <button
              type="button"
              className={[
                'ir-vendas-leads-summary ir-vendas-leads-summary--pipeline',
                segment === 'pipeline' ? 'ir-vendas-leads-summary--active' : '',
              ].join(' ')}
              onClick={() => {
                setSegment('pipeline')
                setStageFilter('all')
              }}
            >
              <div className="ir-vendas-leads-summary__value" style={{ color: 'var(--ir-v-leads-purple)' }}>
                {VENDAS_LEADS_COUNTS.pipeline}
              </div>
              <div className="ir-vendas-leads-summary__label">Pipeline</div>
            </button>
          </Col>
          <Col xs={12} md={4}>
            <button
              type="button"
              className={[
                'ir-vendas-leads-summary ir-vendas-leads-summary--clientes',
                segment === 'clientes' ? 'ir-vendas-leads-summary--active' : '',
              ].join(' ')}
              onClick={() => {
                setSegment('clientes')
                setStageFilter('all')
              }}
            >
              <div className="ir-vendas-leads-summary__value" style={{ color: 'var(--ir-v-leads-green)' }}>
                {VENDAS_LEADS_COUNTS.clientes}
              </div>
              <div className="ir-vendas-leads-summary__label">Clientes</div>
            </button>
          </Col>
        </Row>

        <div className="d-flex flex-column flex-lg-row gap-2 gap-lg-3 align-items-stretch align-items-lg-center mb-3">
          <div className="d-flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline-secondary"
              size="sm"
              className={[
                'ir-vendas-leads-pill',
                segment === 'leads' ? 'ir-vendas-leads-pill--active' : '',
              ].join(' ')}
              onClick={() => {
                setSegment('leads')
                setStageFilter('all')
              }}
            >
              Leads ({VENDAS_LEADS_COUNTS.leads})
            </Button>
            <Button
              type="button"
              variant="outline-secondary"
              size="sm"
              className={[
                'ir-vendas-leads-pill',
                segment === 'pipeline' ? 'ir-vendas-leads-pill--active' : '',
              ].join(' ')}
              onClick={() => {
                setSegment('pipeline')
                setStageFilter('all')
              }}
            >
              Pipeline ({VENDAS_LEADS_COUNTS.pipeline})
            </Button>
            <Button
              type="button"
              variant="outline-secondary"
              size="sm"
              className={[
                'ir-vendas-leads-pill',
                segment === 'clientes' ? 'ir-vendas-leads-pill--active' : '',
              ].join(' ')}
              onClick={() => {
                setSegment('clientes')
                setStageFilter('all')
              }}
            >
              Clientes ({VENDAS_LEADS_COUNTS.clientes})
            </Button>
          </div>
          <div className="d-flex flex-column flex-sm-row gap-2 flex-grow-1">
            <Form.Select
              size="sm"
              style={{ maxWidth: '12rem' }}
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              aria-label="Filtrar por etapa"
            >
              {stageOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt === 'all'
                    ? `Todas (${baseRows.length})`
                    : `${opt} (${baseRows.filter((r) => getStage(r) === opt).length})`}
                </option>
              ))}
            </Form.Select>
            <InputGroup className="flex-grow-1">
              <InputGroup.Text className="bg-body-secondary border-secondary-subtle text-secondary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
              </InputGroup.Text>
              <Form.Control
                type="search"
                placeholder="Buscar leads…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Buscar leads"
              />
            </InputGroup>
          </div>
        </div>

        <Card className="border-secondary-subtle shadow-sm overflow-hidden">
          <Card.Header className="bg-body-secondary py-3 d-flex align-items-center gap-2">
            <span className="fw-semibold">Todos os Leads ({tableTitleCount})</span>
          </Card.Header>
          <div className="ir-vendas-leads-table-wrap">
            <Table responsive hover className="align-middle mb-0">
              <thead className="bg-body-secondary">
                <tr>
                  <th scope="col" style={{ width: '2.5rem' }}>
                    <Form.Check type="checkbox" aria-label="Selecionar todos" disabled title="Em breve" />
                  </th>
                  <th scope="col">Lead</th>
                  <th scope="col">Contato</th>
                  <th scope="col">Origem</th>
                  <th scope="col">Etapa</th>
                  <th scope="col">Etiquetas</th>
                  <th scope="col" className="text-end">
                    Valor
                  </th>
                  <th scope="col">Data</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <Form.Check type="checkbox" aria-label={`Selecionar ${row.name}`} disabled title="Em breve" />
                    </td>
                    <td>
                      <div className="fw-medium">{row.name}</div>
                      <div className="small text-secondary text-truncate" style={{ maxWidth: '14rem' }}>
                        {row.subtitle}
                      </div>
                    </td>
                    <td>
                      <span className="d-inline-flex align-items-center gap-2 text-nowrap">
                        <span className="text-secondary" aria-hidden>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                          </svg>
                        </span>
                        {row.phone}
                      </span>
                    </td>
                    <td>
                      <span className="ir-vendas-leads-origin text-secondary">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0" aria-hidden>
                          <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9 0c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm9 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V20h8v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                        <span className="text-truncate d-inline-block" style={{ maxWidth: '10rem' }}>
                          {row.originLabel}
                        </span>
                      </span>
                    </td>
                    <td className="text-nowrap">
                      <LeadStageDropdown
                        ariaLabelledBy={`lead-stage-${row.id}`}
                        value={getStage(row)}
                        onChange={(next) =>
                          setStageByLeadId((prev) => ({ ...prev, [row.id]: next }))
                        }
                      />
                    </td>
                    <td className="text-secondary small">{row.tags ?? '—'}</td>
                    <td className="text-end text-nowrap">
                      {row.valueBrl != null ? brl.format(row.valueBrl) : '—'}
                    </td>
                    <td>
                      <span className="d-inline-flex align-items-center gap-2 text-nowrap small">
                        <span className="text-secondary" aria-hidden>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z" />
                          </svg>
                        </span>
                        {formatDateBr(row.dateIso)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          {filtered.length === 0 ? (
            <Card.Body className="text-secondary small">Nenhum lead encontrado.</Card.Body>
          ) : null}
        </Card>
      </PageContainer>

      <Button
        type="button"
        className="ir-vendas-btn-gold ir-vendas-leads-fab"
        disabled
        title="Suporte — em breve"
        aria-label="Suporte — em breve"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM19 9v2h2V9h-2zm0-4v2h2V5h-2z" />
        </svg>
      </Button>
    </div>
  )
}

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'
import { useMemo, useState } from 'react'
import { PageContainer } from '../../components/layout'
import {
  MOCK_VENDAS_KPIS,
  MOCK_VENDAS_PERIOD,
  MOCK_VENDAS_TRANSACTIONS,
  strategyLabel,
  type VendaTransactionRow,
  type VendasStrategyId,
} from '../../mocks/vendas'
import '../../styles/vendas-page.css'

const brl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const MONTHS = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
] as const

const YEARS = [2024, 2025, 2026, 2027] as const

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

function formatDateBr(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d) return iso
  const dd = String(d).padStart(2, '0')
  const mm = String(m).padStart(2, '0')
  return `${dd}/${mm}/${y}`
}

function strategyClass(id: VendasStrategyId): string {
  return `ir-vendas-strategy ir-vendas-strategy--${id}`
}

function KpiIcon({ variant }: { variant: 'revenue' | 'count' | 'ticket' }) {
  if (variant === 'revenue') {
    return (
      <span className="ir-vendas-kpi__icon" aria-hidden>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.62 0 2.35-.49 2.35-1.47 0-.75-.44-1.22-2.41-1.54-2.17-.34-3.71-1.01-3.71-3.08 0-1.84 1.39-2.92 3.11-3.28V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-.96-.67-1.7-2.28-1.7-1.39 0-2.11.52-2.11 1.43 0 .73.42 1.17 2.42 1.58 2.13.42 3.69 1.16 3.69 3.04 0 2.07-1.55 3.05-3.21 3.35z" />
        </svg>
      </span>
    )
  }
  if (variant === 'count') {
    return (
      <span className="ir-vendas-kpi__icon" aria-hidden>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
        </svg>
      </span>
    )
  }
  return (
    <span className="ir-vendas-kpi__icon" aria-hidden>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 2.58.58 3.59 1.42l1.52-1.52C15.48 6.94 13.85 6 12 6c-1.87 0-3.45.64-4.52 1.82C6.45 9 6 10.38 6 11.86c0 1.56.63 2.73 2.12 3.47.5.25 1.07.45 1.71.6l-.47 2.83c-.13.78.46 1.49 1.24 1.49.5 0 .97-.28 1.2-.73l1.15-2.51c.31.05.63.08.95.08 1.87 0 3.45-.64 4.52-1.82C17.55 15 18 13.62 18 12.14c0-1.68-.72-2.87-2.82-3.66-.31-.12-.65-.22-1-.3z" />
      </svg>
    </span>
  )
}

function matchesQuery(row: VendaTransactionRow, q: string): boolean {
  if (!q.trim()) return true
  const s = q.trim().toLowerCase()
  return (
    row.customerName.toLowerCase().includes(s) ||
    row.product.toLowerCase().includes(s) ||
    row.sellerName.toLowerCase().includes(s) ||
    row.payment.toLowerCase().includes(s) ||
    strategyLabel(row.strategy).toLowerCase().includes(s) ||
    formatDateBr(row.date).includes(s)
  )
}

/** Rota index `/app/vendas` — Transações. */
export function VendasTransacoesPage() {
  const [monthIndex, setMonthIndex] = useState<number>(MOCK_VENDAS_PERIOD.monthIndex)
  const [year, setYear] = useState<number>(MOCK_VENDAS_PERIOD.year)
  const [query, setQuery] = useState('')

  const rowsInPeriod = useMemo(() => {
    const m = monthIndex + 1
    const prefix = `${year}-${String(m).padStart(2, '0')}`
    return MOCK_VENDAS_TRANSACTIONS.filter((row) => row.date.startsWith(prefix))
  }, [monthIndex, year])

  const filtered = useMemo(() => {
    return rowsInPeriod.filter((row) => matchesQuery(row, query))
  }, [rowsInPeriod, query])

  const kpis = useMemo(() => {
    if (
      monthIndex === MOCK_VENDAS_PERIOD.monthIndex &&
      year === MOCK_VENDAS_PERIOD.year
    ) {
      return MOCK_VENDAS_KPIS
    }
    const revenue = rowsInPeriod.reduce((s, r) => s + r.valueBrl, 0)
    const count = rowsInPeriod.length
    const avg = count > 0 ? revenue / count : 0
    return {
      revenueBrl: Math.round(revenue * 100) / 100,
      salesCount: count,
      avgTicketBrl: Math.round(avg * 100) / 100,
    }
  }, [rowsInPeriod, monthIndex, year])

  function shiftMonth(delta: number) {
    let m = monthIndex + delta
    let y = year
    while (m < 0) {
      m += 12
      y -= 1
    }
    while (m > 11) {
      m -= 12
      y += 1
    }
    setMonthIndex(m)
    setYear(y)
  }

  return (
    <div className="ir-vendas-page">
      <PageContainer fluid className="pb-5">
        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3 mb-4">
          <div className="d-flex gap-3 align-items-start">
            <span className="ir-vendas-title-icon" aria-hidden>
              $
            </span>
            <div>
              <h1 className="h4 mb-1 fw-semibold">Transações</h1>
              <p className="text-secondary small mb-0">
                Acompanhe todas as vendas realizadas.
              </p>
            </div>
          </div>
          <Button type="button" className="ir-vendas-btn-gold" disabled title="Em breve">
            + Nova Venda
          </Button>
        </div>

        <Row className="g-2 g-md-3 align-items-stretch mb-3">
          <Col xs={12} md={4} lg={3}>
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <Button
                type="button"
                variant="outline-secondary"
                size="sm"
                className="rounded-circle p-0 d-inline-flex align-items-center justify-content-center"
                style={{ width: '2rem', height: '2rem' }}
                onClick={() => shiftMonth(-1)}
                aria-label="Mês anterior"
              >
                ‹
              </Button>
              <Form.Select
                size="sm"
                value={monthIndex}
                onChange={(e) => setMonthIndex(Number(e.target.value))}
                className="flex-grow-1"
                style={{ minWidth: '7rem' }}
                aria-label="Mês"
              >
                {MONTHS.map((label, i) => (
                  <option key={label} value={i}>
                    {label}
                  </option>
                ))}
              </Form.Select>
              <Form.Select
                size="sm"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                style={{ minWidth: '5rem' }}
                aria-label="Ano"
              >
                {YEARS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </Form.Select>
              <Button
                type="button"
                variant="outline-secondary"
                size="sm"
                className="rounded-circle p-0 d-inline-flex align-items-center justify-content-center"
                style={{ width: '2rem', height: '2rem' }}
                onClick={() => shiftMonth(1)}
                aria-label="Próximo mês"
              >
                ›
              </Button>
            </div>
          </Col>
          <Col xs={12} md={8} lg={9}>
            <InputGroup>
              <InputGroup.Text className="bg-body-secondary text-secondary border-secondary-subtle">
                Buscar
              </InputGroup.Text>
              <Form.Control
                type="search"
                placeholder="Buscar transações…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Buscar transações"
              />
            </InputGroup>
          </Col>
        </Row>

        <Row className="g-3 mb-4">
          <Col xs={12} sm={6} lg={4}>
            <div className="ir-vendas-kpi ir-vendas-kpi--revenue h-100 d-flex align-items-center gap-3">
              <KpiIcon variant="revenue" />
              <div className="flex-grow-1 min-w-0">
                <div className="ir-vendas-kpi__value text-success">
                  {brl.format(kpis.revenueBrl)}
                </div>
                <div className="ir-vendas-kpi__label">Faturamento</div>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={6} lg={4}>
            <div className="ir-vendas-kpi ir-vendas-kpi--count h-100 d-flex align-items-center gap-3">
              <KpiIcon variant="count" />
              <div>
                <div className="ir-vendas-kpi__value text-primary">
                  {kpis.salesCount}
                </div>
                <div className="ir-vendas-kpi__label">vendas</div>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={6} lg={4}>
            <div className="ir-vendas-kpi ir-vendas-kpi--ticket h-100 d-flex align-items-center gap-3">
              <KpiIcon variant="ticket" />
              <div>
                <div className="ir-vendas-kpi__value" style={{ color: '#a371f7' }}>
                  {brl.format(kpis.avgTicketBrl)}
                </div>
                <div className="ir-vendas-kpi__label">Ticket médio</div>
              </div>
            </div>
          </Col>
        </Row>

        <Card className="border-secondary-subtle shadow-sm">
          <Card.Header className="bg-body-secondary py-3 d-flex align-items-center gap-2">
            <span className="text-secondary" aria-hidden>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
              </svg>
            </span>
            <span className="fw-semibold">Vendas ({kpis.salesCount})</span>
          </Card.Header>
          <div className="ir-vendas-table-wrap">
            <Table responsive hover className="align-middle mb-0">
              <thead className="bg-body-secondary">
                <tr>
                  <th scope="col">Data</th>
                  <th scope="col">Cliente</th>
                  <th scope="col">Produto</th>
                  <th scope="col">Vendedor</th>
                  <th scope="col">Estratégia</th>
                  <th scope="col">Pagamento</th>
                  <th scope="col" className="text-end">
                    Valor
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <span className="d-inline-flex align-items-center gap-2 text-nowrap">
                        <span className="text-secondary" aria-hidden>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z" />
                          </svg>
                        </span>
                        {formatDateBr(row.date)}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <span className="ir-vendas-avatar">{initials(row.customerName)}</span>
                        <span className="text-break">{row.customerName}</span>
                      </div>
                    </td>
                    <td className="text-break" style={{ maxWidth: '14rem' }}>
                      {row.product}
                    </td>
                    <td className="text-break">{row.sellerName}</td>
                    <td>
                      <span className={strategyClass(row.strategy)}>
                        {strategyLabel(row.strategy)}
                      </span>
                    </td>
                    <td>{row.payment}</td>
                    <td className="text-end text-nowrap fw-medium">{brl.format(row.valueBrl)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          {filtered.length === 0 ? (
            <Card.Body className="text-secondary small">Nenhuma transação encontrada.</Card.Body>
          ) : null}
        </Card>
      </PageContainer>

      <Button
        type="button"
        variant="primary"
        className="ir-vendas-fab"
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

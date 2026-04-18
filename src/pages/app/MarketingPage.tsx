import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'
import { useMemo, useState } from 'react'
import { PageContainer } from '../../components/layout'
import {
  MOCK_MARKETING_CAMPAIGNS,
  MOCK_MARKETING_YEAR,
  MOCK_MARKETING_YEARLY_GOAL_BRL,
  MOCK_MARKETING_YEARLY_PROJECTED_BRL,
  MOCK_MARKETING_YEARLY_REAL_BRL,
  type MarketingCampaignRow,
} from '../../mocks/marketing'
import '../../styles/marketing-page.css'

const brl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
})

function pct(real: number, meta: number): number {
  if (meta <= 0) return 0
  return Math.min(100, Math.round((real / meta) * 100))
}

function CampaignActions({ row }: { row: MarketingCampaignRow }) {
  return (
    <div className="d-flex flex-wrap gap-1 ir-marketing-table-actions">
      <Button
        type="button"
        variant="outline-secondary"
        size="sm"
        disabled
        title="Em breve"
        aria-label={`Ver campanha ${row.campaign}`}
      >
        Ver
      </Button>
      <Button
        type="button"
        variant="outline-secondary"
        size="sm"
        disabled
        title="Em breve"
        aria-label={`Editar campanha ${row.campaign}`}
      >
        Editar
      </Button>
      <Button
        type="button"
        variant="outline-danger"
        size="sm"
        disabled
        title="Em breve"
        aria-label={`Excluir campanha ${row.campaign}`}
      >
        Excluir
      </Button>
    </div>
  )
}

export function MarketingPage() {
  const [query, setQuery] = useState('')

  const yearlyProgressPct = Math.round(
    (MOCK_MARKETING_YEARLY_REAL_BRL / MOCK_MARKETING_YEARLY_GOAL_BRL) * 100,
  )
  const projectedPct = Math.round(
    (MOCK_MARKETING_YEARLY_PROJECTED_BRL / MOCK_MARKETING_YEARLY_GOAL_BRL) * 100,
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return MOCK_MARKETING_CAMPAIGNS
    return MOCK_MARKETING_CAMPAIGNS.filter(
      (c) =>
        c.campaign.toLowerCase().includes(q) ||
        c.strategy.toLowerCase().includes(q) ||
        c.monthYear.toLowerCase().includes(q),
    )
  }, [query])

  const months = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ]

  return (
    <PageContainer fluid className="pb-5">
      <Card className="border shadow-sm ir-marketing-year-card mb-4">
        <Card.Body className="p-3 p-md-4">
          <Row className="align-items-start g-3">
            <Col xs={12} lg={8}>
              <p className="small text-secondary text-uppercase mb-1 fw-semibold">
                Meta anual {MOCK_MARKETING_YEAR}
              </p>
              <p className="h3 mb-3 mb-lg-4">
                {brl.format(MOCK_MARKETING_YEARLY_GOAL_BRL)}
              </p>
              <p className="small text-secondary mb-2">Progresso anual</p>
              <div className="ir-marketing-month-strip mb-2" aria-hidden>
                {months.map((_, i) => {
                  const filled = i < Math.ceil((yearlyProgressPct / 100) * 12)
                  return (
                    <div
                      key={months[i]}
                      className={
                        filled
                          ? 'ir-marketing-month-strip__cell ir-marketing-month-strip__cell--fill'
                          : 'ir-marketing-month-strip__cell'
                      }
                    />
                  )
                })}
              </div>
              <div className="d-flex flex-wrap gap-3 small text-secondary">
                <span>
                  <span className="d-inline-block rounded-circle bg-primary me-1 align-middle" style={{ width: '0.5rem', height: '0.5rem' }} />{' '}
                  Real: {brl.format(MOCK_MARKETING_YEARLY_REAL_BRL)}
                </span>
                <span>
                  <span className="d-inline-block rounded-circle bg-secondary me-1 align-middle" style={{ width: '0.5rem', height: '0.5rem' }} />{' '}
                  Proj.: {brl.format(MOCK_MARKETING_YEARLY_PROJECTED_BRL)}
                </span>
                <span>
                  <span className="d-inline-block rounded-circle border me-1 align-middle" style={{ width: '0.5rem', height: '0.5rem' }} />{' '}
                  Meta: {brl.format(MOCK_MARKETING_YEARLY_GOAL_BRL)}
                </span>
              </div>
            </Col>
            <Col xs={12} lg={4}>
              <div className="rounded-3 bg-body-secondary p-3 h-100">
                <p className="small text-secondary mb-2">Acumulado no ano</p>
                <ProgressBar
                  now={yearlyProgressPct}
                  className="mb-2"
                  style={{ height: '0.65rem' }}
                  aria-valuenow={yearlyProgressPct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`Progresso anual ${yearlyProgressPct} por cento`}
                />
                <div className="d-flex justify-content-between small">
                  <span className="text-secondary">Real / meta</span>
                  <span className="fw-semibold">
                    {yearlyProgressPct}% · {brl.format(MOCK_MARKETING_YEARLY_REAL_BRL)}
                  </span>
                </div>
                <p className="small text-secondary mt-2 mb-0">
                  Projeção linear ~{projectedPct}% da meta (mock).
                </p>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <div className="d-flex flex-column flex-md-row align-items-stretch align-items-md-center justify-content-between gap-3 mb-3">
        <h2 className="h5 mb-0">
          Campanhas ({filtered.length})
        </h2>
        <div className="d-flex flex-column flex-sm-row gap-2 flex-grow-1 flex-md-grow-0" style={{ maxWidth: '42rem' }}>
          <InputGroup size="sm" className="flex-grow-1">
            <InputGroup.Text className="bg-body-secondary text-secondary small">
              Buscar
            </InputGroup.Text>
            <Form.Control
              type="search"
              placeholder="Buscar campanhas…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Buscar campanhas"
            />
          </InputGroup>
          <Button type="button" variant="primary" disabled title="Em breve">
            + Nova campanha
          </Button>
        </div>
      </div>

      <div className="table-responsive ir-marketing-table-wrap shadow-sm rounded-3 border">
        <Table hover className="mb-0 align-middle">
          <thead className="border-bottom bg-body-secondary">
            <tr className="small text-secondary text-uppercase">
              <th scope="col">Campanha</th>
              <th scope="col" className="text-nowrap">
                Mês / ano
              </th>
              <th scope="col">Estratégia</th>
              <th scope="col" className="text-nowrap">
                Leads / conv.
              </th>
              <th scope="col" className="text-nowrap">
                Meta / realizado
              </th>
              <th scope="col" style={{ minWidth: '8rem' }}>
                Progresso
              </th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => {
              const p = pct(row.realizadoBrl, row.metaBrl)
              return (
                <tr key={row.id}>
                  <td className="fw-medium">{row.campaign}</td>
                  <td className="text-secondary">{row.monthYear}</td>
                  <td className="text-secondary small">{row.strategy}</td>
                  <td className="text-nowrap">
                    {row.leads} / {row.conversions}
                  </td>
                  <td className="text-nowrap small">
                    {brl.format(row.metaBrl)} / {brl.format(row.realizadoBrl)}
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <ProgressBar
                        now={p}
                        style={{ width: '4.5rem', height: '0.4rem' }}
                        aria-label={`Progresso ${p} por cento`}
                      />
                      <span className="small text-secondary">{p}%</span>
                    </div>
                  </td>
                  <td>
                    <CampaignActions row={row} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>

      {filtered.length === 0 ? (
        <p className="text-secondary small mt-3 mb-0">
          Nenhuma campanha encontrada para a busca.
        </p>
      ) : null}
    </PageContainer>
  )
}

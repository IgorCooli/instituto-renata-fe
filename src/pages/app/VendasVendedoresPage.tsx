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
  MOCK_VENDEDORES,
  vendedoresKpis,
  type VendedorRow,
} from '../../mocks/vendas-vendedores'
import '../../styles/vendas-page.css'
import '../../styles/vendas-vendedores-page.css'

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

function matchesQuery(row: VendedorRow, q: string): boolean {
  if (!q.trim()) return true
  const s = q.trim().toLowerCase()
  return (
    row.name.toLowerCase().includes(s) ||
    row.phone.replace(/\D/g, '').includes(s.replace(/\D/g, '')) ||
    row.email.toLowerCase().includes(s) ||
    row.roleLabel.toLowerCase().includes(s)
  )
}

/** Rota `/app/vendas/vendedores`. */
export function VendasVendedoresPage() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(
    () => MOCK_VENDEDORES.filter((row) => matchesQuery(row, query)),
    [query],
  )

  const kpis = useMemo(() => vendedoresKpis(MOCK_VENDEDORES), [])

  return (
    <div className="ir-vendas-page ir-vendas-vendedores-page">
      <PageContainer fluid className="pb-5">
        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3 mb-4">
          <div className="d-flex gap-3 align-items-start">
            <span className="ir-vendas-title-icon" aria-hidden>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.29 0-2.38.81-2.82 1.95h-4.36C8.38 5.81 7.29 5 6 5 4.34 5 3 6.34 3 8s1.34 3 3 3c1.29 0 2.38-.81 2.82-1.95h4.36c.44 1.14 1.53 1.95 2.82 1.95 1.66 0 3-1.34 3-3s-1.34-3-3-3zm-8 0c-.83 0-1.5-.67-1.5-1.5S7.17 8 8 8s1.5.67 1.5 1.5S8.83 11 8 11zm8 0c-.83 0-1.5-.67-1.5-1.5S15.17 8 16 8s1.5.67 1.5 1.5S16.83 11 16 11zM8 13c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
              </svg>
            </span>
            <div>
              <h1 className="h4 mb-1 fw-semibold">Vendedores</h1>
              <p className="text-secondary small mb-0">Gerencie sua equipe de vendas</p>
            </div>
          </div>
          <Button type="button" className="ir-vendas-btn-gold" disabled title="Em breve">
            + Novo Vendedor
          </Button>
        </div>

        <Row className="g-3 mb-3">
          <Col xs={12} sm={6} lg={4}>
            <div className="ir-vendas-vendedores-kpi ir-vendas-vendedores-kpi--total h-100">
              <div className="ir-vendas-vendedores-kpi__value">{kpis.total}</div>
              <div className="ir-vendas-vendedores-kpi__label">Total</div>
            </div>
          </Col>
          <Col xs={12} sm={6} lg={4}>
            <div className="ir-vendas-vendedores-kpi ir-vendas-vendedores-kpi--ativos h-100">
              <div className="ir-vendas-vendedores-kpi__value">{kpis.ativos}</div>
              <div className="ir-vendas-vendedores-kpi__label">Ativos</div>
            </div>
          </Col>
          <Col xs={12} sm={6} lg={4}>
            <div className="ir-vendas-vendedores-kpi ir-vendas-vendedores-kpi--inativos h-100">
              <div className="ir-vendas-vendedores-kpi__value">{kpis.inativos}</div>
              <div className="ir-vendas-vendedores-kpi__label">Inativos</div>
            </div>
          </Col>
        </Row>

        <InputGroup className="mb-3">
          <InputGroup.Text className="bg-body-secondary border-secondary-subtle" aria-hidden>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </InputGroup.Text>
          <Form.Control
            type="search"
            placeholder="Buscar vendedor…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Buscar vendedor"
          />
        </InputGroup>

        <Card className="border-secondary-subtle shadow-sm">
          <Card.Header className="bg-body-secondary py-3 d-flex align-items-center gap-2">
            <span className="text-secondary" aria-hidden>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
              </svg>
            </span>
            <span className="fw-semibold">Lista de Vendedores ({filtered.length})</span>
          </Card.Header>
          <div className="ir-vendas-table-wrap">
            <Table responsive hover className="align-middle mb-0">
              <thead className="bg-body-secondary">
                <tr>
                  <th scope="col">Vendedor</th>
                  <th scope="col">Contato</th>
                  <th scope="col">Função</th>
                  <th scope="col">Comissão</th>
                  <th scope="col" className="text-end">
                    Conversão %
                  </th>
                  <th scope="col">Status</th>
                  <th scope="col" className="text-end" style={{ width: '3rem' }}>
                    <span className="visually-hidden">Ações</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <span className="ir-vendas-avatar">{initials(row.name)}</span>
                        <span className="text-break fw-medium">{row.name}</span>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex flex-column gap-1 small">
                        <span className="d-inline-flex align-items-center gap-2 text-nowrap">
                          <span className="text-secondary" aria-hidden>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                            </svg>
                          </span>
                          {row.phone}
                        </span>
                        <span className="d-inline-flex align-items-center gap-2 text-break">
                          <span className="text-secondary flex-shrink-0" aria-hidden>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                            </svg>
                          </span>
                          {row.email}
                        </span>
                      </div>
                    </td>
                    <td className="text-break">{row.roleLabel}</td>
                    <td className="text-nowrap">{row.commissionLabel}</td>
                    <td className="text-end text-nowrap">{row.conversionPercent}%</td>
                    <td>
                      {row.active ? (
                        <span className="ir-vendas-vendedor-status ir-vendas-vendedor-status--ativo">
                          Ativo
                        </span>
                      ) : (
                        <span className="ir-vendas-vendedor-status ir-vendas-vendedor-status--inativo">
                          Inativo
                        </span>
                      )}
                    </td>
                    <td className="text-end">
                      <Button
                        type="button"
                        variant="link"
                        size="sm"
                        className="p-0 text-secondary"
                        disabled
                        title="Em breve"
                        aria-label="Mais ações — em breve"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                        </svg>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          {filtered.length === 0 ? (
            <Card.Body className="text-secondary small">Nenhum vendedor encontrado.</Card.Body>
          ) : null}
        </Card>
      </PageContainer>
    </div>
  )
}

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
  MOCK_PRODUTOS,
  MOCK_PRODUTOS_KPIS,
  type ProdutoRow,
} from '../../mocks/vendas-produtos-precificacao'
import '../../styles/vendas-page.css'
import '../../styles/vendas-produtos-precificacao-page.css'

const brl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

function matchesQuery(row: ProdutoRow, q: string): boolean {
  if (!q.trim()) return true
  const s = q.trim().toLowerCase()
  return (
    row.name.toLowerCase().includes(s) ||
    row.categoryLabel.toLowerCase().includes(s) ||
    row.subCategoryLabel.toLowerCase().includes(s)
  )
}

function subBadgeClass(v: ProdutoRow['subCategoryVariant']): string {
  return v === 'purple' ? 'ir-prod-subbadge--purple' : 'ir-prod-subbadge--green'
}

/** Rota `/app/vendas/produtos-precificacao`. */
export function VendasProdutosPrecificacaoPage() {
  const [query, setQuery] = useState('')
  const [tab, setTab] = useState<'catalogo' | 'precificacao'>('catalogo')

  const filtered = useMemo(
    () => MOCK_PRODUTOS.filter((row) => matchesQuery(row, query)),
    [query],
  )

  return (
    <div className="ir-vendas-page ir-vendas-produtos-page">
      <PageContainer fluid className="pb-5">
        <div className="d-flex flex-column flex-lg-row align-items-start justify-content-between gap-3 mb-2">
          <div className="d-flex gap-3 align-items-start min-w-0">
            <span className="ir-vendas-title-icon" aria-hidden>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
              </svg>
            </span>
            <div className="min-w-0">
              <h1 className="h4 mb-1 fw-semibold">Produtos & Precificação</h1>
              <p className="text-secondary small mb-0">
                Gerencie seu catálogo de produtos e precificação
              </p>
            </div>
          </div>
          <Button type="button" className="ir-vendas-btn-gold flex-shrink-0" disabled title="Em breve">
            + Novo Produto
          </Button>
        </div>

        <div className="ir-produtos-tabs" role="tablist" aria-label="Produtos e precificação">
          <Button
            type="button"
            variant="outline-secondary"
            size="sm"
            className={tab === 'catalogo' ? 'active' : ''}
            onClick={() => setTab('catalogo')}
            role="tab"
            aria-selected={tab === 'catalogo'}
          >
            <span className="d-inline-flex align-items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
              </svg>
              Catálogo
            </span>
          </Button>
          <Button
            type="button"
            variant="outline-secondary"
            size="sm"
            className={tab === 'precificacao' ? 'active' : ''}
            onClick={() => setTab('precificacao')}
            role="tab"
            aria-selected={tab === 'precificacao'}
          >
            Precificação
          </Button>
        </div>

        {tab === 'precificacao' ? (
          <div className="ir-prod-precificacao-placeholder mb-4">
            <p className="mb-1 fw-semibold text-body">Precificação</p>
            <p className="mb-0 small">
              Regras e tabelas de precificação ficarão aqui quando a API estiver disponível.
            </p>
          </div>
        ) : null}

        {tab === 'catalogo' ? (
          <>
            <Row className="g-3 mb-3">
              <Col xs={12} sm={6} xl={3}>
                <div className="ir-produtos-kpi ir-produtos-kpi--total h-100">
                  <span className="ir-produtos-kpi__icon" aria-hidden>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" />
                    </svg>
                  </span>
                  <div>
                    <div className="ir-produtos-kpi__value">{MOCK_PRODUTOS_KPIS.total}</div>
                    <div className="ir-produtos-kpi__label">Total</div>
                  </div>
                </div>
              </Col>
              <Col xs={12} sm={6} xl={3}>
                <div className="ir-produtos-kpi ir-produtos-kpi--ativos h-100">
                  <span className="ir-produtos-kpi__icon" aria-hidden>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                  </span>
                  <div>
                    <div className="ir-produtos-kpi__value">{MOCK_PRODUTOS_KPIS.ativos}</div>
                    <div className="ir-produtos-kpi__label">Ativos</div>
                  </div>
                </div>
              </Col>
              <Col xs={12} sm={6} xl={3}>
                <div className="ir-produtos-kpi ir-produtos-kpi--servicos h-100">
                  <span className="ir-produtos-kpi__icon" aria-hidden>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7 1 10 3 12c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
                    </svg>
                  </span>
                  <div>
                    <div className="ir-produtos-kpi__value">{MOCK_PRODUTOS_KPIS.servicos}</div>
                    <div className="ir-produtos-kpi__label">Serviços</div>
                  </div>
                </div>
              </Col>
              <Col xs={12} sm={6} xl={3}>
                <div className="ir-produtos-kpi ir-produtos-kpi--preco h-100">
                  <span className="ir-produtos-kpi__icon" aria-hidden>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.62 0 2.35-.49 2.35-1.47 0-.75-.44-1.22-2.41-1.54-2.17-.34-3.71-1.01-3.71-3.08 0-1.84 1.39-2.92 3.11-3.28V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-.96-.67-1.7-2.28-1.7-1.39 0-2.11.52-2.11 1.43 0 .73.42 1.17 2.42 1.58 2.13.42 3.69 1.16 3.69 3.04 0 2.07-1.55 3.05-3.21 3.35z" />
                    </svg>
                  </span>
                  <div>
                    <div className="ir-produtos-kpi__value">
                      {brl.format(MOCK_PRODUTOS_KPIS.avgPriceBrl)}
                    </div>
                    <div className="ir-produtos-kpi__label">Preço médio</div>
                  </div>
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
                placeholder="Buscar produtos…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Buscar produtos"
              />
            </InputGroup>

            <Card className="border-secondary-subtle shadow-sm">
              <Card.Header className="bg-body-secondary py-3 d-flex align-items-center gap-2">
                <span className="text-secondary" aria-hidden>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
                  </svg>
                </span>
                <span className="fw-semibold">Lista de Produtos ({filtered.length})</span>
              </Card.Header>
              <div className="ir-vendas-table-wrap">
                <Table responsive hover className="align-middle mb-0">
                  <thead className="bg-body-secondary">
                    <tr>
                      <th scope="col">Produto</th>
                      <th scope="col">Categoria</th>
                      <th scope="col" className="text-end text-nowrap">
                        Preço
                      </th>
                      <th scope="col" className="text-nowrap">
                        Custo
                      </th>
                      <th scope="col">Tipo</th>
                      <th scope="col">Status</th>
                      <th scope="col" className="text-end" style={{ width: '3rem' }}>
                        <span className="visually-hidden">Ações</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((row) => (
                      <tr key={row.id}>
                        <td className="fw-medium">{row.name}</td>
                        <td>
                          <div className="fw-medium">{row.categoryLabel}</div>
                          <span
                            className={[
                              'ir-prod-subbadge',
                              subBadgeClass(row.subCategoryVariant),
                            ].join(' ')}
                          >
                            {row.subCategoryLabel}
                          </span>
                        </td>
                        <td className="text-end text-nowrap ir-prod-preco">{brl.format(row.priceBrl)}</td>
                        <td className="text-secondary text-nowrap">—</td>
                        <td>
                          <div>
                            <span className="ir-prod-tipo-badge">{row.tipoLabel}</span>
                          </div>
                          <div className="ir-prod-tipo-meta">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                            </svg>
                            {row.durationLabel}
                          </div>
                        </td>
                        <td>
                          {row.active ? (
                            <span className="ir-produto-status-pill">ATIVO</span>
                          ) : (
                            <span className="text-secondary small">Inativo</span>
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
                <Card.Body className="text-secondary small">Nenhum produto encontrado.</Card.Body>
              ) : null}
            </Card>
          </>
        ) : null}
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

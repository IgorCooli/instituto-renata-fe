import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CloseButton from 'react-bootstrap/CloseButton'
import Col from 'react-bootstrap/Col'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom'
import { useState, type ComponentType, type CSSProperties } from 'react'
import { APP_CHILD_ROUTES } from '../../app/routeMeta'
import { useAccess } from '../../app/access'
import { useAuth } from '../../app/auth/useAuth'
import type { FeatureId, UserRole } from '../../app/access/types'
import { PageContainer } from '../../components/layout'
import {
  mockBrandDisplayName,
  mockDashboardTagline,
} from '../../mocks'
import {
  IconCrm,
  IconEstoque,
  IconHeadset,
  IconMarketing,
  IconRocket,
  IconVendas,
} from './dashboardIcons'
import '../../styles/app-dashboard.css'

const ONBOARDING_KEY = 'ir_dashboard_onboarding_dismissed'

const FEATURE_DESCRIPTION: Record<FeatureId, string> = {
  marketing: 'Campanhas, leads e resultados',
  crm: 'Relacionamento e contatos',
  vendas: 'Orçamentos e oportunidades',
  estoque: 'Itens e movimentações',
}

const FEATURE_ICON: Record<
  FeatureId,
  ComponentType<{ className?: string; style?: CSSProperties }>
> = {
  marketing: IconMarketing,
  crm: IconCrm,
  vendas: IconVendas,
  estoque: IconEstoque,
}

function roleLabel(role: UserRole): string {
  return role === 'admin' ? 'Administrador' : 'Colaborador'
}

function displayNameFromEmail(email: string): string {
  const local = email.split('@')[0] ?? ''
  const parts = local.split(/[._-]+/).filter(Boolean)
  if (parts.length === 0) return email
  return parts
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join(' ')
}

function initialsFromEmail(email: string): string {
  const base = email.split('@')[0] ?? '?'
  const parts = base.split(/[._-]+/).filter(Boolean)
  if (parts.length >= 2) {
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase()
  }
  return base.slice(0, 2).toUpperCase()
}

export function AppDashboardPage() {
  const { session } = useAuth()
  const { hasFeature } = useAccess()
  const [onboardingVisible, setOnboardingVisible] = useState(() => {
    try {
      return sessionStorage.getItem(ONBOARDING_KEY) !== '1'
    } catch {
      return true
    }
  })

  const email = session?.email ?? ''
  const displayName = email ? displayNameFromEmail(email) : 'Usuário'
  const initials = email ? initialsFromEmail(email) : '?'
  const role = session?.role ?? 'common'

  const onboardingDone = 29
  const onboardingTotal = 57
  const onboardingPct = Math.round((onboardingDone / onboardingTotal) * 100)

  function dismissOnboarding() {
    try {
      sessionStorage.setItem(ONBOARDING_KEY, '1')
    } catch {
      /* ignore */
    }
    setOnboardingVisible(false)
  }

  return (
    <PageContainer className="pb-5">
      <Row className="align-items-center mb-4 g-3">
        <Col xs={12} md>
          <div className="d-flex align-items-center gap-3">
            <div
              className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center flex-shrink-0 fw-semibold"
              style={{ width: '2.75rem', height: '2.75rem', fontSize: '0.9rem' }}
              aria-hidden
            >
              {initials}
            </div>
            <div className="min-w-0">
              <p className="mb-0 fw-semibold text-truncate">{displayName}</p>
              <p className="mb-0 small text-secondary">{roleLabel(role)}</p>
            </div>
          </div>
        </Col>
        <Col xs={12} md="auto" className="text-md-end">
          <Button
            type="button"
            variant="outline-secondary"
            size="sm"
            className="d-inline-flex align-items-center gap-2"
            disabled
            title="Em breve"
          >
            <IconHeadset className="flex-shrink-0" style={{ width: '1.1rem', height: '1.1rem' }} />
            Suporte
          </Button>
        </Col>
      </Row>

      <header className="text-center mb-4 pb-2">
        <h1 className="h3 mb-2 ir-dashboard-hero-title">
          Bem-vindo à {mockBrandDisplayName}
        </h1>
        <p className="text-secondary mb-0">{mockDashboardTagline}</p>
      </header>

      {onboardingVisible ? (
        <Card className="border mb-4 shadow-sm">
          <Card.Body className="py-3 px-3 px-md-4">
            <div className="d-flex align-items-start gap-3">
              <span className="text-primary flex-shrink-0 mt-1" aria-hidden>
                <IconRocket style={{ width: '1.5rem', height: '1.5rem' }} />
              </span>
              <div className="flex-grow-1 min-w-0">
                <p className="fw-semibold mb-1">Onboarding da clínica</p>
                <ProgressBar
                  now={onboardingPct}
                  className="mb-2"
                  style={{ height: '0.5rem' }}
                  aria-label={`Progresso do onboarding: ${onboardingDone} de ${onboardingTotal}`}
                />
                <p className="small text-secondary mb-0">
                  {onboardingDone}/{onboardingTotal} ({onboardingPct}%)
                </p>
              </div>
              <CloseButton
                aria-label="Fechar banner de onboarding"
                className="flex-shrink-0"
                onClick={dismissOnboarding}
              />
            </div>
          </Card.Body>
        </Card>
      ) : null}

      <section className="mb-4">
        <h2 className="visually-hidden">Módulos</h2>
        <Row className="g-3 g-lg-4">
          {APP_CHILD_ROUTES.map((route) => {
            const Icon = FEATURE_ICON[route.feature]
            const description = FEATURE_DESCRIPTION[route.feature]
            const allowed = hasFeature(route.feature)
            const to = `/app/${route.path}`

            const inner = (
              <>
                <div className="d-flex align-items-start justify-content-between gap-2 mb-3">
                  <span className="text-body">
                    <Icon style={{ width: '1.75rem', height: '1.75rem' }} />
                  </span>
                </div>
                <h3 className="h5 mb-2">{route.label}</h3>
                <p className="text-secondary small mb-0">{description}</p>
                {!allowed ? (
                  <Badge bg="secondary" className="mt-3">
                    Não disponível no pacote
                  </Badge>
                ) : null}
              </>
            )

            return (
              <Col key={route.path} xs={12} sm={6} xl={3}>
                {allowed ? (
                  <Link
                    to={to}
                    className="text-decoration-none text-body d-block h-100 rounded-4 border bg-body-secondary p-4 ir-dashboard-feature-card ir-dashboard-feature-card--active"
                  >
                    {inner}
                  </Link>
                ) : (
                  <div
                    className="rounded-4 border bg-body-secondary p-4 h-100 ir-dashboard-feature-card ir-dashboard-feature-card--disabled opacity-75"
                    aria-disabled
                  >
                    {inner}
                  </div>
                )}
              </Col>
            )
          })}
        </Row>
      </section>

      <section className="mb-5">
        <p
          className="small text-secondary text-uppercase fw-semibold mb-3"
          style={{ letterSpacing: '0.06em' }}
        >
          Complementos
        </p>
        <Row className="g-3">
          <Col xs={12} lg={8}>
            <Card className="border h-100 shadow-sm">
              <Card.Body className="p-4">
                <div className="d-flex align-items-start gap-3 mb-3">
                  <Badge bg="success" className="align-self-start">
                    Ativo
                  </Badge>
                  <div>
                    <h3 className="h5 mb-2">iAnjo</h3>
                    <p className="text-secondary small mb-0">
                      Assistente e insights para sua equipe — integração em
                      desenvolvimento (dados mock).
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} lg={4}>
            <Card className="border h-100 shadow-sm bg-body-secondary">
              <Card.Body className="p-4 d-flex flex-column align-items-center text-center justify-content-center">
                <p className="small text-secondary mb-2">Sua jornada</p>
                <div
                  className="rounded-circle bg-body d-flex align-items-center justify-content-center mb-3 border text-primary"
                  style={{ width: '5rem', height: '5rem' }}
                  aria-hidden
                >
                  <IconRocket style={{ width: '2rem', height: '2rem' }} />
                </div>
                <ProgressBar now={35} className="w-100" style={{ height: '0.35rem' }} />
                <p className="small text-secondary mt-2 mb-0">35% concluído</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>

      <div className="position-fixed bottom-0 end-0 p-3 p-md-4" style={{ zIndex: 1030 }}>
        <Button
          type="button"
          variant="light"
          className="ir-dashboard-fab d-flex align-items-center justify-content-center p-0 border"
          disabled
          title="Suporte — em breve"
          aria-label="Suporte — em breve"
        >
          <IconHeadset style={{ width: '1.35rem', height: '1.35rem' }} />
        </Button>
      </div>
    </PageContainer>
  )
}

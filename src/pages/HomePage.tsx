import Stack from 'react-bootstrap/Stack'
import { Link } from 'react-router-dom'
import { useAuth } from '../app/auth/useAuth'
import {
  AppBadge,
  AppButton,
  AppCard,
  AppTextField,
  ThemeToggleScreenCorner,
} from '../components/ui'
import { EmptyState, PageContainer, PageHeader } from '../components/layout'
import { mockAppName, mockTagline } from '../mocks'

export function HomePage() {
  const { isAuthenticated } = useAuth()

  return (
    <PageContainer>
      <ThemeToggleScreenCorner />
      <PageHeader title={mockAppName} description={mockTagline} />

      <Stack gap={4}>
        <AppCard
          borderless
          title="Área interna"
          subtitle="Login mock + shell, rotas e guardas por feature."
        >
          <p className="text-secondary small mb-3">
            Após entrar, acesse Marketing, CRM, Vendas e Estoque (pacote simulado após login
            em <code>mockLogin</code> / sessão).
          </p>
          {isAuthenticated ? (
            <Link to="/app" className="btn btn-primary">
              Ir para /app
            </Link>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Entrar
            </Link>
          )}
        </AppCard>

        <AppCard
          borderless
          title="Fase 1 — fundação"
          subtitle="Vite, React, TypeScript, Bootstrap, tema e estrutura de pastas."
        >
          <p className="text-secondary small mb-3">
            Fase 2 abaixo: biblioteca de componentes base para telas seguintes (login,
            CRM, etc.).
          </p>
          <Stack direction="horizontal" gap={2} className="flex-wrap">
            <AppBadge bg="primary">React 19</AppBadge>
            <AppBadge bg="secondary">TypeScript</AppBadge>
            <AppBadge bg="secondary">react-bootstrap</AppBadge>
            <AppButton size="sm" variant="outline-primary" disabled>
              Próximas telas
            </AppButton>
          </Stack>
        </AppCard>

        <AppCard title="Demonstração — campo de texto" borderless>
          <p className="text-secondary small mb-3">
            Exemplo de <code>AppTextField</code> (desabilitado) para o fluxo de login.
          </p>
          <AppTextField
            id="demo-email"
            label="E-mail"
            type="email"
            placeholder="nome@consultorio.com"
            disabled
            autoComplete="off"
          />
        </AppCard>

        <EmptyState
          title="Nenhum registro (exemplo)"
          description="Assim aparecem listas vazias ou buscas sem resultado."
          action={
            <AppButton size="sm" variant="outline-primary">
              Ação de exemplo
            </AppButton>
          }
        />
      </Stack>
    </PageContainer>
  )
}

import { type FormEvent, useId, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../app/auth/useAuth'
import { ThemeToggleScreenCorner } from '../components/ui/ThemeToggle'
import '../styles/login.css'

export function LoginPage() {
  const emailId = useId()
  const passwordId = useId()
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const navState = location.state as { from?: string } | undefined
  const from =
    navState?.from && navState.from.startsWith('/app') ? navState.from : '/app'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (isAuthenticated) {
    return <Navigate to={from} replace />
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    const result = await login(email, password)
    setSubmitting(false)
    if (!result.ok) {
      setError(result.error)
      return
    }
    navigate(from, { replace: true })
  }

  return (
    <div className="login-page d-flex flex-column justify-content-center py-4 px-3">
      <ThemeToggleScreenCorner />
      <div className="login-card mx-auto">
        <Row className="g-0">
          <Col xs={12} lg={6}>
            <div className="login-form-panel p-4 p-lg-5 h-100">
              <div className="text-center mb-4">
                <h1 className="login-title h3 mb-2">Entrar</h1>
                <p className="login-subtitle mb-0">
                  Acesse o painel do consultório
                </p>
              </div>

              <Form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <Form.Label htmlFor={emailId} className="login-label">
                    E-mail
                  </Form.Label>
                  <Form.Control
                    id={emailId}
                    className="login-input"
                    type="email"
                    autoComplete="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-2">
                  <Form.Label htmlFor={passwordId} className="login-label">
                    Senha
                  </Form.Label>
                  <InputGroup>
                    <Form.Control
                      id={passwordId}
                      className="login-input"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={4}
                    />
                    <Button
                      type="button"
                      variant="outline-secondary"
                      id="login-toggle-password"
                      aria-label={
                        showPassword ? 'Ocultar senha' : 'Mostrar senha'
                      }
                      onClick={() => setShowPassword((v) => !v)}
                      className="border login-btn-social"
                    >
                      {showPassword ? 'Ocultar' : 'Mostrar'}
                    </Button>
                  </InputGroup>
                </div>

                <div className="text-end mb-4">
                  <a
                    href="#"
                    className="login-link-muted"
                    onClick={(e) => e.preventDefault()}
                  >
                    Esqueceu a senha?
                  </a>
                </div>

                {error ? (
                  <p className="text-danger small mb-3" role="alert">
                    {error}
                  </p>
                ) : null}

                <Button
                  type="submit"
                  className="login-btn-primary w-100 text-uppercase mb-4"
                  disabled={submitting}
                >
                  {submitting ? 'Entrando…' : 'Entrar'}
                </Button>

                <div className="d-flex align-items-center gap-2 mb-4">
                  <hr className="flex-grow-1 border-secondary opacity-25 m-0" />
                  <span className="login-sep text-nowrap">ou</span>
                  <hr className="flex-grow-1 border-secondary opacity-25 m-0" />
                </div>

                <div className="d-grid gap-2 mb-4">
                  <Button
                    type="button"
                    className="login-btn-social"
                    disabled
                    title="Em breve"
                  >
                    Entrar com Google
                  </Button>
                  <Button
                    type="button"
                    className="login-btn-social"
                    disabled
                    title="Em breve"
                  >
                    Entrar com Apple
                  </Button>
                </div>

                <div className="text-center small login-subtitle mb-2">
                  <span role="img" aria-label="">
                    🔑
                  </span>{' '}
                  Primeiro acesso?{' '}
                  <a
                    href="#"
                    className="login-link-muted"
                    onClick={(e) => e.preventDefault()}
                  >
                    Clique aqui
                  </a>
                </div>
                <p className="text-center small login-subtitle mb-3">
                  novo por aqui?
                </p>
                <Button
                  type="button"
                  className="login-btn-outline w-100"
                  disabled
                  title="Em breve"
                >
                  Cadastrar minha clínica
                </Button>
              </Form>
            </div>
          </Col>

          <Col xs={12} lg={6}>
            <div className="login-brand-panel p-4 p-lg-5 h-100 d-flex flex-column justify-content-center text-center text-lg-start">
              <p className="text-white-50 small text-uppercase mb-2 mb-lg-3">
                Instituto Renata
              </p>
              <h2 className="h4 fw-bold mb-3 mb-lg-4">
                Gestão do consultório, em qualquer lugar.
              </h2>
              <p className="mb-0 text-white-50 small">
                Área reservada à equipe. Cores e textos deste painel podem ser
                ajustados globalmente para cada cliente.
              </p>
            </div>
          </Col>
        </Row>
      </div>

      <p className="text-center mt-4 mb-0 small">
        <Link to="/" className="login-link-muted">
          ← Voltar à página inicial
        </Link>
      </p>
    </div>
  )
}

import Badge from 'react-bootstrap/Badge'
import Nav from 'react-bootstrap/Nav'
import {
  Link,
  Navigate,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { getFeatureNav, featureHref } from '../../app/featureSidebar'
import type { FeatureId } from '../../app/access/types'
import { APP_CHILD_ROUTES } from '../../app/routeMeta'
import { useAuth } from '../../app/auth/useAuth'
import type { UserRole } from '../../app/access/types'
import { ThemeToggle } from '../ui/ThemeToggle'
import '../../styles/app-feature-shell.css'

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

/** Resolve o FeatureId a partir do primeiro segmento após /app/. */
function featureFromPathname(pathname: string): FeatureId | null {
  const m = pathname.match(/^\/app\/([^/]+)/)
  const segment = m?.[1]
  if (!segment) return null
  return APP_CHILD_ROUTES.find((r) => r.path === segment)?.feature ?? null
}

/** Shell com sidebar + topbar — apenas para rotas filhas de /app que não são o index. */
export function AppFeatureShell() {
  const { pathname } = useLocation()
  const { session, logout } = useAuth()
  const navigate = useNavigate()

  const feature = featureFromPathname(pathname)
  if (!feature) {
    return <Navigate to="/app" replace />
  }

  const nav = getFeatureNav(feature)
  const email = session?.email ?? ''
  const displayName = email ? displayNameFromEmail(email) : 'Usuário'
  const initials = email ? initialsFromEmail(email) : '?'
  const role = session?.role ?? 'common'

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="app-feature-shell d-flex bg-body">
      <aside className="app-feature-sidebar border-end bg-body-secondary d-flex flex-column">
        <div className="p-3 border-bottom border-secondary-subtle">
          <div className="fw-semibold">{nav.title}</div>
          <div className="small text-secondary">{nav.subtitle}</div>
        </div>
        <nav className="flex-grow-1 p-2 overflow-auto" aria-label={`Navegação ${nav.title}`}>
          <Nav className="flex-column gap-1">
            {nav.links.map((item) => {
              const to = featureHref(nav.featurePath, item.pathSuffix)
              if (item.soon) {
                return (
                  <span
                    key={item.label + item.pathSuffix}
                    className="nav-link text-secondary d-flex align-items-center justify-content-between py-2 px-3 disabled pe-none"
                  >
                    {item.label}
                    <Badge bg="secondary" className="ms-1">
                      Em breve
                    </Badge>
                  </span>
                )
              }
              return (
                <NavLink
                  key={item.label + item.pathSuffix}
                  to={to}
                  end={item.pathSuffix === ''}
                  className={({ isActive }) =>
                    [
                      'nav-link py-2 px-3',
                      isActive ? 'active text-body' : 'text-body-secondary',
                    ].join(' ')
                  }
                >
                  {item.label}
                </NavLink>
              )
            })}
          </Nav>
        </nav>
        <div className="p-3 border-top border-secondary-subtle mt-auto">
          <div className="d-flex align-items-center gap-2 mb-2">
            <div
              className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center flex-shrink-0 fw-semibold small"
              style={{ width: '2rem', height: '2rem' }}
              aria-hidden
            >
              {initials}
            </div>
            <div className="min-w-0 flex-grow-1">
              <div className="small fw-medium text-truncate">{displayName}</div>
              <div className="text-secondary" style={{ fontSize: '0.7rem' }}>
                {roleLabel(role)}
              </div>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-link btn-sm p-0 text-secondary text-decoration-none"
            onClick={handleLogout}
          >
            Sair
          </button>
        </div>
      </aside>

      <div className="d-flex flex-column flex-grow-1 min-vh-100 min-w-0">
        <header className="app-feature-topbar border-bottom bg-body d-flex align-items-center gap-2 px-2 px-sm-3 shadow-sm">
          <Link
            to="/app"
            className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center gap-1"
          >
            ← Voltar
          </Link>
          <div className="ms-auto d-flex align-items-center gap-2">
            <ThemeToggle />
            <div
              className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center flex-shrink-0 fw-semibold small d-none d-sm-flex"
              style={{ width: '2rem', height: '2rem' }}
              title={email}
              aria-hidden
            >
              {initials}
            </div>
          </div>
        </header>
        <main className="flex-grow-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

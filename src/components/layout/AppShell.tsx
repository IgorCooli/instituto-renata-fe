import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAccess } from '../../app/access'
import { useAuth } from '../../app/auth/useAuth'
import { APP_CHILD_ROUTES } from '../../app/routeMeta'

/** Layout da área logada: menu filtrado por features habilitadas (mock). */
export function AppShell() {
  const { hasFeature } = useAccess()
  const { session, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <>
      <Navbar bg="white" expand="lg" className="border-bottom shadow-sm">
        <Container fluid>
          <Navbar.Brand as={Link} to="/app">
            Consultório
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="app-navbar-nav" />
          <Navbar.Collapse id="app-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/app" end>
                Início
              </Nav.Link>
              {APP_CHILD_ROUTES.filter((r) => hasFeature(r.feature)).map((r) => (
                <Nav.Link
                  key={r.path}
                  as={NavLink}
                  to={`/app/${r.path}`}
                >
                  {r.label}
                </Nav.Link>
              ))}
            </Nav>
            <Nav className="ms-lg-2 align-items-lg-center flex-column flex-lg-row gap-1 gap-lg-2">
              {session?.email ? (
                <Navbar.Text className="small text-secondary d-none d-md-inline py-1">
                  {session.email}
                </Navbar.Text>
              ) : null}
              <Nav.Link as={Link} to="/">
                Página inicial
              </Nav.Link>
              <Nav.Link
                as="button"
                type="button"
                className="btn btn-link nav-link py-1 text-decoration-none"
                onClick={handleLogout}
              >
                Sair
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  )
}

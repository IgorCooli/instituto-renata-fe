import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { useAccess } from '../../app/access'
import { APP_CHILD_ROUTES } from '../../app/routeMeta'

/** Layout da área logada: menu filtrado por features habilitadas (mock). */
export function AppShell() {
  const { hasFeature } = useAccess()

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
            <Nav>
              <Nav.Link as={Link} to="/">
                Página inicial
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  )
}

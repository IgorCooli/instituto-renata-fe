import { Outlet, useMatch } from 'react-router-dom'
import { ThemeToggleScreenCorner } from '../ui/ThemeToggle'

/**
 * Raiz de `/app`: o **index** (início) não usa navbar superior nem lateral — só toggle de tema
 * no canto; as rotas de módulo são filhas de `AppFeatureShell` em `AppRoutes.tsx`.
 */
export function AppShell() {
  const isDashboard = useMatch({ path: '/app', end: true })

  return (
    <>
      {isDashboard ? <ThemeToggleScreenCorner /> : null}
      <Outlet />
    </>
  )
}

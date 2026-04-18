import { Outlet, Route, Routes } from 'react-router-dom'
import { AppFeatureShell, AppShell } from '../components/layout'
import { AppDashboardPage } from '../pages/app/AppDashboardPage'
import { CrmPage } from '../pages/app/CrmPage'
import { EstoquePage } from '../pages/app/EstoquePage'
import { MarketingPage } from '../pages/app/MarketingPage'
import { VendasLeadsPage } from '../pages/app/VendasLeadsPage'
import { VendasPipelinePage } from '../pages/app/VendasPipelinePage'
import { VendasTransacoesPage } from '../pages/app/VendasTransacoesPage'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { RequireAccess } from './RequireAccess'
import { RequireAuth } from './RequireAuth'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/app"
        element={
          <RequireAuth>
            <AppShell />
          </RequireAuth>
        }
      >
        <Route index element={<AppDashboardPage />} />
        <Route element={<AppFeatureShell />}>
          <Route
            path="marketing"
            element={
              <RequireAccess feature="marketing">
                <MarketingPage />
              </RequireAccess>
            }
          />
          <Route
            path="crm"
            element={
              <RequireAccess feature="crm">
                <CrmPage />
              </RequireAccess>
            }
          />
          <Route
            path="vendas"
            element={
              <RequireAccess feature="vendas">
                <Outlet />
              </RequireAccess>
            }
          >
            <Route index element={<VendasTransacoesPage />} />
            <Route path="leads" element={<VendasLeadsPage />} />
            <Route path="pipeline" element={<VendasPipelinePage />} />
          </Route>
          <Route
            path="estoque"
            element={
              <RequireAccess feature="estoque">
                <EstoquePage />
              </RequireAccess>
            }
          />
        </Route>
      </Route>
    </Routes>
  )
}

import { Route, Routes } from 'react-router-dom'
import { AppShell } from '../components/layout'
import { AppDashboardPage } from '../pages/app/AppDashboardPage'
import { CrmPage } from '../pages/app/CrmPage'
import { EstoquePage } from '../pages/app/EstoquePage'
import { MarketingPage } from '../pages/app/MarketingPage'
import { VendasPage } from '../pages/app/VendasPage'
import { HomePage } from '../pages/HomePage'
import { RequireAccess } from './RequireAccess'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/app" element={<AppShell />}>
        <Route index element={<AppDashboardPage />} />
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
              <VendasPage />
            </RequireAccess>
          }
        />
        <Route
          path="estoque"
          element={
            <RequireAccess feature="estoque">
              <EstoquePage />
            </RequireAccess>
          }
        />
      </Route>
    </Routes>
  )
}

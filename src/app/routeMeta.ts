import type { FeatureId } from './access/types'

/** Rotas filhas de `/app` — única fonte para menu e documentação de paths. */
export type AppChildRoute = {
  path: string
  label: string
  feature: FeatureId
}

export const APP_CHILD_ROUTES: AppChildRoute[] = [
  { path: 'marketing', label: 'Marketing', feature: 'marketing' },
  { path: 'crm', label: 'CRM', feature: 'crm' },
  { path: 'vendas', label: 'Vendas', feature: 'vendas' },
  { path: 'estoque', label: 'Estoque', feature: 'estoque' },
]

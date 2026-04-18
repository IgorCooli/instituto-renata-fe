import type { FeatureId } from './access/types'
import { APP_CHILD_ROUTES } from './routeMeta'

/** Item da sidebar por módulo (`soon` = desativado, sem rota). */
export type FeatureSidebarLink = {
  label: string
  /** vazio = raiz do módulo (`/app/marketing`); senão sufixo (`captacao` → `/app/marketing/captacao`). */
  pathSuffix: string
  soon?: boolean
}

const SUBTITLE: Record<FeatureId, string> = {
  marketing: 'Campanhas e leads',
  crm: 'Relacionamento e contatos',
  vendas: 'Pipeline e conversões',
  estoque: 'Itens e movimentações',
}

const LINKS: Record<FeatureId, FeatureSidebarLink[]> = {
  marketing: [
    { label: 'Campanhas', pathSuffix: '' },
    { label: 'Captação', pathSuffix: 'captacao', soon: true },
    { label: 'Leads', pathSuffix: 'leads', soon: true },
    { label: 'Métricas', pathSuffix: 'metricas', soon: true },
    { label: 'Meta Ads', pathSuffix: 'meta-ads', soon: true },
    { label: 'Instagram', pathSuffix: 'instagram', soon: true },
  ],
  crm: [{ label: 'Visão geral', pathSuffix: '' }],
  vendas: [
    { label: 'Transações', pathSuffix: '' },
    { label: 'Leads', pathSuffix: 'leads' },
    { label: 'Pipeline', pathSuffix: 'pipeline' },
    { label: 'Atividades', pathSuffix: 'atividades', soon: true },
    { label: 'Vendedores', pathSuffix: 'vendedores' },
    { label: 'Produtos & Precificação', pathSuffix: 'produtos-precificacao' },
    { label: 'Orçamentos', pathSuffix: 'orcamentos', soon: true },
    { label: 'Etiquetas', pathSuffix: 'etiquetas', soon: true },
    { label: 'Playbook', pathSuffix: 'playbook', soon: true },
  ],
  estoque: [{ label: 'Visão geral', pathSuffix: '' }],
}

export function featureHref(featurePath: string, pathSuffix: string): string {
  if (!pathSuffix) return `/app/${featurePath}`
  return `/app/${featurePath}/${pathSuffix}`
}

export function getFeatureNav(feature: FeatureId): {
  featurePath: string
  title: string
  subtitle: string
  links: FeatureSidebarLink[]
} {
  const meta = APP_CHILD_ROUTES.find((r) => r.feature === feature)
  if (!meta) {
    throw new Error(`Feature não registada: ${feature}`)
  }
  return {
    featurePath: meta.path,
    title: meta.label,
    subtitle: SUBTITLE[feature],
    links: LINKS[feature],
  }
}

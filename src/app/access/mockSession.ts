import type { AccessState, FeatureId, UserRole } from './types'

/**
 * Sessão mock — substituir por `/me` ou equivalente quando o backend existir.
 * Para testar pacotes parciais, remova entradas de `enabledFeatures`.
 */
const DEFAULT_FEATURES: FeatureId[] = [
  'marketing',
  'crm',
  'vendas',
  'estoque',
]

const DEFAULT_ROLE: UserRole = 'admin'

export function getMockAccessState(): AccessState {
  return {
    role: DEFAULT_ROLE,
    enabledFeatures: new Set(DEFAULT_FEATURES),
  }
}

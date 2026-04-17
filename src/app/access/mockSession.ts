import type { AccessState, FeatureId, UserRole } from './types'

/**
 * Sessão mock — substituir por `/me` ou equivalente quando o backend existir.
 * Para testar pacotes parciais, remova entradas de `enabledFeatures`.
 */
export const DEFAULT_MOCK_FEATURES: FeatureId[] = [
  'marketing',
  'crm',
  'vendas',
  'estoque',
]

const DEFAULT_ROLE: UserRole = 'admin'

/** Payload serializável para `AuthSession` após login mock (mesmo pacote padrão). */
export function getDefaultSessionForMockLogin(): {
  role: UserRole
  enabledFeatures: FeatureId[]
} {
  return {
    role: DEFAULT_ROLE,
    enabledFeatures: [...DEFAULT_MOCK_FEATURES],
  }
}

export function getMockAccessState(): AccessState {
  return {
    role: DEFAULT_ROLE,
    enabledFeatures: new Set(DEFAULT_MOCK_FEATURES),
  }
}

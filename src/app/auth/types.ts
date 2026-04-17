import type { FeatureId, UserRole } from '../access/types'

/** Sessão após login — espelhar contrato futuro do backend. */
export type AuthSession = {
  email: string
  role: UserRole
  enabledFeatures: FeatureId[]
}

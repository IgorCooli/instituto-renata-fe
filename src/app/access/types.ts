/** Alinhado a `docs/SPEC.md` §5.1 — chaves estáveis para API e UI. */
export type FeatureId = 'marketing' | 'crm' | 'vendas' | 'estoque'

/** Em código: `admin` | `common` (SPEC §5.2). */
export type UserRole = 'admin' | 'common'

export type AccessState = {
  role: UserRole
  /** Módulos contratados pelo tenant (mock até existir backend). */
  enabledFeatures: ReadonlySet<FeatureId>
}

export type AccessContextValue = AccessState & {
  hasFeature: (feature: FeatureId) => boolean
  /** `roles` omitido = qualquer papel com feature habilitada. */
  canAccess: (feature: FeatureId, roles?: UserRole[]) => boolean
}

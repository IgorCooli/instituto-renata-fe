import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { useAuth } from '../auth/useAuth'
import { AccessContext } from './context'
import type { AccessContextValue, FeatureId, UserRole } from './types'

/** Deriva `role` e features do utilizador autenticado (mock ou API futura). */
export function AccessProvider({ children }: { children: ReactNode }) {
  const { session } = useAuth()

  const value = useMemo<AccessContextValue>(() => {
    const enabledFeatures = session
      ? new Set(session.enabledFeatures)
      : new Set<FeatureId>()

    const role: UserRole = session?.role ?? 'common'

    const hasFeature = (feature: FeatureId) => enabledFeatures.has(feature)
    const canAccess = (feature: FeatureId, roles?: UserRole[]) => {
      if (!session) return false
      if (!hasFeature(feature)) return false
      if (!roles?.length) return true
      return roles.includes(role)
    }

    return {
      role,
      enabledFeatures,
      hasFeature,
      canAccess,
    }
  }, [session])

  return <AccessContext.Provider value={value}>{children}</AccessContext.Provider>
}

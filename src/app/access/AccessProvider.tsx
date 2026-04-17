import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { AccessContext } from './context'
import { getMockAccessState } from './mockSession'
import type { AccessContextValue, FeatureId, UserRole } from './types'

export function AccessProvider({ children }: { children: ReactNode }) {
  const state = useMemo(() => getMockAccessState(), [])

  const value = useMemo<AccessContextValue>(() => {
    const hasFeature = (feature: FeatureId) => state.enabledFeatures.has(feature)
    const canAccess = (feature: FeatureId, roles?: UserRole[]) => {
      if (!hasFeature(feature)) return false
      if (!roles?.length) return true
      return roles.includes(state.role)
    }
    return {
      ...state,
      hasFeature,
      canAccess,
    }
  }, [state])

  return <AccessContext.Provider value={value}>{children}</AccessContext.Provider>
}

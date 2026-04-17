import type { ReactNode } from 'react'
import { useAccess } from './access'
import type { FeatureId, UserRole } from './access/types'
import { ModuleBlockedPage } from '../pages/app/ModuleBlockedPage'

type RequireAccessProps = {
  feature: FeatureId
  roles?: UserRole[]
  children: ReactNode
}

export function RequireAccess({ feature, roles, children }: RequireAccessProps) {
  const { canAccess, hasFeature } = useAccess()

  if (!canAccess(feature, roles)) {
    return (
      <ModuleBlockedPage
        feature={feature}
        reason={hasFeature(feature) ? 'role' : 'feature'}
      />
    )
  }

  return children
}

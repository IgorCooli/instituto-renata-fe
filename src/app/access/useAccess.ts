import { useContext } from 'react'
import { AccessContext } from './context'
import type { AccessContextValue } from './types'

export function useAccess(): AccessContextValue {
  const ctx = useContext(AccessContext)
  if (!ctx) {
    throw new Error('useAccess deve ser usado dentro de AccessProvider')
  }
  return ctx
}

import { useContext } from 'react'
import { AuthReactContext } from './authContext'
import type { AuthContextValue } from './authContext'

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthReactContext)
  if (!ctx) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }
  return ctx
}

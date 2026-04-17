import { createContext } from 'react'
import type { AuthSession } from './types'

export type AuthContextValue = {
  session: AuthSession | null
  isAuthenticated: boolean
  login: (
    email: string,
    password: string,
  ) => Promise<{ ok: true } | { ok: false; error: string }>
  logout: () => void
}

export const AuthReactContext = createContext<AuthContextValue | null>(null)

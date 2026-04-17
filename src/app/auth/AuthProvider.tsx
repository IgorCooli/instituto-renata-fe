import type { ReactNode } from 'react'
import { useCallback, useMemo, useState } from 'react'
import { AuthReactContext } from './authContext'
import type { AuthContextValue } from './authContext'
import { mockLogin } from './mockLogin'
import type { AuthSession } from './types'

const STORAGE_KEY = 'ir_auth_session'

function loadSession(): AuthSession | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const p = JSON.parse(raw) as AuthSession
    if (
      typeof p.email !== 'string' ||
      typeof p.role !== 'string' ||
      !Array.isArray(p.enabledFeatures)
    ) {
      return null
    }
    return p
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(loadSession)

  const login = useCallback(
    async (email: string, password: string) => {
      const result = await mockLogin(email, password)
      if (!result.ok) {
        return { ok: false as const, error: result.error }
      }
      setSession(result.session)
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(result.session))
      return { ok: true as const }
    },
    [],
  )

  const logout = useCallback(() => {
    setSession(null)
    sessionStorage.removeItem(STORAGE_KEY)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      isAuthenticated: !!session,
      login,
      logout,
    }),
    [session, login, logout],
  )

  return (
    <AuthReactContext.Provider value={value}>
      {children}
    </AuthReactContext.Provider>
  )
}

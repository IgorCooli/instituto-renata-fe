import { getDefaultSessionForMockLogin } from '../access/mockSession'
import type { AuthSession } from './types'

export type MockLoginResult =
  | { ok: true; session: AuthSession }
  | { ok: false; error: string }

/**
 * Login mock — substituir por `fetch` ao API.
 * Regra demo: e-mail válido + senha com pelo menos 4 caracteres.
 */
export async function mockLogin(
  email: string,
  password: string,
): Promise<MockLoginResult> {
  const trimmed = email.trim().toLowerCase()
  if (!trimmed.includes('@')) {
    return { ok: false, error: 'Informe um e-mail válido.' }
  }
  if (password.length < 4) {
    return { ok: false, error: 'Senha deve ter pelo menos 4 caracteres.' }
  }

  await new Promise((r) => setTimeout(r, 400))

  const base = getDefaultSessionForMockLogin()
  const session: AuthSession = {
    email: trimmed,
    role: base.role,
    enabledFeatures: base.enabledFeatures,
  }

  return { ok: true, session }
}

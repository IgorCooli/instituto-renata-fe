import { createContext } from 'react'
import type { AccessContextValue } from './types'

export const AccessContext = createContext<AccessContextValue | null>(null)

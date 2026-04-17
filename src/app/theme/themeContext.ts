import { createContext } from 'react'

export type ThemeMode = 'light' | 'dark'

export type ThemeContextValue = {
  theme: ThemeMode
  setTheme: (mode: ThemeMode) => void
  toggleTheme: () => void
}

export const ThemeReactContext = createContext<ThemeContextValue | null>(null)

export const THEME_STORAGE_KEY = 'ir_theme'

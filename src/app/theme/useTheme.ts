import { useContext } from 'react'
import { ThemeReactContext } from './themeContext'
import type { ThemeContextValue } from './themeContext'

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeReactContext)
  if (!ctx) {
    throw new Error('useTheme deve ser usado dentro de ThemeProvider')
  }
  return ctx
}

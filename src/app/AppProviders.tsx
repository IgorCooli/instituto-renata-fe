import type { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AccessProvider } from './access'
import { AuthProvider } from './auth'
import { ThemeProvider } from './theme'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <AccessProvider>{children}</AccessProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

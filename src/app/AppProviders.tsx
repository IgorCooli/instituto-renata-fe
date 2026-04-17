import type { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AccessProvider } from './access'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <BrowserRouter>
      <AccessProvider>{children}</AccessProvider>
    </BrowserRouter>
  )
}

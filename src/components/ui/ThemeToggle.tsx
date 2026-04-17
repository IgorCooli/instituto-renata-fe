import Button from 'react-bootstrap/Button'
import { useTheme } from '../../app/theme/useTheme'

/** Sol em traço (modo escuro → ativar claro). */
function IconSunMinimal({ className = 'w-100 h-100' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.387 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
    </svg>
  )
}

/** Lua em traço (modo claro → ativar escuro). */
function IconMoonMinimal({ className = 'w-100 h-100' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M21.752 15.002A9.718 9.718 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
    </svg>
  )
}

type ThemeToggleProps = {
  /** Tamanho do botão no shell / home. */
  size?: 'sm' | 'lg'
}

export function ThemeToggle({ size = 'sm' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <Button
      type="button"
      variant="outline-secondary"
      className="text-nowrap"
      size={size}
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={
        isDark ? 'Ativar modo claro' : 'Ativar modo escuro'
      }
      title={isDark ? 'Modo claro' : 'Modo escuro'}
    >
      <span
        aria-hidden
        className="d-inline-flex align-items-center justify-content-center"
        style={{ width: '1.125rem', height: '1.125rem' }}
      >
        {isDark ? <IconSunMinimal /> : <IconMoonMinimal />}
      </span>
    </Button>
  )
}

/** Toggle fixo no canto superior direito da viewport (rotas sem navbar global). */
export function ThemeToggleScreenCorner({
  size = 'sm',
}: Pick<ThemeToggleProps, 'size'> = {}) {
  return (
    <div
      className="position-fixed top-0 end-0 p-2 p-sm-3"
      style={{ zIndex: 1040 }}
    >
      <ThemeToggle size={size} />
    </div>
  )
}

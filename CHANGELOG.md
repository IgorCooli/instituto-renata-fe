# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato segue a ideia de [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/), e este projeto adota [Semantic Versioning](https://semver.org/lang/pt-BR/) onde fizer sentido.

## [Unreleased]

## [0.2.0] — 2026-04-17

### Added

- **Biblioteca de componentes base (Fase 2):** `AppButton`, `AppBadge`, `AppTextField`, `AppCard`, `AppAlert`, `AppModal` em `src/components/ui/`.
- **Layout:** `PageContainer`, `PageHeader`, `EmptyState` em `src/components/layout/`.
- Página inicial atualizada para demonstrar os primitivos (inclui exemplo de campo desabilitado e estado vazio).

## [0.1.0] — 2026-04-17

### Added

- Fundação do frontend: **Vite 8**, **React 19**, **TypeScript**, ESLint.
- **Bootstrap 5**, **react-bootstrap** e **react-router-dom**.
- Tema global **marsala + cinza** em `src/styles/theme.css` (tokens `--ir-*` e `--bs-primary`).
- Pastas: `src/app/`, `src/components/ui`, `src/components/layout`, `src/features/` (auth, marketing, crm, vendas, estoque), `src/mocks/`, `src/pages/`, `src/styles/`.
- Página inicial placeholder (`/`) usando componentes Bootstrap e textos mockados em `src/mocks/index.ts`.
- Processo documentado: atualizar este arquivo e o `README.md` a cada feature entregue (ver `docs/SPEC.md` §7.1).

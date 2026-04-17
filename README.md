# instituto-renata-fe

Frontend do sistema de gestão de consultório (escopo genérico, multiárea).

## Documentação

- [Especificação do produto](docs/SPEC.md) — visão, módulos e requisitos transversais.
- [Plano de implementação](docs/PLAN.md) — fases por feature e ordem sugerida.
- [Changelog](CHANGELOG.md) — histórico de mudanças por versão.

Gerenciador de pacotes: **npm**.

**Dados:** nesta fase o frontend usa **mocks** (dados falsos) para visualizar telas; integração com o API em repositório `…-be` será depois (ver `docs/SPEC.md` §2.1).

## Desenvolvimento

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run lint
```

## Funcionalidades (em evolução)

Lista resumida do que já existe no frontend; a cada nova feature concluída, atualizar aqui e o [CHANGELOG.md](CHANGELOG.md) (ver `docs/SPEC.md` §7.1).

- **Fase 1 — Fundação:** Vite + React + TypeScript, Bootstrap/react-bootstrap, tema marsala/cinza, React Router, estrutura de pastas (`app`, `components`, `features`, `mocks`, `pages`), página inicial placeholder em `/`.
- **Fase 2 — Componentes UI:** wrappers `AppButton`, `AppBadge`, `AppTextField`, `AppCard`, `AppAlert`, `AppModal`; layout `PageContainer`, `PageHeader`, `EmptyState` (`src/components/`).

## Manutenção do repositório

A cada **feature** entregue: atualizar **`CHANGELOG.md`** (entrada na versão ou em *Unreleased*) e esta secção **Funcionalidades** no README.
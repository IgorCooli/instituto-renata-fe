# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato segue a ideia de [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/), e este projeto adota [Semantic Versioning](https://semver.org/lang/pt-BR/) onde fizer sentido.

## [Unreleased]

### Added

- **Vendas — Produtos & Precificação (`/app/vendas/produtos-precificacao`):** abas **Catálogo** / **Precificação** (placeholder), quatro KPIs (Total, Ativos, Serviços, Preço médio), busca, tabela com categoria e subcategoria em badge, preço em verde, custo “—”, tipo **Serviço** com duração, status **ATIVO** em pill dourada, **+ Novo Produto** e FAB de suporte em placeholder; 68 linhas mock em `src/mocks/vendas-produtos-precificacao.ts`; estilos em `src/styles/vendas-produtos-precificacao-page.css`. Item **Produtos & Precificação** ativo na sidebar de Vendas.
- **Vendas — Vendedores (`/app/vendas/vendedores`):** cabeçalho, botão **+ Novo Vendedor** (placeholder), três KPIs (Total, Ativos, Inativos) com realces azul/verde/laranja, busca “Buscar vendedor…”, tabela com avatar, contato (telefone e e-mail), função, comissão, conversão %, badge de status e menu de ações em placeholder; dados em `src/mocks/vendas-vendedores.ts`; estilos em `src/styles/vendas-vendedores-page.css`. Item **Vendedores** ativo na sidebar de Vendas.
- **Vendas — Pipeline (`/app/vendas/pipeline`):** cabeçalho com contagem, faixa de KPIs (Pipeline, Forecast, Ganhos, Perdidos, Ciclo), barra de filtros em placeholder, busca, alternância quadro/lista, quadro Kanban com scroll horizontal, arrastar e largar entre colunas, cartões com avatar, valor e badges; dados em `src/mocks/vendas-pipeline.ts`; estilos em `src/styles/vendas-pipeline-page.css`; `PipelineDealCard.tsx`. Item **Pipeline** ativo na sidebar de Vendas.
- **Vendas — Leads (`/app/vendas/leads`):** cartões resumo (Leads / Pipeline / Clientes), filtros em pills, dropdown de etapa, busca, tabela com checkbox (placeholder), origem e etapa com ícones; botões **CSV** e **+ Lead** e FAB em placeholder. Rotas aninhadas em `vendas` (`index` = Transações, `leads` = Leads). Dados em `src/mocks/vendas-leads.ts`; `src/styles/vendas-leads-page.css`; `VendasTransacoesPage.tsx` (antes conteúdo único de `VendasPage`).
- **Vendas (`/app/vendas`) — Transações (Fase 8):** KPIs (faturamento, quantidade, ticket médio), seletor de mês/ano com navegação, busca na tabela, lista mock de transações com estratégia (badges), pagamento e avatar de cliente; botão **Nova Venda** e FAB de suporte em placeholder. Dados em `src/mocks/vendas.ts`; estilos em `src/styles/vendas-page.css`. Sidebar do módulo com itens alinhados ao produto (demais rotas “Em breve”).

### Changed

- **Desenvolvimento:** `vite.config.ts` — `server.host` e `server.allowedHosts` para permitir abrir o dev server pelo hostname (ex.: **Tailscale MagicDNS** `*.ts.net` no telemóvel).
- **`AppFeatureShell`:** sidebar de módulos **recolhível** — botão na topbar (abrir/recolher), em **mobile** painel sobreposto com backdrop ao abrir, botão circular no canto inferior esquerdo quando o menu está fechado, fecho ao navegar; em **desktop** (`≥ md`) a barra lateral anima para largura zero. Altura da sidebar **limitada à viewport** (`100vh` / `100dvh`), sem acompanhar páginas com conteúdo muito alto; links com scroll interno. Hook `src/hooks/useMediaQuery.ts`; estilos em `app-feature-shell.css`.
- **Documentação:** `docs/CONTEXT.md`, `docs/PROMPT.md`, `docs/PLAN.md` e `docs/SPEC.md` §4.4 — alinhados às rotas e telas do módulo **Vendas** (Pipeline, Vendedores, Produtos & Precificação) e ao estado da Fase 8.
- **Documentação:** `docs/SPEC.md` §3.2 — **Clean Architecture** (diagrama Uncle Bob, legenda, mapeamento no frontend); removidas referências a **linguagem ou stack concretas** do backend no FE; `docs/assets/clean-architecture-uncle-bob.png`; README e PROMPT atualizados.
- **Documentação:** `docs/PLAN.md` — nova **Fase 8** (telas iniciais dos módulos com referência visual / prints), priorizada antes dos módulos profundos; **CRM, Vendas, Estoque, Qualidade** renumerados para **9–12**. `docs/SPEC.md` §6 e `docs/PROMPT.md` alinhados.

## [0.6.0] — 2026-04-19

### Added

- **Fase 7.1 — Marketing interno (`/app/marketing`):** meta anual e faixa mensal (real / projetado / meta), tabela de campanhas com busca, progresso e ações em placeholder (“Em breve”); dados em `src/mocks/marketing.ts`; estilos em `src/styles/marketing-page.css`.
- **Tela de início** (`/app`): dashboard com perfil (iniciais, nome derivado do e-mail, papel), saudação com marca configurável em `mocks`, banner de onboarding (progresso e fechar), grelha de módulos **Marketing**, **CRM**, **Vendas**, **Estoque** com ícones em traço e respeito a `hasFeature`, secção **Complementos** (placeholder) e botão flutuante de suporte (desativado). Estilos em `src/styles/app-dashboard.css`.

### Changed

- **Documentação:** `docs/SPEC.md` §4.2 — marketing interno (campanhas/metas) vs site público; `docs/PLAN.md` — Fase 7 em **7.1** (entregue) e **7.2** (landing pendente).
- **Documentação:** `docs/SPEC.md` §3.1 — variável de ambiente **`VITE_API_BASE_URL`** para definir a URL base do backend (local vs produção) e regras de uso com Vite.

- **Navegação na área logada:** o **início** (`/app`) deixa de usar a navbar horizontal global; só **toggle de tema** no canto (`ThemeToggleScreenCorner`). As rotas de **módulo** (`/app/marketing`, …) usam **`AppFeatureShell`**: **navbar lateral** (subtítulo e links por módulo em `featureSidebar.ts`, entradas “Em breve” desativadas), **topbar** com Voltar ao início, tema e avatar, e perfil + Sair na base da sidebar. Estilos em `src/styles/app-feature-shell.css`.

## [0.5.0] — 2026-04-17

### Added

- **Fase 5 — Tema claro/escuro:** `ThemeProvider`, `useTheme`, persistência `localStorage` (`ir_theme`), `data-bs-theme` no `<html>` (script inline em `index.html` para evitar flash).
- Componente **`ThemeToggle`** na **navbar** (`AppShell`), **cabeçalho da home** e **acima do cartão de login**.
- Tokens de login e superfície separados para **`light`** e **`dark`** em `theme.css`; sombra do cartão de login ajustada em `login.css`.

## [0.4.0] — 2026-04-17

### Added

- **Fase 4 — Login (mock):** rota `/login` com layout em duas colunas (formulário + painel de marca), estilos em `src/styles/login.css` e tokens `--login-*` em `theme.css` (fáceis de trocar por cliente).
- **`AuthProvider`**, **`useAuth`**, **`mockLogin`**, persistência em `sessionStorage` (`ir_auth_session`); `AccessProvider` passa a usar `role` e `enabledFeatures` da sessão após login.
- **`RequireAuth`** protege `/app`; botão **Sair** e e-mail no `AppShell`; home com **Entrar** ou **Ir para /app** conforme sessão.

### Changed

- **Documentação:** `docs/SPEC.md` e `docs/PLAN.md` — obrigatoriedade de UI **responsiva**; `README` com referência.

## [0.3.0] — 2026-04-17

### Added

- **Fase 3 — Shell e acesso (mock):** `AccessProvider`, `useAccess`, `mockSession` (`src/app/access/`); rotas `/app` e filhas por módulo; `AppShell` com menu filtrado por features; `RequireAccess` e `ModuleBlockedPage` quando módulo não está no pacote ou papel insuficiente.
- **`routeMeta.ts`:** lista única de rotas filhas de `/app` para menu e paths.
- Páginas placeholder: `AppDashboardPage`, `CrmPage`, `VendasPage`, `EstoquePage` (`src/pages/app/`).
- Link na home pública para `/app`.

### Changed

- **Documentação:** `README.md` — secção de funcionalidades apenas para o que estiver **em produção** para o cliente; `CHANGELOG.md` como histórico técnico (`docs/SPEC.md` §7.1).

## [0.2.0] — 2026-04-17

### Added

- **Biblioteca de componentes base (Fase 2):** `AppButton`, `AppBadge`, `AppTextField`, `AppCard`, `AppAlert`, `AppModal` em `src/components/ui/`.
- **Layout:** `PageContainer`, `PageHeader`, `EmptyState` em `src/components/layout/`.
- Página inicial atualizada para demonstrar os primitivos (inclui exemplo de campo desabilitado e estado vazio).

## [0.1.0] — 2026-04-17

### Added

- Fundação do frontend: **Vite 8**, **React 19**, **TypeScript**, ESLint.
- **Bootstrap 5**, **react-bootstrap** e **react-router-dom**.
- Tema global **marsala + cinza** em `src/styles/theme.css` (tokens `--ir-`* e `--bs-primary`).
- Pastas: `src/app/`, `src/components/ui`, `src/components/layout`, `src/features/` (auth, marketing, crm, vendas, estoque), `src/mocks/`, `src/pages/`, `src/styles/`.
- Página inicial placeholder (`/`) usando componentes Bootstrap e textos mockados em `src/mocks/index.ts`.
- Processo de documentação descrito em `docs/SPEC.md` §7 (evoluído depois: README voltado à produção para o cliente).


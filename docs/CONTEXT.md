# Contexto do projeto (resumo para IA e devs)

**Função:** carga rápida de contexto **sem** substituir `PROMPT.md`, `SPEC.md` ou `PLAN.md`. Use este ficheiro no início de uma sessão longa para **economizar tokens**; depois aprofunde só onde a tarefa exigir.

**Manutenção:** quando o estado do produto mudar (rotas, fases concluídas, ficheiros-chave novos), atualizar **este ficheiro na mesma alteração** que `docs/PROMPT.md` (regra espelhada: CONTEXT = resumo; PROMPT = estado detalhado).

---

## Stack e pacotes

- **Vite 8 + React 19 + TypeScript**, **Bootstrap 5** + `react-bootstrap`, **react-router-dom** 7.
- **npm** (não usar yarn/pnpm no doc sem decisão explícita).
- **API real:** repositório `instituto-renata-be` (HTTP; Clean Architecture — `SPEC.md` §3.2). **Ainda não integrado:** tudo mock.

---

## Regras de ouro

1. **Responsivo obrigatório** (`SPEC.md` §6).
2. **Rotas e features:** uma fonte — `routeMeta.ts` + `RequireAccess` + `featureSidebar.ts` (não duplicar regras em componentes).
3. **Dados:** mocks em `src/mocks/` ou serviços substituíveis; **não** acoplar UI ao backend até a fase de integração.
4. **Tema:** `data-bs-theme` + `ir_theme` em `localStorage`; não depende de API.
5. **Alteração que mude estado do produto:** `CHANGELOG.md` + `PROMPT.md` + **este** `CONTEXT.md` (resumo).

---

## Sessão e acesso

| | |
|--|--|
| Sessão mock | `sessionStorage` **`ir_auth_session`** |
| Tipos | `src/app/auth/types.ts` — `AuthSession`: `email`, `role`, `enabledFeatures` |
| Login mock | `src/app/auth/mockLogin.ts` |
| Features | `src/app/access/types.ts` — `FeatureId`: `marketing`, `crm`, `vendas`, `estoque` |
| Roles | `admin` \| `common` (UI em PT) |
| Guardas | `RequireAuth` (área `/app`), `RequireAccess` (feature por rota) |

---

## Rotas (resumo)

| Path | Shell | Notas |
|------|--------|--------|
| `/` | — | Home pública |
| `/login` | — | Login |
| `/app` | `AppShell` só | **Dashboard** — sem sidebar lateral; `ThemeToggleScreenCorner` |
| `/app/marketing` | `AppFeatureShell` | Campanhas/metas (mock) |
| `/app/crm` | `AppFeatureShell` | **Stub** |
| `/app/vendas` | `AppFeatureShell` | **Transações** (`VendasTransacoesPage`, index) |
| `/app/vendas/leads` | `AppFeatureShell` | **Leads** (`VendasLeadsPage`) |
| `/app/vendas/pipeline` | `AppFeatureShell` | **Pipeline** Kanban (`VendasPipelinePage`) |
| `/app/vendas/vendedores` | `AppFeatureShell` | **Vendedores** (`VendasVendedoresPage`) |
| `/app/vendas/produtos-precificacao` | `AppFeatureShell` | **Produtos & Precificação** (`VendasProdutosPrecificacaoPage`) |
| `/app/estoque` | `AppFeatureShell` | **Stub** |

**Ficheiros:** `src/app/AppRoutes.tsx` (árvore), `src/app/routeMeta.ts` (`APP_CHILD_ROUTES`), `src/app/featureSidebar.ts` (labels + `pathSuffix` + `soon`).

---

## Pastas úteis

| Pasta / ficheiro | Conteúdo |
|------------------|----------|
| `src/app/` | Router, auth, access, tema, `routeMeta`, `featureSidebar` |
| `src/components/ui/` | Primitivos (AppButton, ThemeToggle, …) |
| `src/components/layout/` | `AppShell`, `AppFeatureShell` (sidebar recolhível + topbar), `PageContainer`, … |
| `src/hooks/` | Hooks partilhados (ex.: `useMediaQuery`) |
| `src/pages/app/` | Telas logadas; vendas: `VendasTransacoesPage`, `VendasLeadsPage`, `VendasPipelinePage`, `VendasVendedoresPage`, `VendasProdutosPrecificacaoPage` |
| `src/mocks/` | Dados fictícios (`marketing.ts`, `vendas.ts`, `vendas-leads.ts`, `vendas-pipeline.ts`, `vendas-vendedores.ts`, `vendas-produtos-precificacao.ts`, …) |
| `src/styles/` | `theme.css`, `app-feature-shell.css`, `marketing-page.css`, `vendas-page.css`, `vendas-leads-page.css`, `vendas-pipeline-page.css`, `vendas-vendedores-page.css`, `vendas-produtos-precificacao-page.css` |
| `src/components/vendas/` | Componentes do módulo (ex.: `PipelineDealCard`, `LeadStageDropdown`) |

---

## Estado das telas (Fase 8 em curso)

- **Feito:** dashboard `/app`, marketing interno, **vendas** — Transações, Leads, Pipeline (Kanban), Vendedores, Produtos & Precificação (rotas aninhadas sob `vendas`; ver `AppRoutes.tsx`). Na sidebar de Vendas ainda **Em breve:** Atividades, Orçamentos, Etiquetas, Playbook.
- **Stub:** CRM, Estoque.
- **Pendente (plan):** marketing público 7.2; telas iniciais CRM/Estoque; depois fases 9–11 (módulos profundos); fase 12 (qualidade + camada API).

---

## Variáveis de ambiente (FE)

- **`VITE_API_BASE_URL`** — base da API (build time); ver `SPEC.md` §3.1. Enquanto só mock, pode estar vazio.

---

## Mapa de documentos

| Documento | Uso |
|-----------|-----|
| **`CONTEXT.md`** (este) | Resumo denso / primeira leitura em sessões IA |
| **`PROMPT.md`** | Estado atual, próximo passo, regras de manutenção |
| **`SPEC.md`** | Produto, RBAC, requisitos, Clean Architecture §3.2 |
| **`PLAN.md`** | Fases numeradas e ordem |
| **`CHANGELOG.md`** | Histórico por versão |
| **`README.md`** | Como correr; funcionalidades para cliente só em produção |

---

## Comandos

```bash
npm install
npm run dev    # Vite, tipicamente :5173
npm run build
npm run lint
```

---

## Última atualização

Alinhar esta data ao último commit relevante de contexto ou à edição manual de `PROMPT.md`.

*Última revisão deste resumo: 2026-04-17.*

# Diretrizes para continuar o desenvolvimento (frontend)

Este ficheiro existe para **sessões novas** (outro chat, outro dia, outro dev): lê **primeiro** isto, depois os documentos ligados abaixo.

### Manutenção obrigatória

**Toda alteração** que mude o estado do desenvolvimento (código, rotas, contratos com o backend, conclusão de fase, nova prioridade, etc.) deve vir acompanhada de **atualização deste `docs/PROMPT.md` na mesma alteração** (ou no mesmo PR), para refletir:

- **O que já foi feito** — secção *O que já foi feito (resumo)* (tabela ou bullets).
- **Os próximos passos** — secção *Próximo passo sugerido*, alinhada ao `docs/PLAN.md` e ao estado real do código.

O **`CHANGELOG.md`** continua a registar *o quê* mudou por versão; o **PROMPT** é o **estado atual em linguagem natural** para quem abre o projeto de novo. Se o `PLAN.md` ou o `SPEC.md` mudarem de forma material, o PROMPT deve acompanhar.

**Regra explícita para assistentes de IA:** ao concluir **qualquer tarefa** que altere o repositório de forma a mudar “o que está feito” ou “o que falta a seguir”, **não encerrar** sem atualizar as secções acima neste ficheiro. Isto inclui novas features, refactors que mudem fluxos, integração com API, e correções que alterem comportamento visível ou contratos. **Única exceção:** mudanças puramente cosméticas sem impacto no produto (ex.: typo em texto que não reflita novo estado). Em caso de dúvida, **atualiza o PROMPT**.

### Para assistentes (IA) e novas sessões — checklist mínima

Antes de editar código, confirma:

1. **Leste** este `docs/PROMPT.md` (estado + próximo passo) e a secção relevante do **`docs/PLAN.md`**.
2. Sabes onde está o **registo de rotas e features:** `src/app/routeMeta.ts` (`APP_CHILD_ROUTES`), `src/app/featureSidebar.ts` (itens da sidebar por módulo) e `src/app/AppRoutes.tsx` (início vs `AppFeatureShell` aninhado).
3. Sabes que **sessão mock** usa `sessionStorage` chave **`ir_auth_session`** e tipos em `src/app/auth/types.ts` (`AuthSession`: `email`, `role`, `enabledFeatures`).
4. Sabes que **acesso por módulo** vem de `src/app/access/` (`useAccess`, `hasFeature`) e features em `src/app/access/types.ts` (`FeatureId`).
5. **Tema** é só cliente: `localStorage` **`ir_theme`**, `ThemeProvider`, `index.html` script anti-FOUC — não depende do backend.
6. **Antes de concluir a tarefa:** atualizar **`docs/PROMPT.md`** conforme a regra de manutenção (obrigatório para alterações que mudem estado ou próximos passos), **`CHANGELOG.md`** quando for o caso, e correr **`npm run lint`** / **`npm run build`**.

---

## O que é esta aplicação

**Sistema web de gestão de consultório** (primeiro uso pensado para contexto odontológico, mas UI e domínio genéricos: “paciente”, “item”, etc.). É **multi-cliente** por pacotes de módulos: cada tenant só vê os módulos contratados (**features**: `marketing`, `crm`, `vendas`, `estoque`). Utilizadores têm papel **`admin`** ou **`common`**.

- **Repositório irmão:** API real em **`instituto-renata-be`** (Go + PostgreSQL). Até a integração HTTP, o frontend usa **mocks** (`mockLogin`, `sessionStorage`, `enabledFeatures` na sessão).
- **Responsivo é obrigatório** (mobile-first onde fizer sentido).

---

## Por onde começar (ordem de leitura)

1. Este guia (**`docs/PROMPT.md`**) — contexto + estado atual.
2. **`docs/SPEC.md`** — produto, módulos §4, RBAC §5, requisitos transversais §6, processo §7.
3. **`docs/PLAN.md`** — fases numeradas; **fonte de verdade** para “o que falta”.
4. **`CHANGELOG.md`** (na raiz) — o que já entrou no código por versão (inclui [Unreleased]).
5. **`README.md`** — como correr o projeto e regra da secção “Funcionalidades em produção”.

---

## O que já foi feito (resumo)

| Fase | Tema | Estado |
|------|------|--------|
| 1 | Fundação Vite + React + TS + Bootstrap + tema | Feito |
| 2 | Componentes UI base + layout | Feito |
| 3 | Rotas, shell `/app`, `AccessProvider`, `routeMeta`, guardas por feature | Feito |
| 4 | Login (mock), `AuthProvider`, `RequireAuth` | Feito |
| 5 | Tema claro/escuro (`ThemeProvider`, `ir_theme`, `ThemeToggle`) | Feito |
| 6 | Tela de início `/app` (dashboard, cartões dos módulos, onboarding, complementos genéricos) | Feito |
| 7.1 | Marketing interno `/app/marketing` (metas, campanhas mock, tabela + busca) | Feito |
| 7.2 | Marketing público (landing institucional, rota pública) | Pendente — ver `docs/PLAN.md` §7.2 |
| 8 | **Telas iniciais** dos módulos (prints / referência visual): CRM, Vendas, Estoque, etc. | **Em curso** — prioridade; ver **`docs/PLAN.md`** (secção **Fase 8**) |
| 9–11 | CRM / Vendas / Estoque **profundos** (CRUD, listas, fluxos) | Planeado após Fase 8 |
| 12 | Qualidade + preparação para API | Planeado |
| 0 | Documentação contínua (SPEC/PLAN/README/changelog) | **Contínuo** — ver checklists no `docs/PLAN.md` |

**Rotas úteis:** `/` (home pública), `/login`, `/app` (dashboard), `/app/marketing`, `/app/crm`, `/app/vendas`, `/app/estoque` (stub ou em evolução conforme PLAN).

**Layout área logada:** o **início** (`/app` index) **não** tem navbar superior nem lateral — apenas **`ThemeToggleScreenCorner`** e o conteúdo do dashboard. As **telas de módulo** (`/app/marketing`, etc.) usam **`AppFeatureShell`**: sidebar lateral (título do módulo, links configuráveis em `featureSidebar.ts`, itens “Em breve” desativados), barra superior fina com **← Voltar** para `/app`, **tema** e avatar; rodapé da sidebar com perfil e **Sair**.

**Ficheiros-chave:** `src/app/AppRoutes.tsx`, `src/app/routeMeta.ts`, `src/app/featureSidebar.ts`, `src/app/auth/`, `src/app/access/`, `src/app/theme/`, `src/components/layout/AppShell.tsx`, `src/components/layout/AppFeatureShell.tsx`, `src/styles/app-feature-shell.css`, `src/pages/app/AppDashboardPage.tsx`, `src/pages/app/MarketingPage.tsx`, `src/mocks/marketing.ts`, `src/styles/marketing-page.css`.

**Contrato alinhado ao backend (quando integrar):** o FE deve continuar a poder representar `AuthSession` como hoje; detalhes em **`instituto-renata-be/docs/SPEC.md`** §6. Até lá, **`src/app/auth/mockLogin.ts`** simula login.

**Armadilhas comuns:** não duplicar regras de feature fora de `routeMeta` + guardas; não quebrar **mobile** (`docs/SPEC.md` §6); não listar no `README` “produção” o que ainda não foi deployado para o cliente.

---

## Próximo passo sugerido

Pelo **`docs/PLAN.md`**:

- **Fase 8 — Telas iniciais dos módulos:** implementar a **primeira tela** de cada rota em uso (ex.: `/app/crm`, `/app/vendas`, `/app/estoque`), **print a print** ou referência visual; mocks; responsivo e tema. **7.2** (marketing público) pode entrar aqui ou em paralelo, conforme prioridade.
- **Fase 7.2 — Marketing (público):** landing/site institucional (se não for tratada dentro da Fase 8).
- Depois **Fases 9–11:** CRM, Vendas, Estoque com dados mock **ricos** (listas completas, CRUD, fluxos).
- **Fase 12:** qualidade e preparação para API (camada `services` trocável por HTTP).

Quando o **backend** expuser login real, substituir `mockLogin` e alinhar tipos ao contrato em `instituto-renata-be/docs/SPEC.md` §6.

---

## Como trabalhar em cada entrega

1. Ler a secção da fase no **`docs/PLAN.md`** e o módulo correspondente no **`docs/SPEC.md`**.
2. Implementar com **dados mock** na camada de serviço/hook (não acoplar UI ao `be` até integração).
3. Manter **uma fonte** para rotas/features (`routeMeta` + guardas).
4. Atualizar **`CHANGELOG.md`** ([Unreleased] ou versão).
5. **`README.md` — “Funcionalidades em produção”:** só quando houver **deploy real para o cliente** (ver `docs/SPEC.md` §7.1).

---

## Comandos locais

```bash
npm install
npm run dev      # Vite — porta típica 5173
npm run build
npm run lint
```

---

## Ligação ao backend

- Repositório irmão: clonar **`instituto-renata-be`** ao lado deste projeto (mesmo diretório pai) para trabalhar contratos; spec da API: `instituto-renata-be/docs/SPEC.md`.
- **URL da API por ambiente:** ver **`docs/SPEC.md` §3.1** — variável **`VITE_API_BASE_URL`** (local vs produção); cliente HTTP deve usar esta base para todos os endpoints.
- Contrato de sessão alvo: `email`, `role`, `enabledFeatures` (ver §6 do SPEC do `be`).
- O frontend já persiste sessão mock em `sessionStorage` (`ir_auth_session`).

---

*Última atualização deste guia: 2026-04-19 — Nova **Fase 8** (telas iniciais por módulo); CRM/Vendas/Estoque/Qualidade renumerados para **9–12**; prioridade atual = prints/referências.*

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
2. Sabes onde está o **registo de rotas e features:** `src/app/routeMeta.ts` (`APP_CHILD_ROUTES`) e `src/app/AppRoutes.tsx`.
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
| 0 | Documentação contínua (SPEC/PLAN/README/changelog) | **Contínuo** — ver checklists no `docs/PLAN.md` |

**Rotas úteis:** `/` (home pública), `/login`, `/app` (dashboard), `/app/marketing`, `/app/crm`, `/app/vendas`, `/app/estoque` (stub ou em evolução conforme PLAN).

**Ficheiros-chave:** `src/app/AppRoutes.tsx`, `src/app/routeMeta.ts`, `src/app/auth/`, `src/app/access/`, `src/app/theme/`, `src/components/layout/AppShell.tsx`, `src/pages/app/AppDashboardPage.tsx`.

**Contrato alinhado ao backend (quando integrar):** o FE deve continuar a poder representar `AuthSession` como hoje; detalhes em **`instituto-renata-be/docs/SPEC.md`** §6. Até lá, **`src/app/auth/mockLogin.ts`** simula login.

**Armadilhas comuns:** não duplicar regras de feature fora de `routeMeta` + guardas; não quebrar **mobile** (`docs/SPEC.md` §6); não listar no `README` “produção” o que ainda não foi deployado para o cliente.

---

## Próximo passo sugerido

Pelo **`docs/PLAN.md`**:

- **Fase 7 — Marketing (público):** landing/site institucional, rota pública clara (hoje `/` ainda pode ser a home técnica — decidir com o spec).
- Depois **Fase 8–10:** CRM, Vendas, Estoque com dados mock ricos (listas, formulários).
- **Fase 11:** qualidade e preparação para API (camada `services` trocável por HTTP).

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
- Contrato de sessão alvo: `email`, `role`, `enabledFeatures` (ver §6 do SPEC do `be`).
- O frontend já persiste sessão mock em `sessionStorage` (`ir_auth_session`).

---

*Última atualização deste guia: alinhada ao `docs/PLAN.md` e `CHANGELOG.md` na data em que foi editado no repositório.*

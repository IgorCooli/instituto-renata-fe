# instituto-renata-fe

Frontend do sistema de gestão de consultório (escopo genérico, multiárea).

## Documentação

- [Contexto resumido](docs/CONTEXT.md) — **resumo denso** para sessões novas ou IA (stack, rotas, ficheiros-chave); não substitui os documentos abaixo.
- [Guia de continuidade](docs/PROMPT.md) — contexto, estado do projeto e próximo passo (útil em sessões novas).
- [Especificação do produto](docs/SPEC.md) — visão, módulos e requisitos transversais.
- [Plano de implementação](docs/PLAN.md) — fases por feature e ordem sugerida.
- [Changelog](CHANGELOG.md) — histórico de mudanças por versão.

Gerenciador de pacotes: **npm**.

## Arquitetura

O serviço de API no repositório irmão (**`instituto-renata-be`**) segue **Clean Architecture** (Robert C. Martin): separação em **Core** (entidades e casos de uso), **Entrypoints** (REST, jobs), **Data providers** (persistência e externos) e **Configuration** (composição). A **regra de dependência** mantém o negócio no centro, independente de tecnologias concretas.

![Diagrama Clean Architecture (estilo Uncle Bob)](docs/assets/clean-architecture-uncle-bob.png)

Detalhes, legenda e mapeamento no frontend React estão em **`docs/SPEC.md` §3.2**.

**Dados:** nesta fase o frontend usa **mocks** (dados falsos) para visualizar telas; integração com o API em repositório `…-be` será depois (ver `docs/SPEC.md` §2.1).

**Responsivo:** o produto deve ser utilizável em **celular**; requisitos em `docs/SPEC.md` §6 e no `docs/PLAN.md`.

## Desenvolvimento

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run lint
```

## Funcionalidades em produção (cliente)

Lista **apenas** o que já está **disponível em produção** para o cliente. Desenvolvimento em curso não entra aqui — ver [CHANGELOG.md](CHANGELOG.md) e `docs/SPEC.md` §7.1.

- *(nenhuma funcionalidade listada — ainda não há release em produção para o cliente)*

## Manutenção do repositório

- **`CHANGELOG.md`:** registrar mudanças notáveis por versão (inclui evolução durante o desenvolvimento).
- **Esta secção “Funcionalidades em produção”:** atualizar **somente** quando uma feature for **implantada em produção** para o cliente.
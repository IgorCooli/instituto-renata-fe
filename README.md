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

## Funcionalidades em produção (cliente)

Lista **apenas** o que já está **disponível em produção** para o cliente. Desenvolvimento em curso não entra aqui — ver [CHANGELOG.md](CHANGELOG.md) e `docs/SPEC.md` §7.1.

- *(nenhuma funcionalidade listada — ainda não há release em produção para o cliente)*

## Manutenção do repositório

- **`CHANGELOG.md`:** registrar mudanças notáveis por versão (inclui evolução durante o desenvolvimento).
- **Esta secção “Funcionalidades em produção”:** atualizar **somente** quando uma feature for **implantada em produção** para o cliente.
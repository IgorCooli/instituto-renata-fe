/**
 * Dados fictícios — Vendas / Leads (substituir por API).
 */

export type VendasLeadSegment = 'leads' | 'pipeline' | 'clientes'

export type VendasLeadRow = {
  id: string
  name: string
  /** Subtítulo abaixo do nome (ex.: unidade / origem institucional). */
  subtitle: string
  phone: string
  originLabel: string
  stageLabel: string
  tags: string | null
  /** null = exibir "—" */
  valueBrl: number | null
  /** ISO date */
  dateIso: string
}

export const VENDAS_LEADS_COUNTS = {
  leads: 21,
  pipeline: 6,
  clientes: 74,
} as const

const INSTITUTO_SUB = 'Instituto Dra. Renata Jorge'

/** 6 linhas do pipeline — alinhado ao mock visual. */
export const MOCK_VENDAS_PIPELINE_LEADS: VendasLeadRow[] = [
  {
    id: 'pl-1',
    name: 'Ronalra Faria',
    subtitle: INSTITUTO_SUB,
    phone: '(11) 98765-1201',
    originLabel: 'Cadastro rápido',
    stageLabel: 'Agendamento',
    tags: null,
    valueBrl: null,
    dateIso: '2026-04-17',
  },
  {
    id: 'pl-2',
    name: 'Michele Figueredo',
    subtitle: INSTITUTO_SUB,
    phone: '(21) 99876-2302',
    originLabel: 'Cadastro rápido',
    stageLabel: 'Agendamento',
    tags: null,
    valueBrl: null,
    dateIso: '2026-04-17',
  },
  {
    id: 'pl-3',
    name: 'Tamara da Silva Borges',
    subtitle: INSTITUTO_SUB,
    phone: '(11) 97654-3403',
    originLabel: 'Cadastro rápido',
    stageLabel: 'Agendamento',
    tags: null,
    valueBrl: null,
    dateIso: '2026-04-17',
  },
  {
    id: 'pl-4',
    name: 'Samantha Guidinho Candido',
    subtitle: INSTITUTO_SUB,
    phone: '(47) 98877-4504',
    originLabel: 'Cadastro rápido',
    stageLabel: 'Agendamento',
    tags: null,
    valueBrl: null,
    dateIso: '2026-04-17',
  },
  {
    id: 'pl-5',
    name: 'Amanda Meirelles Santana de Lima',
    subtitle: INSTITUTO_SUB,
    phone: '(85) 99123-5605',
    originLabel: 'Cadastro rápido',
    stageLabel: 'Agendamento',
    tags: null,
    valueBrl: null,
    dateIso: '2026-04-17',
  },
  {
    id: 'pl-6',
    name: 'Rafael Nelson Barbosa da Silva',
    subtitle: INSTITUTO_SUB,
    phone: '(11) 96543-6706',
    originLabel: 'Cadastro rápido',
    stageLabel: 'Agendamento',
    tags: null,
    valueBrl: null,
    dateIso: '2026-04-17',
  },
]

const FN = [
  'Lucas',
  'Fernanda',
  'Patrícia',
  'Roberto',
  'Carla',
  'Diego',
  'Beatriz',
  'Henrique',
  'Larissa',
  'Vinícius',
] as const

const LN = [
  'Silva',
  'Moura',
  'Nascimento',
  'Pires',
  'Azevedo',
  'Barros',
  'Teixeira',
  'Mendes',
  'Rocha',
  'Freitas',
] as const

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

function buildGeneratedLeads(count: number, prefix: string): VendasLeadRow[] {
  const rows: VendasLeadRow[] = []
  for (let i = 0; i < count; i++) {
    const fn = FN[Math.floor(pseudoRandom(i) * FN.length)]!
    const ln = LN[Math.floor(pseudoRandom(i + 17) * LN.length)]!
    const day = 1 + Math.floor(pseudoRandom(i + 3) * 28)
    rows.push({
      id: `${prefix}-${i + 1}`,
      name: `${fn} ${ln}`,
      subtitle: INSTITUTO_SUB,
      phone: `(11) 9${String(1000 + Math.floor(pseudoRandom(i + 5) * 8999)).slice(0, 4)}-${String(1000 + Math.floor(pseudoRandom(i + 7) * 8999)).slice(0, 4)}`,
      originLabel: i % 3 === 0 ? 'Indicação' : 'Cadastro rápido',
      stageLabel: i % 4 === 0 ? 'Qualificação' : 'Novo Lead',
      tags: i % 5 === 0 ? 'VIP' : null,
      valueBrl: null,
      dateIso: `2026-04-${String(day).padStart(2, '0')}`,
    })
  }
  return rows
}

/** Lista “Leads” (21) — mock para o filtro Leads. */
export const MOCK_VENDAS_LEADS_LIST: VendasLeadRow[] = buildGeneratedLeads(
  VENDAS_LEADS_COUNTS.leads,
  'ld',
).map((row, i) => ({
  ...row,
  stageLabel: i % 3 === 0 ? 'Contato inicial' : 'Novo Lead',
}))

/** Clientes convertidos (74 linhas) — amostra para listagem. */
export const MOCK_VENDAS_CLIENTES: VendasLeadRow[] = buildGeneratedLeads(
  VENDAS_LEADS_COUNTS.clientes,
  'cl',
).map((row, i) => ({
  ...row,
  stageLabel: 'Cliente',
  originLabel: i % 2 === 0 ? 'Retorno' : 'Cadastro rápido',
}))

export function rowsForSegment(segment: VendasLeadSegment): VendasLeadRow[] {
  switch (segment) {
    case 'pipeline':
      return MOCK_VENDAS_PIPELINE_LEADS
    case 'leads':
      return MOCK_VENDAS_LEADS_LIST
    case 'clientes':
      return MOCK_VENDAS_CLIENTES
    default:
      return []
  }
}

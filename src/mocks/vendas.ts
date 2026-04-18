/**
 * Dados fictícios — módulo Vendas / Transações (substituir por API).
 */

export type VendasStrategyId = 'oferta_direta' | 'recompra' | 'digital_influencer' | 'indicacao'

export type VendaTransactionRow = {
  id: string
  /** ISO date yyyy-mm-dd */
  date: string
  customerName: string
  product: string
  sellerName: string
  strategy: VendasStrategyId
  payment: string
  /** valor em reais */
  valueBrl: number
}

export const MOCK_VENDAS_PERIOD = {
  /** Abril 2026 — alinhado ao mock visual */
  monthIndex: 3,
  year: 2026,
} as const

/** Totais do período (KPIs) — alinhados ao mock */
export const MOCK_VENDAS_KPIS = {
  revenueBrl: 23085,
  salesCount: 60,
  avgTicketBrl: 524.6,
} as const

const STRATEGY_LABEL: Record<VendasStrategyId, string> = {
  oferta_direta: 'Oferta Direta',
  recompra: 'Recompra',
  digital_influencer: 'Digital Influencer',
  indicacao: 'Indicação',
}

const PRODUCTS = [
  'Tirzepatida 5,0mg dinheiro',
  'Botox terço superior',
  'Harmonização facial — sessão',
  'Limpeza de pele profunda',
  'Preenchimento labial',
  'Microagulhamento',
  'Peeling químico',
  'Consulta retorno',
] as const

const SELLERS = [
  'Kailane Portugal',
  'Renata Jorge de Oliveira',
  'Ana Paula Souza',
  'Marcos Vinícius Lima',
] as const

const PAYMENTS = [
  'PIX',
  'Dinheiro',
  'Cartão de Crédito (10x)',
  'Cartão de Débito',
  'Transferência',
] as const

const STRATEGIES: VendasStrategyId[] = [
  'oferta_direta',
  'recompra',
  'digital_influencer',
  'indicacao',
]

const FIRST_NAMES = [
  'Yara',
  'Lucas',
  'Fernanda',
  'Ricardo',
  'Camila',
  'Bruno',
  'Juliana',
  'Felipe',
  'Amanda',
  'Gustavo',
] as const

const LAST_NAMES = [
  'Damasceno',
  'Oliveira',
  'Santos',
  'Almeida',
  'Ribeiro',
  'Costa',
  'Martins',
  'Lima',
  'Ferreira',
  'Carvalho',
] as const

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function pick<T>(arr: readonly T[], seed: number): T {
  return arr[Math.floor(pseudoRandom(seed) * arr.length)]!
}

/** Gera 60 linhas para Abril/2026 (dias 1–30 distribuídos). */
function buildMockTransactions(): VendaTransactionRow[] {
  const rows: VendaTransactionRow[] = []
  for (let i = 0; i < MOCK_VENDAS_KPIS.salesCount; i++) {
    const day = 1 + Math.floor(pseudoRandom(i * 7) * 28)
    const date = `2026-04-${String(day).padStart(2, '0')}`
    const fn = pick(FIRST_NAMES, i)
    const ln = pick(LAST_NAMES, i + 13)
    const valueBrl = Math.round((180 + pseudoRandom(i * 31) * 820) * 100) / 100
    rows.push({
      id: `v-${i + 1}`,
      date,
      customerName: `${fn} ${ln}`,
      product: pick(PRODUCTS, i + 2),
      sellerName: pick(SELLERS, i + 5),
      strategy: pick(STRATEGIES, i + 11),
      payment: pick(PAYMENTS, i + 17),
      valueBrl,
    })
  }
  rows.sort((a, b) => b.date.localeCompare(a.date) || a.id.localeCompare(b.id))
  return rows
}

export const MOCK_VENDAS_TRANSACTIONS: VendaTransactionRow[] = buildMockTransactions()

export function strategyLabel(id: VendasStrategyId): string {
  return STRATEGY_LABEL[id]
}

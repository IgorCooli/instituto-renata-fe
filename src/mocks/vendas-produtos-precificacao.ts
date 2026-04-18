/**
 * Dados fictícios — Vendas / Produtos & Precificação (substituir por API).
 */

export type ProdutoSubBadgeVariant = 'purple' | 'green'

export type ProdutoRow = {
  id: string
  name: string
  categoryLabel: string
  subCategoryLabel: string
  subCategoryVariant: ProdutoSubBadgeVariant
  priceBrl: number
  /** `null` exibe "-" na coluna custo. */
  costBrl: number | null
  tipoLabel: 'Serviço'
  /** Ex.: "30min total" */
  durationLabel: string
  active: boolean
}

export const MOCK_PRODUTOS_KPIS = {
  total: 68,
  ativos: 68,
  servicos: 68,
  avgPriceBrl: 2357.99,
} as const

const PAIRS: {
  categoryLabel: string
  subCategoryLabel: string
  subCategoryVariant: ProdutoSubBadgeVariant
}[] = [
  {
    categoryLabel: 'Odontologia',
    subCategoryLabel: 'Outros Serviços',
    subCategoryVariant: 'purple',
  },
  {
    categoryLabel: 'Cirurgias Faciais',
    subCategoryLabel: 'Procedimentos Estéticos',
    subCategoryVariant: 'green',
  },
  {
    categoryLabel: 'Dermatologia',
    subCategoryLabel: 'Procedimentos Estéticos',
    subCategoryVariant: 'green',
  },
  {
    categoryLabel: 'Odontologia',
    subCategoryLabel: 'Higiene e Prevenção',
    subCategoryVariant: 'purple',
  },
]

const NAME_SEEDS = [
  'Aplicação de flúor',
  'Blefaroplastia Inferior',
  'Clareamento dental',
  'Consulta inicial',
  'Harmonização facial',
  'Implante capilar',
  'Limpeza profunda',
  'Peeling químico',
  'Preenchimento labial',
  'Prótese sobre implante',
  'Rinoplastia',
  'Tratamento de canal',
  'Ultrassom microfocado',
  'Botox',
  'Bioestimulador',
  'Drenagem linfática',
  'Laser CO2',
  'Microagulhamento',
  'Prótese flexível',
  'Restauração estética',
]

const DURATIONS = ['15min total', '30min total', '45min total', '60min total', '90min total']

/** Lista fixa de 68 itens alinhada aos totais do mock. */
export function buildMockProdutos(): ProdutoRow[] {
  const out: ProdutoRow[] = []
  for (let i = 0; i < MOCK_PRODUTOS_KPIS.total; i++) {
    const pair = PAIRS[i % PAIRS.length]
    const name =
      i < NAME_SEEDS.length
        ? NAME_SEEDS[i]
        : `${NAME_SEEDS[i % NAME_SEEDS.length]} (${Math.floor(i / NAME_SEEDS.length)})`
    const priceBrl = Math.round((120 + (i * 137) % 8900 + (i % 7) * 50) * 100) / 100
    out.push({
      id: `prod-${i + 1}`,
      name,
      categoryLabel: pair.categoryLabel,
      subCategoryLabel: pair.subCategoryLabel,
      subCategoryVariant: pair.subCategoryVariant,
      priceBrl,
      costBrl: null,
      tipoLabel: 'Serviço',
      durationLabel: DURATIONS[i % DURATIONS.length],
      active: true,
    })
  }
  return out
}

export const MOCK_PRODUTOS: ProdutoRow[] = buildMockProdutos()

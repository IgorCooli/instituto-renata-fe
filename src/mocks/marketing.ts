/**
 * Dados mock do módulo Marketing — substituir por API quando existir backend.
 */

export type MarketingCampaignRow = {
  id: string
  campaign: string
  monthYear: string
  strategy: string
  leads: number
  conversions: number
  metaBrl: number
  realizadoBrl: number
}

/** Meta financeira anual (mock). */
export const MOCK_MARKETING_YEAR = 2026
export const MOCK_MARKETING_YEARLY_GOAL_BRL = 1_500_000
/** Valor “realizado” acumulado no ano (mock). */
export const MOCK_MARKETING_YEARLY_REAL_BRL = 555_000
/** Projeção linear simples (mock). */
export const MOCK_MARKETING_YEARLY_PROJECTED_BRL = 720_000

export const MOCK_MARKETING_CAMPAIGNS: MarketingCampaignRow[] = [
  {
    id: '1',
    campaign: 'Abril 2026',
    monthYear: 'Abril 2026',
    strategy: '[TR] Digital Influence — captação',
    leads: 181,
    conversions: 74,
    metaBrl: 60_000,
    realizadoBrl: 22_220,
  },
  {
    id: '2',
    campaign: 'Março 2026',
    monthYear: 'Março 2026',
    strategy: 'Remarketing e e-mail',
    leads: 142,
    conversions: 51,
    metaBrl: 55_000,
    realizadoBrl: 48_900,
  },
  {
    id: '3',
    campaign: 'Fevereiro 2026',
    monthYear: 'Fevereiro 2026',
    strategy: 'Tráfego pago — Instagram',
    leads: 98,
    conversions: 33,
    metaBrl: 50_000,
    realizadoBrl: 50_000,
  },
]

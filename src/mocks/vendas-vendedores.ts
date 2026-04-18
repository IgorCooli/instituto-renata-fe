/**
 * Dados fictícios — Vendas / Vendedores (substituir por API).
 */

export type VendedorRow = {
  id: string
  name: string
  phone: string
  email: string
  /** Rótulo da função (ex.: Vendedor, Coordenador). */
  roleLabel: string
  /** Texto de comissão exibido na tabela (ex.: "8%"). */
  commissionLabel: string
  /** Percentual de conversão (0–100). */
  conversionPercent: number
  active: boolean
}

export const MOCK_VENDEDORES: VendedorRow[] = [
  {
    id: 'v-1',
    name: 'Bruno Mendes',
    phone: '(11) 98765-4321',
    email: 'bruno.mendes@exemplo.com.br',
    roleLabel: 'Vendedor',
    commissionLabel: '8%',
    conversionPercent: 24,
    active: true,
  },
  {
    id: 'v-2',
    name: 'Renata Jorge de Oliveira',
    phone: '(11) 91234-5678',
    email: 'renata.jorge@exemplo.com.br',
    roleLabel: 'Coordenadora',
    commissionLabel: '12%',
    conversionPercent: 31,
    active: true,
  },
  {
    id: 'v-3',
    name: 'Carla Dias',
    phone: '(21) 99876-5432',
    email: 'carla.dias@exemplo.com.br',
    roleLabel: 'Vendedora',
    commissionLabel: '8%',
    conversionPercent: 19,
    active: true,
  },
]

export function vendedoresKpis(rows: VendedorRow[]) {
  const total = rows.length
  const ativos = rows.filter((r) => r.active).length
  const inativos = total - ativos
  return { total, ativos, inativos }
}

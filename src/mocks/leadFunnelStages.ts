/**
 * Etapas fixas do funil — coluna Etapa na tabela de Leads (alinhado ao produto).
 */

export const LEAD_FUNNEL_LABELS = [
  'Mensagem',
  'Conversa',
  'Agendamento',
  'Confirmação',
  'No Show',
  'Consulta',
  'Venda',
  'Perdido',
] as const

export type LeadFunnelLabel = (typeof LEAD_FUNNEL_LABELS)[number]

export function isLeadFunnelLabel(s: string): s is LeadFunnelLabel {
  return (LEAD_FUNNEL_LABELS as readonly string[]).includes(s)
}

/** Mapeia rótulos vindos do mock/API para uma etapa do funil (para exibição inicial). */
export function coerceToFunnelStage(label: string): LeadFunnelLabel {
  const t = label.trim().toLowerCase()
  if (isLeadFunnelLabel(label)) return label
  if (t.includes('agend')) return 'Agendamento'
  if (t.includes('confir')) return 'Confirmação'
  if (t.includes('no show') || t.includes('noshow')) return 'No Show'
  if (t.includes('consulta')) return 'Consulta'
  if (t.includes('venda') || t === 'cliente') return 'Venda'
  if (t.includes('perd')) return 'Perdido'
  if (t.includes('conversa') || t.includes('qualif')) return 'Conversa'
  if (t.includes('contato') || t.includes('mensagem') || t.includes('novo lead')) return 'Mensagem'
  return 'Agendamento'
}

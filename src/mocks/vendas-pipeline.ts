/**
 * Dados fictícios — Vendas / Pipeline Kanban (substituir por API).
 */

export type PipelineStageId =
  | 'mensagem'
  | 'conversa'
  | 'agendamento'
  | 'confirmacao'
  | 'no_show'
  | 'consulta'
  | 'ganhos'

export type PipelineDealBadge = 'atrasada' | 'ganho'

export type PipelineDeal = {
  id: string
  stageId: PipelineStageId
  leadName: string
  subtitle: string
  ownerName: string
  activityLabel: string
  valueBrl: number
  /** Texto tipo "4 dias" */
  timeLabel: string
  commentsCount: number
  badge?: PipelineDealBadge | null
}

export const PIPELINE_STAGE_DEFS: {
  id: PipelineStageId
  label: string
}[] = [
  { id: 'mensagem', label: 'Mensagem' },
  { id: 'conversa', label: 'Conversa' },
  { id: 'agendamento', label: 'Agendamento' },
  { id: 'confirmacao', label: 'Confirmação' },
  { id: 'no_show', label: 'No Show' },
  { id: 'consulta', label: 'Consulta' },
  { id: 'ganhos', label: 'Ganhos' },
]

export const MOCK_PIPELINE_KPIS = {
  /** Valor em pipeline (exibição compacta) */
  pipelineBrl: 1100,
  forecastBrl: 102.7,
  ganhosCount: 84,
  perdidosCount: 0,
  cicloDias: 3,
  /** Total de negociações no board */
  negociacoesTotal: 32,
} as const

const OWNER = 'Renata Jorge de Oliveira'

function deal(
  id: string,
  stageId: PipelineStageId,
  leadName: string,
  valueBrl: number,
  extra: Partial<Omit<PipelineDeal, 'id' | 'stageId' | 'leadName' | 'valueBrl'>> = {},
): PipelineDeal {
  return {
    id,
    stageId,
    leadName,
    subtitle: 'Negociação - Vendas',
    ownerName: OWNER,
    activityLabel: extra.badge === 'atrasada' ? 'Pendente' : 'Sem próxima atividade',
    valueBrl,
    timeLabel: extra.timeLabel ?? '4 dias',
    commentsCount: extra.commentsCount ?? 0,
    badge: extra.badge ?? null,
    ...extra,
  }
}

/** 32 negociações distribuídas como no mock visual. */
export function buildInitialPipelineDeals(): PipelineDeal[] {
  const list: PipelineDeal[] = []

  list.push(
    deal('d-1', 'mensagem', 'Larissa Tavares Paludo', 1400, {
      badge: 'atrasada',
      timeLabel: '2 dias',
      commentsCount: 1,
    }),
    deal('d-2', 'mensagem', 'Paulo Henrique Mota', 850, {
      badge: 'atrasada',
      timeLabel: '5 dias',
    }),
  )

  const agendamentos = [
    'Marina Costa Silva',
    'Fernanda Ribeiro',
    'Lucas Mendes',
    'Ana Clara Duarte',
    'Carlos Eduardo Souza',
    'Juliana Prado',
  ]
  agendamentos.forEach((name, i) => {
    list.push(
      deal(`d-ag-${i}`, 'agendamento', name, 1200 + i * 150, {
        timeLabel: `${i + 1} dias`,
        commentsCount: i % 2,
      }),
    )
  })

  const ganhosNames = [
    'Cliente Alpha',
    'Cliente Beta',
    'Cliente Gamma',
    'Cliente Delta',
    'Cliente Epsilon',
    'Cliente Zeta',
    'Cliente Eta',
    'Cliente Theta',
    'Cliente Iota',
    'Cliente Kappa',
    'Cliente Lambda',
    'Cliente Mu',
    'Cliente Nu',
    'Cliente Xi',
    'Cliente Omicron',
    'Cliente Pi',
    'Cliente Rho',
    'Cliente Sigma',
    'Cliente Tau',
    'Cliente Upsilon',
    'Cliente Phi',
    'Cliente Chi',
    'Cliente Psi',
    'Cliente Omega',
  ]
  ganhosNames.forEach((name, i) => {
    list.push(
      deal(`d-g-${i}`, 'ganhos', name, 500 + i * 200, {
        badge: 'ganho',
        activityLabel: 'Concluída',
        timeLabel: `${(i % 10) + 1} dias`,
        commentsCount: i % 3,
      }),
    )
  })

  return list
}

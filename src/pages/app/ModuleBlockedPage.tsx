import { Link } from 'react-router-dom'
import { PageContainer } from '../../components/layout'
import type { FeatureId } from '../../app/access/types'

type ModuleBlockedPageProps = {
  feature: FeatureId
  /** Sem licença do módulo vs sem permissão de papel. */
  reason: 'feature' | 'role'
}

export function ModuleBlockedPage({ feature, reason }: ModuleBlockedPageProps) {
  const title =
    reason === 'feature'
      ? 'Módulo não disponível'
      : 'Acesso não autorizado'
  const text =
    reason === 'feature'
      ? `O módulo "${feature}" não está incluído no plano contratado (simulação).`
      : 'Seu papel não permite acessar esta área.'

  return (
    <PageContainer>
      <div className="py-5 mx-auto" style={{ maxWidth: '28rem' }}>
        <h1 className="h4 mb-3">{title}</h1>
        <p className="text-secondary small mb-4">{text}</p>
        <Link to="/app" className="btn btn-primary">
          Voltar ao início
        </Link>
      </div>
    </PageContainer>
  )
}

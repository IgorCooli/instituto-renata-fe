import type { ReactNode } from 'react'
import Modal from 'react-bootstrap/Modal'
import { AppButton } from './AppButton'

export type AppModalProps = {
  show: boolean
  onHide: () => void
  title: ReactNode
  children: ReactNode
  /** Se omitido, exibe apenas botão Fechar. */
  footer?: ReactNode
  size?: 'sm' | 'lg' | 'xl'
  centered?: boolean
}

export function AppModal({
  show,
  onHide,
  title,
  children,
  footer,
  size,
  centered = true,
}: AppModalProps) {
  return (
    <Modal show={show} onHide={onHide} size={size} centered={centered}>
      <Modal.Header closeButton>
        <Modal.Title as="h2" className="h5 mb-0">
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      {footer !== undefined ? (
        <Modal.Footer>{footer}</Modal.Footer>
      ) : (
        <Modal.Footer>
          <AppButton variant="secondary" onClick={onHide}>
            Fechar
          </AppButton>
        </Modal.Footer>
      )}
    </Modal>
  )
}

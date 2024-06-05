import React, { forwardRef, useImperativeHandle, useState } from "react"
import SimpleModal from "../../../../components/SimpleModal"
import { Content, RecordsContainer, Record } from "./styled"

export interface ModalHandles {
  open: () => void
  close: () => void
  isOpened: boolean
}

interface Props {
  handleModal: () => void
  records: string[]
}

const ModalRecordsComponent: React.ForwardRefRenderFunction<
  ModalHandles,
  Props
> = ({ handleModal, records }, ref) => {
  const [modalOpen, setModalOpen] = useState(false)

  const handleClose = () => setModalOpen(false)
  const handleOpen = () => setModalOpen(true)

  useImperativeHandle(ref, () => ({
    open: handleOpen,
    close: handleClose,
    isOpened: modalOpen
  }))

  return (
    <SimpleModal
      handleModal={handleModal}
      isOpen={modalOpen}
      title="Detalhes"
      size="md"
    >
      <Content>
        <h3>Registros</h3>
        <RecordsContainer>
          {records.map((record, key) =>
            record === "Erro ao comunicar com o provider de empresas" ? (
              <Record key={key}>nenhum registro disponível.</Record>
            ) : (
              <Record key={key}>{record}</Record>
            )
          )}
        </RecordsContainer>
      </Content>
    </SimpleModal>
  )
}

export const ModalRecords = forwardRef(ModalRecordsComponent)

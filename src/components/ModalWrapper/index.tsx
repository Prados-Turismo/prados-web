import React, { useEffect, useState } from "react"
import { Modal, ModalOverlay, ModalProps } from "@chakra-ui/react"
import { closeModal } from "./actions"

interface IModal {
  component?: React.ReactNode
  modalProps?: ModalProps
}

function ModalWrapper() {
  const [contentModal, setContentModal] = useState<IModal | null>()

  const showModal = (event: CustomEvent<IModal>) => {
    setContentModal(event?.detail)
  }

  useEffect(() => {
    window.addEventListener("show-modal", showModal as EventListener)
    return () => {
      window.addEventListener("show-modal", showModal as EventListener)
    }
  }, [])

  return (
    <Modal
      isOpen={Boolean(contentModal?.component)}
      onClose={closeModal}
      scrollBehavior="inside"
      size="2xl"
      motionPreset="slideInBottom"
      {...contentModal?.modalProps}
      isCentered
    >
      <ModalOverlay />
      {contentModal?.component}
    </Modal>
  )
}

export { ModalWrapper }

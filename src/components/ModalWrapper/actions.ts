import React from "react"
import { ModalProps } from "@chakra-ui/react"

function showModal(component: React.ReactNode, modalProps?: ModalProps) {
  dispatchEvent(
    new CustomEvent("show-modal", {
      detail: {
        component,
        modalProps
      }
    })
  )
}

function closeModal() {
  dispatchEvent(
    new CustomEvent("show-modal", {
      detail: null
    })
  )
}

export { showModal, closeModal }

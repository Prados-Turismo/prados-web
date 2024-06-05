import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Heading,
  ModalProps,
  Box
} from "@chakra-ui/react"

export type Props = Omit<ModalProps, "children"> & {
  onCancel: () => void
  onConfirm: () => void
  message: string
}

export default function ConfirmModal({
  isOpen,
  message,
  onCancel,
  onConfirm
}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader borderBottom="1px" borderColor="gray.200">
          <Heading size="sm" fontWeight="semibold">
            Confirmar ação
          </Heading>
        </ModalHeader>
        <ModalBody>
          <Box as="p" fontSize="md" py="5" textAlign="center">
            {message}
          </Box>
        </ModalBody>

        <ModalFooter borderTop="1px" borderColor="gray.200">
          <Button size="sm" variant="ghost" onClick={onCancel}>
            Cancelar
          </Button>
          <Button size="sm" onClick={onConfirm}>
            Comfirmar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

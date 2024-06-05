import {
  Modal as WrapModal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
} from "@chakra-ui/react";

import { ModalHeader } from "./styled";

import { ISimpleModal } from "./types";

const Modal = ({
  title,
  isOpen,
  children,
  footer,
  size = "6xl",
  minHeight = "50px",
  contentExtraLarge,
  handleModal,
  isLoading,
  scrollBehavior = "inside",
}: ISimpleModal) => {
  const contentLarge = contentExtraLarge && {
    minWidth: "90%",
    maxWidth: "95%",
    width: "max-content",
    margin: "0 10px",
  };

  return (
    <WrapModal
      isOpen={isOpen}
      scrollBehavior={scrollBehavior}
      size={size}
      isCentered
      onClose={() => {
        if (!isLoading) {
          handleModal(false);
        }
      }}
    >
      <ModalOverlay />
      <ModalContent minHeight={minHeight} margin="0 40px" {...contentLarge}>
        {title && <ModalHeader>{title}</ModalHeader>}
        {!isLoading && <ModalCloseButton />}
        <ModalBody display="flex" padding={0}>
          {children}
        </ModalBody>
        {footer && (
          <ModalFooter borderTop="1px solid #E5E5E5">{footer}</ModalFooter>
        )}
      </ModalContent>
    </WrapModal>
  );
};

export default Modal;

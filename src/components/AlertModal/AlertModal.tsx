import { Button, Text } from "@chakra-ui/react";

//Components and Utils
import SimpleModal from "../SimpleModal";

// Types
import { IAlertModal } from "./types";

// Styles
import { ContentModal, ButtonBox, BodyContent } from "./styled";
import { pixelToRem } from "../../utils";

const AlertModal = ({
  showModal,
  setShowModal,
  isLoading,
  request,
  question,
  children,
  size,
  title,
  isDisabled,
  cancelButtonTitle = "Cancelar",
  hasNotCancelButton,
  confirmButtonTitle = "Confirmar",
}: IAlertModal) => {
  return (
    <SimpleModal
      isOpen={showModal}
      handleModal={setShowModal}
      title={title}
      size={size}
      minHeight="160px"
      isLoading={isLoading}
      footer={
        <ButtonBox
          justifyContent={hasNotCancelButton ? "center" : "space-between"}
        >
          {!hasNotCancelButton && (
            <Button
              isDisabled={isLoading}
              border="none"
              background="#F5F5F5"
              borderRadius="4px"
              variant="outline"
              onClick={() => {
                if (!isLoading) {
                  setShowModal(false);
                }
              }}
            >
              {cancelButtonTitle}
            </Button>
          )}
          <Button
            borderRadius="4px"
            onClick={() => request()}
            isLoading={isLoading}
            isDisabled={isLoading || isDisabled}
            marginBottom="10px"
          >
            {confirmButtonTitle}
          </Button>
        </ButtonBox>
      }
    >
      <ContentModal>
        {children && <BodyContent>{children}</BodyContent>}

        {question && (
          <Text fontSize={pixelToRem(20)} padding="40px 0 10px">
            {question}
          </Text>
        )}
      </ContentModal>
    </SimpleModal>
  );
};

export default AlertModal;

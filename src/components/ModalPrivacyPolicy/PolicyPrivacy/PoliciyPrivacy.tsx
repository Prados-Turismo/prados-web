import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import PrivacyPolicyText from "../../PrivacyPolicyText";

interface IProps {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

const PolicyPrivacy = ({ openModal, setOpenModal }: IProps) => {
  return (
    <Modal
      isOpen={openModal}
      onClose={() => setOpenModal(false)}
      isCentered
      scrollBehavior="inside"
      size="4xl"
    >
      <ModalOverlay />
      <ModalContent alignItems="center" height={600}>
        <ModalHeader
          w="100%"
          display="flex"
          height="55px"
          alignItems="center"
          padding="12px 25px"
          borderBottom="1px solid #E5E5E5"
          fontWeight="500"
          color="text.first"
        >
          Política de privacidade
        </ModalHeader>
        <ModalCloseButton margin="5px" />
        <ModalBody p="20px">
          <PrivacyPolicyText />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PolicyPrivacy;

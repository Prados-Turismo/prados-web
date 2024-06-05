/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDisclosure } from "@chakra-ui/react";
import ButtonIcon from "../../../components/ButtonIcon";
import { MdOutlineDelete } from "react-icons/md";
import CancelBenefitInProcess from "../../../components/CancelBenefitProcess/CancelBenefitInProcess";

interface IButtonCancelProcess {
  adherenceProposalId: string;
  isAuth: boolean;
}

const ButtonCancelProcess = ({
  adherenceProposalId,
  isAuth,
}: IButtonCancelProcess) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <ButtonIcon
        tooltip={
          isAuth
            ? "Cancelar Adesão"
            : "O cancelamento não pode ser concluído devido ao status atual da adesão. Se tiver alguma dúvida, por favor, entre em contato pelo Canal de Atendimento."
        }
      >
        <MdOutlineDelete
          cursor={isAuth ? "pointer" : "default"}
          size={20}
          onClick={() => {
            if (isAuth) {
              onOpen();
            }
          }}
        />
      </ButtonIcon>

      {isOpen && (
        <CancelBenefitInProcess
          isOpen={isOpen}
          onClose={onClose}
          adherenceProposalId={adherenceProposalId}
        />
      )}
    </>
  );
};

export default ButtonCancelProcess;

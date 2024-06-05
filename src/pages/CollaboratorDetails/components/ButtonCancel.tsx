import { useDisclosure } from "@chakra-ui/react";
import ButtonIcon from "../../../components/ButtonIcon";

import { TD } from "../../../components/Table";
import { MdOutlineDelete } from "react-icons/md";
import CancelBenefit from "../../../components/CancelBenefit";
import {
  IDataCollaborator,
  IFamilyBenefitsGroup,
} from "../../../models/collaborator.model";

interface IButtonCancel {
  adherenceProposalId: string;
  holder: IDataCollaborator | null;
  product: IFamilyBenefitsGroup;
}

const ButtonCancel = ({
  adherenceProposalId,
  holder,
  product,
}: IButtonCancel) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <TD display="flex" justifyContent="center">
        <ButtonIcon tooltip="Cancelar Produto">
          <MdOutlineDelete
            size={20}
            onClick={() => {
              onOpen();
            }}
          />
        </ButtonIcon>
      </TD>

      {isOpen && (
        <CancelBenefit
          isOpen={isOpen}
          onClose={onClose}
          adherenceProposalId={adherenceProposalId}
          holder={holder}
          product={product}
        />
      )}
    </>
  );
};

export default ButtonCancel;

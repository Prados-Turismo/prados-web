import { useDisclosure } from "@chakra-ui/react";
import ButtonIcon from "../../../components/ButtonIcon";
import ProductAdhesion from "../../../components/ProductAdhesion";
import { TD } from "../../../components/Table";
import { AiOutlineLike } from "react-icons/ai";
import { useGlobal } from "../../../contexts/UserContext";
import { permissionsText } from "../../../utils/permissionsText";
import { IDataProductContract } from "../../../models/product.model";
import CompleteRegistrationModal from "../../../components/CompleteRegistrationModal";
import { IFamilyBenefitsGroup } from "../../../models/collaborator.model";
import CompleteRegistrationColaboratorModal from "../../../components/CompleteRegistrationColaboratorModal";

interface IButtonAdhseion {
  product: IDataProductContract | IFamilyBenefitsGroup;
  tooltipText?: string;
  isNotCompleteRecord?: boolean;
  setStatus?: React.Dispatch<React.SetStateAction<number>>;
}

const ButtonAdhesion = ({
  product,
  tooltipText = "",
  isNotCompleteRecord,
  setStatus,
}: IButtonAdhseion) => {
  const { companyStatus } = useGlobal();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { permissions } = useGlobal();

  const isApproved = companyStatus?.status === "approved";

  return (
    <>
      <TD display="flex" justifyContent="center" maxW="80px">
        <ButtonIcon tooltip={tooltipText}>
          {permissions?.adhesion ? (
            <AiOutlineLike
              size={20}
              onClick={() => {
                onOpen();
              }}
              name="adhesion"
              id={`adhesion_${product?.product?.reducedName
                .toLocaleLowerCase()
                .replaceAll("-", "")
                .replaceAll(" ", "_")
                .replaceAll("__", "_")}`}
            />
          ) : (
            <AiOutlineLike
              size={20}
              cursor="default"
              color="#bcc5ce"
              onClick={permissionsText}
            />
          )}
        </ButtonIcon>
      </TD>

      {isOpen &&
        (isNotCompleteRecord ? (
          <CompleteRegistrationColaboratorModal
            isOpen={isOpen}
            handleModals={onClose}
            setStatus={setStatus}
          />
        ) : !isApproved && product?.product?.regulated ? (
          <CompleteRegistrationModal isOpen={isOpen} handleModals={onClose} />
        ) : (
          <ProductAdhesion
            isOpen={isOpen}
            onClose={onClose}
            product={product}
            page="colaboradores"
          />
        ))}
    </>
  );
};

export default ButtonAdhesion;

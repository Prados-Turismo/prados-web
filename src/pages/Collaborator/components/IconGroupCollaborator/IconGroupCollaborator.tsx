import { useDisclosure } from "@chakra-ui/react";
import { FiUser, FiUserCheck, FiUsers } from "react-icons/fi";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { Link } from "react-router-dom";
import ButtonIcon from "../../../../components/ButtonIcon";
import CompleteRegistrationModal from "../../../../components/CompleteRegistrationModal";
import { IconsGroup } from "../../../../components/Table";
import { useGlobal } from "../../../../contexts/UserContext";
import { IIconGroupCollaborator } from "./types";

const IconGroupCollaborator = ({
  item,
  filter,
  menu,
}: IIconGroupCollaborator) => {
  const { isPre } = useGlobal();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconsGroup minW="100px">
        <Link
          to={`/pessoas/${item.id}?menu=${menu}?sidebar=1`}
          id={filter === "incomplete" ? "completeRegistration" : "personalData"}
        >
          <ButtonIcon
            tooltip={
              filter === "incomplete" ? "Completar cadastro" : "Dados Pessoais"
            }
          >
            {filter === "incomplete" ? (
              <FiUserCheck size={20} />
            ) : (
              <FiUser size={20} />
            )}
          </ButtonIcon>
        </Link>

        <Link
          to={isPre ? "" : `/pessoas/${item.id}?menu=${menu}?sidebar=2`}
          id="dependentData"
          onClick={() => {
            if (isPre) {
              onOpen();
            }
          }}
        >
          <ButtonIcon tooltip="Dados dos Dependentes">
            <FiUsers size={20} />
          </ButtonIcon>
        </Link>

        <Link
          id="productManagement"
          to={isPre ? "" : `/pessoas/${item.id}?menu=${menu}?sidebar=3`}
          onClick={() => {
            if (isPre) {
              onOpen();
            }
          }}
        >
          <ButtonIcon tooltip="Gerenciamento dos Produtos" placement="top-end">
            <HiOutlineDocumentSearch size={20} />
          </ButtonIcon>
        </Link>
      </IconsGroup>

      {isOpen && (
        <CompleteRegistrationModal isOpen={isOpen} handleModals={onClose} />
      )}
    </>
  );
};

export default IconGroupCollaborator;

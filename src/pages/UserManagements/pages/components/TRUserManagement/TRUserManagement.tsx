import { Switch } from "@chakra-ui/react";
import { useState } from "react";

import AlertModal from "../../../../../components/AlertModal";
import { TD } from "../../../../../components/Table";
import { updateBlockedUser } from "../../../../../hooks/useUserManagement";
import { dateFormat } from "../../../../../utils";
import { ITRUserManagement } from "./types";
import { MdLockOpen } from "react-icons/md";
import ButtonIcon from "../../../../../components/ButtonIcon";
import PermissionsCheckboxModal from "../PermissionsCheckboxModal";
import { useGlobal } from "../../../../../contexts/UserContext";

const TRUserManagement = ({
  user,
  userTypeSelected,
  status,
  IdsInTheCompany,
}: ITRUserManagement) => {
  const { role } = useGlobal();
  const { isLoading, mutate } = updateBlockedUser();
  const [blockedModal, setBlockedModal] = useState<boolean>(false);
  const [permissionsModal, setPermissionsModal] = useState<boolean>(false);

  return (
    <>
      <TD>{user?.username}</TD>
      <TD style={{ minWidth: "200px" }}>{user?.email}</TD>
      <TD style={{ display: "flex", justifyContent: "center", gap: "5px" }}>
        <ButtonIcon tooltip="Editar permissões">
          <MdLockOpen size={24} onClick={() => setPermissionsModal(true)} />
        </ButtonIcon>
      </TD>
      <TD onClick={() => setBlockedModal(true)} cursor="pointer">
        <Switch
          fontSize="17px"
          marginRight="5px"
          id="status"
          _checked={{
            "> span": {
              background: "brand.500",
            },
          }}
          isChecked={user?.active}
        />{" "}
        {user?.active ? "Sim" : "Não"}
      </TD>
      <TD>{dateFormat(new Date(user?.createdAt))}</TD>

      {/* User permissions configuration modal */}
      {permissionsModal && (
        <PermissionsCheckboxModal
          roleId={
            userTypeSelected.value === 2 ? 6 : (role?.id as unknown as number)
          }
          user={user}
          setPermissionsModal={setPermissionsModal}
          permissionsModal={permissionsModal}
          userTypeSelected={userTypeSelected}
        />
      )}

      {/* User activation and deactivation modal */}
      <AlertModal
        showModal={blockedModal}
        setShowModal={setBlockedModal}
        isLoading={isLoading}
        size="sm"
        request={() =>
          mutate({
            id: user?.id,
            blocked: user.active,
            userTypeSelected: userTypeSelected?.value,
            status,
            IdsInTheCompany,
          })
        }
        question={
          userTypeSelected.value === 1
            ? `Este usuário está associado ao grupo da sua empresa. Deseja confirmar a remoção do acesso?`
            : `Deseja ${
                !user?.active ? "ativar" : "inativar"
              } o acesso do usuário ${user?.username}?`
        }
      />
    </>
  );
};

export default TRUserManagement;

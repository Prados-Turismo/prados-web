import { Box, Text } from "@chakra-ui/react";
import Loading from "../../../../../components/Loading";
import SimpleModal from "../../../../../components/SimpleModal";
import {
  useUserPermissions,
  useUserPermissionsActived,
  useSavePermissions,
} from "../../../../../hooks/useUserManagement";
import CheckboxContent from "./CheckboxContent";
import { IPermissionsCheckbox } from "./types";

const PermissionsCheckbox = ({
  roleId,
  user,
  setPermissionsModal,
  permissionsModal,
}: IPermissionsCheckbox) => {
  const { isLoading, data } = useUserPermissions({ roleId });
  const { isLoading: isLoadingActived, data: dataActived } =
    useUserPermissionsActived({
      userId: user?.id,
      roleId,
    });

  const { isLoading: isLoadingSave, mutate } = useSavePermissions({
    setPermissionsModal,
    roleId: `${roleId}`,
  });

  return (
    <SimpleModal
      title="Editar permissões"
      isOpen={permissionsModal}
      handleModal={setPermissionsModal}
      isLoading={isLoading || isLoadingActived || isLoadingSave}
      size="2xl"
    >
      <Box padding="15px" width="100%">
        {isLoading || isLoadingActived ? (
          <Box margin="45px 0">
            <Loading />
          </Box>
        ) : (
          <>
            <Box
              fontSize="17px"
              fontWeight="400"
              paddingBottom="15px"
              borderBottom="1px solid #e0e0e0"
            >
              <Text>
                Usuário: <b>{user?.username}</b>
              </Text>
              <Text>
                E-mail: <b>{user?.email}</b>
              </Text>
            </Box>

            <CheckboxContent
              data={data}
              dataActived={dataActived}
              isLoadingSave={isLoadingSave}
              setPermissionsModal={setPermissionsModal}
              savePermissions={mutate}
              user={user}
            />
          </>
        )}
      </Box>
    </SimpleModal>
  );
};

export default PermissionsCheckbox;

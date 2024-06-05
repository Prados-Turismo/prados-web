import { Box, Button, Checkbox, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { IDataPermissions } from "../../../../../models/userManagement.model";
import { capitalize } from "../../../../../utils/capitalize";
import { sortDomain } from "../../../../../utils/sort";
import { ICheckboxContent } from "./types";

const CheckboxContent = ({
  data,
  dataActived,
  isLoadingSave,
  setPermissionsModal,
  savePermissions,
  user,
}: ICheckboxContent) => {
  const [permissionsSelected, setPermissionsSelected] = useState<string[]>(
    dataActived.map((el) => el?.id),
  );

  return (
    <>
      <Box
        fontSize="17px"
        fontWeight="400"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        padding="15px"
      >
        <Flex wrap="wrap" gap="15px" margin="10px 0 0 40px">
          {data
            .filter((el: IDataPermissions) =>
              user?.role === 9
                ? [
                    "DADOS DA EMPRESA",
                    "GESTÃO DE USUÁRIOS",
                    "GESTÃO PROMOÇÃO A SAÚDE",
                  ].includes(el?.domain)
                : true,
            )
            .filter((el: IDataPermissions) =>
              user?.role === 8 && user?.empresa
                ? el?.domain !== "GESTÃO DE USUÁRIOS"
                : true,
            )
            .filter((el: IDataPermissions) =>
              user?.role === 8
                ? el?.domain !== "GESTÃO PROMOÇÃO A SAÚDE"
                : true,
            )
            .sort(sortDomain)
            .map((el: IDataPermissions) => (
              <Checkbox
                key={el?.id}
                size="lg"
                minW="250px"
                isChecked={permissionsSelected?.includes(el?.id)}
                _checked={{
                  "span:first-of-type": {
                    background: "brand.500",
                    borderColor: "brand.500",
                  },
                }}
                onChange={(e) => {
                  if (e.target.checked) {
                    setPermissionsSelected((prevSelected) => [
                      ...prevSelected,
                      el?.id,
                    ]);
                  } else {
                    setPermissionsSelected((prevSelected) =>
                      prevSelected.filter((id) => id !== el?.id),
                    );
                  }
                }}
              >
                {capitalize(el?.domain)}
              </Checkbox>
            ))}
        </Flex>
      </Box>

      <Box
        display="flex"
        width="100%"
        justifyContent="center"
        gap="10px"
        marginTop="30px"
      >
        <Button
          width="118px"
          isDisabled={isLoadingSave}
          variant="outline"
          onClick={() => {
            if (!isLoadingSave) {
              setPermissionsModal(false);
            }
          }}
        >
          Voltar
        </Button>
        <Button
          width="118px"
          onClick={() =>
            savePermissions({
              id: user?.id,
              permissions: permissionsSelected,
            })
          }
          isLoading={isLoadingSave}
          isDisabled={isLoadingSave || permissionsSelected?.length < 1}
        >
          Salvar
        </Button>
      </Box>
    </>
  );
};

export default CheckboxContent;

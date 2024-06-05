import { FormControl, FormLabel, useMediaQuery } from "@chakra-ui/react";
import ReactSelect from "react-select";
import ButtonTabbed, { ButtonTabbedWrap } from "../../components/ButtonTabbed";
import {
  IItem,
  IReactSelected,
  ISidebarUserManagement,
  ISidebarUserManagementStatus,
} from "./types";

const SideBar = ({
  status,
  onStatus,
  userTypeSelected,
  setUserTypeSelected,
  setStatus,
}: ISidebarUserManagement) => {
  const [break900] = useMediaQuery("(max-width: 900px)");

  const menuFirst: IItem[] = [
    {
      status: "A" as ISidebarUserManagementStatus,
      name: "Acessos ativos",
      active: true,
    },
    {
      status: "I" as ISidebarUserManagementStatus,
      name: "Acessos inativos",
      active: true,
    },
  ];

  const handleChangeSelectedUserType = (selectedOption: IReactSelected) => {
    setUserTypeSelected(selectedOption);
    setStatus("A" as ISidebarUserManagementStatus);
  };

  return (
    <>
      <FormControl
        maxWidth={break900 ? "100%" : "300px"}
        marginBottom="15px"
        padding="20px 0 0 20px"
      >
        <FormLabel>Tipo de Perfil</FormLabel>
        <ReactSelect
          placeholder="Selecione tipo de perfil"
          className="select-fields"
          classNamePrefix="select"
          name="userType"
          value={userTypeSelected}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(e: any) => {
            handleChangeSelectedUserType(e);
          }}
          options={[
            {
              label: "Usuários Conta Empresarial",
              value: 0,
            },
            // {
            //   label: "Usuários Multi Empresa",
            //   value: 1
            // },
            {
              label: "Usuários Conta Corretora",
              value: 2,
            },
          ]}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
            },
          })}
        />
      </FormControl>

      <ButtonTabbedWrap>
        {menuFirst
          .filter((item) => item.active)
          .map((item) => (
            <ButtonTabbed
              key={item.status}
              selected={status === item.status}
              onClick={() => {
                onStatus(item.status);
              }}
            >
              {item.name}
            </ButtonTabbed>
          ))}
      </ButtonTabbedWrap>
    </>
  );
};

export default SideBar;

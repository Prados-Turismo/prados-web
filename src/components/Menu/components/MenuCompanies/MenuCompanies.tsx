import { useState } from "react";
import { default as ReactSelect } from "react-select";

import {
  Box,
  IconButton,
  Text,
  Icon,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

import { pixelToRem } from "../../../../utils";

import { ICompanySelect, IMenuCompanies } from "./types";

const MenuCompanies = ({ company, companies, onChange }: IMenuCompanies) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleChangeCompany = (selectedOption: ICompanySelect) => {
    onChange(selectedOption);
    localStorage.removeItem("@comparatorSelected");
  };

  return (
    <Box
      maxWidth="330px"
      zIndex={10}
      width="100%"
      position="absolute"
      overflow={isOpen ? "unset" : "hidden"}
      top="101px"
      left="210px"
      height={isOpen ? "max-content" : "50px"}
      animation="0.2s"
      backgroundColor="#FFFFFF"
      padding="10px 20px 20px 20px"
      borderBottom="1px solid #dbdbdb"
      borderLeft="1px solid #dbdbdb"
      borderRight="1px solid #dbdbdb"
    >
      {!isOpen && (
        <Text
          textAlign="left"
          fontSize={pixelToRem(15)}
          padding="unset"
          lineHeight="28px"
          maxWidth="100%"
        >
          Alterar empresa
        </Text>
      )}

      {isOpen && (
        <Box
          display="flex"
          gap="10px"
          justifyContent="space-around"
          flexWrap="wrap"
        >
          <FormControl maxWidth="250px">
            <FormLabel htmlFor="hubs">Empresas</FormLabel>

            <ReactSelect
              placeholder="Selecione uma Empresa"
              className="select-fields large"
              classNamePrefix="select"
              name="empresas"
              isSearchable={true}
              noOptionsMessage={() => "Nenhuma empresa disponível"}
              defaultValue={{
                label: company.name,
                value: company.externalCompanyId,
              }}
              options={companies.map((companyData) => ({
                label: companyData.company.name,
                value: companyData.company.externalCompanyId,
              }))}
              onChange={(e: ICompanySelect | null) => {
                if (e) handleChangeCompany(e);
                setIsOpen(false);
              }}
            />
          </FormControl>
        </Box>
      )}

      <IconButton
        position="absolute"
        top="4px"
        right="5px"
        aria-label="Abrir"
        icon={<Icon as={isOpen ? MdKeyboardArrowUp : MdKeyboardArrowDown} />}
        fontSize={pixelToRem(25)}
        paddingLeft="10px"
        variant="unstyled"
        onClick={() => {
          setIsOpen((status) => !status);
        }}
        cursor="pointer"
      />
    </Box>
  );
};

export default MenuCompanies;

import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ReactSelect from "react-select";
import Loading from "../../../components/Loading";

// Styled Components
import { Content, SectionTop } from "./styled";

// Hooks and utils
import { useGlobal } from "../../../contexts/UserContext";
import useCollaborator from "../../../hooks/useCollaborator";

import { ISelect } from "../../../models/generics.model";
import CollabotatorPartnersList from "../components/CollaboratorPartnersList/CollaboratorPartnersList";
import AlertNoDataFound from "../../../components/AlertNoDataFound";

const CollaboratorPartnersActivePending = () => {
  const { getPartners } = useCollaborator();
  const { company } = useGlobal();

  const [listPartnerSelect, setListPartnerSelect] = useState<ISelect[]>([]);
  const [partnerSelect, setPartnerSelect] = useState<string | undefined>();

  const companyIdPartners = company!.externalCompanyId;
  const { data, isLoading } = getPartners(companyIdPartners);

  useEffect(() => {
    if (data.length > 0 && listPartnerSelect.length === 0) {
      const dataFiltered = data.filter((item) => item !== null);

      const listPartnerSelectData = dataFiltered.map((item) => ({
        label: item?.corporateName,
        value: item?.id,
      }));

      setListPartnerSelect(listPartnerSelectData);
    }
  }, [data, listPartnerSelect]);

  return (
    <>
      <SectionTop className="contentTop">&nbsp;</SectionTop>

      <Content className="contentMain">
        {isLoading && (
          <Flex h="100%" alignItems="center">
            <Loading />
          </Flex>
        )}

        {!isLoading && (
          <Box
            width="100%"
            maxWidth="400px"
            display="flex"
            flexDirection="column"
            gap="5px"
          >
            <span> Prestadores de Serviços com titulares pendentes</span>

            <ReactSelect
              className="select-fields"
              classNamePrefix="select"
              closeMenuOnSelect={true}
              isSearchable={true}
              placeholder="Selecionar"
              noOptionsMessage={() => "Nenhum prestador de serviço cadastrado"}
              onChange={(item) => {
                setPartnerSelect(item?.value.toString() || undefined);
              }}
              options={listPartnerSelect}
            />
          </Box>
        )}

        {!isLoading && listPartnerSelect.length === 0 && (
          <AlertNoDataFound title="Nenhum prestador de serviço cadastrado" />
        )}

        {/* {!isLoading &&
          listPartnerSelect.length > 0 &&
          partnerSelect === undefined && (
            <AlertNoDataFound title="Selecione um prestador de serviço" />
          )} */}

        {partnerSelect && (
          <CollabotatorPartnersList
            partnerId={partnerSelect}
            type="P"
            submenu={6}
          />
        )}
      </Content>
    </>
  );
};

export default CollaboratorPartnersActivePending;

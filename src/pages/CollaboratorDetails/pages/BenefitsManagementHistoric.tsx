import { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import Loading from "../../../components/Loading";
import useCollaborator from "../../../hooks/useCollaborator";
import { dateFormat } from "../../../utils";
import { ISelect } from "../../../models/generics.model";
import { IBenefitsManagementProps } from "./types";
import HolderAndDependentsSelect from "../components/HolderAndDependentsSelect";
import { BENEFICIARY_CONTRACT_STATUS } from "../../../utils/enumFormat";
import Pagination from "../../../components/Pagination";
import { capitalize } from "../../../utils/capitalize";
import AlertNoDataFound from "../../../components/AlertNoDataFound";

const BenefitsManagementHistoric = ({ holder }: IBenefitsManagementProps) => {
  const [userSelected, setUserSelected] = useState<ISelect | null>({
    label: capitalize(holder?.person?.name),
    value: holder?.id,
  });

  const { getBeneficiaryHistoric } = useCollaborator();

  const [currentPage, setCurrentPage] = useState(1);
  const registerPerPage = 5;

  const {
    isLoading: loadingHistoric,
    data: dataHistoric,
    count,
  } = getBeneficiaryHistoric({
    beneficiaryId: userSelected?.value.toString() || "",
    size: registerPerPage,
    page: currentPage,
  });

  return (
    <Box padding="0 20px 20px">
      <HolderAndDependentsSelect
        holder={holder}
        setUserSelected={setUserSelected}
        userSelected={userSelected}
      />

      {loadingHistoric && <Loading />}

      {!loadingHistoric && dataHistoric?.length > 0 && (
        <>
          <Box
            display="flex"
            flexDirection="column"
            gap="35px"
            margin="30px 0 20px"
          >
            {dataHistoric.map((item, key) => (
              <Box
                key={key}
                display="flex"
                flexDirection="column"
                gap="20px"
                color="text.third"
                borderBottom="1px solid"
                borderColor="gray.200"
                padding="0 20px 35px"
              >
                <Text color="text.second">
                  <b>
                    {capitalize(item?.productCommercialName)} -{" "}
                    {item?.providerName}
                  </b>
                </Text>

                <Text>Status: {BENEFICIARY_CONTRACT_STATUS[item?.status]}</Text>
                <Text>
                  Data de Inclusão: {dateFormat(new Date(item?.createdAt))}
                </Text>
                <Text>
                  Data de Vigência:{" "}
                  {dateFormat(new Date(item?.effectiveStartDate))}
                </Text>
                {item?.effectiveFinalyDate && (
                  <Text>
                    Data de Cancelamento:
                    {dateFormat(new Date(item?.effectiveFinalyDate))}
                  </Text>
                )}
              </Box>
            ))}
          </Box>
          <Pagination
            registerPerPage={registerPerPage}
            totalRegisters={count}
            currentPage={currentPage}
            handleChangePage={(page) => setCurrentPage(page)}
          />
        </>
      )}

      {!loadingHistoric && dataHistoric?.length === 0 && (
        <AlertNoDataFound minH="200px" title="Nenhum histórico disponível" />
      )}
    </Box>
  );
};

export default BenefitsManagementHistoric;

import { Box, TableContainer } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Loading from "../../../components/Loading";
import { TBody, TD, THead, Table } from "../../../components/Table";
import { useGlobal } from "../../../contexts/UserContext";
import useCollaborator from "../../../hooks/useCollaborator";
import TRBenefitsManagementAvailable from "../components/TRBenefitsManagementAvailable";
import { ClassesInnerWrap, ClassesWrap } from "./styled";

import { useParams } from "react-router-dom";
import Pagination from "../../../components/Pagination";
import ClassFiltersBenefitsSettings from "../components/ClassFiltersBenefitsSettings";
import { IBenefitsManagementProps } from "./types";
import AlertNoDataFound from "../../../components/AlertNoDataFound";

const BenefitsManagementAvailable = ({
  holder,
  setStatus,
}: IBenefitsManagementProps) => {
  const { id } = useParams();
  const { company, isBroker, user } = useGlobal();
  const { getBenefitsByBeneficiary } = useCollaborator();

  const [classeSelected, setClasseSelected] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const registerPerPage = 5;

  useEffect(() => {
    setCurrentPage(1);
  }, [classeSelected]);

  const {
    isLoading: loadingContent,
    data: products,
    productClasses,
    count,
  } = getBenefitsByBeneficiary({
    beneficiaryId: id || "",
    companyId: company?.externalCompanyId || "",
    size: registerPerPage,
    page: currentPage,
    productClass: classeSelected !== "all" ? classeSelected : null,
    userId: user?.id || "",
  });

  return (
    <Box padding="0 20px">
      <ClassesWrap overflow="auto">
        <ClassesInnerWrap>
          <ClassFiltersBenefitsSettings
            productClasses={productClasses}
            setClasseSelected={setClasseSelected}
          />
        </ClassesInnerWrap>
      </ClassesWrap>

      {loadingContent && (
        <Box display="flex" flexDir="column">
          <Loading productPage={true} />
        </Box>
      )}

      {!loadingContent && products.length > 0 && (
        <Box>
          <TableContainer marginBottom="10px">
            <Table>
              <THead>
                <TD
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  maxW="200px"
                >
                  Classe
                </TD>
                <TD
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  maxW="100px"
                >
                  Parceiro
                </TD>
                <TD
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  minW="220px"
                >
                  Produto
                </TD>
                <TD
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  maxW="150px"
                >
                  Valor
                </TD>
                <TD textAlign="center" maxW="150px">
                  Total pago
                  <br />
                  pela empresa
                </TD>
                <TD textAlign="center" maxW="150px">
                  Total pago
                  <br />
                  pelo titular
                </TD>
                {isBroker && (
                  <TD
                    display="flex"
                    alignItems="flex-end"
                    justifyContent="center"
                  >
                    Comissionamento
                  </TD>
                )}
                <TD
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  maxW="80px"
                >
                  Aderir
                </TD>
              </THead>

              <TBody>
                {products.map((item, key) => (
                  <TRBenefitsManagementAvailable
                    key={key}
                    item={item}
                    isNotCompleteRecord={!holder?.person?.completeRecord}
                    setStatus={setStatus}
                  />
                ))}
              </TBody>
            </Table>
          </TableContainer>

          <Pagination
            registerPerPage={registerPerPage}
            totalRegisters={count}
            currentPage={currentPage}
            handleChangePage={(page) => setCurrentPage(page)}
          />
        </Box>
      )}

      {!loadingContent && products.length === 0 && (
        <AlertNoDataFound title="Nenhum produto disponível" />
      )}
    </Box>
  );
};

export default BenefitsManagementAvailable;

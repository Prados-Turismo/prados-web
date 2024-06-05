import { useEffect, useState } from "react";
import { Box, Button, TableContainer } from "@chakra-ui/react";
import { TBody, Table, TD, THead } from "../../../components/Table";
import Loading from "../../../components/Loading";
import ModalCompositionFamily from "../../../components/ModalCompositionFamily";
import useCollaborator from "../../../hooks/useCollaborator";
import { ClassesLabelWrap, ClassesWrap } from "./styled";
import { ISelect } from "../../../models/generics.model";
import TRBenefitsManagementProcess from "../components/TRBenefitsManagementProcess";
import { IBenefitsManagementProps } from "./types";
import Pagination from "../../../components/Pagination";
import HolderAndDependentsSelect from "../components/HolderAndDependentsSelect";
import ClassFiltersBenefitsSettings from "../components/ClassFiltersBenefitsSettings";
import { capitalize } from "../../../utils/capitalize";
import AlertNoDataFound from "../../../components/AlertNoDataFound";

const BenefitsManagementProcess = ({ holder }: IBenefitsManagementProps) => {
  const { getBenefitsByBeneficiaryGroup } = useCollaborator();
  const [userSelected, setUserSelected] = useState<ISelect | null>({
    label: capitalize(holder?.person?.name),
    value: holder?.id,
  });

  const [modal, setModal] = useState<boolean>(false);
  const [classeSelected, setClasseSelected] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const registerPerPage = 5;

  const {
    isLoading: loadingContent,
    data: products,
    productClasses,
    count,
  } = getBenefitsByBeneficiaryGroup({
    beneficiaryId: userSelected?.value?.toString() || "",
    group: "P",
    size: registerPerPage,
    page: currentPage,
    productClass: classeSelected !== "all" ? classeSelected : null,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [classeSelected]);

  return (
    <Box padding="0 20px">
      <ClassesWrap>
        <ClassesLabelWrap>
          <HolderAndDependentsSelect
            holder={holder}
            setUserSelected={setUserSelected}
            userSelected={userSelected}
          />

          <Button
            borderRadius="4px"
            onClick={() => {
              setModal(true);
            }}
          >
            Composição da Família
          </Button>
        </ClassesLabelWrap>

        <ClassFiltersBenefitsSettings
          productClasses={productClasses}
          setClasseSelected={setClasseSelected}
        />
      </ClassesWrap>

      {loadingContent && <Loading />}

      {!loadingContent && products.length > 0 && (
        <Box>
          <TableContainer marginBottom="10px">
            <Table>
              <THead>
                <TD flex="0 0 50px" maxW="50px">
                  &nbsp;
                </TD>
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
                  Data da
                  <br />
                  Solicitação
                </TD>
                <TD flex="0 0 200px" textAlign="center" maxW="200px">
                  Status
                </TD>
                <TD
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  maxW="50px"
                >
                  &nbsp;
                </TD>
              </THead>

              <TBody>
                {products.map((item) => (
                  <TRBenefitsManagementProcess item={item} key={item?.id} />
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
        <AlertNoDataFound minH="unset" title="Nenhum produto em processo" />
      )}

      {modal && holder && (
        <ModalCompositionFamily
          title="Composição da Família - Produtos Pendentes"
          holder={holder}
          group="P"
          isOpen={modal}
          handleModal={() => setModal(false)}
        />
      )}
    </Box>
  );
};

export default BenefitsManagementProcess;

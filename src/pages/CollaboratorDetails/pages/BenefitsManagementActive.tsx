import { Box, Button, TableContainer } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Loading from "../../../components/Loading";
import ModalCompositionFamily from "../../../components/ModalCompositionFamily";
import Pagination from "../../../components/Pagination";
import { TBody, TD, THead, Table } from "../../../components/Table";
import { useGlobal } from "../../../contexts/UserContext";
import useCollaborator from "../../../hooks/useCollaborator";
import {
  IDataCollaborator,
  IDataDependents,
} from "../../../models/collaborator.model";
import { capitalize } from "../../../utils/capitalize";
import ClassFiltersBenefitsSettings from "../components/ClassFiltersBenefitsSettings";
import HolderAndDependentsSelect from "../components/HolderAndDependentsSelect";
import TRBenefitsManagementActive from "../components/TRBenefitsManagementActive";
import { ClassesLabelWrap, ClassesWrap } from "./styled";
import { IBenefitsManagementProps } from "./types";
import AlertNoDataFound from "../../../components/AlertNoDataFound";

const BenefitsManagementActive = ({ holder }: IBenefitsManagementProps) => {
  const { getBenefitsByBeneficiaryGroup } = useCollaborator();
  const { user } = useGlobal();
  const [classeSelected, setClasseSelected] = useState("all");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userSelected, setUserSelected] = useState<any>({
    label: capitalize(holder?.person?.name),
    value: holder?.id,
    data: holder,
  });
  const [userData, setUserData] = useState<IDataCollaborator | IDataDependents>(
    holder,
  );
  const [modal, setModal] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState(1);
  const registerPerPage = 5;

  const {
    isLoading: loadingContent,
    data: products,
    productClasses,
    count,
  } = getBenefitsByBeneficiaryGroup({
    beneficiaryId: userSelected?.value?.toString() || "",
    group: "A",
    size: registerPerPage,
    page: currentPage,
    productClass: classeSelected !== "all" ? classeSelected : null,
    userId: user?.id || "",
  });

  useEffect(() => {
    setUserData(userSelected?.data);
  }, [userSelected?.data]);

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
                <TD
                  minW="129px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  Classe
                </TD>
                <TD display="flex" alignItems="center" justifyContent="center">
                  Parceiro
                </TD>
                <TD display="flex" alignItems="center" justifyContent="center">
                  Produto
                </TD>
                <TD display="flex" alignItems="center" justifyContent="center">
                  Valor
                </TD>
                <TD textAlign="center">
                  Modo de
                  <br />
                  Contribuição
                </TD>
                <TD textAlign="center">
                  % Pago pela
                  <br />
                  Empresa
                </TD>

                <TD textAlign="center">
                  Valor pago
                  <br />
                  pela Empresa
                </TD>

                <TD textAlign="center">
                  Total pago
                  <br />
                  pela Empresa
                </TD>

                <TD textAlign="center">
                  Total pago
                  <br />
                  pelo Titular
                </TD>

                <TD
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flex="0 0 85px"
                >
                  &nbsp;
                </TD>
              </THead>

              <TBody>
                {products.map((item) => (
                  <TRBenefitsManagementActive
                    key={item?.id}
                    item={item}
                    holder={holder}
                    data={userData}
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
        <AlertNoDataFound minH="unset" title="Nenhum produto ativo" />
      )}

      {modal && holder && (
        <ModalCompositionFamily
          title="Composição da Família - Produtos Ativos"
          holder={holder}
          group="A"
          isOpen={modal}
          handleModal={() => setModal(false)}
        />
      )}
    </Box>
  );
};

export default BenefitsManagementActive;

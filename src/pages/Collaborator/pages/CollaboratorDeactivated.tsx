import { Button, Flex, TableContainer } from "@chakra-ui/react";
import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import FieldSearch from "../../../components/FieldSearch";
import Loading from "../../../components/Loading";
import Pagination from "../../../components/Pagination";
import { TBody, TD, THead, TR, Table } from "../../../components/Table";

// Styled Components
import { Content, SectionTop } from "./styled";

// Hooks and utils
import SimpleModal from "../../../components/SimpleModal";
import { useGlobal } from "../../../contexts/UserContext";
import useCollaborator from "../../../hooks/useCollaborator";
import { cpfMask } from "../../../utils";
import { capitalize } from "../../../utils/capitalize";
import IconGroupCollaborator from "../components/IconGroupCollaborator";
import ModalRecordCollaborator from "../components/ModalRecordCollaborator";
import TooltipSubstring from "../../../components/TooltipSubstring/TooltipSubstring";
import AlertNoDataFound from "../../../components/AlertNoDataFound";

const CollaboratorList = () => {
  const { getCollaborators } = useCollaborator();
  const { company } = useGlobal();
  const [modalRecordCollaborator, setModalRecordCollaborator] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const registerPerPage = 10;

  const { data, count, isLoading, setFieldSearch } = getCollaborators({
    size: registerPerPage,
    page: currentPage,
    companyId: company!.externalCompanyId,
    beneficiaryStatus: "I",
  });

  const hiddenCPF = (cpf: string) => cpf.replace(/^.{8}/, "***.***.");

  return (
    <>
      <SectionTop className="contentTop">
        <Button
          leftIcon={<IoIosAdd />}
          onClick={() => {
            setModalRecordCollaborator(true);
          }}
        >
          Cadastrar titular
        </Button>
      </SectionTop>

      <Content className="contentMain">
        <div className="searchWrap">
          <span>Buscar titular</span>
          <FieldSearch
            placeholder="Nome ou CPF"
            handleSearch={(value) => {
              setCurrentPage(1);
              setFieldSearch(value);
            }}
          />
        </div>

        {isLoading && (
          <Flex h="100%" alignItems="center">
            <Loading />
          </Flex>
        )}

        {!isLoading && (
          <>
            {data.length > 0 && (
              <>
                <TableContainer marginBottom="10px">
                  <Table>
                    <THead padding={"0 30px 0 30px"}>
                      <TD style={{ flex: "0 0 30%" }}>Titular</TD>
                      <TD>CPF</TD>
                      <TD>Categoria</TD>
                      <TD>Subcategoria</TD>
                      <TD style={{ flex: "0 0 10%" }}>&nbsp;</TD>
                    </THead>

                    <TBody>
                      {data.map((item) => {
                        return (
                          <TR key={item.id}>
                            <TD style={{ flex: "0 0 30%" }}>
                              <TooltipSubstring
                                name={capitalize(item.person?.name) || "-"}
                                length={25}
                              />
                            </TD>
                            <TD>
                              {item.person?.cpf
                                ? hiddenCPF(cpfMask(item.person?.cpf))
                                : "-"}
                            </TD>
                            <TD>
                              <TooltipSubstring
                                name={item.sector?.name || "-"}
                                length={18}
                              />
                            </TD>
                            <TD>
                              <TooltipSubstring
                                name={item.position?.name || "-"}
                                length={18}
                              />
                            </TD>
                            <TD style={{ flex: "0 0 10%" }}>
                              <IconGroupCollaborator
                                item={item}
                                filter="inactive"
                                menu={4}
                              />
                            </TD>
                          </TR>
                        );
                      })}
                    </TBody>
                  </Table>
                </TableContainer>

                <Pagination
                  registerPerPage={registerPerPage}
                  totalRegisters={count}
                  currentPage={currentPage}
                  handleChangePage={(page) => setCurrentPage(page)}
                />
              </>
            )}

            {data.length === 0 && (
              <AlertNoDataFound title="Nenhum titular inativo encontrado" />
            )}
          </>
        )}
      </Content>

      <SimpleModal
        title="Pré-cadastro"
        size="xl"
        isOpen={modalRecordCollaborator}
        handleModal={setModalRecordCollaborator}
      >
        <ModalRecordCollaborator
          companyId={company!.externalCompanyId}
          handleClose={() => setModalRecordCollaborator(false)}
        />
      </SimpleModal>
    </>
  );
};

export default CollaboratorList;

import { Button, Flex, TableContainer } from "@chakra-ui/react";
import { IoIosAdd } from "react-icons/io";
import Loading from "../../../components/Loading";
import { TBody, TD, THead, TR, Table } from "../../../components/Table";

// Styled Components
import { Content, SectionTop } from "./styled";

// Hooks and utils
import useCollaborator from "../../../hooks/useCollaborator";

import { useState } from "react";
import Pagination from "../../../components/Pagination";
import SimpleModal from "../../../components/SimpleModal";
import { useGlobal } from "../../../contexts/UserContext";
import { cpfMask, dateFormat } from "../../../utils";
import { capitalize } from "../../../utils/capitalize";
import IconGroupCollaboratorLink from "../components/IconGroupCollaboratorLink";
import ModalRecordCollaborator from "../components/ModalRecordCollaborator";
import TooltipSubstring from "../../../components/TooltipSubstring/TooltipSubstring";
import AlertNoDataFound from "../../../components/AlertNoDataFound";

const CollaboratorList = () => {
  const { getPreRecordsPending } = useCollaborator();

  const { company } = useGlobal();
  const [modalRecordCollaborator, setModalRecordCollaborator] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const registerPerPage = 10;

  const { isLoading, data, count } = getPreRecordsPending({
    size: registerPerPage,
    page: currentPage,
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
        {isLoading && (
          <Flex h="100%" alignItems="center">
            <Loading />
          </Flex>
        )}

        {!isLoading && (
          <>
            {data.length > 0 && (
              <>
                <div className="searchWrap">&nbsp;</div>

                <TableContainer marginBottom="10px">
                  <Table>
                    <THead padding={"0 30px 0 30px"}>
                      <TD>Data de cadastro</TD>
                      <TD>Titular</TD>
                      <TD>CPF</TD>
                      <TD style={{ flex: "0 0 10%" }}>&nbsp;</TD>
                    </THead>

                    <TBody>
                      {data.map((item) => {
                        return (
                          <TR key={item.id}>
                            <TD>
                              {item?.createdAt
                                ? dateFormat(new Date(item?.createdAt))
                                : "-"}
                            </TD>
                            <TD>
                              <TooltipSubstring
                                name={capitalize(item.person?.name) || "-"}
                                length={25}
                              />
                            </TD>
                            <TD>
                              {item?.person?.cpf
                                ? hiddenCPF(cpfMask(item?.person?.cpf))
                                : "-"}
                            </TD>
                            <TD style={{ flex: "0 0 10%" }}>
                              <IconGroupCollaboratorLink item={item} />
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
              <AlertNoDataFound title="Nenhum titular com vínculo pendente encontrado" />
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

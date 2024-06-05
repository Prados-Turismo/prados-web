import { useEffect, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  TableContainer,
  Text,
} from "@chakra-ui/react";

// Components and Utils
import Pagination from "../../../../components/Pagination";
import Loading from "../../../../components/Loading";
import { Table, THead, TBody, TD } from "../../../../components/Table";
import { ISidebarNeedHelp } from "../../../../models/needHelp.model";
import { useGlobal } from "../../../../contexts/UserContext";
import TRRequests from "./components/TRRequests";

// Hooks
import useNeedHelp from "../../../../hooks/useNeedHelp";

// Styles
import {
  Content,
  StylePopoverParagraph,
  StylePopoverTitle,
  StyledBody,
  StyledPopoverContent,
} from "./styled";
import { AiFillQuestionCircle } from "react-icons/ai";
import AlertNoDataFound from "../../../../components/AlertNoDataFound";

const Requests = ({ status }: Pick<ISidebarNeedHelp, "status">) => {
  const { company, role } = useGlobal();
  const { getNeedHelp } = useNeedHelp();
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 7;

  const selectedRole =
    role!.id === "3"
      ? "beneficiaries"
      : role!.id === "6"
      ? "broker-agents"
      : "companies";

  const { isLoading, data, count, refetch } = getNeedHelp({
    currentPage,
    pageSize,
    company: company!.externalCompanyId,
    status,
    selectedRole,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [status]);

  return (
    <Content>
      {isLoading && <Loading />}

      {!isLoading && (
        <>
          {data?.length > 0 && (
            <>
              <TableContainer marginBottom="10px">
                <Table textAlign="center">
                  <THead>
                    <TD>Protocolo</TD>
                    <TD>Assunto</TD>
                    <TD>Solicitado por</TD>
                    <TD>
                      Data/Hora
                      <br /> de Abertura
                    </TD>
                    {status !== "A" && (
                      <TD>
                        Data/Hora
                        <br /> de Encerramento
                      </TD>
                    )}
                    <TD>Status</TD>
                    <TD>
                      <Text marginRight={2}>Compartilhado</Text>
                      <Popover trigger="hover">
                        <PopoverTrigger>
                          <button style={{ background: "transparent" }}>
                            <AiFillQuestionCircle size={19} />
                          </button>
                        </PopoverTrigger>
                        <StyledPopoverContent>
                          <StyledBody>
                            <StylePopoverTitle>Ajuda</StylePopoverTitle>
                            <StylePopoverParagraph>
                              Compartilhe este chamado com todos os usuários
                              <br />
                              da empresa selecionada
                            </StylePopoverParagraph>
                          </StyledBody>
                        </StyledPopoverContent>
                      </Popover>
                    </TD>
                    <TD>Mensagens</TD>
                    <TD>{status === "A" && "Encerrar"}</TD>
                  </THead>

                  <TBody>
                    {data.map((item) => (
                      <TRRequests
                        key={item.id}
                        status={status}
                        item={item}
                        refetchCalls={refetch}
                        selectedRole={
                          selectedRole === "companies"
                            ? "company"
                            : selectedRole === "broker-agents"
                            ? "brokerAgent"
                            : "beneficiary"
                        }
                      />
                    ))}
                  </TBody>
                </Table>
              </TableContainer>

              <Pagination
                registerPerPage={pageSize}
                totalRegisters={count}
                currentPage={currentPage}
                handleChangePage={(page: number) => {
                  setCurrentPage(page);
                }}
              />
            </>
          )}

          {data.length === 0 && (
            <AlertNoDataFound title="Nenhuma solicitação encontrada" />
          )}
        </>
      )}
    </Content>
  );
};

export default Requests;

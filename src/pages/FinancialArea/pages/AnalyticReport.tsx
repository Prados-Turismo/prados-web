import { useEffect, useRef, useState } from "react";
import { Button, TableContainer } from "@chakra-ui/react";
import { IoChevronDownSharp, IoChevronUpSharp } from "react-icons/io5";
import { MdFileDownload } from "react-icons/md";

import Wallet from "../components/Wallet";
import FieldSearch from "../../../components/FieldSearch";
import Pagination from "../../../components/Pagination";
import Loading from "../../../components/Loading";
import { Table, THead, TBody, TR, TRWrap, TD } from "../../../components/Table";
import AnalyticReportHistoric from "../components/AnalyticReportHistoric";

// Styled Components
import { SectionTop, Content } from "./styled";

// Hooks and utils
import { numberFormat } from "../../../utils";
import { IAnalyticReportResponse } from "../../../models/financial.model";
import AlertNoDataFound from "../../../components/AlertNoDataFound";

const AnalyticReport = () => {
  const reporList = useRef<IAnalyticReportResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedHistoric, setSelectedHistoric] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const registerPerPage = 4;
  const count = 4;

  const handleSearch = (search: string) => {
    search.length;
  };

  const handlePagination = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      reporList.current = [
        {
          id: 1,
          user: "Colaborador Demonstração 4",
          cpf: "***.***.886-73",
          value: 900,
          created_at: new Date(),
        },
        {
          id: 2,
          user: "Colaborador Demonstração 5",
          cpf: "***.***.340-79",
          value: 900,
          created_at: new Date(),
        },
        {
          id: 3,
          user: "Colaborador Demonstração 6",
          cpf: "***.***.340-79",
          value: 900,
          created_at: new Date(),
        },
        {
          id: 4,
          user: "Colaborador Demonstração 7",
          cpf: "***.***.340-79",
          value: 900,
          created_at: new Date(),
        },
      ];

      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <SectionTop className="contentTop">
        <Wallet showBalance={false} />
      </SectionTop>

      <Content className="contentMain">
        {isLoading && <Loading />}

        {!isLoading && (
          <>
            {reporList.current.length > 0 && (
              <>
                <div className="competenceWrap">
                  <div style={{ maxWidth: "400px" }}>
                    <FieldSearch placeholder="" handleSearch={handleSearch} />
                  </div>

                  <Button leftIcon={<MdFileDownload />}>
                    Gerar Relatório Analítico
                  </Button>
                </div>

                <TableContainer marginBottom="10px">
                  <Table textAlign="center">
                    <THead>
                      <TD>Nome</TD>
                      <TD>CPF</TD>
                      <TD>Valor Pago (R$)</TD>
                      <TD style={{ flex: "0 0 30px" }}>&nbsp;</TD>
                    </THead>

                    <TBody>
                      {reporList.current.map((item) => (
                        <TRWrap key={item.id}>
                          <TR
                            onClick={() => {
                              selectedHistoric !== item.id
                                ? setSelectedHistoric(item.id)
                                : setSelectedHistoric(null);
                            }}
                          >
                            <TD>{item.user}</TD>
                            <TD>{item.cpf}</TD>
                            <TD>{numberFormat(item.value)}</TD>
                            <TD style={{ flex: "0 0 30px" }}>
                              <span>
                                {selectedHistoric !== item.id ? (
                                  <IoChevronDownSharp />
                                ) : (
                                  <IoChevronUpSharp />
                                )}
                              </span>
                            </TD>
                          </TR>

                          {selectedHistoric === item.id && (
                            <AnalyticReportHistoric id={item.id} />
                          )}
                        </TRWrap>
                      ))}
                    </TBody>
                  </Table>
                </TableContainer>

                <Pagination
                  registerPerPage={registerPerPage}
                  totalRegisters={count}
                  currentPage={currentPage}
                  handleChangePage={handlePagination}
                />
              </>
            )}

            {reporList.current.length === 0 && (
              <AlertNoDataFound title="Nenhuma movimentação encontrada" />
            )}
          </>
        )}
      </Content>
    </>
  );
};

export default AnalyticReport;

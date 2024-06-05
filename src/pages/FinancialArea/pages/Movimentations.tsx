import { TableContainer } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import { MdMoneyOff, MdOutlineDownload } from "react-icons/md";

import Loading from "../../../components/Loading";
import Pagination from "../../../components/Pagination";
import { TBody, TD, THead, TR, Table } from "../../../components/Table";
import Wallet from "../components/Wallet";

// Styled Components
import { Content, FiltersWrapper, SectionTop } from "./styled";

// Hooks and utils
import useFinancial from "../../../hooks/useFinancial";
import { dateFormat, numberFormat } from "../../../utils";
import DateRangeFilter from "../../HealthVoucherManagement/components/DateRangeFilter/DateRangeFilter";
import { apiInvoicing } from "../../../services/api";
import AlertNoDataFound from "../../../components/AlertNoDataFound";

const Movimentations = () => {
  const { getMovimentations } = useFinancial();

  const [currentPage, setCurrentPage] = useState(1);
  const [companyBalance, setCompanyBalance] = useState();
  const registerPerPage = 10;

  const initialMovimentationsFilter = useMemo(() => ({}), []);
  const [movimentationsFilter, setMovimentationsFilter] = useState<{
    startDate?: string;
    endDate?: string;
  }>(initialMovimentationsFilter);

  const { isLoading, count, movimentations, accountExists } = getMovimentations(
    {
      offset: currentPage,
      pageSize: registerPerPage,
      ...movimentationsFilter,
    },
  );

  const getObjectByKey = <T,>(obj: T, key: keyof T) => obj[key];

  const icons = {
    "1": <FiTrendingDown style={{ color: "#13DA63" }} />,
    "2": <FiTrendingUp style={{ color: "#E92043" }} />,
    "3": <MdMoneyOff />,
  };

  const handlePagination = (page: number) => {
    setCurrentPage(page);
  };

  const getReport = async (lote_fatura_id: string) => {
    await apiInvoicing
      .get(`financeiro/${lote_fatura_id}/use-per-company`)
      .then((response) => {
        const csvBlob = new Blob([response.data], { type: "text/csv" });
        const downloadUrl = URL.createObjectURL(csvBlob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = "report.csv";
        link.click();
      });
  };

  return (
    <>
      <SectionTop className="contentTop">
        <Wallet showBalance={accountExists} />
      </SectionTop>

      <Content className="contentMain">
        <FiltersWrapper>
          <DateRangeFilter setFilterState={setMovimentationsFilter} />
        </FiltersWrapper>
        {isLoading && <Loading />}
        {!isLoading && (
          <>
            {movimentations.length > 0 && (
              <>
                <TableContainer marginBottom="10px">
                  <Table textAlign="center">
                    <THead>
                      <TD style={{ flex: "0 0 30px" }}>&nbsp;</TD>
                      <TD>Data</TD>
                      <TD>Conta</TD>
                      <TD>Tipo</TD>
                      <TD>Descrição</TD>
                      <TD>Valor</TD>
                      <TD>Relatório</TD>
                    </THead>

                    <TBody>
                      {movimentations.map((item) => (
                        <TR key={item.id}>
                          <TD style={{ flex: "0 0 30px" }}>
                            {getObjectByKey(icons, item.operationTypeId)}
                          </TD>
                          <TD>{dateFormat(new Date(item.createdAt))}</TD>
                          <TD>Promoção à Saúde</TD>
                          <TD>{item.friendlyOperationType}</TD>
                          <TD>{item.friendlyOperationTypeDescription}</TD>
                          <TD>{numberFormat(item.value)}</TD>
                          <TD>
                            {item.friendlyOperationType === "Saída" &&
                              item?.batchInvoiceId && (
                                <button
                                  onClick={() =>
                                    getReport(item?.batchInvoiceId)
                                  }
                                >
                                  <MdOutlineDownload size={23} />
                                </button>
                              )}
                          </TD>
                        </TR>
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

            {movimentations.length === 0 && (
              <AlertNoDataFound title="Nenhuma movimentação encontrada" />
            )}
          </>
        )}
      </Content>
    </>
  );
};

export default Movimentations;

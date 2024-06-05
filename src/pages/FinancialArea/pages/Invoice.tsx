import { TableContainer } from "@chakra-ui/react";
import { useState } from "react";

import Loading from "../../../components/Loading";
import Pagination from "../../../components/Pagination";
import { TBody, TD, THead, Table } from "../../../components/Table";
import Wallet from "../components/Wallet";

// Styled Components
import { Content, SectionTop } from "./styled";

// Hooks and utils
import { useGlobal } from "../../../contexts/UserContext";
import useFinancial from "../../../hooks/useFinancial";
import InvoiceRow from "./InvoiceRow";
import AlertNoDataFound from "../../../components/AlertNoDataFound";

const Invoice = () => {
  const { getInvoices } = useFinancial();

  const { company } = useGlobal();

  const [currentPage, setCurrentPage] = useState(1);
  const registerPerPage = 10;

  const { isLoading, count, rows } = getInvoices({
    page: currentPage,
    size: registerPerPage,
    companyId: company!.externalCompanyId,
  });

  const handlePagination = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <SectionTop className="contentTop">
        {<Wallet showBalance={true} />}
      </SectionTop>

      <Content className="contentMain">
        {isLoading && <Loading />}

        {!isLoading && (
          <>
            {rows.length > 0 && (
              <>
                <TableContainer marginBottom="10px">
                  <Table textAlign="center">
                    <THead>
                      <TD>Competência</TD>
                      <TD>Vencimento</TD>
                      <TD>Valor</TD>
                      <TD>Status</TD>
                      <TD>Detalhamento</TD>
                      <TD>Recibo</TD>
                      <TD>Boleto</TD>
                      <TD>Nota</TD>
                    </THead>

                    <TBody>
                      {rows.map((item) => (
                        <InvoiceRow key={item?.id} item={item} />
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

            {rows.length === 0 && (
              <AlertNoDataFound title="Nenhuma fatura encontrada" />
            )}
          </>
        )}
      </Content>
    </>
  );
};

export default Invoice;

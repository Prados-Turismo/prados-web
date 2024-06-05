import React, { useMemo, useState } from "react";
import { TBody, TD, TH, THead, TR, Table } from "../../../../components/Table";
import Pagination from "../../../../components/Pagination";
import { cnpjMask, dateFormat } from "../../../../utils";
import { currencyBRLFormat } from "../../../../utils/currencyBRLFormat";
import { Button, SearchInputWrapper } from "./styled";
import { AiOutlineSearch } from "react-icons/ai";
import { useHealthVoucher } from "../../../../hooks/useHealthVoucher";
import Loading from "../../../../components/Loading/Loading";
import { Box } from "@chakra-ui/react";
import { apiWallet } from "../../../../services/api";
import { useToastStandalone } from "../../../../hooks/useToastStandalone";
import { useGlobal } from "../../../../contexts/UserContext";

const CreditByCompanyTable: React.FC = () => {
  const [search, setSearch] = useState("");
  const { company } = useGlobal();
  const {
    balancePerCompanyData,
    isFetchingBalancePerCompanyData,
    reportPage,
    setReportPage,
    numberRequestSizePage,
  } = useHealthVoucher();

  const handleChangePage = (page: number) => {
    if (setReportPage) {
      setReportPage(page);
    }
  };

  const filteredData = useMemo(
    () =>
      balancePerCompanyData?.rows.filter((balance) =>
        balance.companyName
          ? balance.company
              .toLocaleLowerCase()
              .includes(search.toLocaleLowerCase())
          : true,
      ),
    [balancePerCompanyData, search],
  );

  if (isFetchingBalancePerCompanyData) {
    return <Loading />;
  }

  if (balancePerCompanyData?.count === 0) {
    return <span style={{ padding: "2rem" }}>Não há dados para listar</span>;
  }

  return (
    <>
      <Box display="flex">
        <SearchInputWrapper>
          <label htmlFor="searchTransactionInput">
            <AiOutlineSearch />
          </label>
          <input
            type="text"
            placeholder="Buscar empresa"
            onChange={(event) => setSearch(event.target.value)}
          />
        </SearchInputWrapper>
        <Button
          onClick={async () => {
            await apiWallet
              .get(
                `/companies/reports/${company!.id}/balance-per-company/report`,
              )
              .then(({ data }) => {
                if (data?.length > 0) {
                  const cleanedData = data
                    .replace(/Ç/g, "C")
                    .replace(/Ã/g, "A")
                    .replace(/\./g, ",")
                    .toUpperCase();
                  const csvContent = `data:text/csv;charset=utf-8,${cleanedData}`;
                  const encodedURI = encodeURI(csvContent);

                  const downloadLink = document.createElement("a");
                  downloadLink.href = encodedURI;
                  downloadLink.download = `relatorio_saldo_empresa.csv`;
                  document.body.appendChild(downloadLink);
                  downloadLink.click();
                  document.body.removeChild(downloadLink);
                  useToastStandalone({
                    title: "Download iniciado com sucesso!",
                    status: "success",
                  });
                } else {
                  useToastStandalone({
                    title: "Erro de download",
                    description: "Não há relatório",
                    status: "info",
                  });
                }
              })
              .catch((error) => {
                useToastStandalone({
                  title: "Erro de download",
                  description: error?.response?.data?.message,
                  status: "error",
                });
              });
          }}
          position="absolute"
          right="45px"
        >
          Baixar Relatório
        </Button>
      </Box>

      <Table>
        <THead>
          <TH>Data</TH>
          <TH>Empresa</TH>
          <TH>Saldo</TH>
        </THead>

        <TBody>
          {filteredData?.map((company, index) => (
            <TR key={index}>
              <TD>{dateFormat(new Date(company.createdAt))}</TD>
              <TD>
                {company.companyName || "-"}
                <br />
                {company.document && cnpjMask(company.document)}
              </TD>
              <TD>{currencyBRLFormat(company.balance)}</TD>
            </TR>
          ))}
        </TBody>
      </Table>

      <Pagination
        registerPerPage={numberRequestSizePage}
        totalRegisters={balancePerCompanyData?.count || 0}
        currentPage={reportPage}
        handleChangePage={handleChangePage}
      />
    </>
  );
};

export default CreditByCompanyTable;

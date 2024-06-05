/* eslint-disable no-console */
import React, { useState, useEffect, useMemo } from "react";
import { TBody, TD, TH, THead, TR, Table } from "../../../../components/Table";
import Pagination from "../../../../components/Pagination";
import { currencyBRLFormat } from "../../../../utils/currencyBRLFormat";
import { SearchInputWrapper } from "./styled";
import { AiOutlineSearch } from "react-icons/ai";
import Loading from "../../../../components/Loading/Loading";
import { apiInvoicing, apiWallet } from "../../../../services/api";

import { MdOutlineDownload } from "react-icons/md";
import { cnpjMask } from "../../../../utils";
import { useGlobal } from "../../../../contexts/UserContext";
import AlertNoDataFound from "../../../../components/AlertNoDataFound";

const UseByCompanyTable: React.FC = () => {
  const { company } = useGlobal();

  const [search, setSearch] = useState("");
  const [screenData, setScreenData] = useState<any>([]);
  const [screenDataPage, setScreenDataPage] = useState(1);
  const [screenDataSizePage, setScreenDataSizePage] = useState(10);

  useEffect(() => {
    async function getCompanyData() {
      try {
        const response = await apiWallet.get(
          `/companies/reports/${company!.externalCompanyId}/use-per-company`,
          { params: { page: screenDataPage, size: screenDataSizePage } },
        );
        setScreenData(response?.data);
        return;
      } catch (error) {
        console.log("ERROR DA API: ", error);
      }
    }
    getCompanyData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenDataPage]);

  const filteredData = useMemo(
    () =>
      screenData?.rows?.filter((balance: any) =>
        balance.company
          ? balance?.company
              ?.toLocaleLowerCase()
              ?.includes(search?.toLocaleLowerCase())
          : true,
      ),
    [screenData, search],
  );
  if (screenData?.length === 0) {
    return <Loading />;
  }

  const handleChange = (page: number) => {
    if (setScreenDataPage) {
      setScreenDataPage(page);
    }
  };

  const getReport = async (lote_fatura_id: string) => {
    await apiInvoicing
      .get(`financeiro/${lote_fatura_id}/use-per-company`, {
        responseType: "blob",
      })
      .then((response) => {
        if (response.data) {
          const csvBlob = new Blob([response.data], { type: "text/csv" });
          const downloadUrl = URL.createObjectURL(csvBlob);
          const link = document.createElement("a");
          link.href = downloadUrl;
          link.download = "report.csv";
          link.click();
        }
      });
  };

  return (
    <>
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

      <Table>
        <THead>
          <TH>Empresa</TH>
          <TH>Competência</TH>
          <TH>Valor (R$)</TH>
          <TH>Relatório</TH>
        </THead>

        <TBody>
          {filteredData?.map((company: any, index: any) => (
            <TR key={index}>
              <TD>
                {company?.company.replace(/\s-\s\d+$/, "")} <br />{" "}
                {cnpjMask(company?.company.match(/\d+$/)[0])}
              </TD>
              <TD>
                {company?.monthCompetency} / {company?.yearCompetency}
              </TD>
              <TD>{currencyBRLFormat(company?.useValue)}</TD>
              <TD>
                {company?.batchInvoiceId && (
                  <button onClick={() => getReport(company?.batchInvoiceId)}>
                    <MdOutlineDownload size={23} />
                  </button>
                )}
              </TD>
            </TR>
          )) ?? (
            <tr>
              <td colSpan={4}>
                <AlertNoDataFound title="Não há dados para serem listados" />
              </td>
            </tr>
          )}
        </TBody>
      </Table>
      <Pagination
        registerPerPage={screenDataSizePage}
        totalRegisters={screenData?.count || 0}
        currentPage={screenDataPage}
        handleChangePage={screenData?.count === 0 ? () => null : handleChange}
      />
    </>
  );
};

export default UseByCompanyTable;

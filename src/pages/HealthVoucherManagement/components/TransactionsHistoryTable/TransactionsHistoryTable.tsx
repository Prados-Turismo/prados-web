import React, { useMemo } from "react";
import Loading from "../../../../components/Loading/Loading";
import Pagination from "../../../../components/Pagination";
import { TBody, TH, THead, TR, Table } from "../../../../components/Table";
import { dateFormat } from "../../../../utils";
import { currencyBRLFormat } from "../../../../utils/currencyBRLFormat";
import { TD } from "./styled";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";

interface Props {
  transactionHistory: any;
  isFetchingTransactionHistory: boolean;
  transactionHistoryPage: number;
  setTransactionHistoryPage: React.Dispatch<React.SetStateAction<number>>;
  numberSizePages: number;
  search: any;
}

const TransactionsHistoryTable: React.FC<Props> = ({
  transactionHistory,
  isFetchingTransactionHistory,
  transactionHistoryPage,
  setTransactionHistoryPage,
  numberSizePages,
  search,
}) => {
  const handlePagination = (page: number) => {
    setTransactionHistoryPage(page);
  };

  if (isFetchingTransactionHistory) {
    return <Loading />;
  }

  const getObjectByKey = <T,>(obj: T, key: keyof T) => obj[key];

  const icons = {
    Entrada: <FiTrendingDown style={{ color: "#13DA63" }} />,
    Saída: <FiTrendingUp style={{ color: "#E92043" }} />,
  };

  const filteredData = useMemo(
    () =>
      transactionHistory?.rows.filter((balance: any) =>
        balance.companyName
          ? balance?.companyName
              ?.toLocaleLowerCase()
              ?.includes(search?.toLocaleLowerCase())
          : true,
      ),
    [transactionHistory, search],
  );

  return (
    <>
      <Table>
        <THead
          backgroundColor="white"
          height={50}
          alignItems="center"
          display="flex"
          justifyContent="center"
          style={{
            position: "sticky",
            top: -15,
          }}
        >
          <TH marginLeft="15px">ID</TH>
          <TH>Usuário</TH>
          <TH>Data</TH>
          <TH>Tipo de movimentação</TH>
          <TH>Empresa</TH>
          <TH>Valor (R$)</TH>
        </THead>

        <TBody>
          {filteredData?.map((data: any) => (
            <TR key={data.id}>
              <div>{getObjectByKey(icons, data.transactionType)}</div>
              <TD>{String(data.id).padStart(4, "0")}</TD>
              <TD>{data.username}</TD>
              <TD>{dateFormat(new Date(data.transactionDate))}</TD>
              <TD>{data.transactionType}</TD>
              <TD>{data.companyName}</TD>
              <TD>{currencyBRLFormat(parseInt(data.amount))}</TD>
            </TR>
          ))}
        </TBody>
      </Table>
      <Pagination
        registerPerPage={numberSizePages}
        totalRegisters={transactionHistory?.total || 0}
        currentPage={transactionHistoryPage}
        handleChangePage={handlePagination}
      />
    </>
  );
};
export default TransactionsHistoryTable;

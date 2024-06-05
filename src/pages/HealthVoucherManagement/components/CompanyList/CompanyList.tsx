/* eslint-disable no-console */
import React, { useMemo, useState } from "react";

import { AiOutlineSearch } from "react-icons/ai";
import CompanyListTable from "../CompanyListTable/CompanyListTable";
import { Content, Header, OutlinedButton } from "./styled";
import { useQuery } from "react-query";
import { apiRecord, apiWallet } from "../../../../services/api";

import { WalletAssociatedCompany } from "../../../../models/fiibo.model";
import { IPaginated } from "../../../../models/paginated.model";
import EmployeesList from "./EmployeesList";
import Loading from "../../../../components/Loading";
import { useGlobal } from "../../../../contexts/UserContext";
import AlertNoDataFound from "../../../../components/AlertNoDataFound";

const CompanyList: React.FC = () => {
  const { company } = useGlobal();

  const [status, setStatus] = useState("T");
  const [search, setSearch] = useState("");
  const [companiesListPage, setCompaniesListPage] = useState(1);
  const [selectedCompany, setSelectedCompany] = useState<null | {
    id: string;
    name: string;
    cnpj: string;
    companyAssociatedId: string;
  }>(null);
  const queryFn = async () => {
    const result = await apiWallet.get<IPaginated<WalletAssociatedCompany>>(
      `/companies/${company!.externalCompanyId}`,
      { params: { activeStatus: status, page: companiesListPage, size: 10 } },
    );
    return result.data;
  };
  const handlePagination = (page: number) => setCompaniesListPage(page);

  const { data: accounts, isFetching } = useQuery({
    queryKey: ["fiibo@companies", status, companiesListPage],
    queryFn,
  });

  const filteredAccounts = useMemo(
    () =>
      accounts?.rows.filter(
        (account) =>
          account?.companyName?.toLocaleLowerCase()?.includes(search) ||
          account?.cnpj?.includes(search),
      ),
    [accounts, search],
  );

  const fetchIssuingCompany = async () => {
    const result = await apiRecord.get<any>(
      `/companies-associated/${company?.externalCompanyId}`,
    );
    return result.data;
  };

  const { data: issuingCompany, isFetching: isFetchingIssuing } = useQuery({
    queryKey: ["fiibo@issuingComany"],
    queryFn: fetchIssuingCompany,
  });

  if (isFetching || isFetchingIssuing) {
    return <Loading />;
  }

  return (
    <>
      {selectedCompany ? (
        <Content>
          <div className="companyHeaderArea">
            <OutlinedButton onClick={() => setSelectedCompany(null)}>
              Voltar
            </OutlinedButton>
            <h1>
              {selectedCompany.name} - {selectedCompany.cnpj}
            </h1>
          </div>
          <EmployeesList
            companyId={issuingCompany.companyAssociated.id}
            companyAssociatedId={selectedCompany.companyAssociatedId}
          />
        </Content>
      ) : (
        <div onClick={(event) => event.stopPropagation()}>
          <Header
            style={{
              marginTop: "10%",
            }}
          >
            <div className="searchArea">
              <label htmlFor="searchTransactionInput">
                <AiOutlineSearch />
              </label>
              <input
                type="text"
                placeholder="Digite o nome da empresa ou CNPJ"
                id="searchTransactionInput"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </Header>
          {accounts && accounts.rows?.length > 0 ? (
            <>
              <CompanyListTable
                accounts={filteredAccounts || []}
                pagination={{
                  registerPerPage: 10,
                  totalRegisters: accounts.count,
                  currentPage: companiesListPage,
                  handleChangePage: handlePagination,
                }}
                setSelectedCompany={setSelectedCompany}
              />
            </>
          ) : (
            <AlertNoDataFound title="Não há empresas para listar" />
          )}
        </div>
      )}
    </>
  );
};

export default CompanyList;

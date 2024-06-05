import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import Loading from "../../../../components/Loading/Loading";
import Pagination from "../../../../components/Pagination";
import { TBody, TD, TH, THead, TR, Table } from "../../../../components/Table";
import { IEmployeesList } from "../../../../models/fiibo.model";
import { IPaginated } from "../../../../models/paginated.model";
import { apiWallet } from "../../../../services/api";
import { SearchInputWrapper } from "./styled";

import { AiOutlineSearch } from "react-icons/ai";
import { useToastStandalone } from "../../../../hooks/useToastStandalone";
import { censoredcpfMask } from "../../../../utils/fieldMask";

interface Props {
  companyId: string;
  companyAssociatedId?: string;
}

const EmployeesList: React.FC<Props> = ({ companyId, companyAssociatedId }) => {
  const [employeesListPage, setEmployeesListPage] = useState(1);
  const [employessListSize, setEmployeesListSize] = useState(10);
  const [searchEmployeesFilter, setSearchEmployeesFilter] = useState<
    string | null
  >(null);

  const queryFn = async () => {
    const result = await apiWallet.get<IPaginated<IEmployeesList>>(
      `/companies/beneficiaries/list/${companyId}/${companyAssociatedId}`,
      { params: { page: employeesListPage, size: employessListSize } },
    );
    return result.data || [];
  };
  const handlePagination = (page: number) => setEmployeesListPage(page);
  const {
    data: employees,
    isFetching: isFetchingEmployees,
    isLoading: isLoadingEmployees,
    refetch: fetchEmployees,
  } = useQuery({
    queryKey: [
      "fiibo@employees",
      employeesListPage,
      companyId,
      companyAssociatedId,
    ],
    queryFn,
  });

  const enableBeneficiary = async (employeeId: string) => {
    const result = await apiWallet.put<IPaginated<IEmployeesList>>(
      `/companies/beneficiaries/${employeeId}/link`,
      { params: { page: employeesListPage, size: 10 } },
    );
    return result.data || [];
  };
  const unableBeneficiary = async (employeeId: string) => {
    const result = await apiWallet.put<IPaginated<IEmployeesList>>(
      `/companies/beneficiaries/${employeeId}/unlink`,
      { params: { page: employeesListPage, size: 10 } },
    );
    return result.data || [];
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleEmployees = (status: boolean, employeeId: string) => {
    if (status) {
      enableBeneficiary(employeeId)
        .catch((error) =>
          useToastStandalone({
            status: "error",
            title: "Erro ao ativar Beneficiário",
            description: error.response?.data?.message,
          }),
        )
        .finally(() => fetchEmployees());
    } else {
      unableBeneficiary(employeeId)
        .catch((error) =>
          useToastStandalone({
            status: "error",
            title: "Erro ao desativar Beneficiário",
            description: error.response?.data?.message,
          }),
        )
        .finally(() => fetchEmployees());
    }
  };

  const filteredList = useMemo(() => {
    if (searchEmployeesFilter) {
      return employees?.rows.filter(
        (employee) =>
          employee.beneficiary?.person?.name
            .toLowerCase()
            .includes(searchEmployeesFilter.toLowerCase()) ||
          employee.beneficiary?.person?.cpf.includes(searchEmployeesFilter),
      );
    } else {
      return employees?.rows;
    }
  }, [searchEmployeesFilter, employees]);

  useEffect(() => {
    setSearchEmployeesFilter(null);
  }, [companyId]);

  if (isFetchingEmployees || isLoadingEmployees) {
    return <Loading />;
  }

  return (
    <>
      {employees?.rows.length === 0 || !employees ? (
        <div style={{ padding: "1rem" }}>Não há dados para listar...</div>
      ) : (
        <>
          <SearchInputWrapper>
            <label htmlFor="searchTransactionInput">
              <AiOutlineSearch />
            </label>
            <input
              type="text"
              placeholder="Buscar titular"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setSearchEmployeesFilter(event.target.value)
              }
            />
          </SearchInputWrapper>
          <Table>
            <THead>
              <TH>ID</TH>
              <TH>TITULAR</TH>
              <TH>CPF</TH>
            </THead>

            <TBody>
              {filteredList?.map((employee) => {
                return (
                  <TR key={employee.id}>
                    <TD>{String(employee.id).padStart(4, "0")}</TD>
                    <TD>{employee.beneficiary?.person?.name}</TD>
                    <TD>
                      {censoredcpfMask(employee.beneficiary?.person?.cpf || "")}
                    </TD>
                  </TR>
                );
              })}
            </TBody>
          </Table>
        </>
      )}

      <Pagination
        registerPerPage={employessListSize}
        totalRegisters={employees?.count || 0}
        currentPage={employeesListPage}
        handleChangePage={() => {
          if (employees?.count) {
            employees?.count > 0 ? handlePagination : () => null;
          }
        }}
      />
    </>
  );
};

export default EmployeesList;

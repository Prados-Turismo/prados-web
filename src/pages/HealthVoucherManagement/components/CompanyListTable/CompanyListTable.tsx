import React, { useState } from "react";
import { TBody, TD, TH, THead, TR, Table } from "../../../../components/Table";

import { Text } from "@chakra-ui/react";
import { FiUsers } from "react-icons/fi";
import ButtonIcon from "../../../../components/ButtonIcon";
import Pagination from "../../../../components/Pagination";
import TooltipSubstring from "../../../../components/TooltipSubstring/TooltipSubstring";
import { WalletAssociatedCompany } from "../../../../models/fiibo.model";
import { cnpjMask, dateFormat, pixelToRem } from "../../../../utils";
import { capitalize } from "../../../../utils/capitalize";
import { ExpandButton } from "../CompanyList/styled";

interface Props {
  accounts: WalletAssociatedCompany[];
  setSelectedCompany: React.Dispatch<
    React.SetStateAction<null | {
      id: string;
      name: string;
      cnpj: string;
      companyAssociatedId: string;
    }>
  >;
  pagination: {
    registerPerPage: number;
    totalRegisters: number;
    currentPage: number;
    handleChangePage: (page: number) => void;
  };
}

const CompanyListTable: React.FC<Props> = ({
  accounts,
  pagination,
  setSelectedCompany,
}) => {
  const [showTooltip, setShowToolTip] = useState<null | number>(null);

  return (
    <>
      <Table>
        <THead>
          <TH>ID</TH>
          <TH>Data de cadastro</TH>
          <TH>Empresa</TH>
          <TH>Conta</TH>
          <TH></TH>
        </THead>

        <TBody>
          {accounts
            ? accounts.map((account) => (
                <TR key={account.id}>
                  <TD>{String(account.companyId).padStart(4, "0")}</TD>
                  <TD>{dateFormat(new Date(account.createdAt))}</TD>
                  <TD flexDir="column">
                    <TooltipSubstring
                      name={capitalize(account.companyName)}
                      length={40}
                    />
                    <Text fontSize={pixelToRem(14)}>
                      {cnpjMask(account.cnpj)}
                    </Text>
                  </TD>
                  <TD
                    style={{
                      marginLeft: 0,
                    }}
                  >
                    {account.accountNumber}
                  </TD>
                  <TD>
                    <ExpandButton
                      color="black"
                      onClick={(event) => {
                        event.stopPropagation();
                        event.preventDefault();
                        setSelectedCompany({
                          id: account.companyId,
                          name: account.companyName,
                          cnpj: account.cnpj,
                          companyAssociatedId: account.companyAssociatedId,
                        });
                      }}
                    >
                      <ButtonIcon
                        style={{
                          marginLeft: 82,
                        }}
                        tooltip="Titulares elegíveis"
                      >
                        <FiUsers size={20} />
                      </ButtonIcon>
                    </ExpandButton>
                  </TD>
                </TR>
              ))
            : null}
        </TBody>
      </Table>
      <Pagination
        registerPerPage={pagination.registerPerPage}
        totalRegisters={pagination.totalRegisters}
        currentPage={pagination.currentPage}
        handleChangePage={pagination.handleChangePage}
      />
    </>
  );
};

export default CompanyListTable;

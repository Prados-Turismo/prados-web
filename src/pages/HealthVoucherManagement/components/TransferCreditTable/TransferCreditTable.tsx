import React, { useRef, useState, useEffect } from "react";
import Pagination from "../../../../components/Pagination";
import {
  TBody,
  TD,
  TH,
  THead,
  TR,
  Table,
  IconsGroup,
} from "../../../../components/Table";

import Loading from "../../../../components/Loading/Loading";
import { dateFormat } from "../../../../utils";
import { shortTimeFormat } from "../../../../utils/fieldFormat";
import { ModalRecords } from "../ModalRecords/ModalRecords";
import { ModalHandles } from "../ModalRequestBenefitCredit/ModalRequestBenefitCredit";
import { IPaginated } from "../../../../models/paginated.model";
import { ICompanyImport } from "../../../../models/companyImport.model";
import { MdOutlineDownload } from "react-icons/md";
import { apiWallet } from "../../../../services/api";
import { useToastStandalone } from "../../../../hooks/useToastStandalone";
import { AiOutlineSearch } from "react-icons/ai";
import AlertNoDataFound from "../../../../components/AlertNoDataFound";

interface Props {
  variant?: "transferCredit" | "transferCompany" | "importEmployee";
  data?: IPaginated<ICompanyImport>;
  handlePagination: (page: number) => void;
  isFetching?: boolean;
  numberSizePages: number;
  setTransferCreditPage: React.Dispatch<React.SetStateAction<number>>;
  transferCreditPage?: number;
  refresh?: any;

  setImportCompanyPage?:
    | React.Dispatch<React.SetStateAction<number>>
    | undefined;
  importCompanyPage?: number;
}

const TransferCreditTable: React.FC<Props> = ({
  variant = "transferCredit",
  data,
  isFetching,
  numberSizePages,
  setTransferCreditPage,
  transferCreditPage,
  refresh,
  setImportCompanyPage,
  importCompanyPage,
}) => {
  const modalRef = useRef<ModalHandles>(null);
  const handleModal = () => modalRef.current?.close();
  const [currentRecords, setCurrentRecords] = useState<string[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {}, [refresh]);

  const handlePaginationsCredit = (page: number) => {
    setTransferCreditPage(page);
  };

  const handlePaginationsCompany = (page: number) => {
    if (setImportCompanyPage) {
      setImportCompanyPage(page);
    }
  };

  if (isFetching) {
    return <Loading />;
  }

  if (!data?.count || data?.count === 0) {
    return <AlertNoDataFound title="Não há dados para serem listados" />;
  }

  const generateCSV = async (importId: string) => {
    try {
      await apiWallet
        .get(`/companies/beneficiaries/${importId}/record`)
        .then((response) => {
          const csvBlob = new Blob([response.data], { type: "text/csv" });
          const downloadUrl = URL.createObjectURL(csvBlob);
          const link = document.createElement("a");
          link.href = downloadUrl;
          link.download = "relatório_sobre_falha.csv";
          link.click();

          useToastStandalone({
            title: "Relatório baixado com sucesso!",
            status: "success",
          });
        });
    } catch (error: any) {
      useToastStandalone({
        title: "Erro ao fazer o download",
        description: error?.response?.data?.message,
        status: "error",
      });
    }
  };

  return (
    <>
      <Table>
        <THead>
          <TH>Usuário</TH>
          <TH style={{ flex: "0 0 21%" }}>Data</TH>
          <TH style={{ flex: "0 0 35%" }}>Status</TH>
          <TH style={{ flex: "0 0 10%" }}>Observação</TH>
        </THead>

        <TBody>
          {data?.rows.map((importCompany) => (
            <TR key={importCompany?.id}>
              <TD>{importCompany.userName || "-"}</TD>
              <TD style={{ flex: "0 0 21%" }}>
                {dateFormat(new Date(importCompany.createdAt))} às{" "}
                {shortTimeFormat(new Date(importCompany.createdAt))}
              </TD>
              <TD style={{ flex: "0 0 35%" }}>
                {importCompany?.importStatus?.statusName}
              </TD>

              {variant === "transferCredit" ? (
                <TD style={{ flex: "0 0 10%", textAlign: "center" }}>
                  {importCompany.importRecords.length !== 0 && (
                    <button
                      disabled={importCompany.importRecords.length === 0}
                      onClick={() => {
                        modalRef.current?.open();
                        setCurrentRecords(
                          importCompany.importRecords.map(
                            (importRecord) => importRecord.record,
                          ),
                        );
                      }}
                    >
                      <IconsGroup>
                        <AiOutlineSearch className="SVG" />
                      </IconsGroup>
                    </button>
                  )}
                </TD>
              ) : (
                <TD style={{ flex: "0 0 10%", textAlign: "center" }}>
                  <button onClick={() => generateCSV(importCompany?.id)}>
                    <MdOutlineDownload size={23} />
                  </button>
                </TD>
              )}
            </TR>
          ))}
        </TBody>
      </Table>

      <ModalRecords
        ref={modalRef}
        handleModal={handleModal}
        records={currentRecords}
      />
      {variant === "transferCredit" ? (
        <Pagination
          registerPerPage={numberSizePages}
          totalRegisters={data.count || 0}
          currentPage={transferCreditPage}
          handleChangePage={handlePaginationsCredit}
        />
      ) : (
        <Pagination
          registerPerPage={numberSizePages}
          totalRegisters={data.count || 0}
          currentPage={importCompanyPage}
          handleChangePage={handlePaginationsCompany}
        />
      )}
    </>
  );
};
export default TransferCreditTable;

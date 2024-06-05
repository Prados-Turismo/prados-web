import React, { useMemo, useRef } from "react";
import { BiArrowToBottom, BiArrowToTop, BiRefresh } from "react-icons/bi";
import { useHealthVoucher } from "../../../../hooks/useHealthVoucher";
import DateRangeFilter from "../DateRangeFilter/DateRangeFilter";
import { ModalHandles, ModalImport } from "../ModalImport/ModalImport";
import TransferCreditTable from "../TransferCreditTable/TransferCreditTable";
import { Button, Content, Header, OutlinedButton } from "./styled";

interface Props {
  variant?: "company" | "employee";
}

const ImportEntitiy: React.FC<Props> = ({ variant }) => {
  const modalRef = useRef<ModalHandles>(null);

  const handleCloseModal = () => {
    modalRef.current?.close();
  };

  const {
    fetchCompanyImports,
    handleDownloadTemplateCompanyImports,
    handleDownloadTemplateEmployeeImports,
    fetchBeneficiariesHistory,
    setImportCompanyFilter,
    setImportBeneficiariesFilter,
    companyImportsHistory,
    beneficiariesHistory,
    setImportBeneficiariesPage,
    importBeneficiariesPage,
    numberRequestSizePage,
    isFetchingCompanyImports,
    importCompanyPage,
    isFetchingBeneficiariesHistory,
    setImportCompanyPage,
  } = useHealthVoucher();

  const selectedListVariable = useMemo(() => {
    return variant === "company" ? companyImportsHistory : beneficiariesHistory;
  }, [companyImportsHistory, variant, beneficiariesHistory]);

  const refresh = () => {
    fetchBeneficiariesHistory();
    fetchCompanyImports();
  };

  const handlePagination = (page: number) => {
    if (variant === "company") {
      setImportCompanyPage(page);
    } else {
      setImportBeneficiariesPage(page);
    }
  };

  return (
    <Content>
      <Header>
        <DateRangeFilter
          setFilterState={
            variant === "company"
              ? setImportCompanyFilter
              : setImportBeneficiariesFilter
          }
        />

        <div className="actionsArea">
          <Button onClick={() => modalRef.current?.open()}>
            <BiArrowToTop size={16} />{" "}
            {variant === "company" ? "Importar empresas" : "Importar pessoas"}
          </Button>
          <OutlinedButton
            onClick={() =>
              variant === "company"
                ? handleDownloadTemplateCompanyImports()
                : handleDownloadTemplateEmployeeImports()
            }
          >
            <BiArrowToBottom size={16} /> Baixar template
          </OutlinedButton>
          <button onClick={() => refresh()}>
            <OutlinedButton>
              <BiRefresh size={16} />
            </OutlinedButton>
          </button>
        </div>
      </Header>

      <TransferCreditTable
        refresh={refresh}
        variant={variant === "company" ? "transferCredit" : "importEmployee"}
        data={selectedListVariable}
        setTransferCreditPage={setImportCompanyPage}
        transferCreditPage={importCompanyPage}
        handlePagination={handlePagination}
        setImportCompanyPage={setImportBeneficiariesPage}
        importCompanyPage={importBeneficiariesPage}
        numberSizePages={numberRequestSizePage}
        isFetching={
          variant === "company"
            ? isFetchingCompanyImports
            : isFetchingBeneficiariesHistory
        }
      />

      <ModalImport
        ref={modalRef}
        variant={variant}
        handleModal={handleCloseModal}
        onSuccess={() => {
          handleCloseModal();
          if (variant === "employee") {
            fetchBeneficiariesHistory();
          } else {
            fetchCompanyImports();
          }
        }}
      />
    </Content>
  );
};

export default ImportEntitiy;

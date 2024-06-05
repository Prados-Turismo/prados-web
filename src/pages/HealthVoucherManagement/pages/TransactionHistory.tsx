import { useRef, useState } from "react"
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai"
import { BiArrowToBottom, BiArrowToTop, BiRefresh } from "react-icons/bi"
import {
  ActionsContainer,
  Button,
  Content,
  OutlinedButton,
  TransactionalHistoryTop
} from "./styled"

import { useHealthVoucher } from "../../../hooks/useHealthVoucher"
import { currencyBRLFormat } from "../../../utils/currencyBRLFormat"
import InsertCreditTable from "../components/InsertCreditTable/InsertCreditTable"
import {
  ModalImport,
  ModalHandles as ModalImportHandles
} from "../components/ModalImport/ModalImport"
import {
  ModalHandles,
  ModalRequestBenefitCredit
} from "../components/ModalRequestBenefitCredit/ModalRequestBenefitCredit"
import TransactionsHistoryTable from "../components/TransactionsHistoryTable/TransactionsHistoryTable"
import TransferCreditTable from "../components/TransferCreditTable/TransferCreditTable"
import HideShow from "../../../components/HideShow"
import DateRangeFilter from "../components/DateRangeFilter/DateRangeFilter"
import { SearchInputWrapper } from "../components/CompanyList/styled"
interface Props {
  variant?: "include" | "transfer" | "history"
}

const TransactionHistory = ({ variant = "history" }: Props) => {
  const [search, setSearch] = useState("")
  const modalRef = useRef<ModalHandles>(null)
  const modalImportTranferenceRef = useRef<ModalImportHandles>(null)
  const {
    companyBalance,
    isFetchingCompanyBalance,
    getBalance,
    fetchInsertCreditHistory,
    fetchTransferCreditHistory,
    handleDownloadTemplateBalanceImport,
    handleDownloadTemplateTransferBalance,
    transactionHistory,
    isFetchingTransactionHistory,
    transactionHistoryPage,
    setTransactionHistoryPage,
    setTransferCreditFilter,
    transferCreditHistory,
    setTransferCreditPage,
    transferCreditPage,
    isFetchingTransferCreditHisotry,
    numberRequestSizePage
  } = useHealthVoucher()

  const handlePagination = (page: number) => {
    setTransferCreditPage(page)
  }

  const refresh = () => {
    fetchInsertCreditHistory()
    fetchTransferCreditHistory()
    getBalance()
  }

  return (
    <>
      <Content>
        <TransactionalHistoryTop
          flexDirection={{ sm: "column", lg: "row" }}
          gap={{ sm: "1rem" }}
          style={{
            justifyContent: `${
              variant === "history" || variant === "transfer"
                ? "space-between"
                : "flex-end"
            }`
          }}
        >
          {variant === "transfer" && (
            <DateRangeFilter setFilterState={setTransferCreditFilter} />
          )}
          {variant === "history" && (
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
          )}

          <ActionsContainer>
            <div className="valueArea">
              <HideShow
                beforeText="Saldo:"
                hideContent={String(
                  currencyBRLFormat(companyBalance?.balance || 0)
                )}
              />
              {variant === "include" && (
                <div className="valueArea">
                  <Button onClick={() => modalRef.current?.open()}>
                    <AiOutlinePlus />
                    <span>Inclusão de saldo</span>
                  </Button>
                  <button onClick={() => refresh()}>
                    <OutlinedButton>
                      <BiRefresh size={16} />
                    </OutlinedButton>
                  </button>
                </div>
              )}
            </div>
            {variant === "transfer" && (
              <div className="valueArea">
                <Button
                  onClick={() => modalImportTranferenceRef.current?.open()}
                >
                  <BiArrowToTop size={16} /> Importar transferência
                </Button>
                <OutlinedButton
                  onClick={() => {
                    variant === "transfer"
                      ? handleDownloadTemplateTransferBalance()
                      : handleDownloadTemplateBalanceImport()
                  }}
                >
                  <BiArrowToBottom size={16} /> Baixar template
                </OutlinedButton>
                <button onClick={() => refresh()}>
                  <OutlinedButton>
                    <BiRefresh size={16} />
                  </OutlinedButton>
                </button>
              </div>
            )}
          </ActionsContainer>
        </TransactionalHistoryTop>

        {variant === "history" ? (
          <TransactionsHistoryTable
            transactionHistory={transactionHistory}
            search={search}
            isFetchingTransactionHistory={isFetchingTransactionHistory}
            transactionHistoryPage={transactionHistoryPage}
            setTransactionHistoryPage={setTransactionHistoryPage}
            numberSizePages={numberRequestSizePage}
          />
        ) : variant === "transfer" ? (
          <TransferCreditTable
            refresh={refresh}
            data={transferCreditHistory}
            isFetching={isFetchingTransferCreditHisotry}
            setTransferCreditPage={setTransferCreditPage}
            transferCreditPage={transferCreditPage}
            handlePagination={handlePagination}
            numberSizePages={numberRequestSizePage}
          />
        ) : (
          <InsertCreditTable refresh={refresh} />
        )}
        <ModalRequestBenefitCredit
          ref={modalRef}
          onSuccess={() => {
            fetchInsertCreditHistory()
            if (modalRef.current) {
              modalRef.current.close()
            }
          }}
          hanldeModal={() => {
            if (modalRef.current) {
              modalRef.current.close()
            }
          }}
        />
        <ModalImport
          onSuccess={() => {
            if (modalImportTranferenceRef.current) {
              modalImportTranferenceRef.current.close()
            }
            fetchTransferCreditHistory()
            getBalance()
            isFetchingCompanyBalance
            companyBalance
          }}
          ref={modalImportTranferenceRef}
          handleModal={() => {
            if (modalImportTranferenceRef.current) {
              modalImportTranferenceRef.current.close()
            }
          }}
          variant="transference"
        />
      </Content>
    </>
  )
}
export default TransactionHistory

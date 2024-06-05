import { useState } from "react"
import { useQuery } from "react-query"

import { useGlobal } from "../contexts/UserContext"
import { apiWallet } from "../services/api"
import { dateToIsoFormatAmerican } from "../utils"

import { IBalance } from "../models/balance.model"
import { ICompanyImport } from "../models/companyImport.model"
import { ICreditRequestRow } from "../models/credit-request.model"
import { ITransactionHistoryRow } from "../models/history.model"
import { IPaginated } from "../models/paginated.model"
import { RequestData } from "../models/linked-companies.model"
import { IBalancePerCompany } from "../models/balance-per-company"

export function useHealthVoucher() {
  const { company } = useGlobal()

  const subtractOneYear = (date: string) => {
    const americanFormat = dateToIsoFormatAmerican(date)
    const [year, month, day] = americanFormat.split("-")
    return `${day}/${month}/${parseInt(year) - 1}`
  }

  const [companiesHistoryFilters, setCompaniesHistoryFilters] = useState<{
    startDate?: string
    endDate?: string
    companyName?: string | null
  }>()
  const [transactionHistoryPage, setTransactionHistoryPage] = useState(1)
  const [creditRequestPage, setCreditRequestPage] = useState(1)
  const [numberRequestSizePage, setNumberRequestSizePage] = useState(10)
  const [transferCreditPage, setTransferCreditPage] = useState(1)
  const [importCompanyPage, setImportCompanyPage] = useState(1)
  const [importBeneficiariesPage, setImportBeneficiariesPage] = useState(1)
  const [reportPage, setReportPage] = useState(1)
  const [importCompanyFilter, setImportCompanyFilter] = useState<{
    startDate?: string
    endDate?: string
  }>()
  const [importBeneficiariesFilter, setImportBeneficiariesFilter] = useState<{
    startDate?: string
    endDate?: string
  }>()
  const [transferCreditFilter, setTransferCreditFilter] = useState<{
    startDate?: string
    endDate?: string
  }>()

  const getBalance = () => {
    return apiWallet
      .get<IBalance>(`companies/${company!.externalCompanyId}/balance`)
      .then(({ data }) => data)
  }

  const getTransactionHistory = async () => {
    const { data } = await apiWallet.get<IPaginated<ITransactionHistoryRow>>(
      `companies/${company!.externalCompanyId}/transactions-history`,
      {
        params: {
          page: transactionHistoryPage,
          size: numberRequestSizePage,
          ...companiesHistoryFilters
        }
      }
    )

    return data
  }

  const getCreditRequestHistory = () => {
    return apiWallet
      .get<IPaginated<ICreditRequestRow>>(
        `companies/${company!.externalCompanyId}/credit-request`,
        {
          params: { page: creditRequestPage, size: numberRequestSizePage }
        }
      )
      .then(({ data }) => {
        return data
      })
  }

  const getTransferCreditHistory = () => {
    return apiWallet
      .get<IPaginated<ICompanyImport>>(
        `companies/imports/${company!.externalCompanyId}/transfer-credit`,
        {
          params: {
            page: transferCreditPage,
            size: numberRequestSizePage,
            ...transferCreditFilter
          }
        }
      )
      .then(({ data }) => {
        return data
      })
  }

  const getImportBeneficiariesHistory = () => {
    return apiWallet
      .get<IPaginated<ICompanyImport>>(
        `/companies/imports/${company!.externalCompanyId}/beneficiaries`,
        {
          params: {
            page: importBeneficiariesPage,
            size: numberRequestSizePage,
            ...importBeneficiariesFilter
          }
        }
      )
      .then(({ data }) => {
        return data
      })
  }

  const getCompanyImports = () => {
    return apiWallet
      .get<IPaginated<ICompanyImport>>(`/companies/imports/${company!.externalCompanyId}`, {
        params: {
          page: importCompanyPage,
          size: numberRequestSizePage,
          ...importCompanyFilter
        }
      })
      .then(({ data }) => {
        return data
      })
  }

  const getLinkedCompanies = () => {
    return apiWallet
      .get<RequestData[]>(`/companies/${company!.externalCompanyId}/account/linked`)
      .then(({ data }) => {
        return data
      })
  }

  const getBalanceByCompanies = () => {
    return apiWallet
      .get<IPaginated<IBalancePerCompany>>(
        `/companies/reports/${company!.externalCompanyId}/balance-per-company`,
        { params: { page: reportPage, size: numberRequestSizePage } }
      )
      .then((res) => res.data)
  }

  const { data: companyBalance, isFetching: isFetchingCompanyBalance } =
    useQuery({
      queryKey: "fiibo:balance",
      queryFn: getBalance,
      refetchOnWindowFocus: true
    })

  const { data: transactionHistory, isFetching: isFetchingTransactionHistory } =
    useQuery({
      queryKey: [
        "fiibo-wallet:transaction-history",
        transactionHistoryPage,
        companiesHistoryFilters
      ],
      queryFn: getTransactionHistory
    })

  const {
    data: creditRequestHistory,
    isFetching: isFetchingCreditRequestHisotry,
    refetch: fetchInsertCreditHistory
  } = useQuery({
    queryFn: getCreditRequestHistory,
    queryKey: ["fiibo:credit-request-history", creditRequestPage],
    refetchOnWindowFocus: true
  })

  const {
    data: transferCreditHistory,
    isFetching: isFetchingTransferCreditHisotry,
    refetch: fetchTransferCreditHistory
  } = useQuery({
    queryKey: [
      "fiibo:transfer-credit-history",
      transferCreditPage,
      transferCreditFilter
    ],
    queryFn: getTransferCreditHistory,
    refetchOnWindowFocus: true
  })

  const {
    data: companyImportsHistory,
    isFetching: isFetchingCompanyImports,
    refetch: fetchCompanyImports
  } = useQuery({
    queryFn: getCompanyImports,
    queryKey: ["import:fiibo", importCompanyPage, importCompanyFilter],
    refetchOnWindowFocus: true
  })

  const {
    data: linkedCompanies,
    isFetching: isFetchingLinkedCompanies,
    refetch: fetchLinkedCompanies
  } = useQuery({
    queryFn: getLinkedCompanies,
    queryKey: "fiibo-companies-linked"
  })

  const {
    data: beneficiariesHistory,
    isFetching: isFetchingBeneficiariesHistory,
    refetch: fetchBeneficiariesHistory
  } = useQuery({
    queryFn: getImportBeneficiariesHistory,
    queryKey: [
      "fiibo-beneficiaries-history",
      importBeneficiariesPage,
      importBeneficiariesFilter
    ]
  })

  const {
    data: balancePerCompanyData,
    isFetching: isFetchingBalancePerCompanyData
  } = useQuery({
    queryFn: getBalanceByCompanies,
    queryKey: ["fiibo:balance-per-company", company!.externalCompanyId, reportPage],
    refetchOnWindowFocus: true
  })

  const handleDownloadTemplateCompanyImports = () => {
    window.open(
      "https://fiibo.digital/static/media/Import%2BEmpresas+.csv",
      "_blank"
    )
  }

  const handleDownloadTemplateBalanceImport = () => {
    window.open(
      "https://fiibo.digital/static/media/Import+Incl+Saldo.csv",
      "_blank"
    )
  }

  const handleDownloadTemplateTransferBalance = () => {
    window.open(
      "https://fiibo.digital/static/media/Import+Trasf+Saldo.csv",
      "_blank"
    )
  }

  const handleDownloadTemplateEmployeeImports = () => {
    window.open(
      "https://fiibo.digital/static/media/Import+Colaboradores.csv",
      "_blank"
    )
  }

  return {
    companyBalance,
    isFetchingCompanyBalance,
    transactionHistory,
    getCreditRequestHistory,
    isFetchingTransactionHistory,
    creditRequestHistory,
    isFetchingCreditRequestHisotry,
    transferCreditHistory,
    isFetchingTransferCreditHisotry,
    transactionHistoryPage,
    setTransactionHistoryPage,
    transferCreditPage,
    setTransferCreditPage,
    creditRequestPage,
    setCreditRequestPage,
    setNumberRequestSizePage,
    numberRequestSizePage,
    fetchInsertCreditHistory,
    fetchTransferCreditHistory,
    setImportCompanyPage,
    importCompanyPage,
    companyImportsHistory,
    fetchCompanyImports,
    isFetchingCompanyImports,
    handleDownloadTemplateCompanyImports,
    handleDownloadTemplateBalanceImport,
    handleDownloadTemplateEmployeeImports,
    linkedCompanies,
    isFetchingLinkedCompanies,
    fetchLinkedCompanies,
    subtractOneYear,
    getBalance,
    companiesHistoryFilters,
    setCompaniesHistoryFilters,
    setImportBeneficiariesPage,
    importBeneficiariesPage,
    beneficiariesHistory,
    isFetchingBeneficiariesHistory,
    fetchBeneficiariesHistory,
    balancePerCompanyData,
    isFetchingBalancePerCompanyData,
    handleDownloadTemplateTransferBalance,
    setImportCompanyFilter,
    setImportBeneficiariesFilter,
    setTransferCreditFilter,
    reportPage,
    setReportPage
  }
}

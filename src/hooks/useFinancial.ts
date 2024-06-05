import { useQuery } from "react-query";

// Api
import { apiInvoicing, apiReporting, apiUpload, apiWallet } from "../services/api";

// Types
import {
  IInvoicesArgs,
  IInvoicesResponse,
  IMovimentationsArgs,
  IMovimentationsResponse,
  IUseFinancialResponse,
  ICompanyContemplatedResponse,
  IWalletResponse,
} from "../models/financial.model";

// Keys
import { keys } from "../services/query";
import { useToastStandalone } from "./useToastStandalone";
import { useCompanyId } from "./useCompanyId";
import { Warning } from "../errors";
import { AxiosError } from "axios";

const getInvoices = ({
  page,
  size,
  companyId,
}: IInvoicesArgs): IInvoicesResponse => {
  const { data, isLoading } = useQuery(
    [keys.financial, "invoices", companyId, page],
    async () => {

      try {
        const { data } = await apiInvoicing.get(
          `/batch-invoice?companyId=${companyId}&page=${page}&size=${size}&status=["envoy","paid"]&orderBy=expiration`,
        );

        return data;

      } catch (error) {

        let message = "Ocorreu um erro inesperado ao buscar faturas.";

        if (error instanceof AxiosError) {
          message = error.response?.data.message || "Servidor indisponível";
        }

        if (error instanceof Error) {
          message = error.message;
        }

        useToastStandalone({
          title: message,
          status: "error",
        });
      }
    },
  );

  return {
    isLoading,
    count: data?.count || 0,
    rows: data?.rows || [],
  };
};

const getMovimentations = ({
  offset,
  pageSize,
  startDate,
  endDate,
}: IMovimentationsArgs): IMovimentationsResponse => {
  const companyId = useCompanyId();
  const { data, isLoading } = useQuery(
    [keys.financial, "movimentations", offset, startDate, endDate, companyId],
    async () => {
      try {
        const { data } = await apiWallet.get(
          `finance/financial-operation/${companyId}`,
          {
            params: {
              page: offset,
              size: pageSize,
              startDate,
              endDate,
            },
          },
        );

        return data;
      } catch (_error: any) {
        throw new Warning(
          "Erro ao buscar movimentações",
          _error?.response?.status,
        );
      }
    },
  );

  return {
    isLoading,
    count: data?.count || 0,
    movimentations: data?.rows || [],
    accountExists: data?.accountExists,
  };
};

const getInvoiceReportDetail = async (batchId: string, setIsLoading: any) => {
  setIsLoading(true);

  await apiReporting
    .get(`/invoice-report/download/${batchId}`)
    // await apiInvoicing
    //   .get(`/batch-invoice/${batchId}/report`)
    .then(({ data }) => {
      // const csvContent = `data:text/csv;charset=utf-8,${data}`;
      // const encodedURI = encodeURI(csvContent);
      window.open(data?.url, "_self");
    })
    .catch((error) => {
      let message = "Ocorreu um erro inesperado ao consultar o detalhamento";

      if (error instanceof AxiosError)
        message = error.response?.data?.message || "Servidor indisponível";

      useToastStandalone({
        title: message,
        status: "error",
      });
    })
    .finally(() => {
      setIsLoading(false);
    });
};

const getInvoiceTicket = async (batchId: string, setIsLoading: any) => {
  setIsLoading(true);
  await apiInvoicing
    .get(`/batch-invoice/${batchId}/ticket`)
    .then(({ data }) => {
      window.open(data.url, "_blank");
    })
    .catch((error) => {
      let message = "Ocorreu um erro inesperado ao consultar o recibo";

      if (error instanceof AxiosError)
        message = error.response?.data.message || "Servidor indisponível";

      useToastStandalone({
        title: message,
        status: "error",
      });
    })
    .finally(() => {
      setIsLoading(false);
    });
};

const getInvoiceSlip = async (batchId: string, setIsLoading: any) => {
  setIsLoading(true);
  await apiInvoicing
    .get(`/batch-invoice/${batchId}/boleto`)
    .then(({ data }) => {
      window.open(data.url, "_blank");
    })
    .catch((error) => {
      let message = "Ocorreu um erro inesperado ao consultar o boleto";

      if (error instanceof AxiosError)
        message = error.response?.data.message || "Servidor indisponível";

      useToastStandalone({
        title: message,
        status: "error",
      });
    })
    .finally(() => {
      setIsLoading(false);
    });
};

const getInvoicePaymentNote = async (
  receiptToken: string,
  setIsLoading: any,
) => {
  setIsLoading(true);
  await apiUpload
    .get(`/document/${receiptToken}`)
    .then(({ data }) => {
      window.open(data.url, "_blank");
    })
    .catch((error) => {
      let message = "Ocorreu um erro inesperado ao consultar a nota";

      if (error instanceof AxiosError)
        message = error.response?.data.message || "Servidor indisponível";

      useToastStandalone({
        title: message,
        status: "error",
      });
    })
    .finally(() => {
      setIsLoading(false);
    });
};

const getCompanyContemplated = (): ICompanyContemplatedResponse => {
  const { data } = useQuery([keys.wallet], async () => {
    const { data } = await apiWallet.get("financeiro/empresa");

    return data;
  });

  return {
    id: data?.id || 0,
    cnpj: data?.cnpj || "",
    razaoSocial: data?.razaoSocial || "",
    flContemplado: data?.flContemplado || false,
  };
};

const getWallet = (companyId: string): IWalletResponse => {
  const { data, isLoading } = useQuery(
    [keys.wallet, "balance", companyId],
    async () => {
      const response = await apiWallet
        .get(`/account/company/${companyId}`)
        .catch(() => null);
      const data = response?.data;
      return data;
    },
  );

  return {
    isLoading,
    balance: data?.balance || 0,
  };
};

export default function useFinancial(): IUseFinancialResponse {
  return {
    getInvoices,
    getMovimentations,
    getInvoiceReportDetail,
    getInvoiceTicket,
    getInvoiceSlip,
    getInvoicePaymentNote,
    getCompanyContemplated,
    getWallet,
  };
}

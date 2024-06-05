import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { UseFormGetValues } from "react-hook-form";

import { apiWallet } from "../services/api";
import { useGlobal } from "../contexts/UserContext";
import { useToastStandalone } from "./useToastStandalone";

import { RequestData } from "../models/linked-companies.model";

export function useModalBenefitCredit() {
  const { company } = useGlobal();

  const removeCurrencyMask = (value: any) => {
    const formattedValue = String(value).replace(",", ".");
    return Number(formattedValue);
  };

  const formattCurrencyMask = (value: any) => {
    return String(value).replace(".", ",");
  };

  const initialInputsData = useMemo(
    () => ({ tax: null, total: null, amount: null }),
    [],
  );

  const [inputsData, setInputsData] = useState<{
    tax: number | string | null;
    amount: number | string | null;
    total: number | string | null;
  }>(initialInputsData);

  const [isSending, setIsSending] = useState(false);

  const getLinkedCompanies = () => {
    return apiWallet
      .get<RequestData[]>(
        `/companies/${company!.externalCompanyId}/account/linked`,
      )
      .then(({ data }) => {
        return data;
      });
  };

  const handleFileInsert = (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    apiWallet
      .post(
        `balance/${company!.externalCompanyId}/calculate-fare/file`,
        formData,
      )
      .then((result) =>
        setInputsData({
          amount: formattCurrencyMask(result.data.amount.toFixed(2)),
          tax: formattCurrencyMask(result.data.calculatedFare.toFixed(2)),
          total: formattCurrencyMask(result.data.total.toFixed(2)),
        }),
      )
      .catch((error) =>
        useToastStandalone({
          status: "error",
          title: "Erro ao calcular taxa",
          description: error.message.join(" "),
        }),
      );
  };

  const {
    data: linkedCompanies,
    isFetching: isFetchingLinkedCompanies,
    refetch: fetchLinkedCompanies,
  } = useQuery({
    queryFn: getLinkedCompanies,
    queryKey: "fiibo-companies-linked",
  });

  const handleCreditInputBlur = () => {
    apiWallet
      .get<{
        amount: number;
        calculatedFare: number;
        fare: number;
        total: number;
      }>(`balance/${company!.externalCompanyId}/calculate-fare`, {
        params: {
          amount: removeCurrencyMask(inputsData.amount),
        },
      })
      .then((result) =>
        setInputsData({
          amount: formattCurrencyMask(result.data.amount.toFixed(2)),
          tax: formattCurrencyMask(result.data.calculatedFare.toFixed(2)),
          total: formattCurrencyMask(result.data.total.toFixed(2)),
        }),
      );
  };

  const handleAddCreditIntoBalance = (onSuccess: () => void) => {
    setIsSending(true);

    try {
      apiWallet
        .post(`balance/${company!.externalCompanyId}/insert-credit`, {
          amount: Number(String(inputsData.amount).replace(",", ".")),
        })
        .then(() => {
          onSuccess();
          useToastStandalone({
            status: "success",
            title: "Sucesso",
            description: "Crédito solicitado com sucesso",
          });
        })
        .catch(() =>
          useToastStandalone({
            status: "error",
            title: "Erro ao inserir Crédito",
            description: "",
          }),
        )
        .finally(() => setIsSending(false));
    } catch (error) {
      useToastStandalone({
        status: "error",
        title: "Erro ao inserir Crédito",
        description: "",
      });
    }
  };

  const handleAddCreditForLinkedCompanies = (
    values: { companies: { value: "string"; companyId: string }[] },
    onSuccess: () => void,
  ) => {
    setIsSending(true);

    apiWallet
      .post(
        `balance/${
          company!.externalCompanyId
        }/insert-credit/credit-for-companies`,
        values,
      )
      .then(() => {
        onSuccess();
        useToastStandalone({
          status: "success",
          title: "Sucesso",
          description: "Crédito solicitado com sucesso",
        });
      })
      .catch((error) =>
        useToastStandalone({
          status: "error",
          title: "Erro ao inserir Crédito",
          description: error.message.join(" "),
        }),
      )
      .finally(() => setIsSending(false));
  };

  const handleAddCreditForLinkedCompaniesByFile = (
    filesList: File[],
    onSuccess: () => void,
  ) => {
    setIsSending(true);
    const formData = new FormData();
    Array.from(filesList).map((file) => formData.append("file", file));
    apiWallet
      .post(
        `balance/${company!.externalCompanyId}/insert-credit/file`,
        formData,
      )
      .then(() => {
        onSuccess();
        useToastStandalone({
          status: "success",
          title: "Sucesso",
          description: "Crédito solicitado com sucesso",
        });
      })
      .catch((error) =>
        useToastStandalone({
          status: "error",
          title: "Erro ao inserir Crédito",
          description: error.response?.data?.message,
        }),
      )
      .finally(() => setIsSending(false));
  };

  const handleCalculateFare = (getValues: UseFormGetValues<any>) => {
    const values = getValues();

    const parsedValues = {
      companies: values.companies.map(
        (value: { value: string; companyId: string }) => {
          return {
            value: removeCurrencyMask(value.value),
            companyId: value.companyId,
          };
        },
      ),
    };

    apiWallet
      .post(
        `balance/${
          company!.externalCompanyId
        }/calculate-fare/credit-for-companies`,
        parsedValues,
      )
      .then(({ data }) =>
        setInputsData({
          amount: formattCurrencyMask(data.amount),
          tax: formattCurrencyMask(data.calculatedFare),
          total: formattCurrencyMask(data.total),
        }),
      );
  };

  return {
    inputsData,
    setInputsData,
    linkedCompanies,
    isFetchingLinkedCompanies,
    fetchLinkedCompanies,
    handleFileInsert,
    handleCreditInputBlur,
    handleAddCreditIntoBalance,
    handleAddCreditForLinkedCompanies,
    handleAddCreditForLinkedCompaniesByFile,
    handleCalculateFare,
    isSending,
    initialInputsData,
    removeCurrencyMask,
  };
}

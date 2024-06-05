import { useState } from "react";
import { useQuery } from "react-query";

import { useToastStandalone } from "./useToastStandalone";
import { apiReporting } from "../services/api";
import { keys } from "../services/query";

// Types
import {
  IReportArgs,
  IReportResponse,
  IReportFileArgs,
  IReportFileResponse,
} from "../models/report.model";

import { ISelect } from "../models/generics.model";
import { Warning } from "../errors";

const getReport = ({
  currentPage,
  pageSize,
  tab,
  company,
}: IReportArgs): IReportResponse => {
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<ISelect | null>(null);
  const [sector, setSector] = useState<ISelect | null>(null);
  const [occupation, setOccupation] = useState<ISelect | null>(null);
  const [supplier, setSupplier] = useState<ISelect | null>(null);
  const [product, setProduct] = useState<ISelect | null>(null);
  const [initialDate, setInitialDate] = useState<string>("");
  const [finishDate, setFinishDate] = useState<string>("");
  const [initialCancelDate, setInitialCancelDate] = useState<string>("");
  const [finishCancelDate, setFinishCancelDate] = useState<string>("");

  const statusParam = status ? `&status=${status.value}` : "";
  const searchParam = search?.length ? `&search=${search}` : "";
  const initialDateParam =
    parseInt(initialDate?.split("-")[0]) > 1000
      ? `&effectiveStartDateFrom=${initialDate}`
      : "";
  const finishDateParam =
    parseInt(finishDate?.split("-")[0]) > 1000
      ? `&effectiveStartDateTo=${finishDate}`
      : "";
  const initialCancelDateParam =
    parseInt(initialCancelDate?.split("-")[0]) > 1000
      ? `&effectiveFinalyDateFrom=${initialCancelDate}`
      : "";
  const finishCancelDateParam =
    parseInt(finishCancelDate?.split("-")[0]) > 1000
      ? `&effectiveFinalyDateTo=${finishCancelDate}`
      : "";
  const sectorParam = sector ? `&sectorId=${sector.value}` : "";
  const occupationParam = occupation ? `&positionId=${occupation.value}` : "";
  const supplierParam = supplier ? `&providerName=${supplier.label}` : "";
  const productParam = product ? `&productCommercialName=${product.label}` : "";

  const { data, isLoading } = useQuery(
    [
      keys.report,
      tab,
      currentPage,
      company,
      statusParam,
      searchParam,
      sectorParam,
      supplierParam,
      productParam,
      occupationParam,
      initialDateParam,
      finishDateParam,
      initialCancelDateParam,
      finishCancelDateParam,
    ],
    async () => {
      try {
        const { data } = await apiReporting.get(
          `/movements-report/${company}?group=${tab}&page=${currentPage}&size=${pageSize}${statusParam}${searchParam}${sectorParam}${occupationParam}${supplierParam}${productParam}${initialDateParam}${finishDateParam}${initialCancelDateParam}${finishCancelDateParam}`,
        );
        return data;
      } catch (_error: any) {
        throw new Warning(
          "Erro ao buscar as movimentações",
          _error?.response?.status,
        );
      }
    },
  );

  return {
    data: data?.rows || [],
    count: data?.count || 0,
    isLoading,
    status,
    setStatus,
    search,
    setSearch,
    sector,
    setSector,
    occupation,
    setOccupation,
    supplier,
    setSupplier,
    product,
    setProduct,
    initialDate,
    setInitialDate,
    finishDate,
    setFinishDate,
    initialCancelDate,
    setInitialCancelDate,
    finishCancelDate,
    setFinishCancelDate,
  };
};

export default function useReport() {
  return {
    getReport,
  };
}

export const getReportAnalytic = (): IReportFileResponse => {
  const [isLoading, setIsLoading] = useState(false);

  const callReport = async ({
    company,
    tab,
    status,
    search,
    effectiveStartDateFrom,
    effectiveStartDateTo,
    effectiveFinalyDateFrom,
    effectiveFinalyDateTo,
    sectorId,
    positionId,
    providerName,
    productCommercialName,
  }: IReportFileArgs) => {
    setIsLoading(true);

    apiReporting
      .get(`/movements-report/file/${company}?group=${tab}&page=1&size=10000`, {
        params: {
          status,
          search,
          effectiveStartDateFrom,
          effectiveStartDateTo,
          effectiveFinalyDateFrom,
          effectiveFinalyDateTo,
          sectorId,
          positionId,
          providerName,
          productCommercialName,
        },
      })
      .then(({ data }) => {
        if (data?.length > 0) {
          const csvContent = `data:text/csv;charset=utf-8,${data}`;
          const encodedURI = encodeURI(csvContent);

          const downloadLink = document.createElement("a");
          downloadLink.href = encodedURI;
          downloadLink.download = `relatorio.csv`;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        } else {
          useToastStandalone({
            title: "Erro de download",
            description: "Não há relatório analítico",
            status: "info",
          });
        }
      })
      .catch((_error) => {
        useToastStandalone({
          title: "Erro de download",
          description: "Não foi possível fazer o download!",
          status: "error",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    isLoading,
    callReport,
  };
};

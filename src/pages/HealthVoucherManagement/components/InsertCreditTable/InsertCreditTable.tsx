import { Spinner } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { BiArrowToBottom } from "react-icons/bi";
import Loading from "../../../../components/Loading/Loading";
import Pagination from "../../../../components/Pagination";
import {
  IconsGroup,
  TBody,
  TD,
  TH,
  THead,
  TR,
  Table,
} from "../../../../components/Table";
import { useHealthVoucher } from "../../../../hooks/useHealthVoucher";
import { useToastStandalone } from "../../../../hooks/useToastStandalone";
import { apiWallet } from "../../../../services/api";
import { dateFormat } from "../../../../utils";
import { currencyBRLFormat } from "../../../../utils/currencyBRLFormat";

interface InsertCreditTable {
  refresh: any;
}

const InsertCreditTable: React.FC<InsertCreditTable> = ({ refresh }) => {
  const [isOnpening, setIsOpening] = useState(false);

  const [currentIndex, setCurrentIndex] = useState<string>("");
  const {
    setCreditRequestPage,
    creditRequestHistory,
    creditRequestPage,
    isFetchingCreditRequestHisotry,
    numberRequestSizePage,
  } = useHealthVoucher();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {}, [refresh]);

  const handlePagination = (page: number) => {
    setCreditRequestPage(page);
  };

  const downloadBankSplit = useCallback((creditRequestId: string) => {
    setIsOpening(true);
    apiWallet
      .get<{ link: string }>(`/credit-request/${creditRequestId}/boleto/link`)
      .then((response) => {
        window.open(response.data.link, "_blank");
      })
      .catch(() => {
        useToastStandalone({
          status: "error",
          title:
            "Ops! O arquivo que você procura não foi encontrado. Por favor, tente novamente mais tarde.",
          description:
            "Se o problema persistir, entre em contato com nossa equipe pelo Canal de Atendimento.",
        });
      })
      .finally(() => setIsOpening(false));
  }, []);

  const downloadNfs = useCallback((creditRequestId: string) => {
    setIsOpening(true);
    apiWallet
      .get<{ link: string }>(`/credit-request/${creditRequestId}/nfs/link`)
      .then((response) => {
        window.open(response.data.link, "_blank");
      })
      .catch((err) => {
        useToastStandalone({
          status: "error",
          title: "Erro ao gerar nota",
          description: err?.response?.data?.message || "Erro inesperado",
        });
      })
      .finally(() => setIsOpening(false));
  }, []);

  const downloadNfsFee = useCallback((creditRequestId: string) => {
    setIsOpening(true);
    apiWallet
      .get<{ link: string }>(`/credit-request/${creditRequestId}/nfsFee/link`)
      .then((response) => {
        window.open(response.data.link, "_blank");
      })
      .catch((err) => {
        useToastStandalone({
          status: "error",
          title: "Erro ao gerar nota",
          description: err?.response?.data?.message || "Erro inesperado",
        });
      })
      .finally(() => setIsOpening(false));
  }, []);

  if (isFetchingCreditRequestHisotry) {
    return <Loading />;
  }

  if (!creditRequestHistory?.rows.length) {
    return <div>Não há dados para serem listados...</div>;
  }
  const getDetails = async (creditRequestId: string) => {
    await apiWallet
      .get(`/companies/${creditRequestId}/company-details`, {
        responseType: "blob",
      })
      .then((response) => {
        if (response.data && response.data.size > 19) {
          const csvBlob = new Blob([response.data], { type: "text/csv" });
          const downloadUrl = URL.createObjectURL(csvBlob);
          const link = document.createElement("a");
          link.href = downloadUrl;
          link.download = "details.csv";
          link.click();
        } else {
          useToastStandalone({
            title: "Não possui detalhes!",
            description: "",
            status: "error",
          });
        }
      });
  };

  const accentMap: { [key: string]: string } = {
    "TRANSFERENCIA PENDENTE": "TRANSFERÊNCIA PENDENTE",
    // eslint-disable-next-line prettier/prettier
    CONCLUIDO: "CONCLUÍDO",
  };

  return (
    <>
      <Table>
        <THead>
          <TH>Id</TH>
          <TH>Data</TH>
          <TH>Status</TH>
          <TH>Vencimento</TH>
          <TH>Valor (R$)</TH>
          <TH>Boleto</TH>
          <TH>NF Tarifa</TH>
          <TH>NF Saldo</TH>
          <TH>Detalhes</TH>
        </THead>

        <TBody>
          {creditRequestHistory?.rows.map((transaction, index) => (
            <TR key={transaction.id}>
              <TD>{String(transaction.id).padStart(4, "0")}</TD>
              <TD>{dateFormat(new Date(transaction.date))}</TD>
              <TD>{accentMap[transaction.status] || transaction.status}</TD>
              <TD>{dateFormat(new Date(transaction.dueDate))}</TD>
              <TD>{currencyBRLFormat(transaction.credit)}</TD>
              <TD>
                {isOnpening && currentIndex === `bankSplit_${index}` ? (
                  <Spinner size="sm" color="#000" />
                ) : (
                  <button
                    onClick={() => {
                      setCurrentIndex(`bankSplit_${index}`);
                      downloadBankSplit(transaction.creditRequestId);
                    }}
                  >
                    <IconsGroup>
                      <BiArrowToBottom className="SVG" />
                    </IconsGroup>
                  </button>
                )}
              </TD>
              <TD>
                {isOnpening && currentIndex === `nfseFee_${index}` ? (
                  <Spinner size="sm" color="#000" />
                ) : (
                  <button
                    onClick={() => {
                      setCurrentIndex(`nfseFee_${index}`);
                      downloadNfsFee(transaction.creditRequestId);
                    }}
                  >
                    <IconsGroup>
                      <BiArrowToBottom className="SVG" />
                    </IconsGroup>
                  </button>
                )}
              </TD>
              <TD>
                {isOnpening && currentIndex === `nfs_${index}` ? (
                  <Spinner size="sm" color="#000" />
                ) : (
                  <button
                    onClick={() => {
                      setCurrentIndex(`nfs_${index}`);
                      downloadNfs(transaction.creditRequestId);
                    }}
                  >
                    <IconsGroup>
                      <BiArrowToBottom className="SVG" />
                    </IconsGroup>
                  </button>
                )}
              </TD>
              <TD>
                <button
                  onClick={() => getDetails(transaction?.creditRequestId)}
                >
                  <IconsGroup>
                    <BiArrowToBottom className="SVG" />
                  </IconsGroup>
                </button>
              </TD>
            </TR>
          ))}
        </TBody>
      </Table>
      <Pagination
        registerPerPage={numberRequestSizePage}
        totalRegisters={creditRequestHistory?.count}
        currentPage={creditRequestPage}
        handleChangePage={handlePagination}
      />
    </>
  );
};
export default InsertCreditTable;

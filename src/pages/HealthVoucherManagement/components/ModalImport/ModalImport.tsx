/* eslint-disable no-loops/no-loops */
/* eslint-disable no-console */
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import SimpleModal from "../../../../components/SimpleModal";
import { apiWallet } from "../../../../services/api";
import InputFile from "../InputFile/InputFile";
import { Button, Content } from "./styled";

import { Spinner } from "@chakra-ui/react";
import { useGlobal } from "../../../../contexts/UserContext";
import { useToastStandalone } from "../../../../hooks/useToastStandalone";
import { ICompanyImportResponseModel } from "../../../../models/companyImportResponse.model";

export interface ModalHandles {
  open: () => void;
  close: () => void;
  isOpened: boolean;
}

interface Props {
  handleModal: () => void;
  onSuccess: () => void;
  variant?: "company" | "transference" | "employee";
}

const ModalImportComp: React.ForwardRefRenderFunction<ModalHandles, Props> = (
  { handleModal, onSuccess, variant = "transference" },
  ref,
) => {
  const { company } = useGlobal();
  const [modalOpen, setModalOpen] = useState(false);
  const [fileList, setFileList] = useState<File[]>([]);
  const [isSending, setIsSending] = useState(false);

  const handleClose = () => {
    setModalOpen(false);
    setFileList([]);
  };
  const handleOpen = () => setModalOpen(true);

  useImperativeHandle(ref, () => ({
    open: handleOpen,
    close: handleClose,
    isOpened: modalOpen,
  }));

  const sendFile = useCallback(() => {
    const formData = new FormData();

    fileList.map((file) => formData.append("file", file));

    try {
      setIsSending(true);
      apiWallet
        .post<ICompanyImportResponseModel>(
          `companies/${company!.externalCompanyId}/company-import`,
          formData,
        )
        .then(({ data }) => {
          useToastStandalone({
            title: data.hasErrors ? "Erro ao importar empresas!" : "Sucesso!",
            description: data.hasErrors
              ? "Verifique os detalhes da importação"
              : "Empresas importadas!",
            status: data.hasErrors ? "error" : "success",
          });
        })
        .catch((err) => {
          useToastStandalone({
            title: "Não foi possível importar as Empresas!",
            description: err.response.data.data || "",
            status: "error",
          });
        })
        .finally(() => {
          onSuccess();
          setIsSending(false);
        });
    } catch (error) {
      console.log(error);
    }
  }, [fileList, onSuccess]);

  const handleTransferCedit = useCallback(() => {
    setIsSending(true);
    const formData = new FormData();
    Array.from(fileList).map((file) => formData.append("file", file));
    apiWallet
      .post(
        `companies/${company!.externalCompanyId}/transfer-credit/file`,
        formData,
      )
      .then(() => {
        useToastStandalone({
          status: "success",
          title: "Sucesso",
          description: "Crédito transferido com sucesso",
        });
      })

      .catch((error) => {
        useToastStandalone({
          status: "error",
          title: "Erro ao transferir Crédito",
          description: error.response?.data?.message,
        });
      })
      .finally(() => {
        setIsSending(false);
        onSuccess();
      });
  }, [company!.externalCompanyId, fileList, onSuccess]);

  const handleImportEmployee = useCallback(() => {
    setIsSending(true);
    const formData = new FormData();

    const reader = new FileReader();
    reader.onload = (event: any) => {
      const csvData = event.target.result;
      const dataArray = csvData.split("\n").map((row: any) => row.split(";"));

      const modifiedDataArray = dataArray.map((row: any) => {
        const modifiedRow = row.map((value: any, index: number) => {
          if (index == 1) {
            return value.trim().padStart(11, "0");
          } else {
            return value;
          }
        });
        return modifiedRow.join(";");
      });

      const modifiedCsvData = modifiedDataArray.join("\n");
      const modifiedFile = new File([modifiedCsvData], fileList[0].name, {
        type: "text/csv",
      });

      formData.append("file", modifiedFile);

      apiWallet
        .post(
          `companies/beneficiaries/${company!.externalCompanyId}/import`,
          formData,
        )
        .then(() => {
          useToastStandalone({
            status: "success",
            title: "Sucesso",
            description: "Beneficiários importados com sucesso",
          });
        })
        .catch((error) => {
          useToastStandalone({
            status: "error",
            title: "Erro ao importar Beneficiários",
            description: error.response?.data?.message,
          });
        })
        .finally(() => {
          setIsSending(false);
          onSuccess();
        });
    };
    reader.readAsText(fileList[0]);
  }, [company!.externalCompanyId, fileList, onSuccess]);

  return (
    <SimpleModal
      handleModal={handleModal}
      isOpen={modalOpen}
      title={
        variant === "company"
          ? "Importar Empresas"
          : variant === "transference"
          ? "Transferir Crédito"
          : "Importar pessoas"
      }
      size="md"
    >
      <Content>
        <h3>Upload de arquivo</h3>
        <InputFile getFile={setFileList} onClean={() => setFileList([])} />
        <Button
          isDisabled={isSending || !fileList.length || fileList.length === 0}
          alignSelf="flex-end"
          justifySelf="flex-end"
          onClick={() =>
            variant === "company"
              ? sendFile()
              : variant === "transference"
              ? handleTransferCedit()
              : handleImportEmployee()
          }
        >
          {isSending ? <Spinner size="sm" color="#FFF" /> : "Enviar"}
        </Button>
      </Content>
    </SimpleModal>
  );
};

export const ModalImport = forwardRef(ModalImportComp);

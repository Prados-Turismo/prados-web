import { useMutation, useQuery } from "react-query";
import { useToastStandalone } from "./useToastStandalone";
import { apiUpload } from "../services/api";
import { Warning } from "../errors";
import { keys } from "../services/query";
import { IDocument } from "../models/upload.model";
import { UseFormSetValue, FieldValues } from "react-hook-form";
import { useState } from "react";

const createUpload = (
  setDocument: UseFormSetValue<FieldValues>,
  fieldName: string,
) => {
  const { isLoading, mutate } = useMutation(
    async (data: IDocument) => {
      try {
        await apiUpload.post("document", data).then((res) => {
          setDocument(fieldName, res.data);
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        throw new Warning(error.response.data.message, error?.response?.status);
      }
    },
    {
      onSuccess: () => {
        useToastStandalone({
          title: "Arquivo enviado com sucesso.",
          status: "success",
        });
      },
    },
  );

  return {
    isLoading,
    mutate,
  };
};
const downloadFile = (id: string) => {
  if (!id) return { data: { url: "", key: "" }, isLoading: false };

  const { data, isLoading } = useQuery([keys.getDocument, id], async () => {
    try {
      const { data } = await apiUpload.get<{ url: string; key: string }>(
        `document/${id}`,
      );

      return data;
    } catch (_error: any) {
      throw new Warning(
        "Erro ao fazer download do arquivo!",
        _error?.response?.status,
      );
    }
  });

  return {
    data,
    isLoading,
  };
};

const downloadAndOpenFile = () => {
  const [isLoading, setIsLoading] = useState(false);

  const callDoc = async (id: number | string) => {
    setIsLoading(true);

    await apiUpload
      .get(`document/${id}`)
      .then(({ data }) => {
        if (data.url) {
          window.open(data.url, "_blank");
        } else {
          useToastStandalone({
            title: "Erro ao fazer download do arquivo!",
            description: "Arquivo não pode ser localizado",
            status: "error",
          });
        }
      })
      .catch((_error) => {
        useToastStandalone({
          title: "Erro ao fazer download do arquivo!",
          status: "error",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    isLoading,
    callDoc,
  };
};

const useUpload = () => ({
  createUpload,
  downloadFile,
  downloadAndOpenFile,
});
export default useUpload;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "react-query";
import { apiRecord, apiUpload } from "../services/api";
import { keys } from "../services/query";
import { useToastStandalone } from "./useToastStandalone";
import { Warning } from "../errors";
import { useGlobal } from "../contexts/UserContext";

import {
  ICreateLegalRepresentativeArgs,
  ILegalDocumentsReponse,
  ILegalRepresentativeResponse,
  IgetSignaturesStatusResponse,
} from "../models/complete-registration";
import axios from "axios";
import { useState } from "react";
import { customTheme } from "../theme";
import { IWelcomeFormRegister } from "../components/Welcome/types";
import { useNavigate } from "react-router-dom";

const getLegalRepresentative = (): ILegalRepresentativeResponse => {
  const { company } = useGlobal();
  const { data, isLoading } = useQuery(
    [keys.legalRepresentative, company?.externalCompanyId],
    async () => {
      try {
        const { data } = await apiRecord.get(
          `/companies-associated/${company?.externalCompanyId}/legal-representative`,
        );

        return data;
      } catch (error: any) {
        throw new Warning(
          error?.response?.data?.message,
          error?.response?.status,
        );
      }
    },
  );

  return {
    data: data?.rows || [],
    count: data?.count || 0,
    isLoading,
  };
};

const createLegalRepresentative = ({
  setState,
  reset,
}: {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  reset: () => void;
}) => {
  const { company } = useGlobal();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(
    async (data: ICreateLegalRepresentativeArgs) => {
      try {
        await apiRecord.post(
          `/companies-associated/${company?.externalCompanyId}/legal-representative?size=20&page=1`,
          data,
        );
      } catch (error: any) {
        throw new Warning(
          error?.response?.data?.message,
          error?.response?.status,
        );
      }
    },
    {
      onSuccess: () => {
        setState(false);
        reset();
        queryClient.invalidateQueries([keys.legalDocuments]);
        queryClient.invalidateQueries([keys.legalRepresentative]);
        queryClient.invalidateQueries(["fetch-company-data-into-forms"]);
        queryClient.refetchQueries(["fetch-company-data-into-forms"]);

        useToastStandalone({
          title: "Representante cadastrado com sucesso!",
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

const deleteLegalRepresentative = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(
    async (id: string) => {
      try {
        await apiRecord.delete(
          `/companies-associated/legal-representative/${id}`,
        );
      } catch (error: any) {
        throw new Warning(
          error?.response?.data?.message,
          error?.response?.status,
        );
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([keys.legalRepresentative]);
        queryClient.invalidateQueries([keys.legalDocuments]);
        queryClient.invalidateQueries(["fetch-company-data-into-forms"]);
        queryClient.refetchQueries(["fetch-company-data-into-forms"]);

        useToastStandalone({
          title: "Representante excluído com sucesso!",
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

const createLegalDocument = () => {
  const { company } = useGlobal();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = useMutation(
    async ({
      files,
      documentType,
    }: {
      files: File[];
      documentType: string;
    }) => {
      if (files) {
        setIsLoading(true);
        files.forEach(async (file) => {
          await apiUpload
            .post("document", {
              key: file?.name,
              path: "documento_legal",
              contentType: file?.type,
              isPrivate: true,
            })
            .then(async (res) => {
              const blob: Blob = new Blob([file as unknown as BlobPart], {
                type: file?.type || "",
              });
              await axios
                .put(res.data.url as string, blob, {
                  headers: {
                    "Content-Type": file?.type,
                  },
                })
                .then(async () => {
                  const payload = {
                    documentToken: res?.data?.id,
                    documentType: documentType,
                    name: file?.name,
                  };
                  try {
                    await apiRecord
                      .post(
                        `/companies-associated/${company?.externalCompanyId}/legal-document`,
                        payload,
                      )
                      .then(() => {
                        queryClient.invalidateQueries([keys.legalDocuments]);
                        queryClient.invalidateQueries([
                          keys.legalRepresentative,
                        ]);
                        queryClient.invalidateQueries([
                          "fetch-company-data-into-forms",
                        ]);
                        queryClient.refetchQueries([
                          "fetch-company-data-into-forms",
                        ]);
                        setIsLoading(false);
                      });
                  } catch (error: any) {
                    setIsLoading(false);
                    throw new Warning(
                      error?.response?.data?.message,
                      error?.response?.status,
                    );
                  }
                });
            });
        });
      }
    },
    {
      onSuccess: () => {
        useToastStandalone({
          title: "Documento(s) cadastrado(s) com sucesso!",
          status: "success",
        });
      },
      onError: (e: any) => {
        const message = e?.response?.data?.message || "";
        setIsLoading(false);
        useToastStandalone({
          description: message,
          status: "error",
        });
      },
    },
  );

  return {
    isLoading,
    mutate,
  };
};

const getLegalDocuments = (): ILegalDocumentsReponse => {
  const { company } = useGlobal();
  const { data, isLoading } = useQuery(
    [keys.legalDocuments, company?.externalCompanyId],
    async () => {
      try {
        const { data } = await apiRecord.get(
          `/companies-associated/${company?.externalCompanyId}/legal-document?size=100&page=1`,
        );

        return data;
      } catch (error: any) {
        throw new Warning(
          error?.response?.data?.message,
          error?.response?.status,
        );
      }
    },
  );

  return {
    data: data?.rows || [],
    count: data?.count || 0,
    isLoading,
  };
};

const deleteLegalDocument = (onClose: () => void) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    async ({ id }: { id: string }) => {
      try {
        await apiRecord.delete(`/companies-associated/legal-document/${id}`);
      } catch (error: any) {
        throw new Warning(
          error?.response?.data?.message,
          error?.response?.status,
        );
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([keys.legalDocuments]);
        queryClient.invalidateQueries([keys.legalRepresentative]);
        queryClient.invalidateQueries(["fetch-company-data-into-forms"]);
        queryClient.refetchQueries(["fetch-company-data-into-forms"]);
        onClose();
        useToastStandalone({
          title: "Documento excluído com sucesso!",
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

const createDocumentToSign = () => {
  const { company } = useGlobal();
  const queryClient = useQueryClient();
  const d4signSafe = customTheme?.content?.d4signSafe;

  const { isLoading, mutate } = useMutation(
    async () => {
      try {
        const payload = {
          safe: d4signSafe,
        };

        await apiRecord.post(
          `/companies-associated/${company?.externalCompanyId}/document-to-sign-external`,
          payload,
        );
      } catch (error: any) {
        throw new Warning(
          error?.response?.data?.message,
          error?.response?.status,
        );
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["fetch-company-data-into-forms"]);
        queryClient.refetchQueries(["fetch-company-data-into-forms"]);
        queryClient.invalidateQueries([keys.signatures]);
        queryClient.refetchQueries([keys.signatures]);

        useToastStandalone({
          title: "Documento gerado!",
          description:
            "O Instrumento de representação foi gerado e enviado com sucesso.",
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

const getSignaturesStatus = (): IgetSignaturesStatusResponse => {
  const { company } = useGlobal();
  const { data, isLoading } = useQuery(
    [keys.signatures, company?.externalCompanyId],
    async () => {
      try {
        const { data } = await apiRecord.get(
          `companies-associated/${company?.externalCompanyId}/get-document-signature-status?size=100&page=1&type=external`,
        );

        return data;
      } catch (error: any) {
        throw new Warning(
          error?.response?.data?.message,
          error?.response?.status,
        );
      }
    },
  );

  return {
    data: data?.rows || [],
    count: data?.count || 0,
    isLoading,
  };
};

const revalidateDocument = (
  setStep: React.Dispatch<React.SetStateAction<number>>,
) => {
  const { company } = useGlobal();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(
    async () => {
      try {
        await apiRecord.post(
          `/companies-associated/${company?.externalCompanyId}/document-to-revalidate`,
        );
      } catch (error: any) {
        throw new Warning(
          error?.response?.data?.message,
          error?.response?.status,
        );
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["fetch-company-data-into-forms"]);
        queryClient
          .refetchQueries(["fetch-company-data-into-forms"])
          .then(() => {
            setStep(2);
          });
        queryClient.invalidateQueries([keys.legalRepresentative]);
        queryClient.invalidateQueries([keys.legalDocuments]);
      },
    },
  );

  return {
    isLoading,
    mutate,
  };
};

const updatedCompaniesAssociated = () => {
  const queryClient = useQueryClient();
  const { company } = useGlobal();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(
    async (data: IWelcomeFormRegister) => {
      try {
        await apiRecord.put(
          `/companies-associated/${company?.externalCompanyId}`,
          data,
        );
      } catch (error: any) {
        throw new Warning(
          error?.response?.data?.message,
          error?.response?.status,
        );
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["fetch-company-data-into-forms"]);
        queryClient.refetchQueries(["fetch-company-data-into-forms"]);
        navigate("/");
      },
    },
  );

  return {
    isLoading,
    mutate,
  };
};

export default function useCompleteRegistration() {
  return {
    getLegalRepresentative,
    createLegalRepresentative,
    deleteLegalRepresentative,
    getLegalDocuments,
    createLegalDocument,
    deleteLegalDocument,
    createDocumentToSign,
    getSignaturesStatus,
    revalidateDocument,
    updatedCompaniesAssociated,
  };
}

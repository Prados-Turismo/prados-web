/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useGlobal } from "../contexts/UserContext";
import { Warning } from "../errors";
import {
  IFamilyContractData,
  IGetFamilyContractsArgs,
  IGetFamilyContractsResponse,
} from "../models/productAdhesion.model";
import { apiMovement, apiRecord, apiUpload } from "../services/api";
import { keys } from "../services/query";
import { useToastStandalone } from "./useToastStandalone";

interface IFileDescription {
  personDocumentTypeId: string;
  typeDocument: string;
}

const getFamilyContracts = ({
  contractId,
  beneficiaryId,
  setcheckedAgrupados,
  isRegulated,
}: IGetFamilyContractsArgs): IGetFamilyContractsResponse => {
  if (beneficiaryId) {
    const { company } = useGlobal();
    const { data, isLoading, isFetching } = useQuery(
      [keys.productAdhesion, contractId, beneficiaryId],
      async () => {
        try {
          const { data } = await apiMovement.get(
            `/beneficiary-contract/company/${company?.externalCompanyId}/beneficiary/${beneficiaryId}/contract/${contractId}`,
          );

          if (isRegulated && data) {
            const holder = data?.filter(
              (el: IFamilyContractData) =>
                el?.beneficiary?.beneficiaryKinship === "holder" &&
                !el?.adherence,
            );

            setcheckedAgrupados(holder);
          }

          return data;
        } catch (_error: any) {
          throw new Warning(
            "Não foi possível carregar as informações. Tente novamente mais tarde ou entre em contato pelo Canal de Atendimento.",
            _error?.response?.status,
          );
        }
      },
    );
    return {
      data: data || [],
      isLoading: isLoading || isFetching,
    };
  } else {
    return {
      data: [],
      isLoading: false,
    };
  }
};

const createUploadPersonDocument = ({ personId }: { personId: string }) => {
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation(
    async (data: {
      personId: string;
      file: any;
      fileDescription: IFileDescription;
      fileDescriptionBack: IFileDescription | null;
      fileBack: any;
      documentFrontAndBack: boolean;
    }) => {
      try {
        await apiUpload
          .post("document", {
            key: data?.file?.name,
            path: "documento_pessoal",
            contentType: data?.file?.type,
            isPrivate: true,
          })
          .then(async (res) => {
            const blob: Blob = new Blob([data.file as unknown as BlobPart], {
              type: data?.file?.type || "",
            });
            await axios.put(res.data.url as string, blob, {
              headers: {
                "Content-Type": data?.file?.type,
              },
            });
            const payloadPersonDocument = {
              personDocumentTypeId: data?.fileDescription?.personDocumentTypeId,
              token: res?.data?.id,
              typeDocument: data?.fileDescription?.typeDocument,
            };
            await apiRecord.post(
              `/people/${data?.personId}/person-documents`,
              payloadPersonDocument,
            );
          });
        if (data?.documentFrontAndBack) {
          await apiUpload
            .post("document", {
              key: data?.fileBack?.name,
              path: "documento_pessoal",
              contentType: data?.fileBack?.type,
              isPrivate: true,
            })
            .then(async (res) => {
              const blob: Blob = new Blob(
                [data.fileBack as unknown as BlobPart],
                {
                  type: data?.fileBack?.type || "",
                },
              );
              await axios.put(res.data.url as string, blob, {
                headers: {
                  "Content-Type": data?.fileBack?.type,
                },
              });
              const payloadPersonDocumentBack = {
                personDocumentTypeId:
                  data?.fileDescriptionBack?.personDocumentTypeId,
                token: res?.data?.id,
                typeDocument: data?.fileDescriptionBack?.typeDocument,
              };
              await apiRecord.post(
                `/people/${data?.personId}/person-documents`,
                payloadPersonDocumentBack,
              );
            });
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        throw new Warning(error.response.data.message, error?.response?.status);
      }
    },
    {
      onSuccess: () => {
        queryClient
          .invalidateQueries([keys.personDocuments, personId])
          .then(() => {
            queryClient.refetchQueries([keys.personDocuments, personId]);
          });

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

const updatePersonDocument = ({
  personId,
  documentId,
  count,
  setShowModal,
  proposalId,
  setIsFetching,
}: {
  personId: string;
  documentId: string;
  count: number;
  setShowModal: (e: boolean) => void;
  proposalId: string;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation(
    async (data: { file: any }) => {
      try {
        setIsFetching(true);
        await apiUpload
          .post("document", {
            key: data?.file?.name,
            path: "documento_pessoal",
            contentType: data?.file?.type,
            isPrivate: true,
          })
          .then(async (res) => {
            const blob: Blob = new Blob([data.file as unknown as BlobPart], {
              type: data?.file?.type || "",
            });
            await axios.put(res.data.url as string, blob, {
              headers: {
                "Content-Type": data?.file?.type,
              },
            });
            const payloadPersonDocument = {
              statusDocument: "pending",
              token: res?.data?.id,
            };
            await apiRecord
              .put(
                `/people/${personId}/person-documents/${documentId}`,
                payloadPersonDocument,
              )
              .then(async () => {
                if (count === 1) {
                  try {
                    await apiMovement
                      .post(`/adherence-proposal/validate-review/${proposalId}`)
                      .then(() => {
                        setShowModal(false);

                        queryClient.invalidateQueries([keys.report, "P"]);
                        queryClient.invalidateQueries([keys.report, "E"]);

                        useToastStandalone({
                          title:
                            "Agora é com a gente, iremos analisar o(s) documento(s) para dar continuidade a adesão do benefício, dentro de 48 horas daremos retorno.",
                          status: "success",
                          duration: 15000,
                        });
                      });
                  } catch (error: any) {
                    throw new Warning(
                      error?.response?.data?.message,
                      error?.response?.status,
                    );
                  }
                }
              });
          })
          .finally(() => {
            setIsFetching(false);
          });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        throw new Warning(
          error?.response?.data?.message,
          error?.response?.status,
        );
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([keys.personDocuments, personId]);
        queryClient.invalidateQueries([keys.collaborator]);

        useToastStandalone({
          title: "Arquivo atualizado com sucesso!",
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

const deletePersonDocument = ({ personId }: { personId: string }) => {
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation(
    async (data: {
      personId: string;
      documentId: string;
      documentIdBack: string | null;
    }) => {
      try {
        await apiRecord.delete(
          `/people/${data?.personId}/person-documents/${data?.documentId}`,
        );

        if (data?.documentIdBack) {
          await apiRecord.delete(
            `/people/${data?.personId}/person-documents/${data?.documentIdBack}`,
          );
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        throw new Warning(error.response.data.message, error?.response?.status);
      }
    },
    {
      onSuccess: () => {
        queryClient
          .invalidateQueries([keys.personDocuments, personId])
          .then(() => {
            queryClient.refetchQueries([keys.personDocuments, personId]);
          });
        useToastStandalone({
          title: "Arquivo deletado com sucesso.",
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

const createAdhesion = ({
  setIndex,
  setIsLoadingAdhesion,
  setDataLimiteAssinatura,
}: {
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  setIsLoadingAdhesion: React.Dispatch<React.SetStateAction<boolean>>;
  setDataLimiteAssinatura: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation(
    async (data: {
      productId: string;
      companyContractId: string;
      contractId: string;
      beneficiariesIds: string[];
    }) => {
      try {
        setIsLoadingAdhesion(true);
        await apiMovement.post("/adherence-proposal", data).then((res) => {
          setDataLimiteAssinatura(res?.data?.subscriptionDeadline);
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setIsLoadingAdhesion(false);
        throw new Warning(error.response.data.message, error?.response?.status);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([keys.productAdhesion]);
        queryClient.refetchQueries([keys.productAdhesion]).then(() => {
          setIsLoadingAdhesion(false);
        });

        queryClient.invalidateQueries([
          keys.collaborator,
          "family",
          "composition",
        ]);

        setIndex(3);
      },
    },
  );

  return {
    isLoading,
    mutate,
  };
};

export default function useProductAdhesion() {
  return {
    getFamilyContracts,
    createUploadPersonDocument,
    deletePersonDocument,
    createAdhesion,
    updatePersonDocument,
  };
}

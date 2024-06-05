/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useGlobal } from "../contexts/UserContext";
import { Warning } from "../errors";
import {
  IAllCompanyProviderData,
  IBeneficiariesAgeGroupsResponse,
  IBenefitDetails,
  IBenefitsArgs,
  IBenefitsParameterizerArgs,
  IBenefitsParameterizerResponse,
  IBenefitsResponse,
  IEnableBenefit,
  IFavoriteProduct,
  IFormParameterizer,
  IGetAllCompaniesProviderResponse,
  ISegmentationResponse,
} from "../models/benefits.model";
import { apiMovement, apiRecord } from "../services/api";
import { keys, queryClient } from "../services/query";
import { genericSort } from "../utils";
import { useToastStandalone } from "./useToastStandalone";
import { IDataProductContract } from "../models/product.model";

function updateFavoritedCompanyContract(
  rows: any,
  id: any,
  favoritedCompanyContract: any,
) {
  const index = rows.findIndex((row: any) => row.id === id);
  const updatedRows = [...rows];
  if (updatedRows?.length > 0 && index >= 0) {
    updatedRows[index] = {
      ...updatedRows[index],
      favoritedCompanyContract: favoritedCompanyContract,
    };
  }

  return updatedRows;
}

const getBenefits = ({
  size,
  page,
  orderBy,
  order,
  productClass,
  companyProviderIdSearch,
  coparticipationSearch,
  codIbgeUFSearch,
  codIbgeMunicipioSearch,
  outpatientSegmentationSearch,
  startValueSearch,
  finalyValueSearch,
  productNameSearch,
  userId,
  onlyFavorites,
}: IBenefitsArgs): IBenefitsResponse => {
  const { company } = useGlobal();

  const companyId = company?.externalCompanyId;
  const companyProviderId = companyProviderIdSearch
    ? `[${companyProviderIdSearch?.map((el) => `"${el}"`)}]`
    : null;
  const coparticipation =
    coparticipationSearch === 1
      ? true
      : coparticipationSearch === 2
      ? false
      : null;
  const codIbgeUF = codIbgeUFSearch ? `[${codIbgeUFSearch}]` : null;
  const codIbgeMunicipio = codIbgeMunicipioSearch
    ? `[${codIbgeMunicipioSearch}]`
    : null;
  const outpatientSegmentation = outpatientSegmentationSearch
    ? `["${outpatientSegmentationSearch}"]`
    : null;
  const startValue = startValueSearch || null;
  const finalyValue = finalyValueSearch || null;
  const productName = productNameSearch || null;

  const { data, isLoading, isFetching } = useQuery(
    [
      keys.benefits,
      companyId,
      size,
      page,
      orderBy,
      order,
      productClass,
      companyProviderId,
      coparticipation,
      codIbgeUF,
      codIbgeMunicipio,
      outpatientSegmentation,
      startValue,
      finalyValue,
      productName,
      userId,
      onlyFavorites,
    ],
    async () => {
      try {
        const { data } = await apiRecord.get(
          `/companies-associated/${companyId}/contract/filterProducts${
            productClass ? `?productClass=["${productClass}"]` : ""
          }`,
          {
            params: {
              size,
              page,
              orderBy,
              order,
              companyProviderId,
              coparticipation,
              codIbgeUF,
              codIbgeMunicipio,
              outpatientSegmentation,
              startValue,
              finalyValue,
              productName,
              userId,
              onlyFavorites,
            },
          },
        );

        return data;
      } catch (_error: any) {
        throw new Warning(
          `Erro ao buscar os produtos`,
          _error?.response?.status,
        );
      }
    },
  );

  return {
    data: data?.rows || [],
    count: data?.count || 0,
    counts: {
      productCount: data?.productCount,
      providersCount: data?.providersCount,
      minValue: data?.minValue,
      maxValue: data?.maxValue,
    },
    productClasses: data?.productClasses,
    isLoading,
    isFetching,
  };
};

const getBenefitDetails = (productId: string): IBenefitDetails => {
  const { data, isLoading } = useQuery(
    [keys.benefitDetails, productId],
    async () => {
      try {
        const { data } = await apiRecord.get(`/product/${productId}`);

        return data;
      } catch (_error: any) {
        throw new Warning(
          `Erro ao buscar os detalhes do produto`,
          _error?.response?.status,
        );
      }
    },
  );

  return {
    data: data || null,
    isLoading,
  };
};

const getBeneficiariesAgeGroups = (
  contractId: string,
  companyId: string,
): IBeneficiariesAgeGroupsResponse => {
  const { data, isLoading } = useQuery(
    [keys.beneficiariesAgeGroups, contractId],
    async () => {
      try {
        const { data } = await apiRecord.get(
          `/companies-associated/${companyId}/contract/${contractId}/beneficiaries-age-groups`,
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
    data: data || null,
    isLoading,
  };
};

const getBenefitParameterizer = ({
  companyContractId,
  active,
}: IBenefitsParameterizerArgs): IBenefitsParameterizerResponse => {
  const { data, isLoading } = useQuery(
    [keys.benefits, "parametrizer", companyContractId, active],
    async () => {
      try {
        const { data } = await apiMovement.get(
          `/parametrizer/company-contract/${companyContractId}`,
          {
            params: {
              active,
            },
          },
        );

        return data;
      } catch (_error: any) {
        throw new Warning(
          "Erro ao buscar os Parâmetros Ativos",
          _error?.response?.status,
        );
      }
    },
  );

  return {
    data: data || [],
    isLoading,
  };
};

const getSegmentation = (): ISegmentationResponse => {
  const { data, isLoading } = useQuery(keys.segmentation, async () => {
    try {
      const { data } = await apiRecord.get("/segmentacao-assistencials/");

      return data;
    } catch (error: any) {
      throw new Warning(`Erro ao buscar a segmentação`, error.response.status);
    }
  });

  return {
    data: data || [],
    isLoading,
  };
};

const getCompanyContractDocument = async (id: number) => {
  await apiRecord
    .get(`/documento-contrato-empresas/download/${id}`)
    .then((response) => {
      if (response.data?.url) {
        window.open(response.data?.url, "_blank");
      } else {
        useToastStandalone({
          title: "Erro ao fazer o download",
          description: "Documento não encontrado!",
          status: "error",
        });
      }
    })
    .catch((error) => {
      useToastStandalone({
        title: "Erro ao fazer o download",
        description: error?.response?.data?.message,
        status: "error",
      });
    });
};

export const handleEnableBenefit = () => {
  const [isLoading, setIsLoading] = useState(false);

  const enableBenefit = async ({
    companyContractId,
    checkedStatus,
    setShowModal,
    setCheckedStatus,
  }: IEnableBenefit) => {
    setIsLoading(true);
    const data = {
      available: checkedStatus,
    };

    await apiRecord
      .put(`/companies-associated/switch/contract/${companyContractId}`, data)
      .then(async () => {
        await queryClient.invalidateQueries([keys.benefits]);
        await queryClient.invalidateQueries([keys.collaborator, "family"]);
        await queryClient.refetchQueries([keys.benefits]);
        setShowModal(false);
        setCheckedStatus(checkedStatus);
        useToastStandalone({
          title: `Produto ${
            !checkedStatus ? "desabilitado" : "habilitado"
          } com sucesso!`,
          status: "success",
        });
      })
      .catch((error) => {
        setShowModal(false);
        useToastStandalone({
          title: `Não foi possível ${
            !checkedStatus ? "desabilitar" : "habilitar"
          } o produto! Tente novamente ou entre em contato pelo Canal de Atendimento.`,
          description: error?.response?.data?.message,
          status: "error",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    enableBenefit,
    isLoading,
  };
};

const handleDeleteParameterization = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(
    async ({ id }: { id: string }) => {
      await apiMovement.delete(`/parametrizer/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["benefits", "parametrizer"]);
        useToastStandalone({
          title: `Parâmetro excluído com sucesso!`,
          status: "success",
        });
      },
      onError: (e: any) => {
        const message = e?.response?.data?.message || "";

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

const handleEditParameterization = ({
  isEdit,
  setShowModal,
}: {
  isEdit: boolean;
  setShowModal?: (boolean: any) => void;
}) => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(
    async (data: IFormParameterizer) => {
      await apiMovement.post(`/parametrizer`, data).then(() => {
        setShowModal && setShowModal(false);
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["benefits", "parametrizer"]);

        useToastStandalone({
          title: `Parametrização ${
            isEdit ? "Editada" : "Adicionada"
          } com sucesso!`,
          status: "success",
        });
      },
      onError: (e: any) => {
        const message = e?.response?.data?.message || "";

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

const getAllCompaniesProvider = ({
  productClass,
}: {
  productClass: string | null;
}): IGetAllCompaniesProviderResponse => {
  const { company } = useGlobal();
  const { data, isLoading } = useQuery(
    [keys.providers, productClass],
    async () => {
      try {
        const { data } = await apiRecord.get(
          `companies-provider/select-with-contracts?companyId=${company?.externalCompanyId}${
            productClass ? `&productClass=["${productClass}"]` : ""
          }`,
          {
            params: {
              page: 1,
              size: 1000,
            },
          },
        );

        return data.sort(
          (a: IAllCompanyProviderData, b: IAllCompanyProviderData) =>
            genericSort(a, b, {
              property: "corporateName",
            }),
        );
      } catch (_error: any) {
        throw new Warning(
          "Erro ao buscar os Fornecedores",
          _error?.response?.status,
        );
      }
    },
  );

  return {
    data: data as IAllCompanyProviderData[],
    isLoading,
  };
};

const favoriteProduct = ({
  handleGetProduts,
}: {
  handleGetProduts?: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const { mutate } = useMutation(
    async ({
      companyContractId,
      product,
      ...otherValues
    }: IFavoriteProduct) => {
      setLoading(true);
      await apiRecord
        .put(
          `/companies-contract/${companyContractId}/update-favorited
      `,
          otherValues,
        )
        .then(() => {
          const favoritedCompanyContractData = otherValues?.isFavorite
            ? [
                {
                  userId: otherValues?.userId,
                  companyContractId,
                },
              ]
            : [];
          const caches = queryClient
            .getQueryCache()
            ?.getAll()
            ?.filter(
              (cache: any) =>
                cache?.state?.data?.rows?.filter(
                  (el: any) => el?.id === companyContractId,
                ),
            );

          const updatedHashsData = caches.map((hash: any) => ({
            hash: JSON.parse(hash?.queryHash),
            data: {
              ...hash?.state?.data,
              rows: updateFavoritedCompanyContract(
                hash?.state?.data?.rows,
                companyContractId,
                favoritedCompanyContractData,
              ),
            },
          }));

          updatedHashsData?.forEach((el) => {
            if (el?.hash[el?.hash?.length - 1]) {
              if (otherValues?.isFavorite) {
                queryClient.setQueryData(el?.hash, {
                  ...el?.data,
                  rows: el?.data?.rows.concat({
                    ...product,
                    favoritedCompanyContract: favoritedCompanyContractData,
                  }),
                });
              } else {
                queryClient.setQueryData(el?.hash, {
                  ...el?.data,
                  rows: el?.data?.rows?.filter(
                    (row: any) => row?.id !== companyContractId,
                  ),
                });
              }
            } else {
              queryClient.setQueryData(el?.hash, el?.data);
            }
          });

          const productsLocalStorageData =
            localStorage.getItem("@comparatorSelected") || "";

          if (productsLocalStorageData) {
            // eslint-disable-next-line prefer-const
            let products: any = JSON.parse(productsLocalStorageData);

            const productFilter = products?.filter(
              (el: IDataProductContract) => el?.id === companyContractId,
            );

            const comparateProductData = {
              data: productFilter,
              index: products.indexOf(productFilter[0]),
            };
            if (comparateProductData?.data?.length > 0) {
              products[comparateProductData?.index] = {
                ...products[comparateProductData?.index],
                favoritedCompanyContract: otherValues?.isFavorite
                  ? [
                      {
                        userId: otherValues?.userId,
                      },
                    ]
                  : [],
              };

              localStorage.setItem(
                "@comparatorSelected",
                JSON.stringify(products),
              );
            }
          }
          if (handleGetProduts) {
            handleGetProduts();
          }
        });
    },
    {
      onSuccess: () => {
        setLoading(false);
      },
      onError: (e: any) => {
        const message = e?.response?.data?.message || "";
        setLoading(false);
        useToastStandalone({
          description: message,
          status: "error",
        });
      },
    },
  );

  return {
    isLoading: loading,
    mutate,
  };
};

export default function useBenefits() {
  return {
    getBenefits,
    getSegmentation,
    getBenefitParameterizer,
    getCompanyContractDocument,
    handleEnableBenefit,
    handleDeleteParameterization,
    handleEditParameterization,
    getBenefitDetails,
    getAllCompaniesProvider,
    getBeneficiariesAgeGroups,
    favoriteProduct,
  };
}

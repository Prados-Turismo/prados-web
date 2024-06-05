/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { useToastStandalone } from "./useToastStandalone";

// Api
import { apiMovement, apiRecord, apiUpload } from "../services/api";

// Types
import {
  IBeneficiaryCheckResponse,
  IBeneficiaryHistoricArgs,
  IBeneficiaryHistoricResponse,
  IBenefitInCancel,
  IBenefitInCancelResponse,
  IBenefitsByBeneficiaryArgs,
  IBenefitsByBeneficiaryResponse,
  ICancelAtiveProductArgs,
  ICancelProductInProcessArgs,
  ICheckBornDateArgs,
  ICheckByCpfArgs,
  IClassesBenefits,
  IClassesBenefitsResponse,
  ICollaboratorArgs,
  ICollaboratorPreRecordsResponse,
  ICollaboratorResponse,
  ICreateCollaboratorArgs,
  ICreateDependentArgs,
  IDataCollaborator,
  IDataDisableCollaborator,
  IDisableCollaboratorArgs,
  IDisableCollaboratorResponse,
  IFamilyBeneficiaries,
  IFamilyBeneficiariesResponse,
  IFamilyBenefitsGroup,
  IFamilyBenefitsGroupArgs,
  IFamilyBenefitsGroupResponse,
  IFamilyCompositionArgs,
  IFamilyCompositionResponse,
  IGetDependentsResponse,
  IGetPersonDocumentsReponse,
  IGetProposalAdherenceResponse,
  IPartnersResponse,
  IPrecadsArgs,
  IPrecadsResponse,
  IResubmissionsDocResponse,
  IUpdateBenefitPriceContractArgs,
  IUpdateBenefitPriceContractResponse,
  IUpdateCollaboratorArgs,
  IUpdateCollaboratorPrecadArgs,
  IUpdateCollaboratorPrecadResponse,
  IUpdateCollaboratorResponse,
  IUpdateDependentArgs,
  IUpdateDependentResponse,
  IUserCollaboratorResponse,
  IgetContractResponse,
  IinativeCollaboratorWithProductArgs,
  IinativeCollaboratorWithProductResponse,
  ILinkBeneficiaryDependantDTO,
} from "../models/collaborator.model";

// Keys
import axios from "axios";
import { useNavigate } from "react-router";
import { useGlobal } from "../contexts/UserContext";
import { Warning } from "../errors";
import { IDataProductContract } from "../models/product.model";
import { keys, queryClient } from "../services/query";
import {
  dateFormat,
  dateToIsoFormat,
  genericSort,
  onlyNumberMask,
} from "../utils";

const reducer = (
  state: {
    valorProdutoTotal: number;
    valorEmpresaTotal: number;
    valorColaboradorTotal: number;
  },
  item: {
    parametrizer: { percentageValue: string; value: number };
    value: number;
  },
) => {
  const valorProduto = item?.value;

  const valorEmpresa =
    item?.parametrizer?.percentageValue === "V"
      ? item?.parametrizer?.value || 0
      : item?.value * ((item?.parametrizer?.value || 0) / 100);

  const valorColaborador =
    item?.parametrizer?.percentageValue === "V"
      ? item?.value - item?.parametrizer?.value || 0
      : item?.value - item?.value * ((item?.parametrizer?.value || 0) / 100);

  return {
    valorProdutoTotal: state?.valorProdutoTotal + valorProduto,
    valorEmpresaTotal: state.valorEmpresaTotal + valorEmpresa,
    valorColaboradorTotal: state.valorColaboradorTotal + valorColaborador,
  };
};

const fetchCollaborator = async ({
  page,
  size,
  search,
  status,
  companyId,
  beneficiaryStatus,
  isActived,
}: ICollaboratorArgs): Promise<{
  info: IDataCollaborator[];
  count: number;
}> => {
  // const fieldCpfSearchClean = search?.replace("-", "").replace(".", "")
  const path = isActived
    ? `/companies-associated/${companyId}/beneficiaries-active-contract?beneficiaryType=holder&beneficiaryStatus=A`
    : `/companies-associated/${companyId}/beneficiaries`;

  try {
    const { data } = await apiRecord.get(path, {
      params: {
        page,
        size,
        search,
        status,
        beneficiaryStatus,
      },
    });

    return {
      info: data?.rows || [],
      count: data?.count,
    };
  } catch (error: any) {
    throw new Warning(error.response.data.message, error.response.status);
  }
};

const fetchClassesBenefits = async () => {
  try {
    const { data } =
      await apiRecord.get<IClassesBenefits[]>("/classe-produtos");

    return data.sort((a, b) =>
      genericSort(a, b, {
        property: "ordemExibicao",
      }),
    );
  } catch (_error: any) {
    throw new Warning(
      "Erro ao buscar classes de produtos",
      _error?.response?.status,
    );
  }
};

const getBeneficiary = ({
  beneficiaryId,
  companyId,
}: {
  beneficiaryId: string;
  companyId: string;
}): IUserCollaboratorResponse => {
  const { data, isLoading } = useQuery(
    [keys.collaborator, beneficiaryId, companyId],
    async () => {
      try {
        const { data } = await apiRecord.get(
          `/companies-associated/${companyId}/beneficiaries/${beneficiaryId}`,
        );

        return data;
      } catch (_error: any) {
        throw new Warning("Erro ao buscar o titular", _error?.response?.status);
      }
    },
  );

  return {
    data: data || [],
    isLoading,
  };
};

const getDependents = ({
  beneficiaryId,
}: {
  beneficiaryId: string;
}): IGetDependentsResponse => {
  const { data, isLoading } = useQuery(
    [keys.dependents, beneficiaryId],
    async () => {
      try {
        const { data } = await apiRecord.get(
          `/companies-associated/beneficiaries/${beneficiaryId}/dependents`,
          {
            params: {
              size: 200,
              page: 1,
            },
          },
        );

        return data;
      } catch (_error: any) {
        throw new Warning(
          "Erro ao buscar os dependentes",
          _error?.response?.status,
        );
      }
    },
  );

  return {
    data: data?.rows || [],
    isLoading,
  };
};

const getPreCads = ({ pessoaFisicaId }: IPrecadsArgs): IPrecadsResponse => {
  const { data, isLoading } = useQuery(
    [keys.collaborator, "precad", pessoaFisicaId],
    async () => {
      try {
        const { data } = await apiRecord.get(`/precads/${pessoaFisicaId}`);

        return data;
      } catch (_error: any) {
        throw new Warning("Erro ao buscar usuário", _error?.response?.status);
      }
    },
  );

  return {
    data,
    isLoading,
  };
};

const updateCollaboratorPreCads = (): IUpdateCollaboratorPrecadResponse => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(
    async (data: IUpdateCollaboratorPrecadArgs) => {
      const precadsData = {
        nome: data.nome,
        celular: onlyNumberMask(data.celular),
        cargo: data.cargo,
        setor: data.setor,
        relacao_trabalhista: data.relacao_trabalhista,
        dataAdmissao: dateToIsoFormat(data.dataAdmissao),
        sexo: data.sexo,
      };

      await apiRecord.put(`/precads/${data.id}`, precadsData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([keys.collaborator]);

        useToastStandalone({
          description: "Atualizado com sucesso!",
        });
      },
    },
  );

  return {
    isLoading,
    mutate,
  };
};

const getCollaborators = ({
  page,
  size,
  status,
  companyId,
  beneficiaryStatus,
  isActived,
}: ICollaboratorArgs): ICollaboratorResponse => {
  const [fieldSearch, setFieldSearch] = useState<string | null>(null);

  const { data, isLoading } = useQuery(
    [
      keys.collaborator,
      companyId,
      page,
      size,
      fieldSearch,
      status,
      beneficiaryStatus,
      isActived,
    ],
    () =>
      fetchCollaborator({
        page,
        size,
        search: fieldSearch,
        status,
        companyId,
        beneficiaryStatus,
        isActived,
      }),
  );

  return {
    data: data?.info || [],
    count: data?.count || 0,
    isLoading,
    setFieldSearch,
  };
};

const createCollaborator = (
  reset: () => void,
  handleClose: () => void,
): IUpdateCollaboratorResponse => {
  const queryClient = useQueryClient();
  const { company } = useGlobal();
  const navigate = useNavigate();

  const { isLoading, mutate } = useMutation(
    async (data: ICreateCollaboratorArgs) => {
      const payload: { [key: string]: any } = {
        cpf: onlyNumberMask(data.cpf).toString(),
        name: data.name,
        email: data.email,
        bornDate: data.bornDate,
        sectorId: data.sector || null,
        positionId: data.occupation || null,
        registration: data?.registration || null,
        nameMother: data.nomeMae || null,
        sexIdentity: data.sex || null,
        phoneNumber: onlyNumberMask(data.phone)?.toString() || null,
        personMaritalStatus: data.estado_civil || null,
        admissionDate: data.contractDate || null,
        employmentRelationshipType: data?.typeContract || null,
      };

      if (
        data.endereco ||
        data.numero ||
        data.cep ||
        data.bairroEndereco ||
        data.codIbgeCity ||
        data.city ||
        data.codIbgeUf ||
        data.uf
      ) {
        payload.personAddress = {
          publicPlace: data.endereco || null,
          number: data.numero || null,
          cep: onlyNumberMask(data.cep)?.toString() || null,
          neighborhood: data.bairroEndereco || null,
          codIbgeCity: data.codIbgeCity || null,
          city: data.city || null,
          codIbgeUf: data.codIbgeUf || null,
          uf: data.uf || null,
          complement: data?.complemento || null,
        };
      }

      const isAddProduct = data.addProduct;

      const urlPath =
        data?.isLink && data?.personId
          ? `/companies-associated/${company?.externalCompanyId}/link-beneficiary/${data?.personId}`
          : `/companies-associated/${company?.externalCompanyId}/beneficiaries`;

      try {
        await apiRecord.post(urlPath, payload).then((res) => {
          const flCadastroCompleto = res?.data?.message?.person?.completeRecord;
          reset();
          handleClose();
          queryClient.invalidateQueries([keys.collaborator]);

          useToastStandalone({
            title: flCadastroCompleto
              ? "Cadastro concluído!"
              : "Pré-Cadastro concluído!",
            description:
              data?.isLink && data?.personId
                ? "Agora, você também pode contratar e gerenciar seus produtos no aplicativo. Utilize o mesmo login e senha para ter acesso. Baixe já o app, disponível na Play Store ou Apple Store."
                : flCadastroCompleto
                ? "O titular receberá um e-mail de 1° acesso ao APP."
                : "O titular receberá um e-mail para completar o cadastro. Você pode acompanhar ou finalizar o cadastro em 'Cadastrados'.",
            status: "success",
          });

          if (flCadastroCompleto && isAddProduct) {
            navigate(`/pessoas/${res?.data?.message?.id}?menu=1?sidebar=3`);
          }
        });
      } catch (error: any) {
        throw new Warning(error.response.data.message, error?.response?.status);
      }
    },
  );

  return {
    isLoading,
    mutate,
  };
};

const checkByCpf = (
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setDataCheckCpf?: React.Dispatch<{
    id?: string;
    cpf: string;
  }>,
  setBornDateDisabled?: React.Dispatch<React.SetStateAction<boolean>>,
  setCpfFeedback?: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const { company } = useGlobal();

  const { isLoading, mutate } = useMutation(
    async ({ cpf, holderId }: ICheckByCpfArgs) => {
      try {
        await apiRecord
          .post(
            `/companies-associated/${company?.externalCompanyId}/check-by-cpf`,
            {
              cpf,
              holderId,
            },
          )
          .then((res) => {
            setDisabled(false);
            if (res.data?.id) {
              setDisabled(true);
              setDataCheckCpf && setDataCheckCpf(res.data);
              setCpfFeedback && setCpfFeedback(true);
              setBornDateDisabled && setBornDateDisabled(false);
              return;
            } else {
              setBornDateDisabled && setBornDateDisabled(false);
              setCpfFeedback && setCpfFeedback(false);
            }
          });
      } catch (error: any) {
        setDisabled(true);
        if (setBornDateDisabled) setBornDateDisabled(true);
        throw new Warning(error.response.data.message, error?.response?.status);
      }
    },
  );

  return {
    isLoading,
    mutate,
  };
};

const checkBirthDate = (
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setDataCheckBirthDate?: React.Dispatch<
    React.SetStateAction<IBeneficiaryCheckResponse>
  >,
  setBirthDateFeedback?: React.Dispatch<React.SetStateAction<boolean>>,
  setCpfFeedback?: React.Dispatch<React.SetStateAction<boolean>>,
  setBornDateDisabled?: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const { isLoading, mutate } = useMutation(
    async ({ bornDate, personId }: ICheckBornDateArgs) => {
      try {
        await apiRecord
          .get(`/people/born-date/verify`, {
            params: {
              bornDate,
              personId,
            },
          })
          .then(({ data }: { data: IBeneficiaryCheckResponse }) => {
            setDisabled(false);
            if (data?.id) {
              setDataCheckBirthDate && setDataCheckBirthDate(data);
            }
            setBirthDateFeedback && setBirthDateFeedback(false);
            setCpfFeedback && setCpfFeedback(false);
            setBornDateDisabled && setBornDateDisabled(true);
          });
      } catch (error: any) {
        setDisabled(true);
        setBirthDateFeedback && setBirthDateFeedback(true);
        if (error?.response?.status === 400)
          throw new Warning(
            error.response.data.message,
            error?.response?.status,
          );
      }
    },
  );

  return {
    isLoading,
    mutate,
  };
};

const updateCollaborator = (): IUpdateCollaboratorResponse => {
  const queryClient = useQueryClient();
  const { company } = useGlobal();

  const { isLoading, mutate } = useMutation(
    async (data: IUpdateCollaboratorArgs) => {
      const payload = {
        sectorId: data.setor,
        positionId: data.cargo,
        employmentRelationshipType: data.relacao_trabalhista,
        registration: data?.registration || null,
        admissionDate:
          data?.dataAdmissao && dateToIsoFormat(data?.dataAdmissao),
        beneficiaryStatus: data.flAtivacao,
        person: {
          id: data.idPerson,
          name: data.nomePessoaFisica,
          personMaritalStatus: data.estado_civil,
          sexIdentity: data.sexo,
          nameMother: data.nomeMae,
          phoneNumber: onlyNumberMask(data.celular),
        },
        address: {
          publicPlace: data.endereco,
          cep: onlyNumberMask(data.CEP),
          neighborhood: data.bairroEndereco,
          codIbgeCity: parseInt(data.municipio),
          complement: data.complemento,
          city: data.municipioLabel,
          codIbgeUf: parseInt(data.unidade_federativa),
          uf: data.unidade_federativaLabel,
          personId: data.idPerson,
          number: data.numero,
        },
      };

      try {
        await apiRecord.put(
          `/companies-associated/${company?.externalCompanyId}/beneficiaries/${data.id}`,
          payload,
        );
      } catch (error: any) {
        throw new Warning(error.response.data.message, error?.response?.status);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([keys.collaborator]);
        queryClient.fetchQuery([keys.collaborator]);

        useToastStandalone({
          description: "Atualizado com sucesso!",
        });
      },
    },
  );

  return {
    isLoading,
    mutate,
  };
};

const cancelProductInProcess = ({ onClose }: { onClose: () => void }) => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(
    async (data: ICancelProductInProcessArgs) => {
      let hasError = "";

      await Promise.all(
        data.beneficiaryContractIds?.map(async (el, index) => {
          try {
            await apiMovement.put(`/beneficiary-contract/${el}`, {
              status: "cancellationOtherReasons",
              effectiveFinalyDate: dateFormat(new Date()),
            });

            if (data?.beneficiaryContractIds.length - 1 === index) {
              onClose();
              queryClient.invalidateQueries([
                keys.collaborator,
                "family",
                "benefits",
              ]);
              queryClient.refetchQueries([
                keys.collaborator,
                "family",
                "benefits",
              ]);

              queryClient.invalidateQueries([
                keys.collaborator,
                "family",
                "composition",
              ]);
              queryClient.invalidateQueries([keys.proposalAdherence]);
              queryClient.invalidateQueries([keys.productAdhesion]);
              queryClient.refetchQueries([keys.productAdhesion]);
            }
          } catch (error: any) {
            hasError = error?.response?.data?.message;
          }
        }),
      );

      if (hasError?.length > 0) {
        throw new Error(hasError);
      }
    },
    {
      onSuccess: () => {
        useToastStandalone({
          description: "Adesão cancelada com sucesso!",
        });
      },
      onError: (error: any) => {
        useToastStandalone({
          description: error?.message,
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

const updateDependent = (): IUpdateDependentResponse => {
  const queryClient = useQueryClient();
  const { company } = useGlobal();

  const { isLoading, mutate } = useMutation(
    async (data: IUpdateDependentArgs) => {
      const payload = {
        person: {
          id: data.idPessoaFisica,
          name: data.nomePessoaFisica,
          phoneNumber: onlyNumberMask(data.celular),
          sexIdentity: data.sexo,
          personMaritalStatus: data.estadoCivil,
          nameMother: data.nomeMae,
        },
        beneficiaryKinship: data.parentesco,
      };

      try {
        await apiRecord.put(
          `/companies-associated/${company?.externalCompanyId}/beneficiaries/${data.id}`,
          payload,
        );
      } catch (error: any) {
        throw new Warning(error.response.data.message, error?.response?.status);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([keys.dependents]);

        useToastStandalone({
          description: "Atualizado com sucesso!",
        });
      },
    },
  );

  return {
    isLoading,
    mutate,
  };
};

const createDependent = (
  beneficiaryHolderId: string,
  setIndex?: (value: React.SetStateAction<number>) => void,
  handleCloseModal?: () => void,
): IUpdateDependentResponse => {
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation(
    async (data: ICreateDependentArgs) => {
      try {
        await apiRecord.post(
          `/companies-associated/beneficiaries/${beneficiaryHolderId}/dependents`,
          data,
        );
      } catch (error: any) {
        throw new Warning(error.response.data.message, error?.response?.status);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([keys.productAdhesion]);
        queryClient.fetchQuery([keys.productAdhesion]).finally(() => {
          if (setIndex) {
            setIndex(1);
          }
          if (handleCloseModal) {
            handleCloseModal();
          }
        });

        useToastStandalone({
          description: "Atualizado com sucesso!",
        });

        queryClient.invalidateQueries([keys.dependents]);
      },
    },
  );

  return {
    isLoading,
    mutate,
  };
};

const getCollaboratorDoc = () => {
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
            title: "Erro de download",
            description: "Arquivo não pode ser localizado",
            status: "error",
          });
        }
      })
      .catch((_error) => {
        useToastStandalone({
          title: "Erro de download",
          description: "Erro ao baixar arquivo",
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

const getCancelCollaboratorDoc = () => {
  const [isLoading, setIsLoading] = useState(false);

  const callCancelDoc = async (id: string) => {
    setIsLoading(true);

    await apiRecord
      .get(`/documento-produto-cancelamentos/download/${id}`)
      .then(({ data }) => {
        if (data) {
          window.open(data, "_self");
        } else {
          useToastStandalone({
            title: "Erro de download",
            description: "Arquivo não pode ser localizado",
            status: "error",
          });
        }
      })
      .catch((_error) => {
        useToastStandalone({
          title: "Erro de download",
          description: "Erro ao baixar arquivo",
          status: "error",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    isLoading,
    callCancelDoc,
  };
};

const getPartners = (companyId: string | null): IPartnersResponse => {
  const { data, isLoading } = useQuery(
    [keys.collaborator, "partner", companyId],
    async () => {
      try {
        const { data } = await apiRecord.get(
          `/companies-associated/${companyId}/partnerships?page=1&size=200`,
        );

        return data;
      } catch (_error: any) {
        throw new Warning(
          "Não foi possível listar os parceiros!",
          _error?.response?.status,
        );
      }
    },
  );

  return {
    data: data?.rows || [],
    isLoading,
  };
};

const getBenefitsByBeneficiary = ({
  beneficiaryId,
  companyId,
  page,
  size,
  productClass,
  userId,
  onlyFavorites,
}: IBenefitsByBeneficiaryArgs): IBenefitsByBeneficiaryResponse => {
  if (beneficiaryId) {
    const { data, isLoading, isRefetching, isFetching } = useQuery(
      [
        keys.collaborator,
        "family",
        "benefits",
        page,
        size,
        beneficiaryId,
        productClass,
        companyId,
        userId,
        onlyFavorites,
      ],
      async () => {
        try {
          const { data } = await apiRecord.get(
            `/companies-associated/${companyId}/contract/filterProducts?order=asc&beneficiaryId=${beneficiaryId}${
              productClass ? `&productClass=["${productClass}"]` : ""
            }`,
            {
              params: {
                page,
                size,
                userId,
                onlyFavorites,
              },
            },
          );

          return data;
        } catch (_error: any) {
          throw new Warning(
            "Não foi possível listar os produtos!",
            _error?.response?.status,
          );
        }
      },
    );

    return {
      data:
        data?.rows?.sort((a: IDataProductContract, b: IDataProductContract) =>
          genericSort(a?.product, b?.product, {
            property: "commercialName",
          }),
        ) || [],
      count: data?.count,
      productClasses: data?.productClasses,
      isLoading: isLoading || isRefetching || isFetching,
    };
  } else {
    return {
      data: [],
      count: 0,
      productClasses: [],
      isLoading: false,
    };
  }
};

const getBenefitsByBeneficiaryGroup = ({
  beneficiaryId,
  group,
  page,
  size,
  productClass,
  onlyFavorites,
  userId,
}: IFamilyBenefitsGroupArgs): IFamilyBenefitsGroupResponse => {
  const { data, isLoading, isRefetching, isFetching } = useQuery(
    [
      keys.collaborator,
      "family",
      "benefits",
      "group",
      page,
      size,
      beneficiaryId,
      group,
      productClass,
      onlyFavorites,
      userId,
    ],
    async () => {
      try {
        const { data } = await apiMovement.get(
          `/beneficiary-contract/beneficiary/${beneficiaryId}?group=${group}&voucherId=null`,
          {
            params: {
              page,
              size,
              productClass,
              onlyFavorites,
              userId,
            },
          },
        );

        return data;
      } catch (_error: any) {
        throw new Warning(
          "Não foi possível listar os produtos!",
          _error?.response?.status,
        );
      }
    },
  );

  return {
    data:
      data?.rows?.sort((a: IFamilyBenefitsGroup, b: IFamilyBenefitsGroup) =>
        genericSort(a, b, {
          property: "productCommercialName",
        }),
      ) || [],
    count: data?.count,
    productClasses: data?.productClasses,
    isLoading: isLoading || isRefetching || isFetching,
  };
};

const getFamilyComposition = ({
  beneficiaryId,
  companyId,
  group,
}: IFamilyCompositionArgs): IFamilyCompositionResponse => {
  const { data, isLoading } = useQuery(
    [
      keys.collaborator,
      "family",
      "composition",
      beneficiaryId,
      group,
      companyId,
    ],
    async () => {
      try {
        const { data } = await apiMovement.get(
          `/beneficiary-contract/company/${companyId}/beneficiary/${beneficiaryId}/family?size=200&page=1`,
          {
            params: {
              group,
            },
          },
        );

        const initialState = {
          valorProdutoTotal: 0,
          valorEmpresaTotal: 0,
          valorColaboradorTotal: 0,
        };

        return { info: data, totais: data?.rows.reduce(reducer, initialState) };
      } catch (_error: any) {
        throw new Warning(
          "Não foi possível listar a composição familiar!",
          _error?.response?.status,
        );
      }
    },
  );

  return {
    data: data?.info?.rows || [],
    count: data?.info?.count,
    totais: data?.totais,
    isLoading,
  };
};

const getFamilyBeneficiaries = (
  familyId: number,
): IFamilyBeneficiariesResponse => {
  const { data, isLoading } = useQuery(
    [keys.collaborator, "family", "beneficiaries", familyId],
    async () => {
      try {
        const { data } = await apiRecord.get<IFamilyBeneficiaries[]>(
          `/familias/beneficiarios/${familyId}`,
        );

        return data;
      } catch (_error: any) {
        throw new Warning(
          "Não foi possível listar os beneficiários!",
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

const getProposalAdherence = (
  adherenceProposalId: string,
): IGetProposalAdherenceResponse => {
  const { data, isLoading } = useQuery(
    [keys.proposalAdherence, adherenceProposalId],
    async () => {
      try {
        const { data } = await apiMovement.get(
          `/adherence-proposal/${adherenceProposalId}`,
        );

        const initialState = {
          valorProdutoTotal: 0,
          valorEmpresaTotal: 0,
          valorColaboradorTotal: 0,
        };

        const resultTotais = data?.beneficiaryContracts?.reduce(
          reducer,
          initialState,
        );

        const holder = data?.beneficiaryContracts?.filter(
          (el: { beneficiary: { beneficiaryType: string } }) =>
            el?.beneficiary?.beneficiaryType === "holder",
        );
        const dependents = data?.beneficiaryContracts?.filter(
          (el: { beneficiary: { beneficiaryType: string } }) =>
            el?.beneficiary?.beneficiaryType !== "holder",
        );

        const result = [...holder, ...dependents];

        return {
          info: result,
          totais: resultTotais,
        };
      } catch (_error: any) {
        throw new Warning(
          "Não foi possível listar os produtos. Tente novamente mais tarde ou entre em contato pelo Canal de Atendimento.",
          _error?.response?.status,
        );
      }
    },
  );

  return {
    data: data?.info || [],
    totais: data?.totais,
    isLoading,
  };
};

const getBeneficiaryHistoric = ({
  beneficiaryId,
  page,
  size,
}: IBeneficiaryHistoricArgs): IBeneficiaryHistoricResponse => {
  const { data, isLoading } = useQuery(
    [
      keys.collaborator,
      "family",
      "beneficiaries",
      "historic",
      beneficiaryId,
      page,
      size,
    ],
    async () => {
      if (beneficiaryId) {
        try {
          const { data } = await apiMovement.get(
            `/beneficiary-contract-historic/beneficiary/${beneficiaryId}`,
            {
              params: {
                page,
                size,
              },
            },
          );

          return data;
        } catch (_error: any) {
          throw new Warning(
            "Não foi possível listar o histórico do beneficiário!",
            _error?.response?.status,
          );
        }
      }
    },
  );

  return {
    data: data?.rows || [],
    count: data?.count,
    isLoading,
  };
};

const getBenefitInCancel = (benefitId: string): IBenefitInCancelResponse => {
  const { data, isLoading } = useQuery(
    [
      keys.collaborator,
      "family",
      "beneficiaries",
      "benefitInCancel",
      benefitId,
    ],
    async () => {
      try {
        const { data } = await apiRecord.get<IBenefitInCancel>(
          `/solicitacao-cancelamentos/contrato-beneficiario/${benefitId}`,
        );

        return data;
      } catch (_error: any) {
        throw new Warning(
          "Não foi possível listar o produto em cancelamento!",
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

const getClassesBenefits = (): IClassesBenefitsResponse => {
  const { data, isLoading } = useQuery(
    [keys.collaborator, "family", "benefits", "classes"],
    fetchClassesBenefits,
  );

  return {
    classes: data || [],
    isLoading,
  };
};

const getPreRecordsPending = ({
  page,
  size,
}: ICollaboratorArgs): ICollaboratorPreRecordsResponse => {
  const { company } = useGlobal();
  const { data, isLoading } = useQuery(
    [keys.collaborator, "preCadsPendentes", page, size],
    async () => {
      try {
        const { data } = await apiRecord.get(
          `/companies-associated/${company?.externalCompanyId}/beneficiaries-pre`,
          {
            params: {
              page,
              size,
            },
          },
        );

        return data;
      } catch (error: any) {
        throw new Warning(error.response.data.message, error?.response?.status);
      }
    },
  );

  return {
    data: data?.rows || [],
    count: data?.count,
    isLoading,
  };
};

const activedPedingCollaborator = (handleClose: (e: boolean) => void) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { company } = useGlobal();

  const { isLoading, mutate } = useMutation(
    async ({
      sectorId,
      positionId,
      employmentRelationshipType,
      admissionDate,
      beneficiaryPreId,
    }: {
      sectorId: string;
      positionId: string;
      employmentRelationshipType: string;
      admissionDate: string;
      beneficiaryPreId: string;
    }) => {
      const payload = {
        sectorId,
        positionId,
        employmentRelationshipType,
        admissionDate: new Date(admissionDate),
      };

      try {
        await apiRecord
          .put(
            `/companies-associated/${company?.externalCompanyId}/beneficiaries-pre/${beneficiaryPreId}/approve`,
            payload,
          )
          .then((res) => {
            handleClose(false);
            queryClient.invalidateQueries([keys.collaborator]);

            useToastStandalone({
              description: "Pré cadastro autorizado!",
            });

            navigate(`/pessoas/${res.data?.message?.id}?menu=3?sidebar=1`);
          });
      } catch (error: any) {
        throw new Warning(error.response.data.message, error?.response?.status);
      }
    },
  );

  return {
    isLoading,
    mutate,
  };
};

const preCadsCollaborator = () => {
  const { company } = useGlobal();

  const cancelPedingCollaborator = (beneficiaryPreId: string) => {
    return new Promise((resolve, reject) => {
      apiRecord
        .delete(
          `/companies-associated/${company?.externalCompanyId}/beneficiaries-pre/${beneficiaryPreId}`,
        )
        .then(() => {
          queryClient.invalidateQueries([keys.collaborator]);
          queryClient.fetchQuery([keys.collaborator]);
          useToastStandalone({
            description: "Pré cadastro excluído!",
          });
        })
        .catch((error) => {
          useToastStandalone({
            title: "Não foi possível cancelar o pré cadastro!",
            description: error?.response?.data?.data || "",
            status: "warning",
          });
          reject(error);
        });
    });
  };

  return {
    cancelPedingCollaborator,
  };
};

const disableCollaborator = () => {
  const checkContractsForInactivation = async ({
    collaboratorId,
    setError,
  }: IDisableCollaboratorArgs): Promise<IDisableCollaboratorResponse> => {
    let response: IDataDisableCollaborator[] = [];
    try {
      const { data } = await apiMovement.get(
        `/beneficiary-contract/beneficiary/${collaboratorId}/find-all-proposals`,
      );

      response = data;
    } catch (_error) {
      setError(true);
      useToastStandalone({
        description:
          "Não foi possível listar os produtos. Tente novamente mais tarde ou entre em contato pelo Canal de Atendimento.",
        status: "error",
      });
    }

    return {
      data: response,
    };
  };

  const inativeCollaborator = async (
    collaboratorId: string,
    companyId: string,
  ) => {
    await apiRecord
      .put(
        `/companies-associated/${companyId}/beneficiaries/${collaboratorId}`,
        {
          beneficiaryStatus: "I",
        },
      )
      .then(() => {
        queryClient.invalidateQueries([keys.collaborator]);
        queryClient.fetchQuery([keys.collaborator]);
        useToastStandalone({
          description: "Inativado com sucesso!",
        });
      })
      .catch(() => {
        useToastStandalone({
          status: "error",
          description: "Não foi possível inativar! Tente novamente!",
        });
      });
  };

  const reactivateCollaborator = async (
    collaboratorId: string,
    companyId: string,
    beneficiaryStatus: string,
  ) => {
    await apiRecord
      .put(
        `/companies-associated/${companyId}/beneficiaries/${collaboratorId}`,
        {
          beneficiaryStatus: beneficiaryStatus,
        },
      )
      .then(() => {
        queryClient.invalidateQueries([keys.collaborator]);
        queryClient.fetchQuery([keys.collaborator]);
        useToastStandalone({
          description: "Ativado com sucesso!",
        });
      })
      .catch(() => {
        useToastStandalone({
          description: "Não foi possível ativar! Tente novamente!",
          status: "error",
        });
      });
  };

  return {
    checkContractsForInactivation,
    inativeCollaborator,
    reactivateCollaborator,
  };
};

const inativeCollaboratorWithProduct = ({
  beneficiaryId,
  setActiveContracts,
}: IinativeCollaboratorWithProductArgs) => {
  let protocol: string;
  const { isLoading, mutate } = useMutation(
    async (data: IinativeCollaboratorWithProductResponse) => {
      await apiRecord
        .put(
          `/companies-associated/beneficiary/${beneficiaryId}/inactivate/beneficiary-and-contracts`,
          data?.data,
        )
        .then((res) => {
          protocol = res?.data[0];
        });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([keys.collaborator]);
        setActiveContracts(null);

        useToastStandalone({
          title:
            "A solicitação do cancelamento do benefício será analisada e dentro de 1 dia útil sua solicitação será atendida.",
          description: `Você pode acompanhar a solicitação através da funcionalidade de Movimentações, na aba de benefícios com cancelamento em andamento. Protocolo: ${protocol}`,
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

const getReasonsInactivation = () => {
  const { data, isLoading } = useQuery(keys.reasonsInactivation, async () => {
    try {
      const { data } = await apiRecord.get(`/motivos-inativacaos`);

      return data;
    } catch (_error: any) {
      throw new Warning(
        "Não foi possível listar os motivos de inativação.",
        _error?.response?.status,
      );
    }
  });

  return {
    data: data || [],
    isLoading,
  };
};

const getPersonDocuments = (personId: string): IGetPersonDocumentsReponse => {
  const { data, isLoading } = useQuery(
    [keys.personDocuments, personId],
    async () => {
      try {
        const { data } = await apiRecord.get(
          `/people/${personId}/person-documents`,
          {
            params: {
              page: 1,
              size: 100,
            },
          },
        );

        return data;
      } catch (_error: any) {
        throw new Warning(
          "Não foi possível listar os documentos.",
          _error?.response?.status,
        );
      }
    },
  );

  return {
    data: data?.rows || [],
    isLoading,
  };
};

const updateBenefitPriceContract = (): IUpdateBenefitPriceContractResponse => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(
    async (data: IUpdateBenefitPriceContractArgs) => {
      const payload = {
        beneficiaryId: data?.beneficiaryId,
        positionId: data?.positionId,
        sectorId: data?.sectorId,
        relationship: data?.relationship,
        relationshipType: data?.relationshipType,
        companyId: data?.companyId,
        productId: data?.productId,
        companyContractId: data?.companyContractId,
        percentageValue: data?.percentageValue,
        value: data?.value,
        type: "single",
      };

      await apiMovement.put(
        `/beneficiary-contract/${data?.beneficiaryContractId}/parametrizer`,
        payload,
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([keys.collaborator]);
        queryClient.invalidateQueries([keys.benefits, "parametrizer"]);

        useToastStandalone({
          description: "Editado com sucesso!",
        });
      },
    },
  );

  return {
    isLoading,
    mutate,
  };
};

const prefetchCollaboratorActived = ({
  page,
  size,
  companyId,
}: ICollaboratorArgs): void => {
  const query = useQueryClient();

  query.prefetchQuery(
    [keys.collaborator, "collaborator", companyId, page, size],
    () =>
      fetchCollaborator({
        page,
        size,
        companyId,
      }),
  );
};

const getResubmissionsDoc = ({
  proposalId,
  setShowModal,
}: {
  proposalId: number | string;
  setShowModal: (e: boolean) => void;
}): IResubmissionsDocResponse => {
  const { data, isLoading } = useQuery(
    [keys.collaborator, `resubsmissionsDoc-${proposalId}`],
    async () => {
      try {
        const { data } = await apiMovement.get(
          `/adherence-proposal/${proposalId}`,
        );

        const result: any[] = [];

        data?.beneficiaryContracts?.map(
          (contract: any) =>
            contract?.adherenceRule.map(async (rule: any) => {
              const docs: any[] = [];
              await rule?.documentsOnAdherenceRules?.map(
                (doc: any) =>
                  doc?.personDocument?.map((el: any) => {
                    if (
                      el?.statusDocument === "nonconforming" &&
                      docs?.filter((item) => item?.id === el?.id)?.length === 0
                    ) {
                      docs.push(el);
                    }
                  }),
              );
              if (docs?.length > 0) {
                result.push({
                  beneficiaryName: contract?.beneficiary?.person?.name,
                  beneficiaryKinship: contract?.beneficiary?.beneficiaryKinship,
                  docs: docs,
                });
              }
            }),
        );

        const holder = {
          nomeTitular: data?.holder?.person?.name,
          celularTitular: data?.holder?.person?.phoneNumber,
          emailTitular: data?.holder?.person?.email,
        };

        return {
          data: result,
          holder,
        };
      } catch (error: any) {
        useToastStandalone({
          title: "Erro ao buscar os documentos",
          description: error?.response?.data?.data,
          status: "error",
        });
        setShowModal(false);
      }
    },
    {
      staleTime: 0,
    },
  );

  return {
    data: data?.data || [],
    holder: data?.holder,
    isLoading: isLoading,
  };
};

const getCompanyContract = ({
  companyContractId,
}: {
  companyContractId: string;
}): IgetContractResponse => {
  const { data, isLoading } = useQuery(
    [keys.collaborator, `contract`, companyContractId],
    async () => {
      try {
        const { data } = await apiRecord.get(
          `/companies-associated/contract/${companyContractId}`,
        );

        return data;
      } catch (error: any) {
        useToastStandalone({
          title: "Erro o contrato",
          description: error?.data?.message,
          status: "error",
        });
      }
    },
    {
      staleTime: 0,
    },
  );

  return {
    data: data || [],
    isLoading,
  };
};

const cancelActiveProduct = ({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const queryClient = useQueryClient();
  const [protocolNumber, setProtocolNumber] = useState("");

  const { isLoading, mutate } = useMutation(
    async (data: ICancelAtiveProductArgs) => {
      let documentToken: string | null = null;
      if (data?.cancellationDocumentToken) {
        await apiUpload
          .post("document", {
            key: data?.cancellationDocumentToken?.name,
            path: "cancelamentos",
            contentType: data?.cancellationDocumentToken?.type,
            isPrivate: true,
          })
          .then(async (res) => {
            const blob: Blob = new Blob(
              [data?.cancellationDocumentToken as unknown as BlobPart],
              {
                type: data?.cancellationDocumentToken?.type || "",
              },
            );
            documentToken = res?.data?.id;
            await axios.put(res.data.url as string, blob, {
              headers: {
                "Content-Type": data?.cancellationDocumentToken?.type,
              },
            });
          });
      }

      const payload = {
        ...data,
        cancellationDocumentToken: documentToken,
      };

      try {
        await apiMovement.post(`/cancel-request`, payload).then((resCancel) => {
          setProtocolNumber(resCancel?.data?.protocol);
          queryClient.invalidateQueries([
            keys.collaborator,
            "family",
            "composition",
          ]);
          queryClient.invalidateQueries([keys.proposalAdherence]);
          queryClient.invalidateQueries([keys.productAdhesion]);
          queryClient.refetchQueries([keys.productAdhesion]);
          setStep(2);
        });
      } catch (error: any) {
        throw new Warning(error.response.data.message, error?.response?.status);
      }
    },
  );

  return {
    isLoading,
    protocolNumber: protocolNumber,
    mutate,
  };
};

const validateAdherenceProposal = ({
  proposalId,
  setModal,
}: {
  proposalId: string;
  setModal: (e: boolean) => void;
}) => {
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation(
    async () => {
      try {
        await apiMovement.post(
          `/adherence-proposal/validate-review/${proposalId}
          `,
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
        queryClient.invalidateQueries([keys.personDocuments]);
        queryClient.invalidateQueries([keys.collaborator]);
        queryClient.invalidateQueries([keys.report]);

        setModal(false);

        useToastStandalone({
          title:
            "Agora é com a gente, iremos analisar o(s) documento(s) para dar continuidade a adesão do benefício, dentro de 48 horas daremos retorno.",
          status: "success",
          duration: 15000,
        });
      },
    },
  );

  return {
    isLoading,
    mutate,
  };
};

const linkDependant = (handleCloseModal?: () => void) => {
  const { isLoading, mutate } = useMutation(
    async ({ companyId, personId, ...data }: ILinkBeneficiaryDependantDTO) => {
      try {
        await apiRecord.post(
          `/companies-associated/${companyId}/link-beneficiary-dependant/${personId}`,
          data,
        );
      } catch (error: any) {
        throw new Warning(error.response.data.message, error?.response?.status);
      }
    },
    {
      onSuccess: () => {
        useToastStandalone({
          description: "Dependente vinculado com sucesso",
        });
        if (handleCloseModal) handleCloseModal();
      },
    },
  );

  return {
    mutate,
    isLoading,
  };
};

export default function useCollaborator() {
  return {
    getCollaborators,
    getResubmissionsDoc,
    createCollaborator,
    updateCollaborator,
    getPartners,
    disableCollaborator,
    getBeneficiary,
    getCollaboratorDoc,
    getBenefitsByBeneficiary,
    getBenefitsByBeneficiaryGroup,
    getFamilyComposition,
    getFamilyBeneficiaries,
    getBeneficiaryHistoric,
    getBenefitInCancel,
    getClassesBenefits,
    updateDependent,
    updateBenefitPriceContract,
    getPreRecordsPending,
    prefetchCollaboratorActived,
    getReasonsInactivation,
    getCancelCollaboratorDoc,
    getPreCads,
    updateCollaboratorPreCads,
    preCadsCollaborator,
    getPersonDocuments,
    activedPedingCollaborator,
    getDependents,
    checkByCpf,
    cancelProductInProcess,
    createDependent,
    getProposalAdherence,
    getCompanyContract,
    cancelActiveProduct,
    validateAdherenceProposal,
    inativeCollaboratorWithProduct,
    checkBirthDate,
    linkDependant,
  };
}

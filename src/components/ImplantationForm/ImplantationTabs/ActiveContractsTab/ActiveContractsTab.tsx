/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FormEvent, Fragment, useState } from "react";
import {
  ActionsWrapper,
  ContractAccordionDataWrapper,
  FormWrapper,
  HandleFieldWrapper,
  HelpContentDescription,
  HelpContentTitle,
  HelpContentWrapper,
  NotSendMessageFeedback,
  StyledWrapper,
  Title,
} from "./styled";
import { customTheme } from "../../../../theme";
import {
  StyledCompleteParagraph,
  StyledCompleteTitle,
  StyledCompleteWrapper,
  StyledRequiredText,
} from "../ColaboratorsTab/styled";
import SelectForm from "../../../SelectForm";
import ContractDataAccordion from "./ContractDataAccordion";
import { Button, Stack, Text } from "@chakra-ui/react";
import InputFile from "../../../InputFile";
import HelpPopOver from "../../../HelpPopOver";
import FormInput from "../../../FormInput";
import { useFieldArray, useForm } from "react-hook-form";
import {
  ActiveContractsRequest,
  activeContractsSchema,
} from "./validation-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaCircleCheck } from "react-icons/fa6";
import { apiSupport, apiUpload } from "../../../../services/api";
import axios from "axios";
import { useActiveContractsTab } from "../../../../hooks/useActiveContractsTab";
import {
  CallReasonSlugs,
  ICallData,
} from "../../../../models/use-implementation-tabs.d";
import { useGlobal } from "../../../../contexts/UserContext";
import { useQuery } from "react-query";
import { onlyNumberMask, phoneMask } from "../../../../utils";

interface Props {
  isComplete: boolean;
  refetchForms: () => Promise<any>;
  formId: string;
  callData: ICallData;
}

const ActiveContractsTab: React.FC<Props> = ({
  isComplete,
  refetchForms,
  formId: _formId,
  callData,
}) => {
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [selectValue, setSelectValue] = useState<{
    label: string;
    value: any;
  }>();

  const { company } = useGlobal();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<ActiveContractsRequest>({
    resolver: zodResolver(activeContractsSchema),
    reValidateMode: "onBlur",
    mode: "onBlur",
    defaultValues: {
      contractData: [
        {
          contractDocument: undefined,
          contato: undefined,
          emailContato: undefined,
          login: undefined,
          pass: undefined,
          telefoneContato: undefined,
        },
      ],
    },
  });

  const { data: callReason } = useQuery({
    queryFn: async () =>
      (
        await apiSupport.get<{
          id: string;
          name: string;
        }>(`/call-reasons/slug/${CallReasonSlugs.implFormCont}`)
      ).data,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "contractData",
  });

  const { sendContractData } = useActiveContractsTab();
  const { mutate, isLoading: isLoadingSendContract } = sendContractData(
    company!.externalCompanyId,
    refetchForms,
  );

  const handleSubmitContractData = async (data: ActiveContractsRequest) => {
    setIsLoadingSubmit(true);

    const messageData: Array<{
      login: string;
      pass: string;
      attachments: Array<string>;
      contato?: string;
      telefoneContato?: string;
      emailContato?: string;
    }> = [];

    await Promise.all(
      data.contractData.map(async (contract: any) => {
        const attachments: string[] = [];
        const contractDocument = contract.contractDocument[0];
        const tablePriceDocument =
          contract.tablePriceDocument?.[0] || undefined;

        await apiUpload
          .post("document", {
            key: contractDocument.name,
            path: "contratos",
            contentType: contractDocument.type,
            isPrivate: true,
          })
          .then(async (res) => {
            const blob: Blob = new Blob([contractDocument], {
              type: contractDocument.type,
            });
            await axios.put(res.data.url as string, blob, {
              headers: {
                "Content-Type": contractDocument.type,
              },
            });
            attachments.push(res.data.id);
          });

        if (tablePriceDocument)
          await apiUpload
            .post("document", {
              key: tablePriceDocument.name,
              path: "tabela_preco",
              contentType: tablePriceDocument.type,
              isPrivate: true,
            })
            .then(async (res) => {
              const blob: Blob = new Blob([tablePriceDocument], {
                type: tablePriceDocument.type,
              });
              await axios.put(res.data.url as string, blob, {
                headers: {
                  "Content-Type": tablePriceDocument.type,
                },
              });
              attachments.push(res.data.id);
            });
        messageData.push({
          attachments,
          contato: contract.contato,
          emailContato: contract.emailContato,
          login: contract.login,
          pass: contract.pass,
          telefoneContato: onlyNumberMask(contract.telefoneContato),
        });
      }),
    );

    mutate({
      answered: true,
      callData: {
        ...callData,
        callReasonId: callReason?.id || "",
        callReasonSubject: callReason?.name || "",
      },
      messageData,
    });

    setIsLoadingSubmit(false);
  };

  const isLoading = isLoadingSubmit || isLoadingSendContract;

  return (
    <StyledWrapper
      display="flex"
      flexDirection="column"
      alignItems={isComplete ? "center" : "flex-start"}
      justifyContent={isComplete ? "center" : "flex-start"}
    >
      {isComplete ? (
        <StyledCompleteWrapper>
          <FaCircleCheck size={64} color="#13DA63" />
          <StyledCompleteTitle>
            Informações enviadas com sucesso
          </StyledCompleteTitle>
          <StyledCompleteParagraph>
            Estamos analisando os documentos enviados e em breve seus produtos
            serão ativados na plataforma.
          </StyledCompleteParagraph>
          <StyledCompleteParagraph>
            Você pode adicionar ou alterar as informações a qualquer momento em
            “Precisa de Ajuda?”.
          </StyledCompleteParagraph>
        </StyledCompleteWrapper>
      ) : (
        <>
          <StyledRequiredText>
            (
            <span
              style={{
                color: customTheme.colors.brand[500],
              }}
            >
              {" "}
              *{" "}
            </span>
            ) indica os campos obrigatórios
          </StyledRequiredText>

          <FormWrapper>
            <SelectForm
              name="vigencyServicesChoice"
              label="Faça a portabilidade dos seus contratos ativos. Gerencie todos seus benefícios em um único lugar, de forma totalmente digital."
              placeholder="Selecionar"
              isRequired
              value={selectValue}
              handleChange={setSelectValue}
              options={[
                {
                  label: "Sim",
                  value: true,
                },
                {
                  label: "Não",
                  value: false,
                },
              ]}
            />
            <form onSubmit={handleSubmit(handleSubmitContractData)}>
              {selectValue &&
                selectValue.value &&
                fields.map((field, index) => (
                  <Fragment key={field.id}>
                    <ContractDataAccordion
                      title="Dados dos Contratos"
                      content={
                        <ContractAccordionDataWrapper>
                          <Stack spacing={16} direction="row">
                            <InputFile
                              handleFileInput={() => null}
                              isRequired
                              error={
                                !!errors?.contractData?.[index]
                                  ?.contractDocument?.message
                              }
                              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/vnd.ms-excel.template"
                              label="Documento do contrato"
                              name={`contractData.${index}.contractDocument`}
                              setFieldValue={setValue}
                            />
                            <InputFile
                              handleFileInput={() => null}
                              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/vnd.ms-excel.template"
                              label="Tabela de preço atualizada"
                              name={`contractData.${index}.tablePriceDocument`}
                              setFieldValue={setValue}
                            />
                          </Stack>
                          <Stack
                            direction="column"
                            spacing={15}
                            alignItems="flex-start"
                            flex={1}
                          >
                            <Title>
                              <Text>Dados de acesso</Text>
                              <HelpPopOver
                                content={
                                  <HelpContentWrapper>
                                    <HelpContentTitle>Ajuda</HelpContentTitle>
                                    <HelpContentDescription>
                                      Informe seus dados de acesso do fornecedor
                                      para integrá-lo à nossa plataforma.
                                    </HelpContentDescription>
                                    <HelpContentDescription>
                                      Fique tranquilo, essas informações serão
                                      usadas somente para refletir as
                                      informações da nossa plataforma no sistema
                                      do fornecedor.
                                    </HelpContentDescription>
                                  </HelpContentWrapper>
                                }
                              />
                            </Title>
                            <Stack
                              spacing={16}
                              direction="row"
                              flex={1}
                              w={"100%"}
                            >
                              <FormInput
                                label="Login de acesso"
                                isRequired
                                errors={errors?.contractData?.[index]?.login}
                                placeholder="Login"
                                name={`contractData.${index}.login`}
                                register={register}
                              />
                              <FormInput
                                label="Senha"
                                isRequired
                                type="password"
                                errors={errors?.contractData?.[index]?.pass}
                                placeholder="Senha"
                                name={`contractData.${index}.pass`}
                                register={register}
                              />
                            </Stack>
                            <Stack spacing={16} direction="row" w={"100%"}>
                              <FormInput
                                name={`contractData.${index}.contato`}
                                label="Nome do responsável(Fornecedor)"
                                placeholder="Nome"
                                register={register}
                              />
                              <FormInput
                                name={`contractData.${index}.telefoneContato`}
                                label="Telefone do responsável(Fornecedor)"
                                placeholder="Telefone"
                                maxLengthInpt={15}
                                onInput={(
                                  event: FormEvent<HTMLInputElement>,
                                ) => {
                                  event.currentTarget.value = phoneMask(
                                    event.currentTarget.value,
                                  );
                                }}
                                register={register}
                                errors={
                                  errors?.contractData?.[index]?.telefoneContato
                                }
                              />
                            </Stack>
                            <Stack
                              spacing={16}
                              direction="row"
                              maxW="45%"
                              w={"100%"}
                            >
                              <FormInput
                                name={`contractData.${index}.emailContato`}
                                label="E-mail do responsável(Fornecedor)"
                                placeholder="E-mail"
                                errors={
                                  errors?.contractData?.[index]?.emailContato
                                }
                                register={register}
                              />
                            </Stack>
                          </Stack>
                        </ContractAccordionDataWrapper>
                      }
                    />
                    <HandleFieldWrapper
                      display="flex"
                      justifyContent={
                        index === 0 ? "flex-end" : "space-between"
                      }
                    >
                      {index > 0 && (
                        <Button
                          variant="link"
                          fontWeight={400}
                          onClick={() => remove({} as any)}
                        >
                          -Remover contrato
                        </Button>
                      )}
                      {index === fields.length - 1 && (
                        <Button
                          variant="link"
                          fontWeight={400}
                          onClick={() => append({} as any)}
                        >
                          + Adicionar outro contrato
                        </Button>
                      )}
                    </HandleFieldWrapper>
                  </Fragment>
                ))}
              {selectValue && selectValue.value && (
                <ActionsWrapper>
                  <Button type="submit" paddingX={8} isDisabled={isLoading}>
                    Salvar
                  </Button>
                </ActionsWrapper>
              )}
              {selectValue && !selectValue.value && (
                <>
                  <NotSendMessageFeedback>
                    Você pode adicionar ou alterar as informações a qualquer
                    momento em “Precisa de Ajuda?”.
                  </NotSendMessageFeedback>
                  <ActionsWrapper>
                    <Button
                      paddingX={8}
                      isDisabled={isLoading}
                      onClick={() =>
                        mutate({
                          answered: true,
                          callData,
                          messageData: [],
                        })
                      }
                    >
                      Salvar
                    </Button>
                  </ActionsWrapper>
                </>
              )}
            </form>
          </FormWrapper>
        </>
      )}
    </StyledWrapper>
  );
};

export default ActiveContractsTab;

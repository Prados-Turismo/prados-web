import React, { FormEvent, useMemo, useState } from "react";
import { ActionsWrapper, BrokerNameWrapper, StyledWrapper } from "./styled";
import {
  StyledCompleteParagraph,
  StyledCompleteTitle,
  StyledCompleteWrapper,
  StyledRequiredText,
} from "../ColaboratorsTab/styled";
import SelectForm from "../../../SelectForm";
import { Button, Stack, Text } from "@chakra-ui/react";
import { FaCircleCheck } from "react-icons/fa6";
import HelpPopOver from "../../../HelpPopOver";
import {
  HelpContentDescription,
  HelpContentTitle,
  HelpContentWrapper,
} from "../ActiveContractsTab/styled";
import Asterisk from "../../../Asterisk";
import { Checkbox, CheckboxWrapper } from "../ImportPjsTab/styled";
import FormInput from "../../../FormInput";
import {
  CallReasonSlugs,
  ICallData,
} from "../../../../models/use-implementation-tabs.d";
import { BrokerRequest, brokerSchema } from "./validation-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBrokerTab } from "../../../../hooks/useBrokerTab";
import { useGlobal } from "../../../../contexts/UserContext";
import { useQuery } from "react-query";
import { apiSupport } from "../../../../services/api";
import { cnpjMask, onlyNumberMask, phoneMask } from "../../../../utils";

interface Props {
  isComplete: boolean;
  refetchForms: () => Promise<any>;
  formId: string;
  callData: ICallData;
}

const BrokerTab: React.FC<Props> = ({
  isComplete,
  refetchForms,
  formId,
  callData,
}) => {
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [haveBroker, setHaveBroker] = useState<{
    label: string;
    value: any;
  }>();
  const [notFoundOnList, setNotFoundOnList] = useState<boolean>(false);
  const [selectedBroker, setSelectedBroker] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<BrokerRequest>({
    resolver: zodResolver(brokerSchema),
    reValidateMode: "onBlur",
    mode: "onBlur",
  });
  const { company } = useGlobal();
  const { sendBrokerData, fetchBrokers } = useBrokerTab();

  const { brokerList } = fetchBrokers();

  const brokerListOptions = useMemo(() => {
    return (
      brokerList?.rows.map((broker) => ({
        label: broker.corporateName,
        value: broker.id,
      })) || []
    );
  }, [brokerList]);

  const { data: callReason } = useQuery({
    queryFn: async () =>
      (
        await apiSupport.get<{
          id: string;
          name: string;
        }>(`/call-reasons/slug/${CallReasonSlugs.implFormBrok}`)
      ).data,
  });

  const handleSubmitData = async (data: BrokerRequest) => {
    setIsLoadingSubmit(true);

    if (haveBroker && !haveBroker.value) {
      sendBrokerData(
        {
          answered: true,
          callData: {
            ...callData,
            callReasonId: callReason?.id || "",
            callReasonSubject: callReason?.name || "",
          },
          messageData: {
            attachments: [],
            callCase: "noBroker",
          },
        },
        formId,
        company!.externalCompanyId,
      ).then(() => {
        setIsLoadingSubmit(false);
        refetchForms();
      });

      return;
    }

    if (notFoundOnList && haveBroker && haveBroker.value) {
      if (!data.cnpj)
        setError("cnpj", {
          message: "Campo obrigatório",
        });

      if (!data.emailOperacional)
        setError("emailOperacional", {
          message: "Campo obrigatório",
        });
      if (!data.nomeContato)
        setError("nomeContato", {
          message: "Campo obrigatório",
        });
      if (!data.razaoSocial)
        setError("razaoSocial", {
          message: "Campo obrigatório",
        });
      if (!data.telefone)
        setError("telefone", {
          message: "Campo obrigatório",
        });

      if (Object.keys(errors).length > 0) {
        setIsLoadingSubmit(false);
        return;
      }

      const { cnpj, emailOperacional, nomeContato, razaoSocial, telefone } =
        data;

      sendBrokerData(
        {
          answered: true,
          callData: {
            ...callData,
            callReasonId: callReason?.id || "",
            callReasonSubject: callReason?.name || "",
          },
          messageData: {
            attachments: [],
            callCase: "companyNotFound",
            cnpj: cnpj ? onlyNumberMask(cnpj) : "",
            emailOperacional: emailOperacional || "",
            nomeContato: nomeContato || "",
            razaoSocial: razaoSocial || "",
            telefone: telefone ? onlyNumberMask(telefone) : "",
          },
        },
        formId,
        company!.externalCompanyId,
      ).then(() => {
        setIsLoadingSubmit(false);
        refetchForms();
      });

      return;
    }

    const broker = brokerList?.rows.find(
      (broker) => broker.id === selectedBroker,
    );

    sendBrokerData(
      {
        answered: true,
        callData: {
          ...callData,
          callReasonId: callReason?.id || "",
          callReasonSubject: callReason?.name || "",
        },
        messageData: {
          attachments: [],
          callCase: "missingLink",
          cnpj: broker?.cnpj || "",
          emailOperacional: broker?.companyBroker.operationalEmail || "",
          nomeContato: broker?.corporateName || "",
          razaoSocial: broker?.corporateName || "",
          telefone: broker?.companyBroker.phone || "",
        },
      },
      formId,
      company!.externalCompanyId,
    ).then(() => {
      setIsLoadingSubmit(false);
      refetchForms();
    });
  };

  return (
    <StyledWrapper>
      {isComplete ? (
        <StyledCompleteWrapper>
          <FaCircleCheck size={64} color="#13DA63" />
          <StyledCompleteTitle>
            Informações enviadas com sucesso
          </StyledCompleteTitle>
          <StyledCompleteParagraph>
            Recebemos todas as informações! Agora é com o nosso time.
          </StyledCompleteParagraph>
          <StyledCompleteParagraph>
            Você pode solicitar uma corretora a qualquer momento em: Preciso de
            Ajuda?.
          </StyledCompleteParagraph>
        </StyledCompleteWrapper>
      ) : (
        <>
          <StyledRequiredText>
            ( <Asterisk /> ) indica os campos obrigatórios
          </StyledRequiredText>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: "1.5rem",
            }}
            onSubmit={handleSubmit(handleSubmitData)}
          >
            <SelectForm
              name="haveBrokerCompany"
              label="Sua empresa já possui uma Corretora? "
              helpIcon={
                <HelpPopOver
                  content={
                    <HelpContentWrapper>
                      <HelpContentTitle>Ajuda</HelpContentTitle>
                      <HelpContentDescription>
                        A corretora é uma empresa que oferece um suporte
                        adicional, ajuda na tomada de decisões e nas escolhas
                        dos melhores produtos e serviços de acordo com a
                        necessidade. Tudo isso sem nenhum custo adicional
                      </HelpContentDescription>
                    </HelpContentWrapper>
                  }
                />
              }
              isRequired
              handleChange={(option) => setHaveBroker(option)}
              options={[
                {
                  label: "Sim",
                  value: true,
                },

                {
                  label: "Prefiro não informar",
                  value: false,
                },
              ]}
            />
            {haveBroker && haveBroker.value === true && (
              <BrokerNameWrapper>
                <SelectForm
                  name="brokerName"
                  label="Nome da corretora"
                  isRequired
                  handleChange={(value) => setSelectedBroker(value.value)}
                  options={brokerListOptions}
                />
                <CheckboxWrapper>
                  <Checkbox
                    onChange={(event) =>
                      setNotFoundOnList(event.target.checked ? true : false)
                    }
                  />
                  <span>Não localizei na listagem</span>
                </CheckboxWrapper>
              </BrokerNameWrapper>
            )}
            {notFoundOnList && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                <h2>Dados de contato da corretora</h2>
                <Stack direction="row" gap={16}>
                  <FormInput
                    isRequired
                    name="razaoSocial"
                    label="Razão Social"
                    errors={errors?.razaoSocial}
                    register={register}
                  />
                  <FormInput
                    isRequired
                    name="cnpj"
                    label="CNPJ"
                    onInput={(event: FormEvent<HTMLInputElement>) => {
                      event.currentTarget.value = cnpjMask(
                        event.currentTarget.value,
                      );
                    }}
                    register={register}
                    errors={errors?.cnpj}
                  />
                </Stack>
                <Stack direction="row" gap={16}>
                  <FormInput
                    isRequired
                    name="nomeContato"
                    label="Nome do responsável(Corretor)"
                    errors={errors?.nomeContato}
                    register={register}
                  />
                  <FormInput
                    isRequired
                    name="telefone"
                    label="Telefone do responsável(Corretor)"
                    placeholder="Telefone"
                    maxLengthInpt={15}
                    onInput={(event: FormEvent<HTMLInputElement>) => {
                      event.currentTarget.value = phoneMask(
                        event.currentTarget.value,
                      );
                    }}
                    errors={errors?.telefone}
                    register={register}
                  />
                </Stack>
                <Stack direction="row" gap={16}>
                  <FormInput
                    isRequired
                    name="emailOperacional"
                    label="E-mail do responsável(Corretor)"
                    maxWidth="45%"
                    errors={errors?.emailOperacional}
                    register={register}
                  />
                </Stack>
              </div>
            )}
            {haveBroker && !haveBroker.value && (
              <Text>Entraremos em contato lhe fornecendo explicações</Text>
            )}

            <ActionsWrapper>
              <Button paddingX={8} type="submit" isDisabled={isLoadingSubmit}>
                Salvar
              </Button>
            </ActionsWrapper>
          </form>
        </>
      )}
    </StyledWrapper>
  );
};

export default BrokerTab;

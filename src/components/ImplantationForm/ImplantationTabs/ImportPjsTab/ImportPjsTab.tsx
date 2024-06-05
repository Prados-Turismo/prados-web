import { Button, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCircleCheck } from "react-icons/fa6";
import { TfiDownload } from "react-icons/tfi";
import { useQuery } from "react-query";
import { useGlobal } from "../../../../contexts/UserContext";
import { useImportPjsTab } from "../../../../hooks/useImportPjsTab";
import {
  CallReasonSlugs,
  ICallData,
} from "../../../../models/use-implementation-tabs.d";
import { apiSupport, apiUpload } from "../../../../services/api";
import Asterisk from "../../../Asterisk";
import InputFile from "../../../InputFile";
import {
  ActionsWrapper,
  StyledCompleteParagraph,
  StyledCompleteTitle,
  StyledCompleteWrapper,
  StyledDescription,
  StyledDownloadLayoutButton,
  StyledImportFileWrapper,
  StyledRequiredText,
  StyledTitle,
} from "../ColaboratorsTab/styled";
import { Checkbox, CheckboxWrapper, StyledWrapper } from "./styled";
import { ImportPjsRequest, importPjsSchema } from "./validation-schema";

interface Props {
  isComplete: boolean;
  refetchForms: () => Promise<any>;
  formId: string;
  callData: ICallData;
}

const ImportPjsTab: React.FC<Props> = ({
  isComplete,
  refetchForms,
  formId,
  callData,
}) => {
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const { sendImportPjsData } = useImportPjsTab();
  const [willSubmitFile, setWillSubmitFile] = useState<boolean>(true);
  const { company } = useGlobal();
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm<ImportPjsRequest>({
    resolver: zodResolver(importPjsSchema),
    reValidateMode: "onBlur",
    mode: "onBlur",
  });

  const { data: callReason } = useQuery({
    queryFn: async () =>
      (
        await apiSupport.get<{
          id: string;
          name: string;
        }>(`/call-reasons/slug/${CallReasonSlugs.implFormPj}`)
      ).data,
  });

  const handleSubmitData = async (data: ImportPjsRequest) => {
    if (willSubmitFile && !data.importFile) {
      setError("importFile", {
        message: "Selecione o arquivo de importação",
      });
      return;
    }

    setIsLoadingSubmit(true);

    if (!willSubmitFile) {
      await sendImportPjsData(
        {
          answered: true,
          callData: {
            ...callData,
            callReasonId: callReason?.id || "",
            callReasonSubject: callReason?.name || "",
          },
          messageData: {
            attachments: [],
            resposta: "Não possuo outras empresas juridicas e associadas",
          },
        },
        formId,
        company!.externalCompanyId,
      ).then(() => refetchForms());

      setIsLoadingSubmit(false);
      return;
    }

    const file = data.importFile![0];
    await apiUpload
      .post("document", {
        key: file.name,
        path: "prestadores_servicos",
        contentType: file.type,
        isPrivate: true,
      })
      .then(async (res) => {
        const blob: Blob = new Blob([file], { type: file.type });
        Promise.all([
          axios.put(res.data.url as string, blob, {
            headers: {
              "Content-Type": file.type,
            },
          }),
          sendImportPjsData(
            {
              answered: true,
              callData: {
                ...callData,
                callReasonId: callReason?.id || "",
                callReasonSubject: callReason?.name || "",
              },
              messageData: {
                attachments: [res.data.id],
                resposta: "Arquivo enviado para importação",
              },
            },
            formId,
            company!.externalCompanyId,
          ).then(() => refetchForms()),
        ]);
      });

    setIsLoadingSubmit(false);
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
            Recebemos todas as informações! Logo, logo elas estarão integradas à
            plataforma. :)
          </StyledCompleteParagraph>
          <StyledCompleteParagraph>
            Você pode adicionar parceiros ou alterar as informações a qualquer
            momento em “Parceiros”.
          </StyledCompleteParagraph>
        </StyledCompleteWrapper>
      ) : (
        <>
          <StyledRequiredText>
            ( <Asterisk /> ) indica os campos obrigatórios
          </StyledRequiredText>
          <StyledDescription>
            Cadastre todos os prestadores de serviços de uma só vez. Baixe nosso
            modelo de arquivo e preencha com as informações necessárias.
          </StyledDescription>
          <StyledDownloadLayoutButton
            variant="link"
            onClick={() =>
              window.open(
                "https://s3.amazonaws.com/fiibo.digital/static/media/Importacao+de+parceiros.xlsx",
                "_self",
              )
            }
          >
            <TfiDownload size={14} />
            <Text>Baixar modelo de arquivo</Text>
          </StyledDownloadLayoutButton>
          <form
            onSubmit={handleSubmit(handleSubmitData)}
            style={{ width: "100%" }}
          >
            <StyledImportFileWrapper>
              <StyledTitle>
                Importar empresas parceiras e filiais <Asterisk />
              </StyledTitle>
              <InputFile
                handleFileInput={() => null}
                name="importFile"
                isRequired
                error={!!errors?.importFile?.message}
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/vnd.ms-excel.template"
                setFieldValue={setValue}
              />
              <CheckboxWrapper>
                <Checkbox
                  onChange={(event) => {
                    setWillSubmitFile(event.target.checked ? false : true);
                  }}
                />
                <Text>Não possuo outras empresas jurídicas associadas</Text>
              </CheckboxWrapper>
            </StyledImportFileWrapper>
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

export default ImportPjsTab;

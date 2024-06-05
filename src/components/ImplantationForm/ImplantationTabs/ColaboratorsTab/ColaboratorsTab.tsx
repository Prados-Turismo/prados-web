import { Button, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCircleCheck } from "react-icons/fa6";
import { TfiDownload } from "react-icons/tfi";
import { useQuery } from "react-query";
import { useGlobal } from "../../../../contexts/UserContext";
import { useColaboratorsTab } from "../../../../hooks/useColaboratorsTab";
import { useToastStandalone } from "../../../../hooks/useToastStandalone";
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
  StyledWrapper,
} from "./styled";
import { ColaboratorRequest, colaboratorSchema } from "./validation-schema";

interface Props {
  isComplete: boolean;
  refetchFroms: () => Promise<any>;
  formId: string;
  callData: ICallData;
}

const ColaboratorsTab: React.FC<Props> = ({
  isComplete,
  refetchFroms,
  formId,
  callData,
}) => {
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [files, setFiles] = useState<FileList>();

  const { sendColaboratorData } = useColaboratorsTab();

  const { company } = useGlobal();

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ColaboratorRequest>({
    resolver: zodResolver(colaboratorSchema),
    reValidateMode: "onBlur",
    mode: "onBlur",
  });

  const { data: callReason } = useQuery({
    queryFn: async () =>
      (
        await apiSupport.get<{
          id: string;
          name: string;
        }>(`/call-reasons/slug/${CallReasonSlugs.implFormCol}`)
      ).data,
  });

  const handleSubmitData = async () => {
    setIsLoadingSubmit(true);

    if (files) {
      const file = files[0];

      await apiUpload
        .post("document", {
          key: file.name,
          path: "titulares",
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
            await sendColaboratorData(
              {
                answered: true,
                callData: {
                  ...callData,
                  callReasonId: callReason?.id || "",
                  callReasonSubject: callReason?.name || "",
                },
                messageData: {
                  attachments: [res.data.id],
                },
              },
              formId,
              company!.externalCompanyId,
            ).then(() => {
              refetchFroms();
            }),
          ]);
        });
    }

    setIsLoadingSubmit(false);
  };

  const isFileValid = (file: File) => {
    const allowedMimeTypes = [
      "csv",
      "text/csv",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
      "application/vnd.ms-excel.template",
    ];

    const isValidFormat = allowedMimeTypes.includes(file.type);

    return { isValidFormat };
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setFiles(undefined);

    if (files) {
      const invalidFormatFiles = Array.from(files).filter(
        (file) => !isFileValid(file).isValidFormat,
      );

      if (invalidFormatFiles.length > 0) {
        useToastStandalone({
          title: "Formato de arquivo inválido!",
          description:
            "Por favor, escolha um arquivo nos formatos CSV, XLS ou XLSX.",
          status: "warning",
          duration: 10000,
        });
      } else {
        if (files) {
          setFiles(event.target.files || undefined);
          event.stopPropagation();
        }
      }
    }
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
            Em breve todos os titulares e dependentes estarão disponíveis no
            menu “Pessoas”.Você pode acompanhar o andamento do cadastro em
            “Precisa de Ajuda?”
          </StyledCompleteParagraph>
        </StyledCompleteWrapper>
      ) : (
        <>
          <StyledRequiredText>
            ( <Asterisk /> ) indica os campos obrigatórios
          </StyledRequiredText>
          <StyledDescription>
            Cadastre os titulares e seus dependentes de forma ágil e simples.
            Para facilitar, baixe o nosso modelo de arquivo e preencha com as
            informações necessárias.
          </StyledDescription>
          <StyledDownloadLayoutButton
            variant="link"
            onClick={() =>
              window.open(
                "https://s3.amazonaws.com/fiibo.digital/static/media/import_vidas.xlsx",
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
                Importar planilha de pessoas <Asterisk />
              </StyledTitle>
              <InputFile
                name="importFile"
                isRequired
                error={!!errors?.importFile?.message}
                handleFileInput={(
                  event: React.ChangeEvent<HTMLInputElement>,
                ) => {
                  handleFileChange(event);
                }}
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/vnd.ms-excel.template"
                onClear={() => setFiles(undefined)}
                setFieldValue={setValue}
              />
            </StyledImportFileWrapper>
            <ActionsWrapper>
              <Button
                paddingX={8}
                type="submit"
                isDisabled={
                  (files && files?.length < 1) ||
                  files === undefined ||
                  isLoadingSubmit
                }
              >
                Salvar
              </Button>
            </ActionsWrapper>
          </form>
        </>
      )}
    </StyledWrapper>
  );
};

export default ColaboratorsTab;

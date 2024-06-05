import {
  Button,
  CircularProgress,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Popover,
  PopoverTrigger,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDropzone, FileRejection, FileWithPath } from "react-dropzone";
import { useGlobal } from "../../../../contexts/UserContext";
import useNeedHelp from "../../../../hooks/useNeedHelp";
import { useToastStandalone } from "../../../../hooks/useToastStandalone";
import { IDataTopic } from "../../../../models/needHelp.model";
import {
  Content,
  Text,
  DropzoneBox,
  DropZoneContainer,
  FilesBoxDescription,
  FileContent,
  FilesWrapper,
  FileWrapper,
  StyledPopoverContent,
  StyledBody,
  StylePopoverTitle,
  StylePopoverParagraph,
} from "./styled";
import "../../styles.css";
import { apiUpload } from "../../../../services/api";
import axios from "axios";
import usePartner from "../../../../hooks/usePartner";
import { IIncorrectBornDateData } from "../../need-help";

import { AiFillQuestionCircle } from "react-icons/ai";
import { Checkbox } from "../../../../components/ImplantationForm/ImplantationTabs/ImportPjsTab/styled";

const defaultForm = {
  empresa: "",
  hub: "",
  assunto_chamado: "",
  messagem: "",
  assunto: "",
  callReasonSubject: "",
};

const NewRequest = ({
  incorrectBornDateData,
}: {
  incorrectBornDateData?: IIncorrectBornDateData;
}) => {
  const { getTopic, handleSubmitRequest } = useNeedHelp();
  const { company, role, user } = useGlobal();
  const { isLoading, data } = getTopic(role!.id);
  const [form, setForm] = useState(defaultForm);

  const [hub, setHub] = useState<{
    id: string;
    name: string;
  }>(
    {} as {
      id: string;
      name: string;
    },
  );
  const [topicSelected, setTopicSelected] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [dataFile, setDataFile] = useState<FileWithPath[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [files, setFiles] = useState<any>(null);

  const { submitRequest, isLoadingSubmit } = handleSubmitRequest();
  const [isLoadingDoc, setIsLoadingDoc] = useState(false);
  const [shared, setShared] = useState<boolean>(false);

  const submit = async () => {
    const attachments: string[] = [];
    setIsLoadingDoc(true);

    for (const file of dataFile) {
      await apiUpload
        .post("document", {
          key: file.name,
          path: "chamados",
          contentType: file.type,
          isPrivate: true,
        })
        .then(async (res) => {
          const blob: Blob = new Blob([file], { type: file.type });
          axios.put(res.data.url as string, blob, {
            headers: {
              "Content-Type": file.type,
            },
          });

          attachments.push(res.data.id);
        });
    }

    submitRequest({
      data: {
        attachments,
        callReasonId: topicSelected?.id ?? "",
        callReasonSubject:
          form?.assunto.length > 0 ? form?.assunto : form?.callReasonSubject,
        companyId: company?.externalCompanyId ?? "",
        companyName: company?.name ?? "",
        hubId: hub.id,
        hubName: hub.name,
        message: form.messagem,
        requestingUser: user?.email ?? "",
        requestingUserName: user?.username ?? "",
        isAdmin: false,
        shared,
      },
      role: role!.id,
      companyId: company!.externalCompanyId,
    });

    setForm(defaultForm);
    setDataFile([]);
    setFiles(null);
    setIsLoadingDoc(false);
    setShared(false);
  };

  const onDrop = async (
    acceptedFiles: FileWithPath[],
    fileRejections: FileRejection[],
  ) => {
    if (fileRejections.length > 0) {
      useToastStandalone({
        title: `${
          fileRejections[0].errors[0].code === "file-invalid-type"
            ? `Arquivo inválido!
                Tipos de arquivos permitidos: (PDF, JPEG, PNG, PDF, DOC, XLSX, XLS, XLT, XML, RAR ou ZIP)`
            : fileRejections[0].errors[0].code === "too-many-files"
            ? "Só é permitido o upload de apenas 1 arquivo!"
            : fileRejections[0].errors[0].code === "file-too-large"
            ? "limite máximo do tamanho do arquivo para Upload: 80MB"
            : fileRejections[0].errors[0].message
        }`,
        description:
          fileRejections[0].errors[0].code === "too-many-files"
            ? "Para incluir mais de um arquivo, utilize a opção de compactar pasta(.zip) do seu dispositivo com todos os arquivos necessários e faça o upload do arquivo compactado."
            : "",
        status: "error",
      });
    }
    if (acceptedFiles.length > 0) {
      setDataFile(acceptedFiles.concat(dataFile));

      setFiles(
        (acceptedFiles.length > 0
          ? acceptedFiles.map((file: FileWithPath, index) => (
              <li key={file.path}>
                {file.path} - {file.size} bytes
              </li>
            ))
          : []
        ).concat(files && files.length > 0 ? files : []),
      );
    } else {
      setDataFile([]);
      setFiles(null);
    }
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
      "application/vnd.ms-excel": [],
      "text/csv": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [],
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
      "application/pdf": [],
      "application/docx": [],
      "text/plain": [],
      "application/msword": [],
      "application/zip": [],
      "application/x-zip-compressed": [],
      "multipart/x-zip": [],
      "application/x-rar-compressed": [".rar"],
      "application/octet-stream": [],
    },
    maxFiles: 30,
    maxSize: 80000000,
    multiple: true,
  });
  const removeFile = (key: string) => {
    const newDataFiles = dataFile.filter((file: any) => file.path !== key);
    const newFiles = files.filter((file: any) => file.key !== key);
    setDataFile(newDataFiles);
    setFiles(newFiles);
  };

  const { getPartnerDetails } = usePartner();

  const { data: companyData } = getPartnerDetails({
    companyId: company!.externalCompanyId,
  });

  useEffect(() => {
    setHub({
      id: companyData?.companyAssociated.hub.id ?? "",
      name: companyData?.companyAssociated.hub.name ?? "",
    });
  }, [companyData]);

  useEffect(() => {
    if (incorrectBornDateData) {
      const callReason = data.find(
        (callReason) =>
          callReason.slug === "changeDataWebCompany" ||
          callReason.slug === "changeDataWebBroker",
      );
      setForm((prev) => ({
        ...prev,
        messagem: incorrectBornDateData?.message,
        assunto_chamado: callReason?.id || "",
      }));

      setTopicSelected({
        id: callReason?.id || "",
        name: callReason?.name || "",
      });
    }
  }, [incorrectBornDateData, data]);

  return (
    <Content>
      <div className="newRequestTitle">
        Dúvidas, sugestões ou algum problema?
        <span>Registre aqui sua solicitação para o nosso time.</span>
      </div>

      <div className="newRequestForm">
        <FormControl isRequired>
          <FormLabel htmlFor="messagem">Assunto</FormLabel>
          {isLoading ? (
            <CircularProgress
              color={"brand.500"}
              size={5}
              isIndeterminate
            ></CircularProgress>
          ) : (
            <>
              <Select
                placeholder="Selecione um assunto"
                id="assunto_chamado"
                name="assunto_chamado"
                onChange={(e) => {
                  setForm((prev) => ({
                    ...prev,
                    assunto_chamado: e.target.value,
                    assunto: "",
                    callReasonSubject:
                      e.target.options[e.target.selectedIndex].text,
                  }));
                  setTopicSelected({
                    id: e.target.options[e.target.selectedIndex].value,
                    name: e.target.options[e.target.selectedIndex].text,
                  });
                }}
                value={form.assunto_chamado}
              >
                {data
                  .filter((topic: IDataTopic) => topic)
                  .map((topic: IDataTopic) => (
                    <option key={topic?.id} value={topic?.id}>
                      {topic?.name}
                    </option>
                  ))}
              </Select>
              {form.assunto_chamado.length < 1 ? (
                <FormErrorMessage>Preencha o assunto</FormErrorMessage>
              ) : null}
            </>
          )}
        </FormControl>
        <>
          <FormControl
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <Checkbox onChange={(event) => setShared(event.target.checked)} />
            <Text
              style={{
                color: "#707070",
                fontSize: "0.875rem",
                padding: 0,
              }}
            >
              {`Compartilhar informações com a ${
                role?.id === "6" ? "empresa" : "corretora"
              }`}
            </Text>
            <Popover trigger="hover">
              <PopoverTrigger>
                <button style={{ background: "transparent" }}>
                  <AiFillQuestionCircle size={19} />
                </button>
              </PopoverTrigger>
              <StyledPopoverContent>
                <StyledBody>
                  <StylePopoverTitle>Ajuda</StylePopoverTitle>
                  <StylePopoverParagraph>
                    Compartilhe este chamado com todos os usuários
                    <br />
                    da empresa selecionada
                  </StylePopoverParagraph>
                </StyledBody>
              </StyledPopoverContent>
            </Popover>
          </FormControl>
        </>
        {(topicSelected?.name === "Outros" ||
          topicSelected?.name === "Outro") && (
          <FormControl>
            <Input
              id="assunto"
              name="assunto"
              placeholder="Digite o Assunto"
              onChange={({ target: { value } }) =>
                setForm((prev) => ({
                  ...prev,
                  assunto: value,
                }))
              }
              maxLength={50}
              value={form.assunto}
              height="150px"
            />
            {form.assunto.length < 5 ? (
              <Text>
                A mensagem deve ser com mínimo 5 e máximo 50 caracteres
              </Text>
            ) : null}
          </FormControl>
        )}

        <FormControl isRequired>
          <FormLabel htmlFor="messagem">Mensagem</FormLabel>
          <Textarea
            id="messagem"
            name="messagem"
            placeholder="Digite a mensagem"
            onChange={({ target: { value } }) =>
              setForm((prev) => ({ ...prev, messagem: value }))
            }
            maxLength={1000}
            value={form.messagem}
            height="150px"
          />
          {form.messagem.length < 15 ? (
            <Text>
              A descrição deve conter no mínimo 15 e no máximo 1000 caracteres.
            </Text>
          ) : null}
        </FormControl>

        <DropZoneContainer>
          <DropzoneBox
            {...getRootProps()}
            borderColor={files && files.length > 0 && "brand.500"}
          >
            <input
              {...getInputProps({
                onChange: (event) => {
                  setFiles(event.target.files);
                },
              })}
            />
            <FilesWrapper>
              {files &&
                files.length > 0 &&
                files.map((file: any, index: number) => (
                  <FileWrapper key={file.path} style={{}}>
                    <FileContent key={file.key}>
                      {file.key}
                      <button
                        {...getInputProps({
                          onClick: () => removeFile(file.key),
                        })}
                        style={{
                          color: "white",
                          fontWeight: 400,
                          width: "24px",
                        }}
                      >
                        x
                      </button>
                    </FileContent>
                  </FileWrapper>
                ))}
              {(!files || files.length === 0) && (
                <FilesBoxDescription>
                  Arraste e solte o(s) arquivo(s) aqui ou clique para selecionar
                  o(s) arquivo(s)
                </FilesBoxDescription>
              )}
            </FilesWrapper>
          </DropzoneBox>
          <Text
            fontWeight="500"
            color="text.third"
            textAlign="justify"
            marginTop="10px"
          >
            Apenas arquivos nos seguintes formatos podem ser incluídos como
            anexo: PDF, JPEG, PNG, DOC, XLSX, XLS, XLT, XML, RAR ou ZIP. O
            tamanho do arquivo não pode ultrapassar 50mb.
          </Text>
        </DropZoneContainer>

        <Button
          isLoading={isLoadingSubmit || isLoadingDoc}
          isDisabled={
            isLoadingSubmit ||
            form.assunto_chamado.length < 1 ||
            ((topicSelected?.name === "Outros" ||
              topicSelected?.name === "Outro") &&
              form.assunto.length < 5) ||
            form.messagem.length < 15
          }
          onClick={submit}
          width="107px"
          margin="10px auto 0"
        >
          Enviar
        </Button>
      </div>
    </Content>
  );
};

export default NewRequest;

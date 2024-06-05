import { Button } from "@chakra-ui/button";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";
import { useState } from "react";
import { FileRejection, FileWithPath, useDropzone } from "react-dropzone";
import InfiniteScroll from "react-infinite-scroll-component";

import AccordionContentBox from "../../../../../components/AccordionContentBox/AccordionContentBox";
import Loading from "../../../../../components/Loading";
import { dateFormat, timeFormat } from "../../../../../utils/fieldFormat";

import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Textarea } from "@chakra-ui/textarea";
import { IChat } from "./types";

import { CircularProgress } from "@chakra-ui/progress";
import { useToastStandalone } from "../../../../../hooks/useToastStandalone";
import { apiSupport, apiUpload } from "../../../../../services/api";

// Styles
import axios from "axios";
import { useGlobal } from "../../../../../contexts/UserContext";
import useNeedHelp from "../../../../../hooks/useNeedHelp";
import { keys, queryClient } from "../../../../../services/query";
import {
  FileContent,
  FileWrapper,
  FilesBoxDescription,
  FilesWrapper,
} from "../../NewRequest/styled";
import DownloadDocumentButton from "./DownloadDocumentButton";
import {
  ChatContent,
  ChatNewContent,
  ChatScroll,
  DropZoneContainer,
  DropzoneBox,
  Switch,
} from "./styled";
import { capitalize } from "../../../../../utils/capitalize";
import AlertNoDataFound from "../../../../../components/AlertNoDataFound";

const Chat = ({ item, status }: IChat) => {
  const [loadingSend, setLoadingSend] = useState<boolean>(false);
  const { role } = useGlobal();
  const { getMessageChat } = useNeedHelp();
  const [hasNewMessage, setHasNewMessage] = useState<boolean>(false);
  const [hasFile, setHasFile] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState<string>("");
  const [dataFile, setDataFile] = useState<FileWithPath[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [files, setFiles] = useState<any>(null);
  const [break600] = useMediaQuery("(max-width: 600px)");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const selectedRole =
    role?.id === "3"
      ? "beneficiary"
      : role?.id === "6"
      ? "brokerAgent"
      : "company";
  const {
    isLoading,
    data: messages,
    hasMore,
  } = getMessageChat({
    currentPage,
    pageSize: 200,
    selectedRole,
    callId: item.id,
  });

  const sendMessage = async () => {
    setLoadingSend(true);
    const attachments: string[] = [];
    await new Promise(async (resolve) => {
      if (dataFile && hasFile) {
        for await (const file of dataFile) {
          const savedFileData = await apiUpload.post("document", {
            key: file.name,
            path: "chamados",
            contentType: file.type,
            isPrivate: true,
          });

          const blob: Blob = new Blob([file], { type: file.type });
          axios.put(savedFileData.data.url as string, blob, {
            headers: {
              "Content-Type": file.type,
            },
          });

          attachments.push(savedFileData.data.id);
        }
      }
      resolve(true);
    });

    const data = {
      message: newMessage,
      requestingUserName: item.requestingUserName,
      isAdmin: false,
      status: "pending",
      attachments,
    };

    await apiSupport
      .post(`/calls/${item?.id}/messages`, data)
      .then(async () => {
        queryClient.invalidateQueries([keys.needHelp, "A"]);
        queryClient.fetchQuery([keys.needHelp, "A"]);
        // setMessages((e) => [...res.data, ...e])
        queryClient.invalidateQueries([keys.message]);
        queryClient.fetchQuery([keys.message]);

        setHasFile(false);
        setHasNewMessage(false);
        setNewMessage("");
        setDataFile([]);
        setFiles(null);
        useToastStandalone({
          title: "Solicitação Enviada!",
          description: `Nosso time já recebeu seu pedido de suporte. Fique tranquilo, você vai receber uma resposta em até 48h.`,
          status: "success",
          duration: 10000,
        });
      })
      .catch((err) => {
        useToastStandalone({
          title: "Não foi possível enviar a solicitação!",
          description: `${err?.response?.data?.message || ""}`,
          status: "error",
        });
      })
      .finally(() => {
        setLoadingSend(false);
      });
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
    // noClick: true,
    // noKeyboard: true,
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
  return (
    <AccordionContentBox title="">
      {isLoading && (
        <Box marginTop="30px">
          <Loading />
        </Box>
      )}

      {!isLoading && (
        <>
          <ChatContent
            alignItems={break600 ? "flex-end" : "center"}
            justifyContent={break600 ? "flex-end" : "center"}
          >
            <ChatScroll
              id={"scrollableDiv" + item?.id.toString()}
              maxWidth={break600 ? "310px" : "1000px"}
              border={messages.length > 0 ? "1px solid #dbdbdb" : "unset"}
              margin={break600 ? "20px 20px 0" : "20px 0 0"}
            >
              {messages && messages.length > 0 ? (
                <>
                  <InfiniteScroll
                    dataLength={messages?.length}
                    // next={() => setCurrentPage((e) => e + 1)}
                    next={() => false}
                    initialScrollY={300}
                    style={{
                      display: "flex",
                      flexDirection: "column-reverse",
                    }}
                    inverse={true}
                    hasMore={hasMore}
                    loader={""}
                    // loader={
                    //   <Text paddingTop="20px">Carregando mensagens...</Text>
                    // }
                    scrollableTarget={"scrollableDiv" + item?.id.toString()}
                  >
                    {messages.map((msg) => (
                      <Box
                        key={msg.id}
                        margin="10px"
                        display="flex"
                        justifyContent="flex-end"
                      >
                        <Box width="100%" textAlign="left">
                          <Text fontSize="14px" paddingLeft="5px">
                            {capitalize(msg?.requestingUserName)} -{" "}
                            {dateFormat(new Date(msg?.createdAt))} -{" "}
                            {timeFormat(new Date(msg?.createdAt))}
                          </Text>
                          <Box
                            boxShadow="0 2px 4px rgb(0 0 0 / 25%)"
                            borderRadius="10px"
                            padding="10px"
                            background="#fff"
                            fontSize="16px"
                          >
                            <Text
                              whiteSpace="normal"
                              dangerouslySetInnerHTML={{
                                __html: msg?.message || "",
                              }}
                            />
                            <Flex flexWrap="wrap" gap="5px">
                              {msg.attachments.map((att, index) => (
                                <DownloadDocumentButton
                                  id={att.attachmentToken}
                                  key={att.id}
                                  index={index + 1}
                                />
                              ))}
                            </Flex>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </InfiniteScroll>
                </>
              ) : (
                <AlertNoDataFound title="Não há mensagens" />
              )}
            </ChatScroll>

            {status === "A" && (
              <ChatNewContent
                maxWidth={break600 ? "310px" : "1000px"}
                background={hasNewMessage ? "#fff" : "unset"}
                boxShadow={
                  hasNewMessage ? "0 2px 4px rgb(0 0 0 / 25%)" : "unset"
                }
                borderRadius={hasNewMessage ? "10px" : "unset"}
                border={hasNewMessage ? "1px solid #dbdbdb" : "unset"}
              >
                {hasNewMessage ? (
                  <Box display="flex" width="100%">
                    <Box display="flex" flexDirection="column" width="100%">
                      <Textarea
                        id="messagem"
                        name="messagem"
                        placeholder="Digite a mensagem"
                        onChange={({ target: { value } }) =>
                          setNewMessage(value)
                        }
                        value={newMessage}
                        _focus={{ border: `1px solid brand.500` }}
                        style={{ borderColor: "brand.500", height: "90px" }}
                        maxLength={1000}
                      />
                      {newMessage.length < 15 || newMessage.length > 300 ? (
                        <Text
                          color="rgb(229, 62, 62)"
                          fontSize="15px"
                          padding="5px 0 0 5px"
                          textAlign="left"
                          alignItems="left"
                          fontWeight={500}
                        >
                          A descrição deve conter no mínimo 15 e no máximo 1000
                          caracteres.
                        </Text>
                      ) : null}

                      <FormControl
                        display="flex"
                        alignItems="center"
                        marginTop="20px"
                        paddingLeft="5px"
                      >
                        <FormLabel
                          fontSize="17px"
                          fontWeight="bold"
                          htmlFor="newFile"
                          mb="0"
                          cursor="pointer"
                        >
                          Deseja anexar arquivo?
                        </FormLabel>
                        <Switch
                          id="newFile"
                          isChecked={hasFile}
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>,
                          ) => {
                            setHasFile(event.target.checked);
                          }}
                        />
                        <Text
                          fontSize="17px"
                          fontWeight="bold"
                          marginLeft="10px"
                        >
                          {hasFile ? "Sim" : "Não"}
                        </Text>
                      </FormControl>

                      <Flex>
                        {hasFile && (
                          <DropZoneContainer w="80%">
                            <DropzoneBox
                              {...getRootProps()}
                              borderColor="brand.500"
                            >
                              <input {...getInputProps()} />
                              <FilesWrapper>
                                {files &&
                                  files.length > 0 &&
                                  files.map((file: any, index: number) => (
                                    <FileWrapper key={file?.key} style={{}}>
                                      <FileContent key={file.key}>
                                        {file.key}
                                        <button
                                          {...getInputProps({
                                            onClick: () => removeFile(file.key),
                                          })}
                                          style={{
                                            color: "white",
                                            fontWeight: 400,
                                          }}
                                        >
                                          x
                                        </button>
                                      </FileContent>
                                    </FileWrapper>
                                  ))}
                                {(!files || files.length === 0) && (
                                  <FilesBoxDescription>
                                    Arraste e solte o(s) arquivo(s) aqui ou
                                    clique para selecionar o(s) arquivo(s)
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
                              Apenas arquivos nos seguintes formatos podem ser
                              incluídos como anexo: PDF, JPEG, PNG, DOC, XLSX,
                              XLS, XLT, XML, RAR ou ZIP. O tamanho do arquivo
                              não pode ultrapassar 50mb.
                            </Text>
                          </DropZoneContainer>
                        )}

                        <Box
                          display="flex"
                          w="100%"
                          justifyContent={"flex-end"}
                          gap="10px"
                          margin={hasFile ? "0px 20px 85px" : "0px 20px"}
                        >
                          {loadingSend ? (
                            <Box
                              width="102px"
                              display="flex"
                              justifyContent="center"
                              padding={hasFile ? "0 0 20px" : "35px 0 0"}
                            >
                              <CircularProgress
                                color="brand.500"
                                size={7}
                                isIndeterminate
                              ></CircularProgress>
                            </Box>
                          ) : (
                            <>
                              <Button
                                onClick={() => {
                                  setHasNewMessage(false);
                                  setNewMessage("");
                                  setHasFile(false);
                                  setDataFile([]);
                                  setFiles(null);
                                }}
                                variant="outline"
                              >
                                Cancelar
                              </Button>
                              <Button
                                isDisabled={
                                  newMessage.length < 15 ||
                                  newMessage.length > 300 ||
                                  (hasFile && !dataFile)
                                }
                                onClick={sendMessage}
                              >
                                Enviar
                              </Button>
                            </>
                          )}
                        </Box>
                      </Flex>
                    </Box>
                  </Box>
                ) : (
                  <Button onClick={() => setHasNewMessage(true)}>
                    + Nova Mensagem
                  </Button>
                )}
              </ChatNewContent>
            )}
          </ChatContent>
        </>
      )}
    </AccordionContentBox>
  );
};

export default Chat;

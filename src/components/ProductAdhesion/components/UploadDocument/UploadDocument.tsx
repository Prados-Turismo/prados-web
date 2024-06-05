/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Text, Button, CircularProgress } from "@chakra-ui/react";
import { FcInfo, FcOk, FcHighPriority } from "react-icons/fc";
import { MdFileUpload } from "react-icons/md";
import { IoTrashBin } from "react-icons/io5";
import Swal from "sweetalert2";
import { IDocumentsOnAdherenceRulesData } from "../../../../models/productAdhesion.model";
import DownloadDocumentButton from "./DownloadDocumentButton";
import DownloadTemplateButton from "./DownloadTemplateButton";
import { IDataPersonDocuments } from "../../../../models/collaborator.model";
import { useGlobal } from "../../../../contexts/UserContext";
import useProductAdhesion from "../../../../hooks/useProductAdhesion";

interface PropsFormSelect {
  doc: IDocumentsOnAdherenceRulesData;
  personId: string;
  authorizesDownloadDocument: boolean;
  personDocumentData: IDataPersonDocuments[];
}

const UploadDocument: React.FC<PropsFormSelect> = ({
  doc,
  personId,
  authorizesDownloadDocument,
  personDocumentData,
}) => {
  const { isBroker } = useGlobal();
  const { createUploadPersonDocument, deletePersonDocument } =
    useProductAdhesion();
  const { mutate, isLoading } = createUploadPersonDocument({
    personId,
  });

  const { mutate: mutateDelete, isLoading: isLoadingDelete } =
    deletePersonDocument({
      personId,
    });

  const [fileFront, setFileFront] = useState<any>(null);
  const [fileBack, setFileBack] = useState<any>(null);

  const onDrop = async (acceptedFiles: any, fileRejections: any) => {
    if (fileRejections.length > 0) {
      Swal.fire({
        icon: "warning",
        title: `${
          fileRejections[0].errors[0].code === "file-invalid-type"
            ? `Arquivo inválido!
                Tipos de arquivos permitidos: (JPG, JPEG ou PNG)`
            : fileRejections[0].errors[0].code === "too-many-files"
            ? "Só é permitido o upload de apenas 1 imagem por vez!"
            : fileRejections[0].errors[0].message
        }`,
        showConfirmButton: true,
        confirmButtonText: `Ok`,
      });
    } else {
      const isPdf = acceptedFiles[0].type.includes("/pdf");

      const previewImg = Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      });

      Swal.fire({
        title: "Tem certeza que deseja enviar esse arquivo?",

        showCancelButton: true,
        html: isPdf
          ? `<iframe src="${previewImg.preview}" width="450" height="400" style="border: none;"></iframe>`
          : `<img
          style="margin: 0 auto; max-height: 50vh"
          src="${previewImg.preview}"
          onLoad="${() => URL.revokeObjectURL(previewImg.preview)}"
          />`,
        confirmButtonText: "Sim",
        cancelButtonText: "Cancelar",
      }).then(async (result: any) => {
        if (result.isConfirmed) {
          if (acceptedFiles.length > 0) {
            setFileFront(() => acceptedFiles[0]);
            const isFrontAndBack = doc?.documentFrontAndBack;
            if (!isFrontAndBack) {
              mutate({
                personId: personId,
                documentFrontAndBack: isFrontAndBack,
                fileDescription: {
                  personDocumentTypeId: doc?.personDocumentTypeId,
                  typeDocument: "single",
                },
                fileDescriptionBack: null,
                file: acceptedFiles[0],
                fileBack: null,
              });
            }
            if (fileBack) {
              mutate({
                personId: personId,
                documentFrontAndBack: isFrontAndBack,
                fileDescription: {
                  personDocumentTypeId: doc?.personDocumentTypeId,
                  typeDocument: "front",
                },
                fileDescriptionBack: {
                  personDocumentTypeId: doc?.personDocumentTypeId,
                  typeDocument: "back",
                },
                file: acceptedFiles[0],
                fileBack: fileBack,
              });
            }
          } else if (fileRejections.length > 0) {
            Swal.fire({
              icon: "warning",
              title: "Arquivo inválido!",
              text: "Tipos de arquivos permitidos (JPG, JPEG, PNG ou PDF)",
              showConfirmButton: true,
              confirmButtonText: `Ok`,
            });
          }
        } else {
          setFileFront(() => null);
        }
      });
    }
  };

  const onDropBack = async (acceptedFiles: any, fileRejections: any) => {
    if (fileRejections.length > 0) {
      Swal.fire({
        icon: "warning",
        title: `${
          fileRejections[0].errors[0].code === "file-invalid-type"
            ? `Arquivo inválido!
                Tipos de arquivos permitidos: (JPG, JPEG, PNG ou PDF)`
            : fileRejections[0].errors[0].code === "too-many-files"
            ? "Só é permitido o upload de apenas 1 imagem por vez!"
            : fileRejections[0].errors[0].message
        }`,
        showConfirmButton: true,
        confirmButtonText: `Ok`,
      });
    } else {
      const isPdf = acceptedFiles[0].type.includes("/pdf");

      const previewImg = Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      });

      Swal.fire({
        title: "Tem certeza que deseja enviar esse arquivo?",

        showCancelButton: true,
        html: isPdf
          ? `<iframe src="${previewImg.preview}" width="450" height="400" style="border: none;"></iframe>`
          : `<img
          style="margin: 0 auto; max-height: 50vh"
          src="${previewImg.preview}"
          onLoad="${() => URL.revokeObjectURL(previewImg.preview)}"
          />`,
        confirmButtonText: "Sim",
        cancelButtonText: "Cancelar",
        // confirmButtonColor: btnConfirm,
        // cancelButtonColor: btnCancel
        // width: "90%",
      }).then(async (result: any) => {
        if (result.isConfirmed) {
          if (acceptedFiles.length > 0) {
            setFileBack(() => acceptedFiles[0]);
            if (fileFront) {
              mutate({
                personId: personId,
                documentFrontAndBack: doc?.documentFrontAndBack,
                fileDescription: {
                  personDocumentTypeId: doc?.personDocumentTypeId,
                  typeDocument: "front",
                },
                fileDescriptionBack: {
                  personDocumentTypeId: doc?.personDocumentTypeId,
                  typeDocument: "back",
                },
                file: fileFront,
                fileBack: acceptedFiles[0],
              });
            }
          } else if (fileRejections.length > 0) {
            Swal.fire({
              icon: "warning",
              title: "Arquivo inválido!",
              text: "Tipos de arquivos permitidos (JPG, JPEG, PNG ou PDF)",
              showConfirmButton: true,
              confirmButtonText: `Ok`,
            });
          }
        } else {
          setFileBack(() => null);
        }
      });
    }
  };

  const { getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
      "application/pdf": [],
    },
    maxFiles: 1,
  });

  const { getInputProps: getInputPropsVerso, open: openVerso } = useDropzone({
    onDrop: onDropBack,
    noClick: true,
    noKeyboard: true,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
      "application/pdf": [],
    },
    maxFiles: 1,
  });

  const isDocSent =
    personDocumentData?.filter(
      (el) => el?.personDocumentTypeId === doc?.personDocumentTypeId,
    ).length > 0;

  const userDocumentSingleOrFront = personDocumentData?.find(
    (el) =>
      el?.personDocumentTypeId === doc?.personDocumentTypeId &&
      ["single", "front"].includes(el?.typeDocument),
  );

  const userDocumentBack = personDocumentData?.find(
    (el) =>
      el?.personDocumentTypeId === doc?.personDocumentTypeId &&
      ["back"].includes(el?.typeDocument) &&
      doc?.documentFrontAndBack,
  );

  return (
    <Box display="flex" alignItems="center" width="100%">
      <Box
        padding="4px 4px 4px 10px"
        margin="2px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        background="rgba(0, 0, 0, 0.04)"
        width="100%"
      >
        <Text fontSize="1rem" fontWeight="600">
          {doc?.personDocumentTypeName}
          {doc?.templateDocumentToken &&
            doc?.templateDocumentToken?.length > 0 && (
              <DownloadTemplateButton token={doc?.templateDocumentToken} />
            )}
        </Text>
        <Box>
          {isDocSent ? (
            <Box
              display="flex"
              alignItems="center"
              gap="5px"
              className="adesa-btn-upload"
            >
              {isLoadingDelete ? (
                <CircularProgress
                  size={7}
                  isIndeterminate
                  width="100%"
                  padding="6px"
                ></CircularProgress>
              ) : (
                ["pending", "nonconforming"].includes(
                  userDocumentSingleOrFront?.statusDocument ||
                    userDocumentBack?.statusDocument ||
                    "",
                ) && (
                  <Button
                    onClick={() => {
                      mutateDelete({
                        personId: userDocumentSingleOrFront?.personId || "",
                        documentId: userDocumentSingleOrFront?.id || "",
                        documentIdBack:
                          (doc?.documentFrontAndBack && userDocumentBack?.id) ||
                          "",
                      });
                      setFileFront(null);
                      setFileBack(null);
                    }}
                    margin="0 auto"
                    colorScheme="unset"
                    variant="solid"
                    color="#000"
                    fontWeight="100"
                    cursor="pointer"
                    padding="5px"
                    _hover={{
                      backgroundColor: "#dddcdc",
                    }}
                  >
                    <IoTrashBin color="gray" size="24px" />
                  </Button>
                )
              )}

              {authorizesDownloadDocument && !isBroker && (
                <>
                  <DownloadDocumentButton
                    token={userDocumentSingleOrFront?.token || ""}
                    documentFrontAndBack={doc?.documentFrontAndBack}
                    typeText={userDocumentSingleOrFront?.typeDocument}
                  />
                  {doc?.documentFrontAndBack && (
                    <DownloadDocumentButton
                      token={userDocumentBack?.token || ""}
                      documentFrontAndBack={doc?.documentFrontAndBack}
                      typeText={userDocumentBack?.typeDocument}
                    />
                  )}
                </>
              )}
            </Box>
          ) : (
            <Box display="flex" alignItems="center">
              {isLoading ? (
                <CircularProgress
                  size={7}
                  isIndeterminate
                  width="100%"
                  padding="6px"
                ></CircularProgress>
              ) : (
                <>
                  <input {...getInputProps()} />
                  <Button
                    isLoading={isLoading}
                    onClick={open}
                    margin="0 auto"
                    colorScheme="unset"
                    variant="solid"
                    color="#000"
                    fontWeight="100"
                    cursor="pointer"
                    padding="5px"
                    _hover={{
                      backgroundColor: "#dddcdc",
                    }}
                  >
                    <MdFileUpload
                      color={fileFront ? "#4CAF50" : "gray"}
                      size="27px"
                    />
                    {doc?.documentFrontAndBack && (
                      <Text>
                        {fileFront
                          ? fileFront?.name.substring(0, 12) + "..."
                          : "Frente"}
                      </Text>
                    )}
                  </Button>
                  {doc?.documentFrontAndBack && (
                    <>
                      <Box marginLeft="10px"></Box>
                      <input {...getInputPropsVerso()} />
                      <Button
                        isLoading={isLoading}
                        onClick={openVerso}
                        margin="0 auto"
                        colorScheme="unset"
                        variant="solid"
                        color="#000"
                        fontWeight="100"
                        cursor="pointer"
                        padding="5px"
                        _hover={{
                          backgroundColor: "#dddcdc",
                        }}
                      >
                        <MdFileUpload
                          color={fileBack ? "#4CAF50" : "gray"}
                          size="27px"
                        />
                        <Text>
                          {fileBack
                            ? fileBack?.name.substring(0, 12) + "..."
                            : "Verso"}
                        </Text>
                      </Button>
                    </>
                  )}
                </>
              )}
            </Box>
          )}
        </Box>
      </Box>

      {isDocSent ? (
        <Box padding="5px">
          <FcOk size="25px" />
        </Box>
      ) : doc?.required ? (
        <Box padding="5px">
          <FcHighPriority size="25px" />
        </Box>
      ) : (
        !doc?.required && (
          <Box padding="5px">
            <FcInfo size="25px" />
          </Box>
        )
      )}
    </Box>
  );
};

export default UploadDocument;

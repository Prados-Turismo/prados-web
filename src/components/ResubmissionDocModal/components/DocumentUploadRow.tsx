/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, CircularProgress, Text } from "@chakra-ui/react";
import { IDocumentUploadRow } from "./types";
import { MdFileUpload } from "react-icons/md";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";
import { TYPE_DOCUMENT } from "../../../utils/enumFormat";
import useProductAdhesion from "../../../hooks/useProductAdhesion";

const DocumentUploadRow = ({
  doc,
  count,
  setShowModal,
  proposalId,
  setIsFetching,
  ísFetching,
}: IDocumentUploadRow) => {
  const { updatePersonDocument } = useProductAdhesion();
  const { mutate, isLoading } = updatePersonDocument({
    personId: doc?.personId,
    documentId: doc?.id,
    count: count,
    setShowModal,
    proposalId,
    setIsFetching,
  });

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
        // confirmButtonColor: btnConfirm,
        // cancelButtonColor: btnCancel
        // width: "90%",
      }).then(async (result: any) => {
        if (result.isConfirmed) {
          if (acceptedFiles.length > 0) {
            mutate({ file: acceptedFiles[0] });
          } else if (fileRejections.length > 0) {
            Swal.fire({
              icon: "warning",
              title: "Arquivo inválido!",
              text: "Tipos de arquivos permitidos (JPG, JPEG, PNG ou PDF)",
              showConfirmButton: true,
              confirmButtonText: `Ok`,
            });
          }
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

  return (
    <Box display="flex" alignItems="center" width="100%">
      <Box
        // borderBottom="2px solid #e2e8f0"
        padding="4px 4px 4px 10px"
        margin="2px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        background="rgba(0, 0, 0, 0.04)"
        width="100%"
      >
        <Box fontSize="1rem" fontWeight="600">
          {doc?.personDocumentType?.name}
        </Box>

        <Box>
          <Box
            display="flex"
            alignItems="center"
            gap="5px"
            className="adesa-btn-upload"
          >
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
                  isDisabled={isLoading || ísFetching}
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
                  <MdFileUpload color="gray" size="27px" />

                  {doc.typeDocument !== "single" && (
                    <Text>{TYPE_DOCUMENT[doc.typeDocument]}</Text>
                  )}
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DocumentUploadRow;

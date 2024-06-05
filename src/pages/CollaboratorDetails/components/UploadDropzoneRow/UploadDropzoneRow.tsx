/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Text } from "@chakra-ui/layout";
import Dropzone from "react-dropzone";
import TooltipSubstring from "../../../../components/TooltipSubstring/TooltipSubstring";
import { useMediaQuery } from "@chakra-ui/media-query";
import { IUploadDropzoneRow } from "./types";
import ButtonDownload from "../ButtonDownload";
import { Button } from "@chakra-ui/button";
import { MdFileUpload } from "react-icons/md";
import { FcOk, FcInfo } from "react-icons/fc";
import Swal from "sweetalert2";
import { apiUpload } from "../../../../services/api";
import axios from "axios";
import { useState } from "react";

const UploadDropzoneRow = ({
  doc,
  setDocumentsSelected,
  documentsSelected,
}: IUploadDropzoneRow) => {
  const [break900] = useMediaQuery("(max-width: 900px)");
  const [isLoading, setIsLoading] = useState(false);

  const fileReject = (fileRejections: any) => {
    Swal.fire({
      icon: "warning",
      title: `${
        fileRejections[0].errors[0].code === "file-invalid-type"
          ? `Arquivo inválido!
            Tipos de arquivos permitidos: (PDF, JPG, JPEG ou PNG)`
          : fileRejections[0].errors[0].code === "too-many-files"
          ? "Só é permitido o upload de apenas 1 arquivo!"
          : fileRejections[0].errors[0].message
      }`,
      showConfirmButton: true,
      confirmButtonText: `Ok`,
    });
  };

  const acceptedFiles = async (acceptedFiles: any, inputClickedId: any) => {
    setIsLoading(true);
    const documentsData = documentsSelected.filter(
      (el: any) => el?.id !== inputClickedId,
    );

    await apiUpload
      .post("document", {
        key: acceptedFiles[0]?.name,
        path: "cancelamentos",
        contentType: acceptedFiles[0]?.type,
        isPrivate: true,
      })
      .then(async (res) => {
        const blob: Blob = new Blob([acceptedFiles[0] as unknown as BlobPart], {
          type: acceptedFiles[0]?.type || "",
        });
        await axios.put(res.data.url as string, blob, {
          headers: {
            "Content-Type": acceptedFiles[0]?.type,
          },
        });
        setDocumentsSelected([
          ...documentsData,
          {
            id: inputClickedId,
            file: acceptedFiles[0],
            token: res?.data?.id,
          },
        ]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Dropzone
      onDropAccepted={(files: any) => {
        acceptedFiles(files, doc?.id);
      }}
      onDropRejected={(fileRejections) => fileReject(fileRejections)}
      noClick={true}
      noKeyboard={true}
      accept={{
        "application/pdf": [],
        "image/*": [".png", ".jpeg", ".jpg"],
      }}
      maxFiles={1}
    >
      {({ getInputProps, getRootProps, open }) => (
        <>
          <Box
            // marginTop="15px"
            {...getRootProps()}
            display="flex"
            gap="10px"
            width="100%"
            alignItems="center"
            justifyContent={break900 ? "center" : "space-between"}
            padding="10px"
            flexWrap="wrap"
          >
            <Text
              fontWeight="bold"
              fontSize="16px"
              textAlign={break900 ? "center" : "left"}
            >
              Modelo do documento do{" "}
              <TooltipSubstring name={doc?.productName} length={40} />
            </Text>

            <Box display="flex" gap="10px" flexWrap="wrap">
              <Box
                display="flex"
                alignItems="center"
                flex="1"
                justifyContent="center"
                minWidth="105px"
              >
                {doc?.cancellationDocumentToken ? (
                  <ButtonDownload id={doc?.cancellationDocumentToken}>
                    Modelo
                  </ButtonDownload>
                ) : (
                  <Text width="100%" textAlign="center">
                    Sem Modelo
                  </Text>
                )}
              </Box>

              <Box
                display="flex"
                flex="1"
                alignItems="center"
                justifyContent="center"
                width="100%"
              >
                <input {...getInputProps()} name={doc?.id.toString()} />
                <Button onClick={open} borderRadius="4px" isLoading={isLoading}>
                  <MdFileUpload size="27px" />
                  <Text width="100%" textAlign="center">
                    {documentsSelected?.filter(
                      (el: any) => el?.id === doc?.id && el?.file,
                    )[0]?.file
                      ? documentsSelected?.filter(
                          (el: any) => el?.id === doc?.id && el?.file,
                        )[0]?.file?.name?.length > 13
                        ? documentsSelected
                            ?.filter(
                              (el: any) => el?.id === doc?.id && el?.file,
                            )[0]
                            ?.file?.name.substring(0, 13) + "..."
                        : documentsSelected?.filter(
                            (el: any) => el?.id === doc?.id && el?.file,
                          )[0]?.file?.name
                      : "Fazer Upload"}
                  </Text>
                </Button>

                {documentsSelected?.filter(
                  (el: any) => el?.id === doc?.id && el?.file,
                )?.length > 0 ? (
                  <Box padding="5px">
                    <FcOk size="25px" />
                  </Box>
                ) : (
                  <Box padding="5px">
                    <FcInfo size="25px" />
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
          <hr />
        </>
      )}
    </Dropzone>
  );
};
export default UploadDropzoneRow;

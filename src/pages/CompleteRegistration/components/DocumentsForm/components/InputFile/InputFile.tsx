import { ChangeEvent, useEffect, useState } from "react";
import { IInputFile } from "./types";
import FormInputFile from "../../../../../../components/FormInputFile";
import { useToastStandalone } from "../../../../../../hooks/useToastStandalone";
import useCompleteRegistration from "../../../../../../hooks/useCompleteRegistration";
import { ILegalDocument } from "../../../../../../models/complete-registration";
import FileTag from "./components/FileTag";

const InputFile = ({
  label,
  type,
  helpTitle,
  helpDescription,
  helpSubDescription,
  data,
  isRequerid,
}: IInputFile) => {
  const { createLegalDocument } = useCompleteRegistration();
  const { mutate, isLoading } = createLegalDocument();

  const [documents, setDocuments] = useState<ILegalDocument[]>(data);

  const maxSizeInBytes = 50 * 1024 * 1024; // 50 MB

  const isFileValid = (file: File) => {
    const allowedMimeTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/bmp",
      "application/x-rar-compressed",
      "application/x-compressed",
      "application/x-zip-compressed",
      "application/zip",
    ];

    const isValidFormat = allowedMimeTypes.includes(file.type);
    const isValidSize = file.size <= maxSizeInBytes;

    return { isValidFormat, isValidSize };
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const invalidFormatFiles = Array.from(files).filter(
        (file) => !isFileValid(file).isValidFormat,
      );
      const totalSize = Array.from(files).reduce(
        (acc, file) => acc + file.size,
        0,
      );
      const isSizeValid = totalSize <= maxSizeInBytes;

      if (invalidFormatFiles.length > 0) {
        useToastStandalone({
          title: "Formato de arquivo inválido!",
          description:
            "Por favor, escolha arquivos nos formatos PDF, JPG, PNG, BMP, RAR ou ZIP.",
          status: "warning",
          duration: 10000,
        });
      } else if (!isSizeValid) {
        useToastStandalone({
          title: "Tamanho dos arquivos excedido!",
          description:
            "Os arquivos enviados devem ter um total máximo de 50 MB. Por favor, redimensione ou comprima seus arquivos.",
          status: "warning",
          duration: 10000,
        });
      } else {
        if (files) {
          mutate({ files: Array.from(files), documentType: type });
        }
      }
    }
  };

  useEffect(() => {
    setDocuments(data);
  }, [data]);

  return (
    <FormInputFile
      isRequerid={isRequerid}
      isLoading={isLoading}
      label={label}
      name={type}
      helpTitle={helpTitle}
      helpDescription={helpDescription}
      helpSubDescription={helpSubDescription}
      handleFileChange={handleFileChange}
      tags={
        documents?.length > 0
          ? documents?.map((doc) => (
              <FileTag
                key={doc?.id}
                id={doc?.id}
                name={doc?.name}
                token={doc?.documentToken}
                status={doc?.documentStatus}
              />
            ))
          : null
      }
    />
  );
};

export default InputFile;

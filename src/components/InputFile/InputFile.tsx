import { useEffect, useMemo, useRef, useState } from "react";
import { Box, Button, IconButton, Stack, Text } from "@chakra-ui/react";
import { IInputFile } from "./types";
import { pixelToRem } from "../../utils";
import * as S from "./styled";

const InputFile = ({
  fileName,
  label,
  handleFileInput,
  isRequired,
  name,
  error,
  setFieldValue,
  accept,
  onClear,
}: IInputFile) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentFileName, setCurrentFileName] = useState<string>();

  const fileNameDisplay =
    (fileName as string)?.length > 38
      ? `${fileName?.substring(0, 38)}..`
      : fileName;

  return (
    <Stack flex={1}>
      {label && (
        <S.Title color="text.third" fontWeight={500}>
          {label} <span>{isRequired ? "*" : ""}</span>
        </S.Title>
      )}
      <input
        type="file"
        ref={fileInputRef}
        name={name}
        accept={accept}
        onChange={(event) => {
          handleFileInput(event);
          if (name && setFieldValue) {
            setFieldValue(name, event.target.files);
          }
          setCurrentFileName(event.target.files?.[0].name);
          event.stopPropagation();
        }}
        style={{ display: "none" }}
      />
      <S.UploadButton
        sx={{
          border:
            isRequired && error ? "1px dashed #e53e3e" : "1px dashed #E5E5E5",
        }}
        onClick={() => {
          fileInputRef.current?.click();
        }}
      >
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <S.Title color={isRequired && error ? "#e53e3e" : "text.fourth"}>
            {fileName || fileNameDisplay || currentFileName || "Anexar arquivo"}
          </S.Title>
          {fileName ||
            fileNameDisplay ||
            (currentFileName && (
              <Button
                zIndex={100}
                color={"text.fourth"}
                fontWeight={400}
                aria-label="Cancel Button"
                variant={"unstyled"}
                onClick={(event) => {
                  setCurrentFileName(undefined);
                  if (name && setFieldValue) {
                    setFieldValue(name, undefined);
                  }
                  if (onClear) onClear();
                  event.stopPropagation();
                }}
              >
                x
              </Button>
            ))}
        </Box>
      </S.UploadButton>

      {isRequired && error && (
        <Text color="#e53e3e" fontSize={pixelToRem(14)}>
          Escolha um arquivo
        </Text>
      )}
    </Stack>
  );
};

export default InputFile;

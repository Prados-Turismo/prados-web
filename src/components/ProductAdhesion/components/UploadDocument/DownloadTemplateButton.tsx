import { Button, Text } from "@chakra-ui/react";
import useUpload from "../../../../hooks/useUpload";

interface IDownloadTemplateButton {
  token: string;
}

const DownloadTemplateButton = ({ token }: IDownloadTemplateButton) => {
  const { downloadAndOpenFile } = useUpload();
  const { callDoc, isLoading } = downloadAndOpenFile();

  return (
    <Text maxWidth="420px" whiteSpace="break-spaces" fontWeight="400">
      <br />
      Para a adesão deste produto, este documento é obrigatório.{" "}
      <Button
        marginRight="5px"
        variant="link"
        fontWeight="bold"
        isLoading={isLoading}
        onClick={() => {
          callDoc(token || "");
        }}
      >
        Clique aqui
      </Button>
      para baixar o documento, preencha corretamente e envie clicando na seta ao
      lado.
    </Text>
  );
};

export default DownloadTemplateButton;

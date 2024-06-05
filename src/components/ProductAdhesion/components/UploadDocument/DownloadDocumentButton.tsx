import { Button, Text } from "@chakra-ui/react";
import useUpload from "../../../../hooks/useUpload";
import { MdFileDownload } from "react-icons/md";

interface IDownloadDocumentButton {
  token: string;
  typeText: string | undefined;
  documentFrontAndBack: boolean;
}

const DownloadDocumentButton = ({
  token,
  typeText,
  documentFrontAndBack,
}: IDownloadDocumentButton) => {
  const { downloadAndOpenFile } = useUpload();
  const { callDoc, isLoading } = downloadAndOpenFile();

  return (
    <Button
      isLoading={isLoading}
      onClick={() => {
        callDoc(token || "");
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
      <MdFileDownload color="gray" size="27px" />
      {documentFrontAndBack && (
        <Text>
          {typeText === "front" && "Frente"}
          {typeText === "back" && "Verso"}
        </Text>
      )}
    </Button>
  );
};

export default DownloadDocumentButton;

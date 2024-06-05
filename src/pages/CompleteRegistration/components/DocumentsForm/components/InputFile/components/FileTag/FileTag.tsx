import { Flex, Text } from "@chakra-ui/layout";
import { IFileTag } from "./types";
import { MdClose } from "react-icons/md";
import useUpload from "../../../../../../../../hooks/useUpload";
import { Spinner } from "@chakra-ui/spinner";
import useCompleteRegistration from "../../../../../../../../hooks/useCompleteRegistration";
import { useDisclosure } from "@chakra-ui/hooks";
import AlertModal from "../../../../../../../../components/AlertModal";
import AlertContent from "../../../../../../../../components/AlertContent";
import AlertInfoIcon from "../../../../../../../../components/AlertInfoIcon/AlertInfoIcon";
import TooltipSubstring from "../../../../../../../../components/TooltipSubstring/TooltipSubstring";

const FileTag = ({ id, name, token, status }: IFileTag) => {
  const { downloadAndOpenFile } = useUpload();
  const { onClose, isOpen, onOpen } = useDisclosure();
  const { deleteLegalDocument } = useCompleteRegistration();
  const { callDoc, isLoading } = downloadAndOpenFile();
  const { mutate, isLoading: isLoadingDelete } = deleteLegalDocument(onClose);

  const handleDownload = (event: {
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    event.preventDefault();
    event.stopPropagation();
    callDoc(token);
  };

  const handleDelete = (event: {
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    event.preventDefault();
    event.stopPropagation();
    onOpen();
  };

  return (
    <>
      <Flex
        bg={status === "rejected" ? "#E920430A" : "brand.500"}
        padding="4px 5px"
        color={isLoading || status === "rejected" ? "brand.500" : "contrast"}
        alignItems="center"
        gap="5px"
        h="28px"
        position="relative"
      >
        {isLoading && (
          <Spinner size="sm" position="absolute" left="45%" color="contrast" />
        )}
        {status === "rejected" && <AlertInfoIcon />}
        <Text onClick={handleDownload}>
          <TooltipSubstring name={name} length={24} />
        </Text>
        <MdClose onClick={handleDelete} size={20} />
      </Flex>

      {isOpen && (
        <AlertModal
          isLoading={isLoadingDelete}
          request={() => {
            mutate({ id });
          }}
          showModal={isOpen}
          setShowModal={onClose}
          size="md"
        >
          <AlertContent title="Deseja excluir o arquivo?" />
        </AlertModal>
      )}
    </>
  );
};

export default FileTag;

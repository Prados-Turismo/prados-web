import { Button, Flex, Input, InputGroup } from "@chakra-ui/react";
import Asterisk from "../Asterisk";
import { MdOutlineFileUpload } from "react-icons/md";
import { IFormInputFile } from "./types";
import TooltipForm from "../TooltipForm";

const FormInputFile = ({
  name,
  label,
  helpTitle,
  helpDescription,
  helpSubDescription,
  handleFileChange,
  isLoading,
  tags,
  isRequerid = false,
}: IFormInputFile) => {
  return (
    <InputGroup flexDir="column" gap="12px" w="100%" flex="1">
      <Flex
        style={{ height: "27px" }}
        gap="5px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex gap="5px">
          {label} {isRequerid && <Asterisk />}
        </Flex>
        {(helpTitle || helpDescription || helpSubDescription) && (
          <TooltipForm
            title={helpTitle || ""}
            description={helpDescription || ""}
            subDescription={helpSubDescription || ""}
          >
            <Flex
              w="20px"
              h="20px"
              borderRadius="100%"
              bg="brand.500"
              color="contrast"
              justifyContent="center"
              alignItems="center"
              cursor="pointer"
            >
              ?
            </Flex>
          </TooltipForm>
        )}
      </Flex>
      <Input
        type="file"
        name={name}
        multiple
        onChange={handleFileChange}
        display="none"
        id={`"file-input-${name}`}
        w="100%"
      />

      <label htmlFor={`"file-input-${name}`}>
        <Button
          isLoading={isLoading}
          as="span"
          w="100%"
          minH="40px"
          h="max-content"
          padding="5px"
          borderRadius="2px"
          border="1px #E5E5E5 dashed"
          bg="#FFF"
          color="#909090"
          fontSize="16px"
          display="flex"
          justifyContent={isLoading ? "center" : "space-between"}
          cursor="pointer"
          _hover={{
            backgroundColor: "#FFF",
            borderColor: "#AEAEAE",
          }}
          rightIcon={<MdOutlineFileUpload size={20} />}
        >
          {tags ? (
            <Flex maxW="90%" flexWrap="wrap" gap="5px">
              {tags}
            </Flex>
          ) : (
            "Escolher arquivos"
          )}
        </Button>
      </label>
    </InputGroup>
  );
};

export default FormInputFile;

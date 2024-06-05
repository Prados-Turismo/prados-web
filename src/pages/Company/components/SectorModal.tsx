import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Stack,
} from "@chakra-ui/react";

import { UseFormReturn } from "react-hook-form";
import { FormValues } from "../hooks/useSectorModalForm";

export type Props = Omit<ModalProps, "children"> & {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formProps: UseFormReturn<FormValues>;
};

export default function SectorModal({
  isOpen,
  formProps,
  onSubmit,
  onClose,
}: Props) {
  const getTitle = () => {
    if (formProps.getValues("action") === "create") {
      return "Adicionar categoria";
    }

    if (formProps.getValues("action") === "edit") {
      return "Editar categoria";
    }

    return null;
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={onSubmit}>
            <ModalHeader>{getTitle()}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isInvalid={!!formProps.formState.errors.title}>
                <Stack direction="column" spacing="2">
                  <Box as="label" htmlFor="name" mb={{ base: "4", xl: "0" }}>
                    Nome da Categoria
                  </Box>
                  <Box flex="1" display="flex" alignItems="center">
                    <Input
                      h="12"
                      rounded="none"
                      placeholder="Nome da categoria"
                      {...formProps.register("title")}
                      maxLength={120}
                    />
                  </Box>
                  <FormErrorMessage>
                    {formProps.formState.errors.title?.message}
                  </FormErrorMessage>
                </Stack>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" w="full" rounded="sm">
                Salvar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

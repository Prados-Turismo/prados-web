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
  Select,
  Stack,
} from "@chakra-ui/react";

import { UseFormReturn } from "react-hook-form";
import { FormValues } from "../hooks/usePositionModalForm";

export type Props = Omit<ModalProps, "children"> & {
  formProps: UseFormReturn<FormValues>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function PositionModal({
  isOpen,
  formProps,
  onSubmit,
  onClose,
}: Props) {
  const getTitle = () => {
    if (formProps.getValues("action") === "create") {
      return "Adicionar Subcategoria";
    }

    if (formProps.getValues("action") === "edit") {
      return "Editar Subcategoria";
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
              <Stack spacing="4">
                <FormControl isInvalid={!!formProps.formState.errors.title}>
                  <Stack direction="column" spacing="2">
                    <Box as="label" htmlFor="name" mb={{ base: "4", xl: "0" }}>
                      Nome da Subcategoria
                    </Box>
                    <Box flex="1" display="flex" alignItems="center">
                      <Input
                        h="12"
                        rounded="none"
                        placeholder="Nome da Subcategoria"
                        {...formProps.register("title")}
                        maxLength={120}
                      />
                    </Box>
                    <FormErrorMessage>
                      {formProps.formState.errors.title?.message}
                    </FormErrorMessage>
                  </Stack>
                </FormControl>
                {formProps.getValues("action") === "create" ? (
                  <FormControl
                    isInvalid={!!formProps.formState.errors.sectorId}
                  >
                    <Stack direction="column" spacing="2">
                      <Box
                        as="label"
                        htmlFor="name"
                        mb={{ base: "4", xl: "0" }}
                      >
                        Categoria
                      </Box>

                      <Select
                        placeholder="Selecione a categoria"
                        h="12"
                        {...formProps.register("sectorId")}
                      >
                        {Array.from(
                          formProps.getValues("sectors").values(),
                        )?.map((sector) => {
                          return (
                            <option key={sector.id} value={sector.id}>
                              {sector.title}
                            </option>
                          );
                        })}
                      </Select>

                      <FormErrorMessage>
                        {formProps.formState.errors.title?.message}
                      </FormErrorMessage>
                    </Stack>
                  </FormControl>
                ) : null}
              </Stack>
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

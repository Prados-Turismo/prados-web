import { Button } from "@chakra-ui/button";
import { Box, Flex } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import AlertContent from "../../../../components/AlertContent";
import AlertModal from "../../../../components/AlertModal";
import FormInput from "../../../../components/FormInput";
import { useGlobal } from "../../../../contexts/UserContext";
import useCompleteRegistration from "../../../../hooks/useCompleteRegistration";
import { ILegalRepresentativeData } from "../../../../models/complete-registration";
import { cpfMask } from "../../../../utils";
import { RepresentativeFormSchema } from "./validation-schema";

const RepresentativeForm = ({
  representativeCount,
}: {
  representativeCount: number;
}) => {
  const { companyStatus } = useGlobal();
  const { onClose, isOpen, onOpen } = useDisclosure();
  const [newRepresentative, setNewRepresentative] = useState(
    representativeCount > 0 ? false : true,
  );
  const { createLegalRepresentative } = useCompleteRegistration();

  const {
    register,
    formState: { errors, isValid },
    reset,
    handleSubmit,
  } = useForm<ILegalRepresentativeData>({
    resolver: zodResolver(RepresentativeFormSchema),
    mode: "onChange",
  });
  const { mutate, isLoading } = createLegalRepresentative({
    setState: setNewRepresentative,
    reset,
  });

  const onSubmit = (data: ILegalRepresentativeData) => {
    mutate(data);
  };

  return (
    <>
      <Box mt="32px">
        <form onSubmit={handleSubmit(onSubmit)}>
          {newRepresentative && (
            <Flex gap="24px" flexWrap="wrap">
              <FormInput
                isRequired
                label="Representante legal"
                name="name"
                placeholder="Nome"
                register={register}
                errors={errors?.name}
                maxLength={250}
              />
              <FormInput
                isRequired
                label="CPF do representante"
                name="cpf"
                placeholder="CPF"
                register={register}
                errors={errors?.cpf}
                onInput={(event: FormEvent<HTMLInputElement>) => {
                  event.currentTarget.value = cpfMask(
                    event.currentTarget.value,
                  );
                }}
              />
              <FormInput
                isRequired
                label="E-mail do representante"
                name="email"
                placeholder="E-mail"
                register={register}
                errors={errors?.email}
              />
            </Flex>
          )}

          <Flex alignItems="center" mt="32px" justifyContent="space-between">
            <Flex gap="12px" justifyContent="flex-end" w="100%">
              {!newRepresentative && (
                <Button
                  marginTop="-50px"
                  w="206px"
                  color="brand.500"
                  variant="outline"
                  borderRadius="4px"
                  onClick={() => {
                    if (companyStatus?.status === "acceptedTerm") {
                      setNewRepresentative(true);
                    } else {
                      onOpen();
                    }
                  }}
                  isDisabled={isLoading}
                >
                  + Representante
                </Button>
              )}

              {newRepresentative && (
                <>
                  {representativeCount > 0 && (
                    <Button
                      background="#F5F5F5"
                      borderRadius="4px"
                      variant="outline"
                      border="none"
                      fontWeight={500}
                      onClick={() => {
                        setNewRepresentative(false);
                        reset();
                      }}
                    >
                      Cancelar
                    </Button>
                  )}
                  <Button
                    type="submit"
                    borderRadius="4px"
                    w="125px"
                    isLoading={isLoading}
                    isDisabled={!isValid}
                  >
                    Salvar
                  </Button>
                </>
              )}
            </Flex>
          </Flex>
        </form>
      </Box>

      {isOpen && (
        <AlertModal
          isLoading={isLoading}
          request={() => {
            setNewRepresentative(true);
            onClose();
          }}
          showModal={isOpen}
          setShowModal={onClose}
          size="md"
        >
          <AlertContent
            title="Deseja adicionar um novo representante?"
            description="Ao adicionar um novo representante, excluiremos o contrato previamente enviado aos representantes por e-mail, além de procedermos com a geração e envio de um novo contrato para assinatura."
          />
        </AlertModal>
      )}
    </>
  );
};

export default RepresentativeForm;

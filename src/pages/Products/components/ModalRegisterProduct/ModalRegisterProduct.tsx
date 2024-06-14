/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Asterisk from "../../../../components/Asterisk";
import ModalSector from "../../../../components/ModalSector";

// Hooks
import useCollaborator from "../../../../hooks/useCollaborator";

import {
  fieldRequired,
  maxContent,
  minContent,
} from "../../../../utils/messagesError";

import { FieldWrap } from "./styled";

const handleSubmitRegisterSchema = z.object({
  name: z
    .string()
    .min(7, {
      message: `O nome ${minContent(7)}`,
    })
    .max(120, {
      message: `O nome ${maxContent(120)}`,
    })
    .min(1, {
      message: fieldRequired("nome"),
    }),
  estoque: z
    .coerce
    .number()
    .min(0, {
      message: fieldRequired("estoque"),
    })
});

type IhandleSubmitRegister = z.infer<typeof handleSubmitRegisterSchema>;

interface IModalRecordCollaborator {
  companyId: string;
  handleClose: () => void;
}

const ModalRegisterProduct = ({
  handleClose,
}: IModalRecordCollaborator) => {
  const { createCollaborator } = useCollaborator();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IhandleSubmitRegister>({
    resolver: zodResolver(handleSubmitRegisterSchema),
  });
  const { mutate: _, isLoading } = createCollaborator(reset, handleClose);


  const [modalState, setModalState] = useState({
    sector: false,
    occupation: false,
  });

  const handleSubmitRegister = (_data: IhandleSubmitRegister) => {
  };

  const isEmpty = (value: string | null | undefined) => {
    return value == null || value.trim() === "";
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleSubmitRegister)}
        style={{ width: "100%" }}
      >
        <Box display="flex" flexDirection="column" gap="25px" padding="30px">
          <span>
            (<Asterisk />) indica os campos obrigatórios
          </span>

          <FieldWrap>
            <span>
              Nome <Asterisk />
            </span>

            <Input
              placeholder="Digite o nome"
              id="name"
              type="text"
              {...register("name")}
            />
            {errors.name && <p className="error">{errors.name.message}</p>}
          </FieldWrap>

          <FieldWrap>
            <span>
              Estoque <Asterisk />
            </span>

            <Input
              placeholder="Digite o Estoque"
              id="estoque"
              type="number"
              {...register("estoque", { valueAsNumber: !isEmpty("estoque") })}
              min={0}
            />
            {errors.estoque && <p className="error">{errors.estoque.message}</p>}
          </FieldWrap>

          <Flex justifyContent="flex-end" gap="15px">
            <Button
              isDisabled={
                isLoading
              }
              isLoading={isLoading}
              type="submit"
            >
              Cadastrar
            </Button>
          </Flex>
        </Box>
      </form>

      <ModalSector
        handleOpen={(arg) => {
          setModalState({
            ...modalState,
            sector: arg,
          });
        }}
        isOpen={modalState.sector}
      />
    </>
  );
};

export default ModalRegisterProduct;

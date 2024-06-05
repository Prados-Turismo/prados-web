import { Button, Input } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import useSector from "../../hooks/useSector";
import SimpleModal from "../SimpleModal";

import { Form } from "./styled";

import { fieldRequired, minContent } from "../../utils/messagesError";

import { useEffect } from "react";
import { IModalSector } from "./types";

const ModalSector = ({
  sectorId,
  sectorName,
  isOpen,
  action = "create",
  handleOpen,
}: IModalSector) => {
  const { addSector, updateSector } = useSector();
  const { isLoading, mutate } = addSector();
  const { mutate: mutateToUpdateASector } = updateSector();

  const handleSubmitSchema = z.object({
    sectorName: z
      .string()
      .regex(/^[a-zA-ZÀ-ú0-9\s]+$/, {
        message: `O nome da Categoria deve conter apenas caracteres alfanuméricos`,
      })
      .nonempty({
        message: fieldRequired("nome da Categoria"),
      })
      .min(2, {
        message: `O nome da Categoria ${minContent(2)}`,
      }),
  });

  type IhandleSubmit = z.infer<typeof handleSubmitSchema>;

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<IhandleSubmit>({
    resolver: zodResolver(handleSubmitSchema),
  });

  const handleSubmitRegister = ({ sectorName }: IhandleSubmit) => {
    if (action === "create") {
      mutate(sectorName);
      reset();
      handleOpen(false);
      return;
    }

    if (action === "edit") {
      mutateToUpdateASector({
        sectorName,
        sectorId,
      });
      reset();
      handleOpen(false);
    }
  };

  useEffect(() => {
    reset({
      sectorName: (action === "edit" && sectorName) || "",
    });
  }, [sectorName, action, reset]);

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  return (
    <SimpleModal
      isOpen={isOpen}
      handleModal={handleOpen}
      size="lg"
      title={(action === "edit" && "Editar Categoria") || "Cadastrar Categoria"}
    >
      <Form onSubmit={handleSubmit(handleSubmitRegister)}>
        <div className="wrap">
          <label htmlFor="city">Nome da Categoria</label>
          <Input
            maxLength={120}
            type="text"
            placeholder={
              (action === "edit" && "Editar Categoria") || "Cadastrar Categoria"
            }
            {...register("sectorName")}
          />
          {errors.sectorName && (
            <p className="error">{errors.sectorName.message}</p>
          )}
        </div>

        <div className="wrap">
          <Button
            isLoading={isLoading}
            isDisabled={!isDirty}
            loadingText="enviando..."
            type="submit"
          >
            Salvar Categoria
          </Button>
        </div>
      </Form>
    </SimpleModal>
  );
};

export default ModalSector;

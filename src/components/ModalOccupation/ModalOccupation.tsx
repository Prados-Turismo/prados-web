import { Box, Button, Input, Select, Stack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import useSector from "../../hooks/useSector";
import SimpleModal from "../SimpleModal";

import { Form } from "./styled";

import { fieldRequired, minContent } from "../../utils/messagesError";

import { useEffect } from "react";
import { IModalOccupation } from "./types";

const ModalOccupation = ({
  companyId,
  sectorId,
  occupation,
  action = "create",
  showSectorsSelect = false,
  isOpen,
  handleOpen,
}: IModalOccupation) => {
  const { addOccupation, getSector, updateOccupation } = useSector();
  const { isLoading, mutate } = addOccupation();
  const { data } = getSector(companyId);

  const { mutate: mutateToUpdateOccupation } = updateOccupation();

  const handleSubmitSchema = z.object({
    occupationName: z
      .string()
      .regex(/^[a-zA-ZÀ-ú0-9\s]+$/, {
        message: `O nome da Categoria deve conter apenas caracteres alfanuméricos`,
      })
      .nonempty({
        message: fieldRequired("nome da Subcategoria"),
      })
      .min(2, {
        message: `O nome da Subcategoria ${minContent(2)}`,
      }),
    sector: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (action === "create" && showSectorsSelect && !val) {
            return false;
          }
          return true;
        },
        {
          message: "Este campo é obrigatório",
        },
      ),
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

  const handleSubmitRegister = ({ occupationName, sector }: IhandleSubmit) => {
    if (action === "create") {
      mutate({
        sectorId: (showSectorsSelect && sector) || sectorId,
        occupationName,
      });
      reset();
      handleOpen(false);
      return;
    }

    if (action === "edit") {
      mutateToUpdateOccupation({
        sectorId: (showSectorsSelect && sector) || sectorId,
        positionId: occupation?.id || "",
        occupationName,
      });
      reset();
      handleOpen(false);
    }
  };

  useEffect(() => {
    reset({
      occupationName: (action === "edit" && occupation?.name) || "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [occupation, action]);

  return (
    <SimpleModal
      isOpen={isOpen}
      handleModal={handleOpen}
      size="lg"
      title={
        (action === "edit" && "Editar Subcategoria") || "Cadastrar Subcategoria"
      }
    >
      <Form onSubmit={handleSubmit(handleSubmitRegister)}>
        <div className="wrap">
          <label htmlFor="city">Nome da Subcategoria</label>
          <Input
            type="text"
            maxLength={120}
            placeholder={
              (action === "edit" && "Editar Subcategoria") ||
              "Cadastrar Subcategoria"
            }
            {...register("occupationName")}
          />
          {errors.occupationName && (
            <p className="error">{errors.occupationName.message}</p>
          )}
        </div>

        {showSectorsSelect && action === "create" ? (
          <Stack direction="column" spacing="2">
            <Box as="label" htmlFor="name" mb={{ base: "4", xl: "0" }}>
              Categoria
            </Box>

            <Select
              placeholder="Selecione a Categoria"
              borderColor="gray.200"
              textColor="gray.600"
              {...register("sector")}
            >
              {data.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </Select>
            {errors.sector && <p className="error">{errors.sector.message}</p>}
          </Stack>
        ) : null}

        <div className="wrap">
          <Button
            isLoading={isLoading}
            isDisabled={!isDirty}
            loadingText="enviando..."
            type="submit"
          >
            Salvar Subcategoria
          </Button>
        </div>
      </Form>
    </SimpleModal>
  );
};

export default ModalOccupation;

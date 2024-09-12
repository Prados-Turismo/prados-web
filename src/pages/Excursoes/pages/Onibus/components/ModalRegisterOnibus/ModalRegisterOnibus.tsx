/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Asterisk from "../../../../../../components/Asterisk";

// Hooks
import useExcursaoQuarto from "../../../../../../hooks/useExcursaoQuarto";

import {
    fieldRequired
} from "../../../../../../utils/messagesError";

import { FieldWrap } from "./styled";
import ReactSelect from "react-select";
import { useGlobal } from "../../../../../../contexts/UserContext";
import { useParams } from "react-router-dom";
import useExcursaoOnibus from "../../../../../../hooks/useExcursaoOnibus";

const handleSubmitRegisterSchema = z.object({
    codigoPassageiro: z
        .string()
        .min(1, {
            message: fieldRequired("local de embarque"),
        }),
    numeroCadeira: z
        .string()
        .min(1, {
            message: fieldRequired("Cadeira")
        })

});

type IhandleSubmitRegister = z.infer<typeof handleSubmitRegisterSchema>;

interface IModalRegisterBus {
    handleClose: () => void
    acento: string
}

const ModalRegisterOnibus = ({
    handleClose,
    acento
}: IModalRegisterBus) => {
    const { user } = useGlobal();
    const { listExcursaoPassageirosNoRoom } = useExcursaoQuarto();
    const { createExcursaoOnibus } = useExcursaoOnibus()
    console.log(acento)
    const {
        setValue,
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IhandleSubmitRegister>({
        resolver: zodResolver(handleSubmitRegisterSchema),
        defaultValues: {
            numeroCadeira: acento
        }
    });
    const { id: idExcursao } = useParams();
    const { mutate, isLoading } = createExcursaoOnibus();
    const { data: dataPassageiros, isLoading: loadingPassageiros } = listExcursaoPassageirosNoRoom(idExcursao || '');

    const handleSubmitRegister = (submitData: IhandleSubmitRegister) => {
        mutate({
            ...submitData,
            codigoExcursao: idExcursao,
            usuarioCadastro: user?.id
        })
    };

    return (
        <form
            onSubmit={handleSubmit(handleSubmitRegister)}
            style={{ width: "100%" }}
        >
            <Box display="flex" flexDirection="column" gap="25px" padding="30px">
                <span>
                    (<Asterisk />) indica os campos obrigatórios
                </span>

                <FieldWrap>
                    <span>Passageiros <Asterisk /></span>

                    <Box display="flex" gap="10px">
                        <ReactSelect
                            isLoading={loadingPassageiros}
                            isMulti={false}
                            className="select-fields multi"
                            classNamePrefix="select"
                            closeMenuOnSelect={true}
                            {...register?.("codigoPassageiro")}
                            isSearchable={true}
                            placeholder="Selecione"
                            noOptionsMessage={() => "Não há passageiros cadastrados"}
                            options={dataPassageiros
                                .map((passageiro) => ({
                                    label: `${passageiro?.reserva} - ${passageiro?.Pessoa.nome}`,
                                    value: passageiro?.id,
                                }))}
                            name="codigoPassageiro"
                            id="codigoPassageiro"
                            onChange={(option) => {
                                setValue("codigoPassageiro", option?.value || '');
                            }}
                        />
                    </Box>
                    {errors.codigoPassageiro && <p className="error">{errors.codigoPassageiro.message}</p>}
                </FieldWrap>

                <Input type="hidden" {...register("numeroCadeira")} />

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
    );
};

export default ModalRegisterOnibus;

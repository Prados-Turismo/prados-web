/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Flex, Input, FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Asterisk from "../../../../../../components/Asterisk";

// Hooks
import useProduct from "../../../../../../hooks/useProducts";
import useFormaPagamento from "../../../../../../hooks/useFormaPagamento";
import useVendas from "../../../../../../hooks/useVendas";

import {
    fieldRequired
} from "../../../../../../utils/messagesError";

import { FieldWrap } from "./styled";
import ReactSelect from "react-select";
import { useGlobal } from "../../../../../../contexts/UserContext";
import FormInputNumber from "../../../../../../components/FormInputNumber";
import { useState } from "react";
import SelectForm from "../../../../../../components/SelectForm";
import { useParams } from "react-router-dom";


const handleSubmitRegisterSchema = z.object({
    codigoProduto: z
        .string()
        .min(1, {
            message: fieldRequired("pacote"),
        }),
    qtd: z
        .number()
        .min(1, {
            message: fieldRequired("Quantidade"),
        }),
    valorUnitario: z
        .number()
        .min(1, {
            message: fieldRequired("Valor"),
        }),
    valor: z
        .number()
        .min(1, {
            message: fieldRequired("Total"),
        }),
    codigoFormaPagamento: z
        .string()
        .min(1, {
            message: fieldRequired('Forma Pagamento')
        }),
});

type IhandleSubmitRegister = z.infer<typeof handleSubmitRegisterSchema>;

interface Cliente {
    id: string
    nome: string
}

interface IModalRegisterVenda {
    handleClose: () => void;
    dataCliente?: Cliente
}

const ModalRegisterVenda = ({
    handleClose,
    dataCliente
}: IModalRegisterVenda) => {
    const { id: _id } = useParams();
    const { user } = useGlobal();
    const { createVendas } = useVendas();
    const { getAllProducts } = useProduct();
    const { getAllFormaPagamentos } = useFormaPagamento()

    const {
        getValues,
        setValue,
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IhandleSubmitRegister>({
        resolver: zodResolver(handleSubmitRegisterSchema),
    });

    const { mutate, isLoading } = createVendas(reset, handleClose);
    const { data: dataProduto, isLoading: loadingProduto } = getAllProducts();
    const { data: dataFormaPagamentos, isLoading: loadingFormaPagamentos } = getAllFormaPagamentos();
    const [valor, setValor] = useState(0)
    const [total, setTotal] = useState(0)

    const handleSubmitRegister = (submitData: IhandleSubmitRegister) => {
        mutate({
            ...submitData,
            ativo: true,
            usuarioCadastro: user?.id,
            codigoCliente: dataCliente?.id,
            codigoExcursao: _id
        })
    };

    const onSelectProduto = (pacote: { label: string, value: string, valor: number }) => {
        setValor(pacote.valor)
        setTotal(pacote.valor)
        setValue('valorUnitario', pacote.valor)
        setValue('valor', pacote.valor)
    }

    const calculateTotal = (qtd: number) => {
        let total = valor * qtd
        setTotal(total)
        setValue('valor', total)
    }

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
                    <span>
                        Cliente <Asterisk />
                    </span>

                    <Input
                        placeholder="Digite o nome"
                        id="nome"
                        type="text"
                        readOnly
                        value={`${dataCliente?.nome}`}
                        sx={{
                            border: 'none',
                            backgroundColor: '',
                            color: 'black'
                        }}
                    />

                </FieldWrap>

                <FieldWrap>
                    <span>Produto <Asterisk /></span>
                    <Box display="flex" gap="10px">
                        <ReactSelect
                            isLoading={loadingProduto}
                            className="select-fields large"
                            classNamePrefix="select"
                            closeMenuOnSelect={true}
                            {...register?.("codigoProduto")}
                            isSearchable={true}
                            placeholder="Selecione"
                            noOptionsMessage={() => "Não há produto cadastrado"}
                            options={dataProduto
                                ?.map((produto) => ({
                                    label: produto?.nome,
                                    value: produto?.id,
                                    valor: produto.valor
                                }))}
                            name="codigoProduto"
                            id="codigoProduto"
                            onChange={(option) => {
                                setValue("codigoProduto", option?.value.toString() || "");
                                if (option) {
                                    onSelectProduto(option)
                                }
                            }}
                        />
                    </Box>
                </FieldWrap>

                <SelectForm
                    name="codigoFormaPagamento"
                    label="Forma de Pagamento"
                    minW="135px"
                    isRequired
                    isSearchable
                    isLoading={loadingFormaPagamentos}
                    handleChange={(option) => {
                        setValue("codigoFormaPagamento", option?.value);
                    }}
                    options={dataFormaPagamentos
                        ?.map((codigoFormaPagamento) => ({
                            label: codigoFormaPagamento?.nome,
                            value: codigoFormaPagamento?.id,
                        }))}
                    errors={errors.codigoFormaPagamento}
                />

                <Flex
                    gap="15px"
                    flexDirection={{
                        base: "column",
                        lg: "row",
                    }}
                >
                    <FieldWrap>
                        <span>Quantidade <Asterisk /></span>
                        <Input
                            height="40px"
                            {...register("qtd", { valueAsNumber: true })}
                            placeholder="Quantidade"
                            flex="1.01"
                            type="number"
                            prefix="percentual"
                            onChange={(event) => {
                                let newValue = parseInt(event.target.value)

                                if ((Number(newValue) && !isNaN(Number(newValue)))) {
                                    setValue('qtd', newValue);
                                    calculateTotal(newValue)
                                } else {
                                    setValue('qtd', 0);
                                }
                            }}
                            onBlur={() => {
                                calculateTotal(getValues("qtd") || 0)
                            }}
                            minW="150px"
                            defaultValue={0}
                        />
                    </FieldWrap>

                    <FieldWrap>
                        <FormInputNumber
                            height="40px"
                            label="Valor"
                            {...register("valorUnitario")}
                            setValue={setValue}
                            isMoneyValue
                            flex="1.01"
                            name="total"
                            maxLength={25}
                            isRequired
                            minWidth="200px"
                            maxWidth="35%"
                            value={valor}
                            errors={errors.valorUnitario}
                        />
                    </FieldWrap>

                    <FormInputNumber
                        height="40px"
                        label="Total"
                        {...register("valor")}
                        setValue={setValue}
                        isMoneyValue={true}
                        flex="1.01"
                        value={total}
                        maxLength={25}
                        dontAllowNegative={true}
                        readOnly={true}
                        minWidth="100px"
                        maxWidth="30%"
                    />
                </Flex>

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

export default ModalRegisterVenda;

import { Box, Button, Flex, Grid, TableContainer, Text } from "@chakra-ui/react";
import Loading from "../../../components/Loading";

// Styled Components
import { Content, SectionTop } from "./styled";

// Hooks and utils
import useConfiguracao from "../../../hooks/useConfiguracao";
import useUsuario from "../../../hooks/useUsuarios";
import SelectForm from "../../../components/SelectForm";
import useCategoriaTransacao from "../../../hooks/useCategoriaTransacao";
import { IConfiguracao } from "../../../models/configuracao.model";
import { useGlobal } from "../../../contexts/UserContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { fieldRequired } from "../../../utils/messagesError";
import { zodResolver } from "@hookform/resolvers/zod";

const handleSubmitRegisterSchema = z.object({
    defaultUser: z
        .string()
        .min(1, {
            message: fieldRequired("local de embarque"),
        }),
    defaultCategory: z
        .string()
        .min(1, {
            message: fieldRequired("Cadeira")
        })

});

type IhandleSubmitRegister = z.infer<typeof handleSubmitRegisterSchema>;

const ConfiguracaoList = () => {
    const { getAllConfiguracao, createConfiguracao, updateConfiguracao } = useConfiguracao();
    const { getAllUsuario } = useUsuario()
    const { getAllCategoriaTransacao } = useCategoriaTransacao()
    const { user } = useGlobal();
    const {
        setValue,
        formState: { errors },
    } = useForm<IhandleSubmitRegister>({
        resolver: zodResolver(handleSubmitRegisterSchema)
    });

    const { data, count, isLoading } = getAllConfiguracao();
    const { data: dataUsuario, isLoading: isLoadingUsuario } = getAllUsuario()
    const { data: dataCategoria, isLoading: isLoadingCategoria } = getAllCategoriaTransacao()
    const { mutate: mutateToCreateConfig, isLoading: isLoadingCreate } = createConfiguracao()
    const { mutate: mutateToUpdateConfig, isLoading: isLoadingUpdate } = updateConfiguracao()

    let configUser: IConfiguracao | undefined
    let configCategory: IConfiguracao | undefined

    if (data.length) {
        configUser = data.find((config => config.tipo == 'default-user'))
        configCategory = data.find((config => config.tipo == 'default-category'))
    }

    const setConfigUser = async (usuario: { id: string, nome: string }) => {

        if (configUser) {
            mutateToUpdateConfig({
                id: configUser.id,
                tipo: 'default-user',
                configuracao: JSON.stringify(usuario),
                idUsuario: user?.id
            })

            return
        }

        mutateToCreateConfig({
            tipo: 'default-user',
            configuracao: JSON.stringify(usuario),
            idUsuario: user?.id
        })

    }

    const setConfigCategory = async (usuario: { id: string, nome: string }) => {

        if (configCategory) {
            mutateToUpdateConfig({
                id: configCategory.id,
                tipo: 'default-category',
                configuracao: JSON.stringify(usuario),
                idUsuario: user?.id
            })

            return
        }
        mutateToCreateConfig({
            tipo: 'default-category',
            configuracao: JSON.stringify(usuario),
            idUsuario: user?.id
        })
    }

    return (
        <>
            <Flex>
                <SectionTop className="contentTop" gap="30px">
                    <Flex gap="10px" flexWrap="wrap">
                        <Text fontSize="2xl" fontWeight="bold">
                            Configurações
                        </Text>
                    </Flex>
                </SectionTop>
                <SectionTop className="contentTop">
                </SectionTop>
            </Flex>

            <Content className="contentMain">
                {isLoading && (
                    <Flex h="100%" alignItems="center">
                        <Loading />
                    </Flex>
                )}
                {!isLoading && (
                    <>
                        <Box as='span' flex='1' textAlign='left'>
                            <SelectForm
                                name="defaultUser"
                                label="Usuário Padrão"
                                maxW='100px'
                                isRequired
                                isLoading={isLoadingUsuario}
                                handleChange={(option) => {
                                    setValue("defaultUser", option?.value);
                                    setConfigUser({ id: option?.value, nome: option?.label })
                                }}
                                options={dataUsuario.map((user) => {
                                    return { value: user.id, label: user.nome }
                                })}
                                defaultValue={{
                                    value: configUser?.id,
                                    label: configUser?.configuracao ? JSON.parse(configUser.configuracao)?.nome : ''
                                }}
                            />

                            <br />

                            <SelectForm
                                name="defaultCategory"
                                label="Categoria Padrão"
                                maxW='100px'
                                isRequired
                                isLoading={isLoadingCategoria}
                                handleChange={(option) => {
                                    setValue("defaultCategory", option?.value);
                                    setConfigCategory({ id: option?.value, nome: option?.label })
                                }}
                                options={dataCategoria.map((categoria) => {
                                    return { value: categoria.id, label: `${categoria.nome}/${categoria.SubCategoria.nome}` }
                                })}
                                defaultValue={{
                                    value: configCategory?.id,
                                    label: configCategory?.configuracao ? JSON.parse(configCategory.configuracao)?.nome : ''
                                }}
                            />

                        </Box>
                    </>
                )}
            </Content >
        </>
    );
};

export default ConfiguracaoList;

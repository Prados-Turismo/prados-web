import { Button, Flex, TableContainer, Text } from "@chakra-ui/react";
import { useState } from "react";
import FieldSearch from "../../../components/FieldSearch";
import Loading from "../../../components/Loading";
import Pagination from "../../../components/Pagination";
import { TBody, TD, THead, TR, Table } from "../../../components/Table";

// Styled Components
import { Content, SectionTop } from "./styled";

// Hooks and utils
import { ISelect } from "../../../models/generics.model";
import AlertNoDataFound from "../../../components/AlertNoDataFound";
import useComissao from "../../../hooks/useComissao";
import { currencyBRLFormat } from "../../../utils/currencyBRLFormat";
import { formattingDate } from "../../../utils/formattingDate";

const ComissaoList = () => {
    const { getComissao } = useComissao();
    const [statusSelected, setStatusSelected] = useState<ISelect | null>();
    const [resetFilter, setResetFilter] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [nome, setNome] = useState('')
    const registerPerPage = 10;

    const { data, count, isLoading } = getComissao({
        size: registerPerPage,
        page: currentPage,
        nome,
        status: statusSelected?.value
    });

    return (
        <>
            <Flex>
                <SectionTop className="contentTop" gap="30px">
                    <Flex gap="10px" flexWrap="wrap">
                        <Text fontSize="2xl" fontWeight="bold">
                            Comissões
                        </Text>
                    </Flex>
                </SectionTop>

                <SectionTop className="contentTop">
                </SectionTop>
            </Flex>

            <Content className="contentMain">
                <Flex width="100%" gap="15px" alignItems="flex-end" flexWrap="wrap">
                    <div className="searchWrap">
                        <span>Buscar Comissão</span>
                        <FieldSearch
                            placeholder="Nome"
                            handleSearch={(event) => {
                                setResetFilter(false);
                                setCurrentPage(1);
                                setNome(event)
                            }}
                            reset={resetFilter}
                        />
                    </div>
                    <Button
                        borderRadius="5px"
                        variant="outline"
                        onClick={() => {
                            setResetFilter(true);
                            setStatusSelected(null);
                        }}
                    >
                        Limpar Filtros
                    </Button>
                </Flex>

                {isLoading && (
                    <Flex h="100%" alignItems="center">
                        <Loading />
                    </Flex>
                )}

                {!isLoading && (
                    <>
                        {data.length > 0 && (
                            <>
                                <TableContainer marginBottom="10px">
                                    <Table>
                                        <THead padding="0 30px 0 30px">
                                            <TD>Vendedor</TD>
                                            <TD>Valor</TD>
                                            <TD>Periodo</TD>
                                            <TD>Data Registro</TD>
                                        </THead>

                                        <TBody>
                                            {data.map((item) => (
                                                <TR key={item.id}>
                                                    <TD>
                                                        {item.Usuario.nome}
                                                    </TD>
                                                    <TD>
                                                        {currencyBRLFormat(item.valor)}
                                                    </TD>
                                                    <TD>
                                                        {item.periodo}
                                                    </TD>
                                                    <TD>
                                                        {formattingDate(item.data)}
                                                    </TD>
                                                </TR>
                                            ))}
                                        </TBody>
                                    </Table>
                                </TableContainer>

                                <Pagination
                                    registerPerPage={registerPerPage}
                                    totalRegisters={count}
                                    currentPage={currentPage}
                                    handleChangePage={(page) => setCurrentPage(page)}
                                />
                            </>
                        )}

                        {data.length === 0 && (
                            <AlertNoDataFound title="Nenhuma comissão encontrada" />
                        )}
                    </>
                )}
            </Content>
        </>
    );
};

export default ComissaoList;

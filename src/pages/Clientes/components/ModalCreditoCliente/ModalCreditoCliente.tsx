/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, TableContainer } from "@chakra-ui/react";
import { TBody, TD, THead, TR, Table } from "../../../../components/Table";

// Hooks
import useCreditoCliente from "../../../../hooks/useCreditoCliente";
import useEndereco from "../../../../hooks/useEndereco";

import { Content, SectionTop } from "../../pages/styled";
import { useGlobal } from "../../../../contexts/UserContext";
import { FormEvent, useState } from "react";
import { cpfMask } from "../../../../utils/fieldMask";
import { currencyBRLFormat } from "../../../../utils/currencyBRLFormat";
import { formattingDate } from "../../../../utils/formattingDate";
import ButtonIcon from "../../../../components/ButtonIcon";
import { MdEdit } from "react-icons/md";
import { FiTrash } from "react-icons/fi";
import Loading from "../../../../components/Loading";
import AlertNoDataFound from "../../../../components/AlertNoDataFound";

interface IModalCreditoCliente {
  handleClose: () => void
  id: string
}

const ModalCreditoCliente = ({
  handleClose,
  id
}: IModalCreditoCliente) => {
  const { user } = useGlobal();
  const { getCreditoCliente } = useCreditoCliente();
  const [currentPage, setCurrentPage] = useState(1);
  const registerPerPage = 10;

  const { data, count, isLoading } = getCreditoCliente({
    size: registerPerPage,
    page: currentPage
  }, id);

  return (
    <>
      <Content className="contentMain" width='100%'>

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
                      <TD>Nome</TD>
                      <TD>Valor</TD>
                      <TD>Data do Crédito</TD>
                      <TD>Reserva</TD>
                      <TD>Excursão</TD>
                      <TD></TD>
                    </THead>

                    <TBody>
                      {data.map((item) => (
                        <TR key={item.id}>
                          <TD>
                            {item.Cliente.nome}
                          </TD>
                          <TD>
                            {currencyBRLFormat(item.valor)}
                          </TD>
                          <TD>
                            {formattingDate(item.dataCadastro)}
                          </TD>
                          <TD>
                            {item.Reserva.reserva}
                          </TD>
                          <TD>
                            {`${formattingDate(item.Reserva.Excursao.dataInicio)} à ${formattingDate(item.Reserva.Excursao.dataFim)} - ${item.Reserva.Excursao?.nome}`}
                          </TD>
                          <TD gap={3}>

                            <ButtonIcon tooltip="Editar">
                              <MdEdit
                                size={20}
                                cursor="pointer"
                                onClick={() => {
                                  // setClienteData(item)
                                  // setModalUpdateCliente(true)
                                }}
                              />
                            </ButtonIcon>

                            <ButtonIcon tooltip="Excluir Cliente">
                              <Button
                                variant="unstyled"
                                display="flex"
                                alignItems="center"
                                colorScheme="red"
                                onClick={() => {
                                  // setModalRemoveCliente(true)
                                  // setDeleteClienteId(item.id)
                                }}
                              >
                                <FiTrash />
                              </Button>
                            </ButtonIcon>

                          </TD>
                        </TR>
                      ))}
                    </TBody>
                  </Table>
                </TableContainer>
              </>
            )}

            {data.length === 0 && (
              <AlertNoDataFound title="Nenhum crédito encontrado" />
            )}
          </>
        )}
      </Content >
    </>
  );
};

export default ModalCreditoCliente;

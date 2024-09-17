import { Button, Checkbox, Flex, TableContainer, Text } from "@chakra-ui/react";
import { useState } from "react";
import Loading from "../../../../../components/Loading";
import Pagination from "../../../../../components/Pagination";
import { TBody, TD, THead, TR, Table } from "../../../../../components/Table";

// Styled Components
import { Content, SectionTop } from "./styled";

// Hooks and utils
import AlertNoDataFound from "../../../../../components/AlertNoDataFound";
import { useNavigate, useParams } from "react-router-dom";
import useOpcionalEmbarque from "../../../../../hooks/useOpcionalEmbarque";
import useProduct from "../../../../../hooks/useProducts";
import { IUpdateOpcionalEmbarqueArgs } from "../../../../../models/opcional-embarque.model";
import { formattingDate } from "../../../../../utils/formattingDate";

const OpcionaisEmbarqueList = () => {
  const { id: _id, idExcursao: _idExcursao } = useParams();
  const navigate = useNavigate();
  const { getOpcionalEmbarque, createOpcionalEmbarque, updateOpcionalEmbarque, } = useOpcionalEmbarque();
  const { findProduto } = useProduct();

  const { data: dataProduto, isLoading: loadingOpcional } = findProduto(_id || '');
  const [currentPage, setCurrentPage] = useState(1);
  const registerPerPage = 10;

  const { data, count, isLoading } = getOpcionalEmbarque({
    size: registerPerPage,
    page: currentPage,
  }, _id || '', _idExcursao || '');

  const { mutate: mutateToCreateEmbarque, isLoading: isLoadingCreateEmbarque } = createOpcionalEmbarque()
  const { mutate: mutateToUpdateEmbarque, isLoading: isLoadingUpdateEmbarque } = updateOpcionalEmbarque()

  const embarqueDesembarque = (dadosEmbarque: IUpdateOpcionalEmbarqueArgs) => {
    if (!isLoadingCreateEmbarque && !isLoadingUpdateEmbarque) {
      if (dadosEmbarque.id) {
        mutateToUpdateEmbarque(dadosEmbarque)
      } else {
        mutateToCreateEmbarque(dadosEmbarque)
      }
    }
  }

  return (
    <>
      <SectionTop className="contentTop" gap="30px">
        <Button
          variant="outline"
          width="74px"
          onClick={() => navigate(`/excursoes/${_idExcursao}/passageiros`)}
        >
          Voltar
        </Button>

        <Flex gap="10px" flexWrap="wrap">
          <Text fontSize="2xl" fontWeight="bold">
            Embarque:
          </Text>
          <Text fontSize="2xl">
            {dataProduto.nome}
          </Text>
        </Flex>
      </SectionTop>

      <Content className="contentMain">

        {isLoading || loadingOpcional && (
          <Flex h="100%" alignItems="center">
            <Loading />
          </Flex>
        )}

        {!isLoading && !loadingOpcional && (
          <>
            {data.length > 0 && (
              <>
                <TableContainer marginBottom="10px">
                  <Table>
                    <THead padding="0 30px 0 30px">
                      <TD>Passageiro</TD>
                      <TD>Hora Embarque</TD>
                      <TD>Embarcou?</TD>
                    </THead>

                    <TBody>
                      {data.map((item) => (
                        <TR key={item.id}>
                          <TD>
                            {item.Pessoa.nome}
                          </TD>
                          <TD>
                            {formattingDate(item.data, true)}
                          </TD>
                          <TD>
                            <Checkbox
                              borderColor="#909090"
                              isChecked={item.embarcou}
                              _checked={{
                                ".chakra-checkbox__control": {
                                  bgColor: "brand.500",
                                  borderColor: "brand.500",
                                  boxShadow: "none",
                                },
                                ".chakra-checkbox__control:hover": {
                                  bgColor: "brand.500",
                                  borderColor: "brand.500",
                                  boxShadow: "none",
                                },
                              }}
                              onChange={(event) => {
                                if (!isLoadingCreateEmbarque && !isLoadingUpdateEmbarque) {
                                  let opcionalId = item.Reservas.Opcionais.find((opcional) => opcional.Produto.id == _id)?.id || ''
                                  embarqueDesembarque({
                                    idPassageiro: item.id,
                                    idOpcional: opcionalId,
                                    embarcou: event.target.checked ? true : false,
                                    data: new Date(),
                                    id: item.hasBoarded
                                  })
                                  item.embarcou = event.target.checked ? true : false
                                }
                              }}
                            />
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
              <AlertNoDataFound title="Nenhuma excursão encontrado" />
            )}
          </>
        )}
      </Content>
    </>
  );
};

export default OpcionaisEmbarqueList;

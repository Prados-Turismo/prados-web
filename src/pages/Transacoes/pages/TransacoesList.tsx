import { Button, Flex, TableContainer } from "@chakra-ui/react";
import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import FieldSearch from "../../../components/FieldSearch";
import Loading from "../../../components/Loading";
import Pagination from "../../../components/Pagination";
import { TBody, TD, THead, TR, Table } from "../../../components/Table";

// Styled Components
import { Content, SectionTop } from "./styled";

// Hooks and utils
import ReactSelect from "react-select";
import SimpleModal from "../../../components/SimpleModal";
import { ISelect } from "../../../models/generics.model";
import ModalRecordTransacao from "../components/ModalRegisterTransacao";
import AlertNoDataFound from "../../../components/AlertNoDataFound";
import { MdEdit } from "react-icons/md";
import ButtonIcon from "../../../components/ButtonIcon";
import { FiTrash } from "react-icons/fi";
import AlertModal from "../../../components/AlertModal";
import ModalUpdateTransacao from "../components/ModalUpdateTransacao";
import useTransacao from "../../../hooks/useTransacao";
import { formattingDate } from "../../../utils/formattingDate";
import { ITransacao } from "../../../models/transacao.model";
import { IoCheckmarkCircle, IoCheckmarkDoneSharp, IoCloseCircle } from "react-icons/io5";

const TransacoesList = () => {
  const { getTransacoes, deleteTransacao } = useTransacao();
  const [statusSelected, setStatusSelected] = useState<ISelect | null>();
  const [resetFilter, setResetFilter] = useState(false);
  const [modalRecordTransacao, setModalRecordProduct] = useState(false);
  const [modalUpdateProduct, setModalUpdateTransacao] = useState(false);
  const [modalRemoveProduto, setModalRemoveProduto] = useState(false);
  const [productData, setProductData] = useState<ITransacao | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const registerPerPage = 10;

  const { mutate: mutateToDeleteTransacao } = deleteTransacao();
  const [deleteItemId, setDeleteTransacaoId] = useState('');

  const { data, count, isLoading } = getTransacoes({
    size: registerPerPage,
    page: currentPage
  });

  const onConfirmRemoveProduto = () => {
    mutateToDeleteTransacao(deleteItemId || "");
    setModalRemoveProduto(false);
  };

  return (
    <>
      <SectionTop className="contentTop">
        <Button
          leftIcon={<IoIosAdd />}
          onClick={() => {
            setModalRecordProduct(true);
          }}
        >
          Cadastrar transação
        </Button>
      </SectionTop>

      <Content className="contentMain">
        <Flex width="100%" gap="15px" alignItems="flex-end" flexWrap="wrap">
          <div className="searchWrap">
            <span>Buscar transação</span>
            <FieldSearch
              placeholder=""
              handleSearch={() => {
                setResetFilter(false);
                setCurrentPage(1);
              }}
              reset={resetFilter}
            />
          </div>
          <Flex flexDirection="column" gap="5px" width="300px">
            <span>Status</span>

            <ReactSelect
              className="select-fields"
              classNamePrefix="select"
              closeMenuOnSelect={true}
              isSearchable={true}
              value={statusSelected}
              placeholder="Selecionar"
              noOptionsMessage={() => "Nenhum Status encontrado"}
              onChange={(item) => {
                setStatusSelected(item);
              }}
              options={[
                {
                  label: "Completo",
                  value: 1,
                },
                {
                  label: "Incompleto",
                  value: 2,
                },
              ]}
            />
          </Flex>
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
                      <TD>Efetivado</TD>
                      <TD>Data Pagamento</TD>
                      <TD>Tipo</TD>
                      <TD>Valor</TD>
                      <TD>Forma de pagamento</TD>
                      <TD>Recebimento</TD>
                      <TD>Visto</TD>
                      <TD></TD>
                    </THead>

                    <TBody>
                      {data.map((item) => (
                        <TR key={item.id}>
                          <TD>
                            {item.efetivado ? "Sim" : "Não"}
                          </TD>
                          <TD>
                            {formattingDate(item.data)}
                          </TD>
                          <TD>
                            {item.tipo === 1 ? "Débito" : "Crédito"}
                          </TD>
                          <TD>
                            R$ {item.valor}
                          </TD>
                          <TD>
                            {item.FormaPagamento.nome}
                          </TD>
                          <TD>
                            {formattingDate(item.dataPrevistaRecebimento)}
                          </TD>
                          <TD>
                            {item.vistoAdmin ? "Sim" : "Não"}
                          </TD>
                          <TD gap={3}>
                            <MdEdit
                              size={20}
                              // color={customTheme.colors.brandSecond.first}
                              cursor="pointer"
                              onClick={() => {
                                setProductData(item)
                                setModalUpdateTransacao(true)
                              }}
                            />

                            <ButtonIcon tooltip="Excluir transação">
                              <Button
                                variant="unstyled"
                                display="flex"
                                alignItems="center"
                                colorScheme="red"
                                onClick={() => {
                                  setModalRemoveProduto(true)
                                  setDeleteTransacaoId(item.id)
                                }}
                              >
                                <FiTrash />
                              </Button>
                            </ButtonIcon>

                            <ButtonIcon tooltip="Efetivar transação">
                              <IoCheckmarkCircle 
                                size={20}
                                onClick={() => { }}
                              />
                            </ButtonIcon>

                            <ButtonIcon tooltip="Desfetivar transação">
                              <IoCloseCircle
                                size={20}
                                onClick={() => { }}
                              />
                            </ButtonIcon>

                            <ButtonIcon tooltip="Marcar como visto">
                              <IoCheckmarkDoneSharp
                                size={20}
                                onClick={() => { }}
                              />
                            </ButtonIcon>

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
              <AlertNoDataFound title="Nenhuma transação encontrada" />
            )}
          </>
        )}
      </Content>

      <SimpleModal
        title="Transação"
        size="xl"
        isOpen={modalRecordTransacao}
        handleModal={setModalRecordProduct}
      >
        <ModalRecordTransacao
          handleClose={() => setModalRecordProduct(false)}
        />
      </SimpleModal>

      {productData && (
        <SimpleModal
          title="Transação"
          size="xl"
          isOpen={modalUpdateProduct}
          handleModal={setModalUpdateTransacao}
        >
          <ModalUpdateTransacao
            handleClose={() => setModalUpdateTransacao(false)}
            data={productData}
          />
        </SimpleModal>
      )}

      {modalRemoveProduto && (
        <AlertModal
          title="Remover transação"
          question="Deseja realmente remover esta transação?"
          request={onConfirmRemoveProduto}
          showModal={modalRemoveProduto}
          setShowModal={setModalRemoveProduto}
          size="md"
        ></AlertModal>
      )}
    </>
  );
};

export default TransacoesList;

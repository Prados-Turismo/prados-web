import { Button, Flex, Input, TableContainer, Tooltip } from "@chakra-ui/react";
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
import { IoMdClose } from "react-icons/io";
import { currencyBRLFormat } from "../../../utils/currencyBRLFormat";

const TransacoesList = () => {
  const { getTransacoes,
    deleteTransacao,
    efetivarTransacao,
    desefetivarTransacao,
    setVistoTransacao,
    removeVistoTransacao } = useTransacao();
  const [statusSelected, setStatusSelected] = useState<ISelect | null>();
  const [resetFilter, setResetFilter] = useState(false);
  const [modalRecordTransacao, setModalRecordProduct] = useState(false);
  const [modalUpdateTransacao, setModalUpdateTransacao] = useState(false);
  const [modalRemoveTransacao, setModalRemoveTransacao] = useState(false);
  const [modalEfetivaTransacao, setModalEfetivaTransacao] = useState(false);
  const [modalDesfetivaTransacao, setModalDesfetivaTransacao] = useState(false);
  const [modalSetVistoTransacao, setModalSetVistoTransacao] = useState(false);
  const [modalRemoveVistoTransacao, setModalRemoveVistoTransacao] = useState(false);
  const [transacaoData, setTransacaoData] = useState<ITransacao | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const registerPerPage = 10;
  const [dataInicio, setDataInicio] = useState(null || '')
  const [dataFim, setDataFim] = useState(null || '')
  const [nome, setNome] = useState(null || '')
  const [codigoContaBancaria, setContaBancaria] = useState(null)

  const { mutate: mutateToDeleteTransacao } = deleteTransacao();
  const [transacaoId, setTransacaoId] = useState('');

  const { mutate: mutateToEfetivarTransacao } = efetivarTransacao();
  const { mutate: mutateToDesefetivarTransacao } = desefetivarTransacao();
  const { mutate: mutateToSetVistoTransacao } = setVistoTransacao();
  const { mutate: mutateToRemoveVistoTransacao } = removeVistoTransacao();

  const { data, count, isLoading } = getTransacoes({
    size: registerPerPage,
    page: currentPage,
    dataInicio,
    dataFim,
    nome,
    codigoContaBancaria,
    efetivado: statusSelected?.value
  });

  const onConfirmRemoveTransacao = () => {
    mutateToDeleteTransacao(transacaoId || "");
    setModalRemoveTransacao(false);
  };

  const onConfirmEfetivaTransacao = () => {
    mutateToEfetivarTransacao(transacaoId || "");
    setModalEfetivaTransacao(false);
  };

  const onConfirmDesefetivaTransacao = () => {
    mutateToDesefetivarTransacao(transacaoId || "");
    setModalDesfetivaTransacao(false);
  };

  const onConfirmSetVistoTransacao = () => {
    mutateToSetVistoTransacao(transacaoId || "");
    setModalSetVistoTransacao(false);
  };

  const onConfirmRemoveVistoTransacao = () => {
    mutateToRemoveVistoTransacao(transacaoId || "");
    setModalRemoveVistoTransacao(false);
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
              handleSearch={(event) => {
                setResetFilter(false);
                setCurrentPage(1);
                setNome(event)
              }}
              reset={resetFilter}
            />
          </div>
          <Flex flexDirection="column" gap="5px" width="200px">
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
                  label: 'Todos',
                  value: 'all'
                },
                {
                  label: "Efetivados",
                  value: 1,
                },
                {
                  label: "Pendentes",
                  value: 2,
                },
              ]}
            />
          </Flex>
          <Flex flexDirection="column" gap="5px" width="160px">
            <span>Data Início</span>
            <Input
              type="date"
              placeholder="dd/mm/aaaa"
              max="2099-12-31"
              maxLength={10}
              value={dataInicio}
              onChange={(event) => {
                setDataInicio(event.target.value)
              }}
            />
          </Flex>
          <Flex flexDirection="column" gap="5px" width="160px">
            <span>Data Fim</span>
            <Input
              type="date"
              placeholder="dd/mm/aaaa"
              value={dataFim}
              max="2099-12-31"
              maxLength={10}
              onChange={(event) => {
                setDataFim(event.target.value)
              }}
            />
          </Flex>
          <Button
            borderRadius="5px"
            variant="outline"
            onClick={() => {
              setResetFilter(true);
              setStatusSelected(null);
              setDataInicio('')
              setDataFim('')
              setNome('')
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
                      <TD></TD>
                      <TD>Data</TD>
                      <TD>Tipo</TD>
                      <TD>Valor</TD>
                      <TD>Conta</TD>
                      <TD>Forma de pagamento</TD>
                      <TD>Recebimento</TD>
                      <TD>Visto</TD>
                      <TD></TD>
                    </THead>

                    <TBody>
                      {data.map((item) => (
                        <TR key={item.id}>
                          <TD>
                            {item.efetivado ? (
                              <Tooltip label="Efetivado" placement="top" hasArrow>
                                <div style={{
                                  backgroundColor: "green",
                                  borderRadius: "50%",
                                  width: "10px",
                                  height: "10px"
                                }} />
                              </Tooltip>
                            ) : (
                              <Tooltip label="Pendente" placement="top" hasArrow>
                                <div style={{
                                  backgroundColor: "red",
                                  borderRadius: "50%",
                                  width: "10px",
                                  height: "10px"
                                }} />
                              </Tooltip>
                            )}
                          </TD>
                          <TD>
                            {formattingDate(item.data)}
                          </TD>
                          <TD>
                            {item.tipo === 1 ? "Débito" : "Crédito"}
                          </TD>
                          <TD>
                            {currencyBRLFormat(item.valor)}
                          </TD>
                          <TD>
                            {item.ContaBancaria?.nome}
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

                            <ButtonIcon tooltip="Editar">
                              <MdEdit
                                size={20}
                                // color={customTheme.colors.brandSecond.first}
                                cursor="pointer"
                                onClick={() => {
                                  setTransacaoData(item)
                                  setModalUpdateTransacao(true)
                                }}
                              />
                            </ButtonIcon>

                            <ButtonIcon tooltip="Excluir transação">
                              <Button
                                variant="unstyled"
                                display="flex"
                                alignItems="center"
                                colorScheme="red"
                                onClick={() => {
                                  setModalRemoveTransacao(true)
                                  setTransacaoId(item.id)
                                }}
                              >
                                <FiTrash />
                              </Button>
                            </ButtonIcon>

                            {!item.efetivado && (
                              <ButtonIcon tooltip="Efetivar transação">
                                <IoCheckmarkCircle
                                  size={20}
                                  onClick={() => {
                                    setModalEfetivaTransacao(true)
                                    setTransacaoId(item.id)
                                  }}
                                />
                              </ButtonIcon>
                            )}

                            {item.efetivado && (
                              <ButtonIcon tooltip="Desfetivar transação">
                                <IoCloseCircle
                                  size={20}
                                  onClick={() => {
                                    setModalDesfetivaTransacao(true)
                                    setTransacaoId(item.id)
                                  }}
                                />
                              </ButtonIcon>
                            )}

                            {!item.vistoAdmin && (
                              <ButtonIcon tooltip="Marcar como visto">
                                <IoCheckmarkDoneSharp
                                  size={20}
                                  onClick={() => {
                                    setModalSetVistoTransacao(true)
                                    setTransacaoId(item.id)
                                  }}
                                />
                              </ButtonIcon>
                            )}

                            {item.vistoAdmin && (
                              <ButtonIcon tooltip="Desmarcar como visto">
                                <IoMdClose
                                  size={20}
                                  onClick={() => {
                                    setModalRemoveVistoTransacao(true)
                                    setTransacaoId(item.id)
                                  }}
                                />
                              </ButtonIcon>
                            )}

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

      {transacaoData && (
        <SimpleModal
          title="Transação"
          size="xl"
          isOpen={modalUpdateTransacao}
          handleModal={setModalUpdateTransacao}
        >
          <ModalUpdateTransacao
            handleClose={() => setModalUpdateTransacao(false)}
            data={transacaoData}
          />
        </SimpleModal>
      )}

      {modalRemoveTransacao && (
        <AlertModal
          title="Remover transação"
          question="Deseja realmente remover esta transação?"
          request={onConfirmRemoveTransacao}
          showModal={modalRemoveTransacao}
          setShowModal={setModalRemoveTransacao}
          size="md"
        ></AlertModal>
      )}

      {modalEfetivaTransacao && (
        <AlertModal
          title="Efetivar transação"
          question="Deseja realmente efetivar esta transação?"
          request={onConfirmEfetivaTransacao}
          showModal={modalEfetivaTransacao}
          setShowModal={setModalEfetivaTransacao}
          size="md"
        ></AlertModal>
      )}

      {modalDesfetivaTransacao && (
        <AlertModal
          title="Desefetivar transação"
          question="Deseja realmente desefetivar esta transação?"
          request={onConfirmDesefetivaTransacao}
          showModal={modalDesfetivaTransacao}
          setShowModal={setModalDesfetivaTransacao}
          size="md"
        ></AlertModal>
      )}

      {modalSetVistoTransacao && (
        <AlertModal
          title="Visto transação"
          question="Deseja realmente marcar como vista esta transação?"
          request={onConfirmSetVistoTransacao}
          showModal={modalSetVistoTransacao}
          setShowModal={setModalSetVistoTransacao}
          size="md"
        ></AlertModal>
      )}

      {modalRemoveVistoTransacao && (
        <AlertModal
          title="Visto transação"
          question="Deseja realmente desmarcar como vista esta transação?"
          request={onConfirmRemoveVistoTransacao}
          showModal={modalRemoveVistoTransacao}
          setShowModal={setModalRemoveVistoTransacao}
          size="md"
        ></AlertModal>
      )}
    </>
  );
};

export default TransacoesList;

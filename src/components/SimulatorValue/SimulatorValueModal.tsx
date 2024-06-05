/* eslint-disable @typescript-eslint/no-explicit-any */
import SimpleModal from "../SimpleModal";
import { ISimulatorValueModal } from "./types";
import { Flex } from "@chakra-ui/layout";
import BenefitDetailsHeader from "../BenefitDetailsHeader";
import { useReactToPrint } from "react-to-print";
import "./printStyle.css";
import {
  Box,
  Button,
  Input,
  Table,
  TableContainer,
  Tfoot,
  Thead,
  Tr,
  Text,
  Skeleton,
} from "@chakra-ui/react";
import { Tbody, Td, Th } from "./styled";
import { dateFormat, numberFormat } from "../../utils";
import { useEffect, useRef, useState } from "react";
import { capitalize } from "../../utils/capitalize";
import useBenefits from "../../hooks/useBenefits";
import { theme } from "../../theme";

const SimulatorValueModal = ({
  benefit,
  showModal,
  setShowModal,
}: ISimulatorValueModal) => {
  const { getBeneficiariesAgeGroups } = useBenefits();
  const { data, isLoading } = getBeneficiariesAgeGroups(
    benefit?.contractId,
    benefit?.companyAssociatedId,
  );
  const [inputValues, setInputValues] = useState<any>(
    benefit?.precification[0]?.holder.map(() => ({
      input1: "0",
      input2: "0",
    })),
  );

  const totalTypeValues = (type: "holder" | "dependent") => {
    const total = inputValues?.reduce((acc: any, el: any) => {
      return Number(acc) + Number(type === "holder" ? el?.input1 : el?.input2);
    }, 0);
    return total;
    // const total = benefit?.precification[0]?.[type]?.reduce((acc, el, i) => {
    //   return (
    //     acc +
    //     el?.finalValue *
    //       (type === "holder" ? inputValues[i]?.input1 : inputValues[i]?.input2)
    //   );
    // }, 0);

    // return numberFormat(total);
  };

  useEffect(() => {
    if (data) {
      const values = benefit?.precification[0]?.holder.map((el, i) => ({
        input1: data?.holder[i]?.quantity?.toString(),
        input2: data?.dependent[i]?.quantity?.toString(),
      }));

      setInputValues(values);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const totalValues = () => {
    const total = benefit?.precification[0]?.holder?.reduce((acc, el, i) => {
      const finalValueHolder = inputValues[i]?.input1 * el?.finalValue || 0;
      const finalValueDependent =
        inputValues[i]?.input2 *
          benefit?.precification[0]?.dependent[i]?.finalValue || 0;
      const result = finalValueHolder + finalValueDependent;

      return acc + result;
    }, 0);

    return numberFormat(total);
  };

  const componentRef = useRef(null);
  const [loadingPrint, setLoadingPrint] = useState(false);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onBeforeGetContent: () => {
      document.title = `${benefit?.product?.reducedName.replaceAll(
        " ",
        "_",
      )}_${dateFormat(new Date())}.pdf`;
      setLoadingPrint(true);
    },
    onAfterPrint: () => {
      document.title = `${theme?.content?.project} - Produtos`;
      setLoadingPrint(false);
    },
  });

  return (
    <SimpleModal
      isOpen={showModal}
      handleModal={setShowModal}
      size="5xl"
      minHeight="160px"
      title={`Simular - ${capitalize(benefit?.product?.reducedName)}`}
      scrollBehavior="inside"
    >
      <Flex flexDir="column" w="100%">
        <Flex flexDir="column" ref={componentRef}>
          <Box
            className="print cabecalho"
            backgroundImage={theme.images.logo}
          ></Box>

          <Flex className="print rodape">
            {dateFormat(new Date())} - {new Date().getHours() < 10 ? "0" : ""}
            {new Date().getHours()}:{new Date().getMinutes() < 10 ? "0" : ""}
            {new Date().getMinutes()}
          </Flex>

          <BenefitDetailsHeader data={benefit?.product} />

          <TableContainer
            overflowY="unset"
            overflowX="unset"
            borderTop="1px solid #E5E5E5"
            borderBottom="1px solid #E5E5E5"
          >
            <Table size="sm" variant="striped">
              <Thead backgroundColor="#FBFBFB">
                <Tr>
                  <Th>Faixa etária</Th>
                  <Th>Valor titular</Th>
                  <Th>Valor dependente</Th>
                  <Th>Qtd. titulares</Th>
                  <Th>Qtd. dependentes</Th>
                  <Th>Total</Th>
                </Tr>
              </Thead>
              <Tbody>
                {benefit?.precification[0]?.holder?.map((el, i) => (
                  <Tr key={el?.range}>
                    <Td>{el?.range} anos</Td>
                    <Td>{numberFormat(el?.finalValue)}</Td>
                    <Td>
                      {numberFormat(
                        benefit?.precification[0]?.dependent[i]?.finalValue,
                      )}
                    </Td>
                    <Td>
                      {isLoading ? (
                        <Skeleton height="30px" w="72px" margin="0 auto" />
                      ) : (
                        <Input
                          type="number"
                          maxW="72px"
                          textAlign="center"
                          height="30px"
                          borderColor="#E5E5E5"
                          value={inputValues[i]?.input1 || ""}
                          onChange={(e) => {
                            const newInputValues = [...inputValues];
                            newInputValues[i] = {
                              ...newInputValues[i],
                              input1: e.target.value,
                            };

                            setInputValues(newInputValues);
                          }}
                        />
                      )}
                    </Td>
                    <Td>
                      {isLoading ? (
                        <Skeleton height="30px" w="72px" margin="0 auto" />
                      ) : (
                        <Input
                          type="number"
                          maxW="72px"
                          height="30px"
                          textAlign="center"
                          borderColor="#E5E5E5"
                          value={inputValues[i]?.input2 || ""}
                          onChange={(e) => {
                            const newInputValues = [...inputValues];
                            newInputValues[i] = {
                              ...newInputValues[i],
                              input2: e.target.value,
                            };
                            setInputValues(newInputValues);
                          }}
                        />
                      )}
                    </Td>
                    <Td>
                      {isLoading ? (
                        <Skeleton height="30px" w="72px" margin="0 auto" />
                      ) : (
                        numberFormat(
                          inputValues[i]?.input1 * el?.finalValue +
                            inputValues[i]?.input2 *
                              benefit?.precification[0]?.dependent[i]
                                ?.finalValue,
                        ) || 0
                      )}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot backgroundColor="#FBFBFB">
                <Tr>
                  <Th></Th>
                  <Th></Th>
                  <Th></Th>
                  <Th>Total: {totalTypeValues("holder")}</Th>
                  <Th>Total: {totalTypeValues("dependent")}</Th>
                  <Th w="150px" color="brand.500">
                    <Text
                      w="max-content"
                      margin="0 auto"
                      padding="4px 8px"
                      borderRadius="2px"
                      backgroundColor="#E9204314"
                      fontWeight={500}
                      fontSize="14px"
                    >
                      {totalValues()}
                    </Text>
                  </Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Flex>
        <Flex padding="24px" justifyContent="space-between">
          <Button
            border="none"
            background="#F5F5F5"
            borderRadius="4px"
            variant="outline"
            onClick={() => {
              setShowModal(false);
            }}
          >
            Cancelar
          </Button>
          <Button
            borderRadius="4px"
            onClick={handlePrint}
            isLoading={loadingPrint}
            w="160px"
          >
            Baixar simulação
          </Button>
        </Flex>
      </Flex>
    </SimpleModal>
  );
};

export default SimulatorValueModal;

import { Box, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";

import PriceTable from "../../../components/PriceTable";
import TooltipSubstring from "../../../components/TooltipSubstring/TooltipSubstring";
import { IDataProductContract } from "../../../models/product.model";
import { numberFormat } from "../../../utils";
import { BENEFICIARY_TYPE } from "../../../utils/enumFormat";

interface IModalBenefitTable {
  benefit?: IDataProductContract;
  productValue?: number;
  relationshipType: string;
  sectorName: string;
  positionName: string;
  beneficiaryName: string;
  percentageValue: string;
  valuePaymentCompany?: number;
  valuePaymentCollaborator?: number;
  value: number;
  title: string;
  isSingle: boolean;
}

const ModalBenefitTable = ({
  benefit,
  relationshipType,
  sectorName,
  positionName,
  beneficiaryName,
  percentageValue,
  valuePaymentCompany,
  valuePaymentCollaborator,
  productValue,
  value,
  title,
  isSingle,
}: IModalBenefitTable) => {
  return (
    <Box width="100%" padding="10px 0">
      <Text textAlign="left" fontWeight={600} margin="10px 24px 24px">
        {title}
      </Text>
      <Text textAlign="left" margin="0 24px 24px">
        O respectivo parâmetro será aplicado de acordo com as opções
        selecionadas.
      </Text>

      <Table margin="0 0 30px">
        <Thead>
          <Tr>
            <Th>Tipo</Th>
            <Th>Categoria</Th>
            <Th>Subcategoria</Th>
            <Th>Beneficiário</Th>
            <Th>
              Modo de
              <br />
              contribuição
            </Th>
            <Th>
              Valor/Percentual
              <br />
              pago pela empresa
            </Th>
          </Tr>
        </Thead>
        <Tbody border="1px solid #edf2f7">
          <Tr>
            <Td>{BENEFICIARY_TYPE[relationshipType]}</Td>
            <Td>
              <TooltipSubstring name={sectorName || ""} length={10} />
            </Td>
            <Td>
              <TooltipSubstring name={positionName || ""} length={10} />
            </Td>

            <Td>
              <TooltipSubstring name={beneficiaryName || ""} length={10} />
            </Td>

            <Td>{percentageValue === "V" ? "Valor" : "Percentual"}</Td>
            <Td>
              {percentageValue === "V" ? numberFormat(value) : `% ${value}`}
            </Td>
          </Tr>
        </Tbody>
      </Table>

      <Text textAlign="left" fontWeight={600} margin="0 24px 10px">
        Tabela de preço
      </Text>
      {isSingle && (
        <>
          <Table variant="striped" size="sm">
            <Thead>
              <Tr h="32px">
                <Th textAlign="center">Valor do produto</Th>
                <Th
                  textAlign="center"
                  borderRight="1px solid #E5E5E5"
                  borderLeft="1px solid #E5E5E5"
                >
                  Valor pago
                  <br />
                  pela empresa
                </Th>
                <Th textAlign="center">
                  Valor pago
                  <br />
                  pelo titular
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td textAlign="center">{numberFormat(productValue || 0)}</Td>
                <Td
                  textAlign="center"
                  borderRight="1px solid #E5E5E5"
                  borderLeft="1px solid #E5E5E5"
                >
                  {numberFormat(valuePaymentCompany || 0)}
                </Td>
                <Td textAlign="center">
                  {numberFormat(valuePaymentCollaborator || 0)}
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </>
      )}
      {benefit && !isSingle && (
        <PriceTable
          borderTop="1px solid #E5E5E5"
          benefit={benefit}
          relationship={
            relationshipType as "holder" | "dependent" | "aggregated"
          }
          page="parametersModal"
          parametrizerItemValue={value}
          percentageValue={percentageValue}
        />
      )}
    </Box>
  );
};

export default ModalBenefitTable;

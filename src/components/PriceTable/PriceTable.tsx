import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/table";
import { IDataProductContract } from "../../models/product.model";
import { genericSort, numberFormat } from "../../utils";

const PriceTable = ({
  benefit,
  relationship,
  borderTop,
  page,
  parametrizerItemValue,
  percentageValue,
}: {
  benefit: IDataProductContract;
  relationship: "holder" | "dependent" | "aggregated";
  borderTop?: string;
  page?: string;
  parametrizerItemValue?: number;
  percentageValue: string;
}) => {
  return (
    <TableContainer borderTop={borderTop}>
      <Table variant="striped" size="sm">
        <Thead>
          <Tr h="32px">
            <Th borderRight="1px solid #E5E5E5" textAlign="center">
              Faixa de idade
            </Th>
            <Th
              textAlign="center"
              borderRight={page === "product" ? "1px solid #E5E5E5" : "unset"}
            >
              Valor {page === "product" ? "titular" : "produto"}
            </Th>
            {page === "product" && <Th textAlign="center">Valor dependente</Th>}
            {page === "parametersModal" && parametrizerItemValue !== null && (
              <>
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
              </>
            )}
          </Tr>
        </Thead>
        <Tbody>
          {benefit?.precification[0]?.[relationship]
            .sort((a, b) =>
              genericSort(a, b, {
                property: "range",
              }),
            )
            .map((el, i) => {
              const valuePaymentCompany =
                (percentageValue === "P"
                  ? el?.finalValue * ((parametrizerItemValue || 0) / 100)
                  : parametrizerItemValue) || 0;

              const valuePaymentCollaborator =
                el?.finalValue - valuePaymentCompany;

              return (
                <Tr key={i}>
                  <Td textAlign="center" borderRight="1px solid #E5E5E5">
                    {benefit?.precification[0]?.[relationship]?.length === 1
                      ? `Faixa única`
                      : i ===
                        benefit?.precification[0]?.[relationship]?.length - 1
                      ? `Acima de 58 anos`
                      : `${el?.range} anos`}
                  </Td>
                  <Td
                    textAlign="center"
                    borderRight={
                      page === "product" ? "1px solid #E5E5E5" : "unset"
                    }
                  >
                    {numberFormat(el?.finalValue)}
                  </Td>
                  {page === "product" && (
                    <Td textAlign="center">
                      {numberFormat(
                        benefit?.precification[0]?.["dependent"][i]?.finalValue,
                      )}
                    </Td>
                  )}
                  {page === "parametersModal" &&
                    parametrizerItemValue !== null && (
                      <>
                        <Td
                          textAlign="center"
                          borderRight="1px solid #E5E5E5"
                          borderLeft="1px solid #E5E5E5"
                        >
                          {numberFormat(
                            valuePaymentCompany > el?.finalValue
                              ? el?.finalValue
                              : valuePaymentCompany,
                          )}
                        </Td>
                        <Td textAlign="center">
                          {numberFormat(
                            valuePaymentCollaborator > el?.finalValue
                              ? el?.finalValue
                              : valuePaymentCollaborator,
                          )}
                        </Td>
                      </>
                    )}
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default PriceTable;

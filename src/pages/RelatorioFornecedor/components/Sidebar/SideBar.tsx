import { Aside, AsideTop } from "./styled";

import { Table, TableContainer, Tbody, Td, Thead, Tr } from "@chakra-ui/react";
import { currencyBRLFormat } from "../../../../utils/currencyBRLFormat";
import { IRelatorioFornecedorSideBar } from "./types";

const SideBar = ({
  status,
  fornecedorResponse
}: IRelatorioFornecedorSideBar) => {

  const { receitas, despesas, isLoading } = fornecedorResponse
  const total = receitas - despesas

  return (
    <>
      <AsideTop className="contentTop">
        <h2>{status.title}</h2>
      </AsideTop>

      <Aside className="contentMain">
        <TableContainer marginBottom="10px">
          <Table>
            <Thead padding="0 30px 0 30px">
              <Td minWidth={200}></Td>
              <Td fontSize="0.9rem"></Td>
            </Thead>

            <Tbody>
              <Tr>
                <Td fontSize="0.9rem" >
                  Receitas
                </Td>
                <Td fontSize="0.9rem" style={{ color: 'green' }}>
                  {!isLoading && currencyBRLFormat(receitas)}
                </Td>
              </Tr>
              <Tr>
                <Td fontSize="0.9rem">
                  Despesas
                </Td>
                <Td fontSize="0.9rem" style={{ color: 'red' }}>
                  {!isLoading && currencyBRLFormat(despesas)}
                </Td>
              </Tr>
              <Tr style={{ fontWeight: 'bold' }}>
                <Td fontSize="0.9rem">
                  Total
                </Td>
                <Td fontSize="0.9rem" style={{ color: total < 0 ? 'red' : 'green'}}>
                  {!isLoading && (currencyBRLFormat(total))}
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Aside>
    </>
  );
};

export default SideBar;

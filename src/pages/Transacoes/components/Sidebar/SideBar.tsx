import { Aside, AsideTop, Wrap } from "./styled";

import { Table, TableContainer, Tbody, Td, Thead, Tr } from "@chakra-ui/react";
import { ISidebar } from "../../../../models/sidebar.model";
import { currencyBRLFormat } from "../../../../utils/currencyBRLFormat";
import useContaBancaria from "../../../../hooks/useContaBancaria";

const SideBar = ({ status }: ISidebar) => {
  const { getAllContaBancaria } = useContaBancaria()
  const { data: dataContaBancaria, isLoading: isLoadingContaBancaria } = getAllContaBancaria();

  return (
    <>
      <AsideTop className="contentTop">
        <h2>{status.title}</h2>
      </AsideTop>

      <Aside className="contentMain">
        <TableContainer marginBottom="10px">
          <Table>
            <Thead padding="0 30px 0 30px">
              <Td minWidth={200}>Conta</Td>
              <Td fontSize="0.9rem">Confirmado</Td>
              <Td fontSize="0.9rem">Projetado</Td>
            </Thead>

            <Tbody>
              {!isLoadingContaBancaria && dataContaBancaria.map((item) => (
                <Tr key={item.id}>
                  <Td fontSize="0.9rem">
                    {item.nome}
                  </Td>
                  <Td fontSize="0.9rem">
                    {currencyBRLFormat(item.saldo)}
                  </Td>
                  <Td fontSize="0.9rem">
                    {currencyBRLFormat(item.saldo)}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Aside>
    </>
  );
};

export default SideBar;

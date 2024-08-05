import { Aside, AsideTop, Wrap } from "./styled";

import { Table, TableContainer, Tbody, Td, Thead, Tr } from "@chakra-ui/react";
import { ISidebar } from "../../../../models/sidebar.model";
import { currencyBRLFormat } from "../../../../utils/currencyBRLFormat";

const SideBar = ({ status }: ISidebar) => {
  const data = [
    {
      id: 1,
      nome: "Conta 1",
      confirmado: 1000,
      projetado: 2000,
    },
    {
      id: 2,
      nome: "Conta 2",
      confirmado: 2000,
      projetado: 3000,
    },
    {
      id: 3,
      nome: "Conta 3",
      confirmado: 3000,
      projetado: 4000,
    },
    {
      id: 4,
      nome: "Conta 4",
      confirmado: 4000,
      projetado: 5000,
    },
    {
      id: 5,
      nome: "Conta 5",
      confirmado: 5000,
      projetado: 6000,
    },
  ];

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
              <Td fontSize="0.9rem">Confirmado</Td>
              <Td fontSize="0.9rem">Projetado</Td>
            </Thead>

            <Tbody>
              {data.map((item) => (
                <Tr key={item.id}>
                  <Td fontSize="0.9rem">
                    {item.nome}
                  </Td>
                  <Td fontSize="0.9rem">
                    {currencyBRLFormat(item.confirmado)}
                  </Td>
                  <Td fontSize="0.9rem">
                  {currencyBRLFormat(item.projetado)}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        <Wrap>
          <h2 className="title">
            <span>Resultados (R$)</span>
          </h2>

          <div className="menu">
            <TableContainer>
              <Table>
                <Thead padding="0 30px 0 30px">
                  <Td minWidth={250}></Td>
                  <Td></Td>
                </Thead>

                <Tbody>
                  <Tr letterSpacing={1}>
                    <Td fontSize="0.9rem" fontWeight="bold">
                      Entradas
                    </Td>
                    <Td fontSize="0.9rem">
                      {currencyBRLFormat(0)}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td fontSize="0.9rem">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Receitas
                    </Td>
                    <Td fontSize="0.9rem">
                      {currencyBRLFormat(0)}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td fontSize="0.9rem">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Transferências
                    </Td>
                    <Td fontSize="0.9rem">
                      {currencyBRLFormat(0)}
                    </Td>
                  </Tr>

                  <Tr>
                    <Td fontSize="0.9rem" fontWeight="bold">
                      Saídas
                    </Td>
                    <Td fontSize="0.9rem">
                      {currencyBRLFormat(0)}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td fontSize="0.9rem">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Despesas
                    </Td>
                    <Td fontSize="0.9rem">
                      {currencyBRLFormat(0)}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td fontSize="0.9rem">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Transferências
                    </Td>
                    <Td fontSize="0.9rem">
                      {currencyBRLFormat(0)}
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </div>
        </Wrap>
      </Aside>
    </>
  );
};

export default SideBar;

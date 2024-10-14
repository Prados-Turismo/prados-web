import { Aside, AsideTop } from "./styled";

import { Input, Table, TableContainer, Tbody, Td, Thead, Tr } from "@chakra-ui/react";
import { currencyBRLFormat } from "../../../../utils/currencyBRLFormat";
import { IRelatorioVendasSideBar } from "./types";
import { useState } from "react";

const SideBar = ({
  status,
  vendaResponse
}: IRelatorioVendasSideBar) => {

  const { vendas, isLoading } = vendaResponse
  const [percentComissao, setComissao] = useState(0)
  const [total, setTotal] = useState(0)

  const calculateTotal = () => {
    let totalComissao = vendas * (percentComissao / 100);
    setTotal(totalComissao)
  }

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
                  Vendas
                </Td>
                <Td fontSize="0.9rem" style={{ color: 'green' }}>
                  {!isLoading && currencyBRLFormat(vendas)}
                </Td>
              </Tr>
              <Tr>
                <Td fontSize="0.9rem">
                  Comissao %
                </Td>
                <Td fontSize="0.9rem" style={{ color: 'red' }}>
                  {!isLoading && (
                    <>
                      <Input
                        height="40px"
                        placeholder="Comissão (%)"
                        flex="1.01"
                        type="number"
                        prefix="percentual"
                        onChange={(event) => {
                          let newValue = parseFloat(event.target.value)

                          if ((Number(newValue) && !isNaN(Number(newValue)))) {
                            setComissao(newValue);
                          } else {
                            setComissao(0);
                          }
                        }}
                        onBlur={() => {
                          calculateTotal()
                        }}
                        defaultValue={percentComissao}
                      />
                    </>
                  )}
                </Td>
              </Tr>
              <Tr style={{ fontWeight: 'bold' }}>
                <Td fontSize="0.9rem">
                  Total
                </Td>
                <Td fontSize="0.9rem" style={{ color: total < 0 ? 'red' : 'green' }}>
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

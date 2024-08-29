import { Aside, AsideTop } from "./styled";

import { Table, TableContainer, Tbody, Td, Thead, Tr } from "@chakra-ui/react";
import { ISidebar } from "../../../../models/sidebar.model";
import useExcursoes from "../../../../hooks/useExcursao";
import { formattingDate } from "../../../../utils/formattingDate";

const SideBar = ({ status }: ISidebar) => {
  const { getExcursoes } = useExcursoes();
  const { data: dataExcursoes, isLoading: loadingExcursoes } = getExcursoes({ page: 1, size: 100 });

  return (
    <>
      <AsideTop className="contentTop">
        <h2>Excursões</h2>
      </AsideTop>

      <Aside className="contentMain">
        <TableContainer marginBottom="10px">
          <Table>
            <Thead padding="0 30px 0 30px">
              <Td fontSize="0.9rem">Excursão</Td>
              <Td fontSize="0.9rem">Vagas</Td>
            </Thead>

            <Tbody>
              {!loadingExcursoes && dataExcursoes.map((item) => (
                <Tr key={item.id}>
                  <Td fontSize="0.9rem">
                    {formattingDate(item.dataInicio)} à {formattingDate(item.dataFim)} - {item.nome}
                  </Td>
                  <Td fontSize="0.9rem">
                    {item.vagas}
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

import { TableContainer } from "@chakra-ui/react";
import { TBody, TD, THead, TR, Table } from "../../../../../../components/Table";

// Styled Components
import { Content, SectionTop } from "../../../styled";

// Hooks and utils
import { IOpcionais } from "../../../../../../models/excursao-passageiro.model";

interface IOpcionaisList {
  data: IOpcionais[]
  handleClose: () => void;
}

const OpcionaisList = ({
  data,
  handleClose
}: IOpcionaisList) => {


  return (
    <>
      <Content className="contentMain">
        {data.length > 0 && (
          <>
            <TableContainer marginBottom="10px">
              <Table>
                <THead padding="0 30px 0 30px">
                  <TD>Opcional</TD>
                  <TD>Quantidade</TD>
                </THead>

                <TBody>
                  {data.map((item) => (
                    <TR key={item.id}>
                      <TD>
                        {item.Produto.nome}
                      </TD>
                      <TD>
                        {item.qtd}
                      </TD>
                    </TR>
                  ))}
                </TBody>
              </Table>
            </TableContainer>
          </>
        )}

      </Content>
    </>
  );
};

export default OpcionaisList;

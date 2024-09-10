import { TableContainer } from "@chakra-ui/react";
import { TBody, TD, THead, TR, Table } from "../../../../../../components/Table";

// Styled Components
import { Content, SectionTop } from "../../../styled";

// Hooks and utils
import { IExcursaoPassageiroSummary } from "../../../../../../models/excursao-passageiro.model";

interface IDetailSummary {
  data: IExcursaoPassageiroSummary[] | undefined
  handleClose: () => void;
}

const DetailSummary = ({
  data,
  handleClose
}: IDetailSummary) => {


  return (
    <>
      <Content className="contentMain">
        {data && data.length > 0 && (
          <>
            <TableContainer marginBottom="10px">
              <Table>
                <THead padding="0 30px 0 30px">
                  <TD>Opcional</TD>
                  <TD>Quantidade</TD>
                </THead>

                <TBody>
                  {data.map((item) => (
                    <TR key={item.nome}>
                      <TD>
                        {item.nome}
                      </TD>
                      <TD>
                        {item.sum}
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

export default DetailSummary;

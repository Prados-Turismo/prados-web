import {
  Divider,
  ModalCloseButton,
  ModalContent,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { DownloadFile } from "../../../../components/DownloadFile";
import { IInvoice } from "../../../../models/financial.model";

interface IProps {
  invoice: IInvoice;
}

const ListNotes = ({ invoice }: IProps) => {
  return (
    <ModalContent p="30px 0">
      <ModalCloseButton />
      <Text pl="30px">Listagem de notas</Text>
      <Divider my="20px" />
      {(invoice?.receiptTokens || [])?.length > 0 && (
        <Table margin={0} padding={0}>
          <Thead>
            <Th>Nome do arquivo</Th>
            <Th textAlign="center">Download</Th>
          </Thead>
          <Tbody>
            {invoice.receiptTokens?.map(({ id, fileName, token }) => (
              <Tr key={id}>
                <Td>{fileName}</Td>
                <Td display="flex" justifyContent="center">
                  <DownloadFile hasIcon id={token} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </ModalContent>
  );
};

export default ListNotes;

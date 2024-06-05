/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FcInfo, FcOk } from "react-icons/fc";
import { HiArrowLeft } from "react-icons/hi";
import { MdFileDownload, MdFileUpload } from "react-icons/md";
import useCollaborator from "../../../hooks/useCollaborator";
import { IDataDisableCollaborator } from "../../../models/collaborator.model";
import { pixelToRem } from "../../../utils";
import { capitalize } from "../../../utils/capitalize";
import { BENEFICIARY_KINSHIP_COMPLETE } from "../../../utils/enumFormat";
import UploadDropzoneRow from "../components/UploadDropzoneRow";
import { Group } from "./styled";

interface IInactivateProductAndCollaborator {
  setActiveContracts: any;
  activeContracts: IDataDisableCollaborator[] | null;
  beneficiaryId: string;
}

const InactivateProductAndCollaborator = ({
  setActiveContracts,
  activeContracts,
  beneficiaryId,
}: IInactivateProductAndCollaborator) => {
  const { inativeCollaboratorWithProduct } = useCollaborator();
  const { mutate, isLoading } = inativeCollaboratorWithProduct({
    beneficiaryId,
    setActiveContracts,
  });

  const [hasDocument, setHasDocument] = useState<
    IDataDisableCollaborator[] | null
  >(null);
  const [documentsSelected, setDocumentsSelected] = useState<any>(null);

  const handleSubmit = () => {
    const payload: any = activeContracts?.map((proposal) => {
      const cancellationDocument = documentsSelected?.find(
        (doc: { id: string }) => doc?.id === proposal?.id,
      );

      return {
        beneficiaryContracts: proposal?.beneficiaryContracts?.map(
          (contract) => contract?.id,
        ),
        ...(cancellationDocument && {
          cancellationDocumentToken: cancellationDocument.token,
        }),
      };
    });

    mutate({
      data: payload,
    });
  };

  useEffect(() => {
    const docs =
      activeContracts?.filter((doc) => doc?.cancellationDocumentToken) || [];
    if (activeContracts && docs?.length > 0) {
      setHasDocument(docs);
      const arrayData = docs.map((el) => ({
        id: el?.id,
        file: null,
        token: null,
      }));
      setDocumentsSelected(arrayData);
    } else {
      setHasDocument(null);
    }
  }, [activeContracts]);
  return (
    <>
      <Button
        position="absolute"
        isDisabled={isLoading}
        margin="15px"
        w="max-content"
        variant="outline"
        onClick={() => setActiveContracts(null)}
        leftIcon={<HiArrowLeft />}
      >
        Voltar
      </Button>

      <Group padding={5} w="100%">
        <Text ml="105px" mb="50px" fontSize={pixelToRem(20)}>
          Inativação do titular
        </Text>

        <Box display="flex" flexDirection="column" w="100%">
          <TableContainer>
            <Text fontSize={pixelToRem(20)} fontWeight="bold" mb="10px">
              Produtos ativos do titular
            </Text>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Beneficiário</Th>
                  <Th>Parentesco</Th>
                  <Th>Fornecedor</Th>
                  <Th>Benefício</Th>
                </Tr>
              </Thead>
              <Tbody>
                {activeContracts?.map(
                  (item) =>
                    item?.beneficiaryContracts.map((contract) => (
                      <Tr key={contract?.id}>
                        <Td>{capitalize(contract?.beneficiaryName)}</Td>
                        <Td>
                          {
                            BENEFICIARY_KINSHIP_COMPLETE[
                              item?.benficiaryKinship
                            ]
                          }
                        </Td>
                        <Td>{item?.provider}</Td>
                        <Td>{item?.productName}</Td>
                      </Tr>
                    )),
                )}
              </Tbody>
            </Table>
          </TableContainer>

          <Box display="flex" flexDirection="column">
            {hasDocument && (
              <Box margin="40px 0 20px" maxWidth="860px">
                <hr />
                <Text margin="15px 0" fontSize="16px" fontWeight="bold">
                  O titular possui produtos que necessitam de documentos
                  comprobatórios para confirmação do cancelamento. Para dar
                  continuidade, envie os documentos solicitados abaixo:
                </Text>

                <Box
                  display="flex"
                  alignItems="flex-start"
                  justifyContent="center"
                  gap="10px"
                  className="adesao-legendas"
                  marginBottom="25px"
                >
                  <Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      gap="5px"
                      marginTop="5px"
                    >
                      <FcOk fontSize="18px" /> Documento enviado
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      gap="5px"
                      marginTop="5px"
                    >
                      <FcInfo fontSize="18px" /> Obrigatório enviar
                    </Box>
                  </Box>
                  <Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      gap="5px"
                      marginTop="5px"
                    >
                      <MdFileUpload size="18px" />
                      Fazer upload
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      gap="5px"
                      marginTop="5px"
                    >
                      <MdFileDownload size="18px" />
                      Fazer download
                    </Box>
                  </Box>
                </Box>

                {hasDocument.map((doc) => (
                  <UploadDropzoneRow
                    key={doc?.id}
                    doc={doc}
                    setDocumentsSelected={setDocumentsSelected}
                    documentsSelected={documentsSelected}
                  />
                ))}
              </Box>
            )}

            <Box
              marginTop="20px"
              width="100%"
              gap="10px"
              display="flex"
              justifyContent="center"
            >
              <Button
                w="150px"
                isLoading={isLoading}
                isDisabled={
                  hasDocument &&
                  documentsSelected &&
                  documentsSelected.filter(
                    (el: any) => el?.file === null || el?.token === null,
                  )?.length > 0
                }
                onClick={handleSubmit}
              >
                Salvar
              </Button>
            </Box>
          </Box>
        </Box>
      </Group>

      {/* <Alert status="info" w="max-content" margin="0 0 0 15px">
        <AlertIcon />
        Em Desenvolvimento! {activeContracts?.contratos[0].nomeReduzidoProduto}
      </Alert> */}
    </>
  );
};

export default InactivateProductAndCollaborator;

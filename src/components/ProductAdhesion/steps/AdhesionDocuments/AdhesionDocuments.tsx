import {
  Accordion,
  Box,
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
} from "@chakra-ui/react";
import { FcInfo, FcOk, FcHighPriority } from "react-icons/fc";
import { MdFileUpload, MdFileDownload } from "react-icons/md";
import { IoTrashBin } from "react-icons/io5";
import { IAdhesionDocuments } from "./types";
import AdhesionDocumentsAccordionItem from "./AdhesionDocumentsAccordionItem";
import { useState } from "react";
import useProductAdhesion from "../../../../hooks/useProductAdhesion";
import { creatArrayWithLength } from "../../../../utils/createArrayLength";

const AdhesionDocuments = ({
  product,
  setIndex,
  checkedAgrupados,
  setIsLoadingAdhesion,
  setDataLimiteAssinatura,
}: IAdhesionDocuments) => {
  const { createAdhesion } = useProductAdhesion();
  const { mutate, isLoading } = createAdhesion({
    setIndex,
    setIsLoadingAdhesion,
    setDataLimiteAssinatura,
  });
  const [documentValidation, setDocumentValidation] = useState(
    checkedAgrupados?.map((el) => ({
      personId: el?.beneficiary?.personId,
      checked: false,
    })),
  );

  const handleAdhesion = () => {
    const adhesionData = {
      productId: product?.productId,
      companyContractId: product?.companyContractId || product?.id,
      contractId: product?.contractId,
      beneficiariesIds: checkedAgrupados?.map((el) => el?.beneficiary?.id),
    };

    mutate(adhesionData);
  };

  return (
    <>
      <Box padding="0 0 60px">
        <TableContainer overflowY="auto">
          <Table variant="simple" size="sm">
            <Tbody>
              <Box width="80%" margin="0 auto 0" className="adesao-box-upload">
                <Box
                  display="flex"
                  alignItems="flex-start"
                  justifyContent="center"
                  gap="10px"
                  margin="0 0 40px"
                  className="adesao-legendas"
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
                      <FcInfo fontSize="18px" /> Opcional
                    </Box>
                  </Box>
                  <Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      gap="5px"
                      marginTop="5px"
                    >
                      <IoTrashBin color="gray" fontSize="18px" /> Excluir
                      arquivo
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      gap="5px"
                      marginTop="5px"
                    >
                      <FcHighPriority fontSize="18px" /> Obrigatório
                    </Box>
                  </Box>
                  <Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      gap="5px"
                      marginTop="5px"
                    >
                      <MdFileUpload color="gray" fontSize="18px" /> Fazer upload
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      gap="5px"
                      marginTop="5px"
                    >
                      <MdFileDownload color="gray" fontSize="18px" /> Fazer
                      download
                    </Box>
                  </Box>
                </Box>

                <Accordion
                  allowMultiple
                  defaultIndex={creatArrayWithLength(checkedAgrupados?.length)}
                >
                  {checkedAgrupados
                    .filter(
                      (item) =>
                        item?.adherenceRule?.documentsOnAdherenceRules?.length >
                        0,
                    )
                    .map((item, index) => {
                      return (
                        <AdhesionDocumentsAccordionItem
                          item={item}
                          key={index}
                          setDocumentValidation={setDocumentValidation}
                        />
                      );
                    })}
                </Accordion>
              </Box>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>

      <Flex width="100%" justify="flex-end">
        <Button
          mr={4}
          onClick={() => {
            setIndex(1);
          }}
          size="md"
          variant="outline"
        >
          Voltar
        </Button>

        <Button
          isLoading={isLoading}
          size="md"
          mb="-18px"
          onClick={handleAdhesion}
          isDisabled={
            documentValidation?.filter(
              (el: { checked: boolean }) => !el?.checked,
            ).length > 0
          }
        >
          Fazer Adesão
        </Button>
      </Flex>
    </>
  );
};

export default AdhesionDocuments;

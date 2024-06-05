import { Flex } from "@chakra-ui/layout";
import InputFile from "./components/InputFile";
import { Skeleton } from "@chakra-ui/skeleton";
import { IDocumentsForm } from "./types";

const DocumentsForm = ({ data, isLoading }: IDocumentsForm) => {
  return (
    <>
      {isLoading && (
        <Flex gap="24px" w="100%">
          <Skeleton h="79px" w="100%" />
          <Skeleton h="79px" w="100%" />
        </Flex>
      )}

      {!isLoading && data && (
        <Flex mt="32px" gap="24px" flexWrap="wrap">
          <InputFile
            isRequerid
            type="incorporationActs"
            label="Atos constitutivos ou foto da Cláusula de administração"
            helpTitle="Atos constitutivos ou foto da Cláusula de administração"
            helpDescription="Contrato social e todos os aditivos ou contrato social consolidado; OU Estatuto Social e última ata de assembleia de eleição da Diretoria; OU Requerimento de empresário se MEI"
            data={data?.filter(
              (doc) => doc?.documentType === "incorporationActs",
            )}
          />

          <InputFile
            type="letterOfAttorney"
            label="Procuração"
            helpTitle="Procuração"
            helpDescription="Documento no qual os representantes legais da empresa designam indivíduos autorizados a assinar contratos, com detalhamento específico para essa finalidade."
            data={data?.filter(
              (doc) => doc?.documentType === "letterOfAttorney",
            )}
          />
        </Flex>
      )}
    </>
  );
};

export default DocumentsForm;

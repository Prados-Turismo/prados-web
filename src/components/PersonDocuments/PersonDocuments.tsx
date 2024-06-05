import { Alert, AlertIcon } from "@chakra-ui/alert";
import { Skeleton } from "@chakra-ui/skeleton";
import useCollaborator from "../../hooks/useCollaborator";
import ButtonDownload from "../../pages/CollaboratorDetails/components/ButtonDownload";
import {
  Group,
  GroupButtons,
  HeaderInner,
} from "../../pages/CollaboratorDetails/pages/styled";
import { TYPE_DOCUMENT } from "../../utils/enumFormat";
import { IPersonDocuments } from "./types";
import AlertNoDataFound from "../AlertNoDataFound";

const PersonDocuments = ({ personId, authorization }: IPersonDocuments) => {
  const { getPersonDocuments } = useCollaborator();
  const { data, isLoading } = getPersonDocuments(personId);

  return (
    <>
      <Group padding="10px 20px">
        <HeaderInner marginBottom="10px">
          <h3>Documentos</h3>
        </HeaderInner>
        {authorization ? (
          isLoading ? (
            <Skeleton height="40px" maxW="700px" w="100%" />
          ) : (
            <>
              {data?.length > 0 && (
                <GroupButtons>
                  {data.map((doc) => (
                    <ButtonDownload key={doc?.id} id={doc?.token}>
                      {doc?.personDocumentType?.name} -{" "}
                      {doc?.personDocumentType?.documentFrontAndBack
                        ? TYPE_DOCUMENT[doc?.typeDocument]
                        : ""}
                    </ButtonDownload>
                  ))}
                </GroupButtons>
              )}

              {data?.length === 0 && (
                <AlertNoDataFound title="Ainda não há documentos disponíveis." />
              )}
            </>
          )
        ) : (
          <Alert status="info" w="max-content">
            <AlertIcon />
            Você não possui autorização do titular para acessar e visualizar os
            documentos.
          </Alert>
        )}
      </Group>
    </>
  );
};

export default PersonDocuments;

import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AlertModal from "../../../../components/AlertModal";
import Loading from "../../../../components/Loading";
import { useGlobal } from "../../../../contexts/UserContext";
import useCollaborator from "../../../../hooks/useCollaborator";
import { IDataDisableCollaborator } from "../../../../models/collaborator.model";
import { pixelToRem } from "../../../../utils";
import { IInactiveCollaboratorModal } from "./types";

const InactiveCollaboratorModal = ({
  modal,
  setModal,
  collaboratorId,
  setActiveContracts,
}: IInactiveCollaboratorModal) => {
  const { company } = useGlobal();
  const { disableCollaborator } = useCollaborator();
  const { inativeCollaborator, checkContractsForInactivation } =
    disableCollaborator();
  const [isLoading, setIsloading] = useState(false);
  const [isLoadingInative, setIsLoadingInative] = useState(false);
  const [hasContract, setHasContract] = useState<
    IDataDisableCollaborator[] | null
  >(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsloading(true);
    checkContractsForInactivation({
      collaboratorId: collaboratorId,
      setError: setError,
    })
      .then((res) => {
        if (res?.data.length > 0) {
          setHasContract(res?.data);
        } else {
          setHasContract(null);
        }
      })
      .finally(() => {
        setIsloading(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collaboratorId]);

  return (
    <>
      <AlertModal
        question={hasContract ? "Deseja continuar?" : "Deseja confirmar?"}
        confirmButtonTitle={hasContract ? "Sim" : "Confirmar"}
        isDisabled={error || isLoading}
        isLoading={isLoadingInative}
        request={() => {
          if (hasContract) {
            setActiveContracts(hasContract);
            setModal();
          } else {
            setIsLoadingInative(true);
            inativeCollaborator(
              collaboratorId,
              company?.externalCompanyId || "",
            )
              .then(() => {
                setModal();
              })
              .finally(() => {
                setIsLoadingInative(false);
              });
          }
        }}
        showModal={modal}
        setShowModal={() => setModal()}
        size="md"
      >
        {isLoading ? (
          <Loading />
        ) : (
          <Flex minH="200px" fontSize={pixelToRem(20)} alignItems="center">
            {hasContract
              ? "Este titular possui um ou mais produtos ativos. Ao inativá-lo, os produtos serão automaticamente cancelados e não será possível fazer novas adesões."
              : "O titular não terá mais acesso a adesões de produtos."}
          </Flex>
        )}
      </AlertModal>
    </>
  );
};

export default InactiveCollaboratorModal;

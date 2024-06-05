import ButtonIcon from "../../../../components/ButtonIcon";
import { IconsGroup } from "../../../../components/Table";
import useCollaborator from "../../../../hooks/useCollaborator";
import { FiUserCheck, FiUserX } from "react-icons/fi";
// import { HiPencil } from "react-icons/hi"
import { useState } from "react";
import AlertModal from "../../../../components/AlertModal";
// import { Link } from "react-router-dom"
import { IDataCollaboratorPre } from "../../../../models/collaborator.model";
import { Box, Spinner } from "@chakra-ui/react";
import ModalAuthorizePre from "../ModalAuthorizePre/ModalAuthorizePre";

interface IIconGroupCollaboratorLink {
  item: IDataCollaboratorPre;
}

const IconGroupCollaboratorLink = ({ item }: IIconGroupCollaboratorLink) => {
  const { preCadsCollaborator } = useCollaborator();
  const { cancelPedingCollaborator } = preCadsCollaborator();
  const [isLoadingCancel, setIsLoadingCancel] = useState<boolean>(false);
  const [modalState, setModalState] = useState({
    authorize: false,
    cancel: false,
  });

  return (
    <>
      <IconsGroup>
        <ButtonIcon tooltip="Autorizar pré cadastro">
          <FiUserCheck
            size={20}
            onClick={() => {
              setModalState({
                ...modalState,
                authorize: true,
              });
            }}
          />
        </ButtonIcon>

        <ButtonIcon tooltip="Cancelar pré cadastro">
          {isLoadingCancel ? (
            <Box w="20px" h="20px">
              <Spinner color="brand.500" size="sm" />
            </Box>
          ) : (
            <FiUserX
              size={20}
              onClick={() => {
                setIsLoadingCancel(true);
                setModalState({
                  ...modalState,
                  cancel: true,
                });
              }}
            />
          )}
        </ButtonIcon>

        {/* <Link to={`/colaboradores/vinculo/${item?.id}?sidebar=1`}>
          <ButtonIcon tooltip="Editar dados">
            <HiPencil size={20} />
          </ButtonIcon>
        </Link> */}
      </IconsGroup>

      {/* AUTORIZAR PRE CADASTRO */}
      {modalState.authorize && (
        <ModalAuthorizePre
          beneficiaryPreId={item?.id}
          setShowModal={() =>
            setModalState({
              ...modalState,
              authorize: false,
            })
          }
          showModal={modalState.authorize}
        />
      )}

      {/* CANCELAR PRE CADASTRO */}
      <AlertModal
        title="Cancelar pré cadastro"
        question="Deseja confirmar?"
        request={() => {
          cancelPedingCollaborator(item?.id).finally(() => {
            setIsLoadingCancel(false);
          });
          setModalState({
            ...modalState,
            cancel: false,
          });
        }}
        showModal={modalState.cancel}
        setShowModal={() => {
          setModalState({
            ...modalState,
            cancel: false,
          });
          setIsLoadingCancel(false);
        }}
        size="md"
      >
        O pré cadastro selecionado será excluído.
      </AlertModal>
    </>
  );
};

export default IconGroupCollaboratorLink;

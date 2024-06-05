import { useState } from "react";

// Components and Utils
import ButtonIcon from "../../../../../components/ButtonIcon/ButtonIcon";
import AlertModal from "../../../../../components/AlertModal/AlertModal";

// Hooks
import useNeedHelp from "../../../../../hooks/useNeedHelp";

// Types
import { ICancelRequestButton } from "./types";

// Icons
import { RiCheckFill } from "react-icons/ri";
import { useGlobal } from "../../../../../contexts/UserContext";

const CancelRequestButton = ({ requestId, protocol }: ICancelRequestButton) => {
  const { handleCancelRequest } = useNeedHelp();
  const { cancelRequest, isLoading } = handleCancelRequest();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const { user, role } = useGlobal();

  const { getSupportNotifications } = useNeedHelp();
  const { data: notifications, isLoading: isLoadingNotifications } =
    getSupportNotifications(role?.id as string);

  return (
    <>
      <ButtonIcon>
        <RiCheckFill
          size={20}
          onClick={() => {
            setShowCancelModal(true);
          }}
          color="text.fourth"
        />
      </ButtonIcon>

      {showCancelModal && (
        <AlertModal
          showModal={showCancelModal}
          setShowModal={setShowCancelModal}
          isLoading={isLoading || isLoadingNotifications}
          request={() =>
            cancelRequest({
              requestId,
              solverUser: user?.email ?? "",
              solverUserName: user?.username ?? "",
              notificationId: notifications
                ?.filter((item) => item?.callId === requestId)
                ?.map((item) => item?.id),
            })
          }
          size="md"
        >
          Deseja encerrar a solicitação {protocol}?
        </AlertModal>
      )}
    </>
  );
};

export default CancelRequestButton;

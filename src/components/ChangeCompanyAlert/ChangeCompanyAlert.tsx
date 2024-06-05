import AlertContent from "../AlertContent";
import AlertModal from "../AlertModal";
import { useGlobal } from "../../contexts/UserContext";
import { INotificationsData } from "../../models/notifications";

const ChangeCompanyAlert = ({
  showModal,
  setShowModal,
  item,
}: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  item: INotificationsData;
}) => {
  const { changeCompany, setnotificationNavigateData } = useGlobal();

  return (
    <AlertModal
      confirmButtonTitle="Sim"
      cancelButtonTitle="Não"
      request={() => {
        changeCompany({
          value: item?.companyId,
        });
        setnotificationNavigateData(item);
      }}
      showModal={showModal}
      setShowModal={setShowModal}
      size="md"
    >
      <AlertContent
        title={
          <>
            Ao executar esta ação, você será redirecionado para outra empresa.
            <br />
            Deseja continuar?
          </>
        }
      />
    </AlertModal>
  );
};

export default ChangeCompanyAlert;

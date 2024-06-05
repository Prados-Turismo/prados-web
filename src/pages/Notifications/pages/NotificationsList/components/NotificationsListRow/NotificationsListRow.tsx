import { Checkbox, Skeleton, Text } from "@chakra-ui/react";
import { TD, TR } from "../../../../../../components/Table";
import { Icon } from "../../styled";
import { pixelToRem } from "../../../../../../utils";
import { dateHourFormat } from "../../../../../../utils/fieldFormat";
import { INotificationsData } from "../../../../../../models/notifications";
import {
  NOTIFICATION_CATEGORY,
  NOTIFICATION_SUBJECT,
} from "../../../../../../utils/enumFormat";
import { useNavigate } from "react-router-dom";
import NotificationsIcon from "../../../../../../components/NotificationsIcon";
import { notificationNavigate } from "../../../../../../components/BellNotification/BellNotification";
import ChangeCompanyAlert from "../../../../../../components/ChangeCompanyAlert";
import { useState } from "react";
import { useGlobal } from "../../../../../../contexts/UserContext";
import NotificationModalMessage from "../../../../../../components/NotificationMessageModal.tsx/NotificationMessageModal";
import useNotifications from "../../../../../../hooks/useNotifications";

const NotificationsListRow = ({
  item,
  onCheckboxChange,
  isChecked,
}: {
  item: INotificationsData;
  onCheckboxChange: (itemId: string, isChecked: boolean) => void;
  isChecked: boolean;
}) => {
  const { company } = useGlobal();
  const navigate = useNavigate();
  const { readNotification } = useNotifications();

  const { mutate, isLoading: isLoadingReadNotification } = readNotification();
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);

  const handleClickNotification = () => {
    if (NOTIFICATION_SUBJECT[item?.subject]?.path) {
      if (item?.companyId !== company?.externalCompanyId) {
        setShowAlertModal(true);
      } else {
        notificationNavigate(
          item,
          navigate,
          item?.subject === "fiscalNote" ? `=${item?.batchInvoiceId}` : "",
        );
      }
    } else {
      setShowMessageModal(true);
    }
    if (!item?.read) {
      mutate({
        read: true,
        notificationsIds: [item?.id],
      });
    }
  };

  return (
    <>
      {isLoadingReadNotification ? (
        <Skeleton w="100%" h="40px" />
      ) : (
        <TR
          boxShadow="none"
          key={item.id}
          gap="5px"
          fontFamily="Poppins, Roboto, sans-serif"
          backgroundColor={item.read ? "#F2F2F2" : "white"}
          _hover={{
            backgroundColor: "#F6F6F6",
          }}
          overflow="hidden"
        >
          <TD style={{ flex: "0 0 40px" }}>
            <Checkbox
              _checked={{
                ".chakra-checkbox__control": {
                  bgColor: "brand.500",
                  borderColor: "brand.500",
                  boxShadow: "none",
                },
                ".chakra-checkbox__control:hover": {
                  bgColor: "brand.500",
                  borderColor: "brand.500",
                  boxShadow: "none",
                },
              }}
              isChecked={isChecked}
              onChange={(e) => onCheckboxChange(item.id, e.target.checked)}
            />
          </TD>
          <TD
            style={{ flex: "0 0 40px" }}
            onClick={handleClickNotification}
            cursor="pointer"
          >
            <Icon as="span">
              <NotificationsIcon
                category={item?.category as string}
                size={18}
              />
            </Icon>
          </TD>
          <TD
            style={{
              flex: "0 0 220px",
              paddingLeft: "20px",
            }}
            cursor="pointer"
            fontWeight={500}
            justifyContent="flex-start"
            onClick={handleClickNotification}
          >
            {NOTIFICATION_CATEGORY[item.category]?.label}
          </TD>
          <TD
            justifyContent="flex-start"
            fontWeight={500}
            onClick={handleClickNotification}
            cursor="pointer"
          >
            Assunto:
            <Text
              marginLeft="20px"
              fontSize={pixelToRem(14)}
              color="#505050"
              fontWeight={400}
              whiteSpace="normal"
              textAlign="left"
            >
              {item?.message}
            </Text>
          </TD>
          <TD style={{ flex: "0 0 50px" }} fontWeight={500}>
            {dateHourFormat(new Date(item?.createdAt))}
          </TD>
        </TR>
      )}

      {showAlertModal && (
        <ChangeCompanyAlert
          showModal={showAlertModal}
          setShowModal={setShowAlertModal}
          item={item}
        />
      )}

      {showMessageModal && (
        <NotificationModalMessage
          showModal={showMessageModal}
          setShowModal={setShowMessageModal}
          item={item}
        />
      )}
    </>
  );
};

export default NotificationsListRow;

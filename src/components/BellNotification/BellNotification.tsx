import { IBellNotification } from "./types";
import { Icon, NotificationBox, NotificationContent } from "./styled";
import {
  NOTIFICATION_CATEGORY,
  NOTIFICATION_SUBJECT,
} from "../../utils/enumFormat";
import { Spinner, Tooltip } from "@chakra-ui/react";
import { calculateTimeDifference } from "../../utils/fieldFormat";
import useNotifications from "../../hooks/useNotifications";
import NotificationsIcon from "../NotificationsIcon";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { INotificationsData } from "../../models/notifications";
import { useState } from "react";
import { useGlobal } from "../../contexts/UserContext";
import ChangeCompanyAlert from "../ChangeCompanyAlert";
import NotificationModalMessage from "../NotificationMessageModal.tsx/NotificationMessageModal";

export const notificationNavigate = (
  notification: INotificationsData,
  navigate: NavigateFunction,
  params?: string,
) => {
  const path = `${NOTIFICATION_CATEGORY[notification?.category]
    ?.path}${NOTIFICATION_SUBJECT[notification?.subject]?.path}${params}`;

  if (path) {
    navigate(path);
  }
};

const BellNotification = ({
  notification,
  onCloseBellNotification,
  index,
  setNotificationsData,
}: IBellNotification) => {
  const navigate = useNavigate();
  const { company } = useGlobal();
  const { readNotification } = useNotifications();
  const { mutate, isLoading } = readNotification();
  const [showModal, setShowModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);

  const handleUpdatedNotifications = () => {
    setNotificationsData((prevNotifications) => {
      const updatedNotifications = [...prevNotifications];
      updatedNotifications[index] = {
        ...updatedNotifications[index],
        read: !notification?.read,
      };
      return updatedNotifications;
    });
  };

  const handleCloseBellNotification = () => {
    if (!notification?.read) {
      mutate({
        read: true,
        notificationsIds: [notification?.id],
      });
      handleUpdatedNotifications();
    }
    if (NOTIFICATION_SUBJECT[notification?.subject]?.path) {
      if (notification?.companyId !== company?.externalCompanyId) {
        setShowModal(true);
      } else {
        notificationNavigate(
          notification,
          navigate,
          notification?.subject === "fiscalNote"
            ? `=${notification?.batchInvoiceId}`
            : "",
        );
      }
    } else {
      setShowMessageModal(true);
    }
    onCloseBellNotification();
  };

  return (
    <>
      <NotificationBox
        backgroundColor={notification?.read ? "#F7F7F7" : "white"}
      >
        {" "}
        <Icon as="span" onClick={handleCloseBellNotification}>
          <NotificationsIcon category={notification?.category as string} />
        </Icon>
        <NotificationContent>
          <span className="notificationHeader">
            <span
              className="notificationTitle"
              onClick={handleCloseBellNotification}
            >
              {NOTIFICATION_CATEGORY[notification?.category]?.label}
            </span>
            <span
              className="notificationTime"
              onClick={handleCloseBellNotification}
            >
              {calculateTimeDifference(notification?.createdAt)}
            </span>
          </span>
          <span className="notificationBody">
            <span
              className="notificationText"
              onClick={handleCloseBellNotification}
            >
              {notification?.message}
            </span>
            <Tooltip
              label={
                notification?.read ? "Marcar como não lido" : "Marcar como lido"
              }
              // background="brand.500"
              hasArrow
              placement="start"
            >
              {isLoading ? (
                <Spinner w="16px" h="16px" color="brand.500" />
              ) : (
                <span
                  className={`notificationStatus ${
                    notification?.read ? "read" : ""
                  }`}
                  onClick={() => {
                    mutate({
                      read: !notification?.read,
                      notificationsIds: [notification?.id],
                    });
                    handleUpdatedNotifications();
                  }}
                >
                  <div />
                </span>
              )}
            </Tooltip>
          </span>
        </NotificationContent>
      </NotificationBox>

      {showModal && (
        <ChangeCompanyAlert
          showModal={showModal}
          setShowModal={setShowModal}
          item={notification}
        />
      )}

      {showMessageModal && (
        <NotificationModalMessage
          showModal={showMessageModal}
          setShowModal={setShowMessageModal}
          item={notification}
        />
      )}
    </>
  );
};

export default BellNotification;

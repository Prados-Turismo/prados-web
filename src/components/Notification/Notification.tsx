import { Link } from "react-router-dom";
import { Box, Button, CircularProgress, useMediaQuery } from "@chakra-ui/react";
import { MdOutlineNotificationsNone } from "react-icons/md";

import useNeedHelp from "../../hooks/useNeedHelp";
import { useGlobal } from "../../contexts/UserContext";

const Notification = () => {
  const { role } = useGlobal();
  const { getSupportNotifications } = useNeedHelp();
  const { isLoading, data: notifications } = getSupportNotifications(
    role?.id as string,
  );
  const [break900] = useMediaQuery("(max-width: 990px)");

  return (
    <>
      {isLoading && (
        <CircularProgress color="brand.500" size={5} isIndeterminate />
      )}

      {!isLoading && (
        <Link to="/canal-de-atendimento?status=A">
          <Button variant="unstyled" margin={break900 ? "unset" : "auto 0"}>
            <MdOutlineNotificationsNone size={22} />
            <Box
              position="absolute"
              width="18px"
              height="18px"
              top="3px"
              right="4px"
              background="brand.500"
              borderRadius="100%"
              color="#FFF"
              fontSize="12px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              paddingTop="2px"
            >
              {notifications.length || 0}
            </Box>
          </Button>
        </Link>
      )}
    </>
  );
};

export default Notification;

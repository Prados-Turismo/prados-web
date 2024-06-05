import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  useMediaQuery,
  useBoolean,
  Text,
  Flex,
  Tooltip,
  PopoverFooter,
  Skeleton,
  SkeletonCircle,
  CircularProgress,
} from "@chakra-ui/react";

import { TfiBell } from "react-icons/tfi";
import { BiExpandAlt } from "react-icons/bi";

import NotificationsAlert from "../NotificationsAlert";
import useNotifications from "../../hooks/useNotifications";
import BellNotification from "../BellNotification";
import { useEffect, useState } from "react";
import { INotificationsData } from "../../models/notifications";
import AlertNoDataFound from "../AlertNoDataFound";

const Bell = () => {
  const navigate = useNavigate();
  const { getNotifications } = useNotifications();
  const [isEditing, setIsEditing] = useBoolean();
  const [currentPage, setCurrentPage] = useState(1);
  const [countData, setCountData] = useState(0);
  const [readData, setReadData] = useState(0);
  const [notificationsData, setNotificationsData] = useState<
    INotificationsData[]
  >([]);
  const registerPerPage = 20;

  const {
    data: notifications,
    isLoading,
    count,
    read,
  } = getNotifications({
    page: currentPage,
    size: registerPerPage,
  });

  const lastPage = Math.ceil(count / registerPerPage);

  useEffect(() => {
    if (currentPage <= lastPage && notificationsData?.length < count) {
      setNotificationsData(
        [...notificationsData, ...notifications].filter(
          (obj, index, self) =>
            index === self.findIndex((t) => t.id === obj.id),
        ),
      );
    }
    if (!isLoading && countData === 0) {
      setReadData(read);
      setCountData(count);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications]);

  useEffect(() => {
    setReadData(read);
  }, [read]);

  const [break1280] = useMediaQuery("(max-width: 1279px)");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleScroll = (e: any) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && currentPage < lastPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <>
      {!break1280 && (
        <Popover
          isOpen={isEditing}
          onOpen={setIsEditing.on}
          onClose={setIsEditing.off}
          isLazy
          lazyBehavior="keepMounted"
          placement="bottom-start"
        >
          {({ onClose }) => (
            <>
              <PopoverTrigger>
                <Button
                  variant="unstyled"
                  margin={break1280 ? "unset" : "auto 0"}
                  _hover={{ opacity: "0.7" }}
                >
                  {isLoading ? (
                    <CircularProgress
                      color={"brand.500"}
                      size={5}
                      isIndeterminate
                      marginRight={5}
                    />
                  ) : (
                    <>
                      <TfiBell color="#909090" size={20} />
                      {!break1280 && countData - readData > 0 && (
                        <Box
                          position="absolute"
                          width="18px"
                          height="18px"
                          top="5px"
                          right="10px"
                          background="brand.500"
                          borderRadius="100%"
                          color="#FFF"
                          fontSize="12px"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          padding="2px"
                        >
                          {countData - readData}
                        </Box>
                      )}
                    </>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                w="430px"
                fontFamily="Poppins, Roboto, sans-serif"
                boxShadow="0px 4px 24px rgba(0, 0, 0, 0.16)"
              >
                <PopoverHeader
                  borderBottom="none"
                  fontWeight={500}
                  fontSize="1.125rem"
                  padding="10px 20px"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text>Notificações</Text>
                  <Flex justifyContent="space-between">
                    <Tooltip hasArrow label="Abrir página" placement="start">
                      <Button
                        variant="unstyled"
                        _hover={{ opacity: "0.7" }}
                        w="max-content"
                        minW="max-content"
                        onClick={() => {
                          onClose();
                          navigate("/notificacoes");
                        }}
                      >
                        <BiExpandAlt color="#909090" size={20} />
                      </Button>
                    </Tooltip>
                  </Flex>
                </PopoverHeader>
                <PopoverBody
                  onScroll={handleScroll}
                  style={{
                    maxHeight: "500px",
                    display: "block",
                    height: "100%",
                    overflowY: "auto",
                    overflowX: "hidden",
                    scrollBehavior: "smooth",
                    padding: "0",
                  }}
                >
                  {notificationsData?.length > 0 ? (
                    <>
                      <Text
                        padding="10px 20px"
                        borderBottom="1px solid #E5E5E5"
                        fontSize="0.875rem"
                      >
                        Mais recentes
                      </Text>

                      <Flex flexDir="column">
                        {notificationsData.map((el, i) => (
                          <BellNotification
                            key={`${el?.id}-${i}`}
                            onCloseBellNotification={onClose}
                            notification={el}
                            index={i}
                            setNotificationsData={setNotificationsData}
                          />
                        ))}
                        {isLoading && (
                          <>
                            <Flex
                              padding="15px 20px"
                              gap="18px"
                              alignItems="center"
                            >
                              <SkeletonCircle size="10" />
                              <Flex flexDir="column" gap="6px">
                                <Skeleton w="280px" h="18px" />
                                <Skeleton w="280px" h="18px" />
                              </Flex>
                            </Flex>
                          </>
                        )}
                      </Flex>
                      {lastPage === currentPage && <NotificationsAlert />}
                    </>
                  ) : (
                    <AlertNoDataFound title="Não há notificações" />
                  )}
                </PopoverBody>
                <PopoverFooter></PopoverFooter>
              </PopoverContent>
            </>
          )}
        </Popover>
      )}
    </>
  );
};

export default Bell;

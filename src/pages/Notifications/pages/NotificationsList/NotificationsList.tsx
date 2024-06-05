import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  TableContainer,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { TBody, Table } from "../../../../components/Table";
import Pagination from "../../../../components/Pagination";
import NotificationsListRow from "./components/NotificationsListRow";
import NotificationsAlert from "../../../../components/NotificationsAlert";
import FieldSearch from "../../../../components/FieldSearch";
import ReactSelect from "react-select";
import useNotifications from "../../../../hooks/useNotifications";
import Loading from "../../../../components/Loading";
import { GoRead } from "react-icons/go";
import { MdOutlineMarkunread } from "react-icons/md";
import ButtonIcon from "../../../../components/ButtonIcon";
import { NOTIFICATION_CATEGORY } from "../../../../utils/enumFormat";
import AlertNoDataFound from "../../../../components/AlertNoDataFound";

const NotificationsList = () => {
  const { getNotifications, readNotification } = useNotifications();
  const [break990] = useMediaQuery("(max-width: 990px)");
  const { mutate, isLoading: isLoadingReadNotification } = readNotification();
  const [resetFilter, setResetFilter] = useState(false);
  const [isRead, setIsRead] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [checkBoxAllValue, setCheckBoxAllValue] = useState(false);
  const registerPerPage = 20;
  const {
    data: notifications,
    isLoading,
    count,
    setTextFilter,
    setCategoryFilter,
    categoryFilter,
  } = getNotifications({
    size: registerPerPage,
    page: currentPage,
  });

  const ids = notifications?.map((el) => el?.id);

  const clearFilters = () => {
    setTextFilter(null);
    setCategoryFilter(null);
    setResetFilter(true);
  };

  const handleReadNotifications = (isRead: boolean) => {
    setIsRead(isRead);
    mutate({
      read: isRead,
      notificationsIds: selectedIds,
    });
  };

  const handleCheckboxChange = (itemId: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedIds((prevSelectedIds) => [...prevSelectedIds, itemId]);
    } else {
      setSelectedIds((prevSelectedIds) =>
        prevSelectedIds.filter((id) => id !== itemId),
      );
    }

    const filteredArray = selectedIds.filter((item) => ids.includes(item));
    setCheckBoxAllValue(filteredArray?.length + 1 === notifications?.length);
  };

  const handleCheckboxAll = (isChecked: boolean) => {
    if (isChecked) {
      setSelectedIds([...selectedIds, ...ids]);
      setCheckBoxAllValue(true);
    } else {
      const filteredArray = selectedIds.filter((item) => !ids.includes(item));

      setSelectedIds(filteredArray);

      setCheckBoxAllValue(false);
    }
  };

  useEffect(() => {
    setCheckBoxAllValue(false);
    const filteredArray = selectedIds.filter((item) => ids.includes(item));
    if (!isLoading) {
      setCheckBoxAllValue(filteredArray?.length === notifications?.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, isLoading]);

  useEffect(() => {
    if (!isLoadingReadNotification) {
      setSelectedIds([]);
      setCheckBoxAllValue(false);
    }
  }, [isLoadingReadNotification]);

  return (
    <>
      <Flex
        padding={count > 0 ? "0 30px" : "0 30px 0 95px"}
        gap="25px"
        alignItems={break990 ? "flex-start" : "flex-end"}
        flexDir={break990 ? "column-reverse" : "row"}
      >
        {count > 0 && (
          <Flex gap="25px">
            <Checkbox
              paddingLeft={break990 ? "15px" : "28px"}
              paddingBottom="2px"
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
              isChecked={checkBoxAllValue}
              onChange={(el) => handleCheckboxAll(el?.target?.checked)}
            />
            <Flex
              w={break990 ? "100%" : "273px"}
              h="20px"
              gap="10px"
              marginRight="13px"
            >
              {selectedIds?.length > 0 && (
                <>
                  <ButtonIcon
                    tooltip={
                      selectedIds?.length > 1
                        ? "Marcar todos como lidos"
                        : "Marcar como lido"
                    }
                    placement="top"
                    style={{ color: "#9e9e9e" }}
                    isLoading={isLoadingReadNotification && isRead}
                  >
                    <GoRead
                      size={22}
                      onClick={() => {
                        if (!isLoadingReadNotification) {
                          handleReadNotifications(true);
                        }
                      }}
                    />
                  </ButtonIcon>
                  <ButtonIcon
                    tooltip={
                      selectedIds?.length > 1
                        ? "Marcar todos como não lidos"
                        : "Marcar como não lido"
                    }
                    placement="top"
                    style={{ color: "#9e9e9e" }}
                    isLoading={isLoadingReadNotification && !isRead}
                  >
                    <MdOutlineMarkunread
                      size={24}
                      onClick={() => {
                        if (!isLoadingReadNotification) {
                          handleReadNotifications(false);
                        }
                      }}
                    />
                  </ButtonIcon>
                </>
              )}
            </Flex>
          </Flex>
        )}

        {count === 0 && <Box w={break990 ? "100%" : "284px"}></Box>}

        <Flex width="100%" gap="15px" alignItems="flex-end" flexWrap="wrap">
          <div
            className="searchWrap"
            style={{ minWidth: break990 ? "100%" : "400px" }}
          >
            <FieldSearch
              placeholder="Pesquisar notificação"
              handleSearch={(value) => {
                setResetFilter(false);
                setTextFilter(value);
                setCurrentPage(1);
              }}
              reset={resetFilter}
            />
          </div>
          <Flex flexDirection="column" gap="5px" width="300px">
            <Text fontWeight={500} textAlign="start">
              Categoria
            </Text>

            <ReactSelect
              className="select-fields"
              classNamePrefix="select"
              closeMenuOnSelect={true}
              isSearchable={true}
              value={categoryFilter}
              placeholder="Selecionar"
              noOptionsMessage={() => "Nenhuma categoria encontrada"}
              onChange={(item) => {
                setCategoryFilter(item);
              }}
              options={Object.keys(NOTIFICATION_CATEGORY).map((key) => ({
                value: key,
                label: NOTIFICATION_CATEGORY[key]?.label,
              }))}
            />
          </Flex>

          {/* <Flex
            width={{
              base: "100%",
              lg: "max-content",
            }}
            flexDir="column"
            gap="4px"
          >
            <span>Período</span>
            <Flex
              flexDirection={{
                base: "column",
                lg: "row",
              }}
            >
              <Input
                height="40px"
                width={{
                  base: "100%",
                  lg: "170px",
                }}
                borderRightRadius="0"
                type="date"
                color="text.third"
                // value={initialDate}
                // onChange={({ target }) => {
                //   setInitialDate(target.value);
                // }}
              />
              <Flex
                justifyContent="center"
                alignItems="center"
                width={{
                  base: "100%",
                  lg: "56px",
                }}
                bg="#F5F5F5"
                borderTop="1px solid"
                borderBottom="1px solid"
                borderColor="#e2e8f0"
              >
                Até
              </Flex>
              <Input
                height="40px"
                width={{
                  base: "100%",
                  lg: "170px",
                }}
                borderLeftRadius="0"
                type="date"
                color="text.third"
                // value={finishDate}
                // onChange={({ target }) => {
                //   setFinishDate(target.value);
                // }}
              />
            </Flex>
          </Flex> */}

          <Button borderRadius="5px" variant="outline" onClick={clearFilters}>
            Limpar Filtros
          </Button>
        </Flex>
      </Flex>

      <TableContainer marginBottom="10px">
        <Table>
          <TBody>
            {isLoading && (
              <Box padding="30px 0">
                <Loading />
              </Box>
            )}

            {!isLoading && (
              <>
                {notifications?.length > 0 &&
                  notifications?.map((el) => (
                    <NotificationsListRow
                      key={el?.id}
                      item={el}
                      onCheckboxChange={handleCheckboxChange}
                      isChecked={selectedIds.includes(el.id)}
                    />
                  ))}
                {notifications?.length === 0 && (
                  <AlertNoDataFound title="Nenhuma notificação encontrada!" />
                )}
              </>
            )}
          </TBody>
        </Table>
      </TableContainer>

      {Math.ceil(count / registerPerPage) === currentPage && !isLoading && (
        <NotificationsAlert />
      )}

      {!isLoading && (
        <Pagination
          registerPerPage={registerPerPage}
          totalRegisters={count}
          currentPage={currentPage}
          handleChangePage={(page) => setCurrentPage(page)}
        />
      )}
    </>
  );
};

export default NotificationsList;

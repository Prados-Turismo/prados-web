import { Box, TableContainer } from "@chakra-ui/react";
import { useState } from "react";
import Loading from "../../../components/Loading";
import { Table, TBody, TD, THead, TR } from "../../../components/Table";
import { IUserManagementData } from "../../../models/userManagement.model";
import { IOrder } from "../types";
import TRUserManagement from "./components/TRUserManagement";
import { IUserManagement } from "./types";
import {
  HiOutlineArrowNarrowDown,
  HiOutlineArrowNarrowUp,
} from "react-icons/hi";
import AlertNoDataFound from "../../../components/AlertNoDataFound";

const UserManagement = ({
  status,
  usersData,
  userTypeSelected,
}: IUserManagement) => {
  const [order, setOrder] = useState<IOrder>({
    name: 1,
    email: null,
  });

  const isLoading = usersData?.isLoading;

  return (
    <>
      {usersData && isLoading && (
        <Box marginTop="40px">
          <Loading />
        </Box>
      )}

      {usersData && !isLoading && (
        <>
          {usersData.data.length > 0 && (
            <>
              <TableContainer marginBottom="10px">
                <Table textAlign="center">
                  <THead>
                    <TD
                      style={{
                        textAlign: "center",
                        fontWeight: "600",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                      }}
                      onClick={() => {
                        setOrder({
                          ...order,
                          name: order?.name === 1 ? 2 : 1,
                          email: null,
                        });
                      }}
                    >
                      Nome
                      <Box position="absolute" marginLeft="70px">
                        {order?.name && order?.name === 1 ? (
                          <HiOutlineArrowNarrowDown />
                        ) : (
                          order?.name && <HiOutlineArrowNarrowUp />
                        )}
                      </Box>
                    </TD>
                    <TD
                      style={{
                        textAlign: "center",
                        fontWeight: "600",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        minWidth: "200px",
                      }}
                      onClick={() => {
                        setOrder({
                          ...order,
                          email: order?.email === 1 ? 2 : 1,
                          name: null,
                        });
                      }}
                    >
                      E-mail
                      <Box position="absolute" marginLeft="70px">
                        {order?.email && order?.email === 1 ? (
                          <HiOutlineArrowNarrowDown />
                        ) : (
                          order?.email && <HiOutlineArrowNarrowUp />
                        )}
                      </Box>
                    </TD>
                    <TD style={{ fontWeight: "600" }}>Permissões</TD>
                    <TD style={{ fontWeight: "600" }}>Acesso</TD>
                    <TD style={{ fontWeight: "600" }}>Data de Criação</TD>
                  </THead>

                  <TBody>
                    {usersData.data.map((user: IUserManagementData) => (
                      <TR key={user?.id} height="max-content" minHeight="50px">
                        <TRUserManagement
                          user={user}
                          userTypeSelected={userTypeSelected}
                          status={status}
                          IdsInTheCompany={
                            userTypeSelected.value === 0
                              ? usersData.data.map((_user) => _user.id)
                              : userTypeSelected.value === 2
                              ? []
                              : null
                          }
                        />
                      </TR>
                    ))}
                  </TBody>
                </Table>
              </TableContainer>
            </>
          )}

          {usersData?.data.length === 0 && (
            <AlertNoDataFound title="Nenhum usuário encontrado" />
          )}
        </>
      )}
    </>
  );
};

export default UserManagement;

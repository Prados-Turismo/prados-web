import { useCallback, useMemo, useState } from "react";

// Components and Utils
import { TD, TR } from "../../../../../components/Table";
import { dateFormat } from "../../../../../utils";
import { timeFormat } from "../../../../../utils/fieldFormat";

// Types
import { ITRRequests } from "./types";

// Icons
import { RiDiscussLine } from "react-icons/ri";
import ButtonIcon from "../../../../../components/ButtonIcon/ButtonIcon";
import Chat from "./Chat";
import CancelRequestButton from "./CancelRequestButton";
import TooltipSubstring from "../../../../../components/TooltipSubstring/TooltipSubstring";
import { Switch } from "../../../../HealthVoucherManagement/components/CompanyList/styled";
import { Box, Spinner, Text } from "@chakra-ui/react";
import useNeedHelp from "../../../../../hooks/useNeedHelp";
import { useToastStandalone } from "../../../../../hooks/useToastStandalone";
import { capitalize } from "../../../../../utils/capitalize";

const TRRequests = ({
  status,
  item,
  selectedRole,
  refetchCalls,
}: ITRRequests) => {
  const [showChat, setShowChat] = useState<boolean>(false);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const { handleShareCall } = useNeedHelp();

  const handleShare = useCallback(async (callId: string, share: boolean) => {
    setIsloading(true);
    await handleShareCall(callId, share)
      .then(({ data }) => {
        useToastStandalone({
          title:
            data?.message ||
            (share
              ? "Chamado compartilhado com sucesso."
              : "Compartilhamento desativado com sucesso"),
          status: "success",
        });
        refetchCalls();
      })
      .catch(() => {
        useToastStandalone({
          title: "Erro ao compartilhar chamado.",
          status: "error",
        });
      })
      .finally(() => setIsloading(false));
  }, []);

  const isDifferentEnviroment = useMemo(() => {
    return item.shared && item.callReasons?.enviroment !== selectedRole;
  }, [item, selectedRole]);

  return (
    <>
      <TR>
        <TD>{item?.protocol}</TD>
        <TD>
          {["Outros", "Outro", "outros", "outro"].includes(
            item?.callReasons.name,
          ) ? (
            (
              <TooltipSubstring
                name={capitalize(item?.callReasonSubject)}
                length={15}
              />
            ) || "-"
          ) : (
            <TooltipSubstring
              name={capitalize(item?.callReasons.name)}
              length={15}
            />
          )}
        </TD>
        <TD>
          {(
            <TooltipSubstring
              name={capitalize(item?.requestingUserName)}
              length={18}
            />
          ) || "-"}
        </TD>
        <TD
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {item?.openedAt ? (
            <>
              {dateFormat(new Date(item?.openedAt))}
              <br />
              {timeFormat(new Date(item?.openedAt))}
            </>
          ) : (
            "-"
          )}
        </TD>
        {status !== "A" && (
          <TD
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {item?.resolutionAt ? (
              <>
                {dateFormat(new Date(item?.resolutionAt))}
                <br />
                {timeFormat(new Date(item?.resolutionAt))}
              </>
            ) : (
              "-"
            )}
          </TD>
        )}
        <TD
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {item?.status === "pending"
            ? "Enviado"
            : item?.status === "answered"
            ? "Respondido"
            : "Fechado"}
        </TD>
        <TD>
          {isLoading ? (
            <Spinner
              top="10px"
              left="10px"
              zIndex="1031"
              thickness="4px"
              speed="0.65s"
              color="brand.500"
              emptyColor="brand.200"
              role="status"
              transform="translate(-50%, -50%)"
            />
          ) : isDifferentEnviroment ? (
            <Box>
              {item.sharedByUserName || item.sharedBy ? (
                <TooltipSubstring
                  name={`Por: ${capitalize(
                    item.sharedByUserName || item.sharedBy,
                  )}`}
                  length={18}
                />
              ) : (
                "-"
              )}
            </Box>
          ) : item.shared ? (
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5625rem",
              }}
            >
              <Switch
                isChecked={item.shared}
                onChange={(event: any) => {
                  const checked = event.target.checked;
                  handleShare(item.id, checked);
                }}
              />
              <Text>Sim</Text>
            </Box>
          ) : (
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5625rem",
              }}
            >
              <Switch
                isChecked={item.shared}
                onChange={(event: any) => {
                  const checked = event.target.checked;
                  handleShare(item.id, checked);
                }}
              />
              <Text>Não</Text>
            </Box>
          )}
        </TD>
        <TD
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ButtonIcon>
            <RiDiscussLine
              size={20}
              onClick={() => {
                setShowChat((item) => !item);
              }}
              color="text.fourth"
            />
          </ButtonIcon>
        </TD>
        <TD
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {status === "A" && (
            <CancelRequestButton
              requestId={item?.id}
              protocol={item?.protocol}
            />
          )}
        </TD>
      </TR>

      {showChat && <Chat item={item} status={status} />}
    </>
  );
};

export default TRRequests;

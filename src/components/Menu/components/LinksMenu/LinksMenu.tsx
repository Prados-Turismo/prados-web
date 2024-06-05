import { useState } from "react";
import { Link } from "react-router-dom";

import { Box, Button, Tooltip, useMediaQuery } from "@chakra-ui/react";
// import Notification from "../../../Notification"

// Context
import { useGlobal } from "../../../../contexts/UserContext";

// Icons
import { TfiHeadphoneAlt } from "react-icons/tfi";

// Styles
import { Links } from "./styled";

// Types
import { ILinksMenu } from "./types";

import Bell from "../../../Bell";
// import Bell from "../../../Bell"

const LinksMenu = ({ onClose }: ILinksMenu) => {
  const { permissions, isIssuer } = useGlobal();
  const [activeLink] = useState(window.location.href.split("/")[3]);
  const [break1280] = useMediaQuery("(max-width: 1279px)");

  return (
    <Links>
      <Link
        to="/"
        onClick={onClose}
        className={activeLink === "" ? "active-link" : ""}
      >
        Início
      </Link>
      {!isIssuer && permissions.collaborator && (
        <Link
          to="/pessoas"
          onClick={onClose}
          className={activeLink === "pessoas" ? "active-link" : ""}
        >
          Reservas
        </Link>
      )}
      {!isIssuer && permissions.product && (
        <Link
          to="/produtos"
          onClick={onClose}
          className={activeLink === "produtos" ? "active-link" : ""}
        >
          Atividades
        </Link>
      )}
      <Box display="flex" width="100%" flex="1">
        {/* break900 && company && <Notification /> */}
      </Box>
      {break1280 ? (
        <Link
          to="/central-de-ajuda"
          onClick={onClose}
          className={activeLink === "central-de-ajuda" ? "active-link" : ""}
        >
          Central de Ajuda
        </Link>
      ) : (
        <Tooltip label="Central de Ajuda" background="brand.500" hasArrow>
          <Link to="/central-de-ajuda" className="link-hover-disabled">
            <Button
              variant="unstyled"
              margin={break1280 ? "unset" : "auto 0"}
              display="flex"
              justifyContent="center"
              _hover={{ opacity: "0.7" }}
            >
              <TfiHeadphoneAlt color="#909090" size={22} />
            </Button>
          </Link>
        </Tooltip>
      )}
      {break1280 && (
        <Link
          to="/notificacoes"
          onClick={onClose}
          className={activeLink === "notificacoes" ? "active-link" : ""}
        >
          Notificações
        </Link>
      )}
      {!break1280 && <Bell />}
    </Links>
  );
};

export default LinksMenu;

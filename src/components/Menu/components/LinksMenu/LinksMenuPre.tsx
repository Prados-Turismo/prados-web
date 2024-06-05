import { useState } from "react";
import { Link } from "react-router-dom";

// Styles
import { Links } from "./styled";

// Types
import { ILinksMenu } from "./types";

import { Box } from "@chakra-ui/react";

const LinksMenuPre = ({ onClose }: ILinksMenu) => {
  const [activeLink] = useState(window.location.href.split("/")[3]);

  return (
    <Links>
      <Box>
        <Link
          to="/canal-de-atendimento"
          onClick={onClose}
          className={activeLink === "suporte" ? "active-link" : ""}
        >
          Canal de Atendimento
        </Link>
      </Box>
    </Links>
  );
};

export default LinksMenuPre;

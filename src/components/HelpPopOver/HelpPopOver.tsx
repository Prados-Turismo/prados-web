import { Box, Tooltip } from "@chakra-ui/react";
import React from "react";
import { GoQuestion } from "react-icons/go";

interface Props {
  content: string | JSX.Element;
}

const HelpPopOver: React.FC<Props> = ({ content }) => {
  return (
    <Tooltip
      label={content}
      hasArrow
      bg="transparent"
      shadow="none"
      placement="bottom-end"
      closeOnClick={false}
      closeDelay={2}
    >
      <Box>
        <GoQuestion size={20} />
      </Box>
    </Tooltip>
  );
};

export default HelpPopOver;

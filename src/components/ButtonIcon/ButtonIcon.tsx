// Types
import { IButtonButtonIcon } from "./types";

//Styles
import { Box } from "./styled";
import Tooltip from "../Tooltip/Tooltip";
import { Flex, Spinner } from "@chakra-ui/react";

const ButtonIcon = ({
  children,
  style,
  tooltip = "",
  placement = "top",
  isLoading = false,
}: IButtonButtonIcon) => {
  return (
    <Flex alignItems="center" justifyContent="center">
      {isLoading && (
        <Flex w="22px" h="22px" alignItems="center" justifyContent="center">
          <Spinner color="brand.500" size="sm" />
        </Flex>
      )}
      {!isLoading && (
        <Tooltip label={tooltip} placement={placement}>
          <Box {...style}>{children}</Box>
        </Tooltip>
      )}
    </Flex>
  );
};

export default ButtonIcon;

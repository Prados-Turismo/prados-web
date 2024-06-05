import { Tooltip } from "@chakra-ui/tooltip";
import { IoIosArrowForward } from "react-icons/io";

import { Button } from "./styled";
import { IButtonSidebar } from "./types";

const ButtonSidebar = ({
  children,
  icon,
  selected,
  onClick,
  multi,
  hideArrowIcon,
  isDisabled,
  tooltipText,
}: IButtonSidebar) => {
  return (
    <Tooltip label={tooltipText} placement="right" hasArrow>
      <Button
        onClick={onClick}
        className={`${selected && "active "}${multi && "multi"}`}
        isDisabled={isDisabled}
      >
        <span className="text">
          {icon && icon}

          {children}
        </span>

        <span className={`iconArrow ${hideArrowIcon && "hide"}`}>
          <IoIosArrowForward />
        </span>
      </Button>
    </Tooltip>
  );
};

export default ButtonSidebar;

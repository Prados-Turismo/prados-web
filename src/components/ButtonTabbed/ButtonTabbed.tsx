import { Button } from "./styled";

import { IButtonSidebar } from "./types";

const ButtonSidebar = ({
  children,
  selected,
  onClick,
  isDisabled,
}: IButtonSidebar) => (
  <Button
    onClick={onClick}
    className={`${selected && "active"}`}
    isDisabled={isDisabled}
    _disabled={{
      "&:hover": {
        background: "unset",
      },
    }}
  >
    {children}
  </Button>
);

export default ButtonSidebar;

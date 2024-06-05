import { Button } from "./styled"
import { IButtonSidebarMulti } from "./types"

const ButtonSidebar = ({
  children,
  icon,
  selected,
  onClick
}: IButtonSidebarMulti) => (
  <Button onClick={onClick} className={`${selected && "active "}`}>
    {icon && icon}
    <span>{children}</span>
  </Button>
)

export default ButtonSidebar

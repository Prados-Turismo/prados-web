import { Wrap } from "./styled"
import { IButtonSidebarWrap } from "./types"

const ButtonSidebar = ({ title, children }: IButtonSidebarWrap) => (
  <Wrap>
    {title && (
      <h2 className="title">
        <span>{title}</span>
      </h2>
    )}

    <div className="menu">{children}</div>
  </Wrap>
)

export default ButtonSidebar

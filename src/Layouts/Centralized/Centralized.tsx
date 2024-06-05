import { ComponentWrap } from "./styled"

import { ICentralized } from "./types"

const Centralized = ({ children }: ICentralized) => (
  <ComponentWrap>{children}</ComponentWrap>
)

export default Centralized

import { Button } from "./styled"
import { IPaginationItem } from "./types"

export const PaginationItem = ({
  page,
  onClick,
  isCurrent
}: IPaginationItem) => (
  <Button onClick={onClick} className={`${isCurrent && "active"}`}>
    {page}
  </Button>
)

import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { IColumnOrder } from "./types";
import { TD } from "../Table";
import { customTheme } from "../../theme";

const ASC = "asc";
const DESC = "desc";

const ColumnOrder = ({
  columnName,
  label,
  setOrderBy,
  orderBy,
  setOrder,
  order,
  style,
  children,
  ...props
}: IColumnOrder) => {
  const handleColumnOrder = (o: string) => {
    setOrderBy(columnName);
    setOrder(o);
  };

  const isColumnSelected = (o: string) => orderBy === columnName && order === o;

  return (
    <TD gap="5px" style={style} {...props}>
      {label} {children}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <MdKeyboardArrowUp
          onClick={() => handleColumnOrder(ASC)}
          color={isColumnSelected(ASC) ? customTheme.colors.brand[500] : "gray"}
          style={{ cursor: "pointer" }}
          title="A - Z"
        />
        <MdKeyboardArrowDown
          onClick={() => handleColumnOrder(DESC)}
          color={
            isColumnSelected(DESC) ? customTheme.colors.brand[500] : "gray"
          }
          style={{ cursor: "pointer" }}
          title="Z - A"
        />
      </div>
    </TD>
  );
};

export default ColumnOrder;

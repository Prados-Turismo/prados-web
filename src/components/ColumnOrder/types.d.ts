export interface IColumnOrder {
  columnName: string;
  label: string;
  setOrderBy: React.Dispatch<React.SetStateAction<string>>;
  orderBy: string;
  setOrder: React.Dispatch<React.SetStateAction<string>>;
  order: string;
  style?: React.CSSProperties;
  children: ReactNode;
  [key: string]: any;
}

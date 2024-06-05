export interface INumericInput {
  value: number | string;
  onChange: (value: number) => void;
  valueLimit: number;
  isDisable?: boolean;
  maxWidth?: string;
  height?: string;
  textAlign?:
    | "start"
    | "end"
    | "left"
    | "right"
    | "center"
    | "justify"
    | "match-parent";
}

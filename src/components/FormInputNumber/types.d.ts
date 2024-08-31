import { InputProps } from "@chakra-ui/react"
import { ReactNode } from "react"
import { UseFormRegister } from "react-hook-form"
import { FormatInputValueFunction } from "react-number-format/types/types"

export interface IFormInput extends InputProps {
  label?: string
  register?: UseFormRegister<any>
  errors?: formstate.FieldError | undefined
  name: string
  setValue:
  | UseFormSetValue<FieldValues>
  | React.Dispatch<React.SetStateAction<string | null>>
  value?: string | number
  format?: FormatInputValueFunction | undefined
  isStateForm?: boolean
  width?: string
  height?: string
  flex?: string
  maxWidth?: string
  minWidth?: string
  maxLength?: number
  isLoading?: boolean
  isMoneyValue?: boolean
  defaultValue?: string | number
  readOnly?: boolean
  helpText?: ReactNode
  isDisabled?: boolean
  prefix?: "money" | "percentual"
  dontAllowNegative?: boolean
  marginLabelBottom?: string
  placeholder?: string
  handleOnBlur?: (value: any) => void
}

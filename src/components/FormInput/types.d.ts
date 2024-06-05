import { ReactNode } from "react"
import { InputProps } from "@chakra-ui/react"
import { UseFormRegister, FieldValues } from "react-hook-form"

export interface IFormInput extends InputProps {
  label?: string
  placeholder?: string
  type?: string
  register?: UseFormRegister<any>
  errors?: formstate.FieldError | undefined
  isRequired?: boolean
  disabled?: boolean
  name: string
  inputArea?: boolean
  textCounter?: string
  isCounter?: boolean
  setValue?: UseFormSetValue<FieldValues>
  iconRight?: ReactNode
  changeItem?: () => void
  maxLength?: number
  onChangeTextarea?: React.ChangeEventHandler<HTMLTextAreaElement>
  onChangeInput?: (e: ChangeEventHandler<HTMLInputElement>) => void
  defaultValue?: string
  minW?: string
  helpText?: ReactNode
  maxLengthInpt?: number
}

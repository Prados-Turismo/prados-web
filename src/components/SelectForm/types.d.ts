import { SystemStyleObject } from "@chakra-ui/react"
import { ReactNode } from "react"
import { UseFormRegister } from "react-hook-form"
import { SelectComponents } from "react-select/dist/declarations/src/components"

export interface ISelectForm {
  register?: UseFormRegister<any>
  name: string
  label?: string | JSX.Element
  options: IOption[] | ITitleOption[]
  setValue?: UseFormSetValue<any>
  isRequired?: boolean
  isDisabled?: boolean
  isMulti?: boolean
  isSearchable?: boolean
  errors?: FieldError
  value?: any
  defaultValue?: any
  handleChange?: (value: any) => void
  styles?: SystemStyleObject
  maxW?: string
  isLoading?: boolean
  placeholder?: string
  minW?: string
  helpText?: ReactNode
  noOptionsMessage?: string
  helpIcon?: JSX.Element
  CustomOption?: SelectComponents
}
export interface IOption {
  label: string
  value: string | boolean | number
}

export interface ITitleOption {
  label: string
  options: IOption[]
}

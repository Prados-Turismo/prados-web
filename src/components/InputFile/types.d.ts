import { ChangeEvent } from "react"
import { UseFieldArrayUpdate } from "react-hook-form"

export interface IInputFile {
  fileName?: string
  label?: string
  handleFileInput: (event: ChangeEvent<HTMLInputElement>) => void
  isRequired?: boolean
  error?: boolean
  name?: string
  setFieldValue?: UseFormSetValue<any>
  accept?: strings
  onClear?: () => void
}

import { Dispatch, SetStateAction } from "react"

interface IModalInfo {
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  comissioningInfo?: {
    name?: string
    info?: string
  }
}

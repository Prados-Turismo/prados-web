import { ReactNode } from "react"

export interface ICard {
  icon: ReactNode
  title: string
  text: string
  isDisabled: boolean
  onClick?: (identify: any) => void
}

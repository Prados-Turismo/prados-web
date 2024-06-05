import { ReactNode } from "react"

export interface IPageWithTabbed {
  title: string
  aside: ReactNode
  article: ReactNode
  secondaryTitle?: ReactNode
  BackButton?: boolean
}

export interface IProductsModal {
  handleModal: React.Dispatch<React.SetStateAction<boolean>>
}

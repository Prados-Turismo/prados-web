export interface IStatus {
  title: string
  menu: number | string
}

export interface ISidebar {
  status: IStatus
  onStatus: (e: IStatus) => void
}

export interface IMenuMulti {
  main: number
  subMenu?: number
}

export interface IStatusMulti {
  title: string
  menu: IMenuMulti
}

export interface ISideBarMulti {
  status: IStatusMulti
  onStatus: (e: IStatusMulti) => void
}

export type ISection = Pick<IStatus, "menu">

export type ISectionMulti = Pick<IStatusMulti, "menu">

export interface IButtonSidebar {
  children: string
  selected?: boolean
  icon?: CreateIconOptions
  multi?: boolean
  hideArrowIcon?: boolean
  onClick?: () => void
  isDisabled?: boolean
  tooltipText?: string
}

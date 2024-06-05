export interface IPagination {
  totalRegisters: number
  registerPerPage?: number
  currentPage?: number
  handleChangePage: (page: number) => void
}

export interface IPaginationItem {
  page: number
  onClick?: () => void
  isCurrent?: boolean
}

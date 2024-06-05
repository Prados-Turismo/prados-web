export interface IModalSector {
  isOpen: boolean
  action?: "edit" | "create"
  sectorName?: string
  handleOpen: (arg: boolean) => void
  sectorId?: string
}

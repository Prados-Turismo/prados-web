import { IOccupation } from "../../models/sector.model"

export interface IModalOccupation {
  companyId: string
  sectorId: string
  occupationName?: string
  action?: "edit" | "create"
  isOpen: boolean
  showSectorsSelect?: boolean
  handleOpen: (arg: boolean) => void
  occupation?: IOccupation | null
}

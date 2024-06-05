export interface IImportStatus {
  id: string
  statusName: string
}

export interface IImportRecord {
  id: string
  createdAt: Date
  record: string
}

export interface ICompanyImport {
  createdAt: string
  id: string
  userName: string
  importRecords: IImportRecord[]
  importStatus: IImportStatus
}

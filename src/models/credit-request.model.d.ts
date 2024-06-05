export interface ICreditRequestRow {
  id: string
  creditRequestId: string
  date: Date
  status: string
  dueDate: Date
  credit: number
  bankSplit: string
  nfeFee: string
  nfeCredit: string
}

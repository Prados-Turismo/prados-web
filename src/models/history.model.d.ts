export interface ITransactionHistoryRow {
  id: string
  username: string
  transactionDate: Date
  companyName: string
  amount: string
  transactionType: "Entrada" | "Saída"
}

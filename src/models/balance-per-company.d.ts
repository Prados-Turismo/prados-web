export interface IBalancePerCompany {
  createdAt: string
  balance: number
  company: string
  document: string
  companyName: string
  balanceExpiration: string | null
}

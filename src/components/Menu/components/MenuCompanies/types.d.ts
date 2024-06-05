import { ICompanyInfo } from "../../../../models/company.model"
import { IUserCompany } from "../../../../models/user.model"

export interface ICompanySelect {
  label: string
  value: string
}

export interface IMenuCompanies {
  company: ICompanyInfo
  companies: IUserCompany[]
  onChange: (company: ICompanySelect) => void
}

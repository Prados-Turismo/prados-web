import React from "react"
import { Content } from "./styled"
import CreditByCompanyTable from "../CreditByCompanyTable/CreditByCompanyTable"
import UseByCompanyTable from "../UseByCompanyTable"

interface IReportList {
  type: string
}

const ReportsList: React.FC<IReportList> = ({ type }) => {
  return (
    <Content>
      {type === "Saldo" ? <CreditByCompanyTable /> : <UseByCompanyTable />}
    </Content>
  )
}

export default ReportsList

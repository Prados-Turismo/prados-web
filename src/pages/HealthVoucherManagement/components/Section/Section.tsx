import { useMemo } from "react"
import { ISectionMulti } from "../../../../models/sidebar.model"

import Dashboard from "../../pages/Dashboard"

import TransactionHistory from "../../pages/TransactionHistory"

import CompanyList from "../CompanyList/CompanyList"
import ImportEntitiy from "../ImportEntitiy/importEntity"
import ReportsList from "../ReportsList/ReportsList"

const Section = ({ menu: { main, subMenu } }: ISectionMulti) => {
  const SCREEN_DATA: { [key: number]: { [key: number]: JSX.Element } } =
    useMemo(
      () => ({
        [0]: {
          [1]: <Dashboard />
        },
        [1]: {
          [1]: <CompanyList />,
          [2]: <ImportEntitiy variant="company" />,
          [3]: <ImportEntitiy variant="employee" />
        },
        [2]: {
          [1]: <TransactionHistory variant="include" />,
          [2]: <TransactionHistory variant="transfer" />,
          [3]: <TransactionHistory />
        },
        [3]: {
          [1]: <ReportsList type="Saldo" />,
          [2]: <ReportsList type="Uso" />
        }
      }),
      []
    )

  const Component = useMemo(() => {
    const mainMenu = SCREEN_DATA[main]

    if (mainMenu) {
      return () => mainMenu[subMenu || 1]
    }
    return () => null
  }, [SCREEN_DATA, main, subMenu])
  return <Component />
}

export default Section

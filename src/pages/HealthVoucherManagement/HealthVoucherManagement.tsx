import Dashboard from "../../Layouts/Dashboard"
import PageWithMenu from "../../Layouts/PageWithMenu"
import Menu from "../../components/Menu"
import SideBar from "./components/Sidebar"
import { useEffect, useState } from "react"
import { IStatusMulti } from "../../models/sidebar.model"
import Section from "./components/Section"
import { theme } from "../../theme"

const HealthVoucherManagement = () => {
  const [status, setStatus] = useState<IStatusMulti>({
    title: "Painel",
    menu: {
      main: 0
    }
  })

  useEffect(() => {
    document.title = `${theme.content.project} - Gestão Promoção à Saúde`
  }, [])

  return (
    <Dashboard menu={<Menu />}>
      <PageWithMenu
        aside={<SideBar status={status} onStatus={setStatus} />}
        section={<Section menu={status.menu} />}
      />
    </Dashboard>
  )
}
export default HealthVoucherManagement

import { useEffect, useState } from "react"
import Dashboard from "../../../Layouts/Dashboard"
import PageWithTabbed from "../../../Layouts/PageWithTabbed"
import Menu from "../../../components/Menu"
import { ISidebarContractStatus } from "../../../models/corretorContract.model"
import { useTheme } from "@chakra-ui/react"
import ProductPrice from "./ProductPrice"
import SideBar from "./SideBar"

const ProductsPrice = () => {
  const [status, setStatus] = useState<ISidebarContractStatus>(
    "C" as ISidebarContractStatus
  )

  const theme = useTheme()

  useEffect(() => {
    document.title = `${theme.content.project} - Cotação`
  }, [theme])

  return (
    <Dashboard menu={<Menu />}>
      <PageWithTabbed
        BackButton
        title="Solicitar Cotação"
        aside={<SideBar status={status} onStatus={setStatus} />}
        article={<ProductPrice status={status} />}
      />
    </Dashboard>
  )
}

export default ProductsPrice

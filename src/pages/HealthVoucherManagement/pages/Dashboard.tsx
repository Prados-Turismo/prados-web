import { RiBuilding2Line, RiUser3Line, RiUserShared2Line } from "react-icons/ri"
import { BsBoxSeam } from "react-icons/bs"
import { useQuery } from "react-query"
import Loading from "../../../components/Loading/Loading"

import { apiWallet } from "../../../services/api"
import { pixelToRem } from "../../../utils"
import { currencyBRLFormat } from "../../../utils/currencyBRLFormat"
import CardNumber from "../components/CardNumber"
import {
  Content,
  DashboardGrid,
  DashboardItem,
  DashboardSection,
  DashboardSectionTitle
} from "./styled"
import { useGlobal } from "../../../contexts/UserContext"

const Dashboard = () => {
  const { company } = useGlobal()

  const queryFn = async () => {
    const result = await apiWallet.get(
      `/companies/${company!.externalCompanyId}/dashboard`
    )
    return result.data
  }
  const { isFetching, data: dashboardData } = useQuery<{
    companiesCount: number
    providers: number
    products: number
    balance: number
    companiesBalance: number
    balanceToExpire: number
  }>({
    queryKey: "wallet-dashboard",
    queryFn
  })
  if (isFetching) {
    return <Loading />
  }
  return (
    <Content>
      <DashboardSection>
        <DashboardSectionTitle>Cadastro</DashboardSectionTitle>
        <DashboardGrid gap={pixelToRem(24)}>
          <DashboardItem>
            <CardNumber
              title="Empresas RH's"
              text="Total de empresas RH's"
              value={dashboardData?.companiesCount}
              icon={<RiBuilding2Line />}
            />
          </DashboardItem>
          <DashboardItem>
            <CardNumber
              title="Fornecedores"
              text="Total de fornecedores"
              value={dashboardData?.providers}
              icon={<RiUserShared2Line />}
            />
          </DashboardItem>
          <DashboardItem>
            <CardNumber
              text="Total de produtos ativos"
              title="Produtos"
              value={dashboardData?.products || "0"}
              icon={<BsBoxSeam />}
            />
          </DashboardItem>
        </DashboardGrid>
      </DashboardSection>

      <DashboardSection>
        <DashboardSectionTitle>Saldo</DashboardSectionTitle>
        <DashboardGrid>
          <DashboardItem>
            <CardNumber
              title="Saldo do emissor"
              text="Total disponível"
              value={currencyBRLFormat(dashboardData?.balance || 0)}
              icon={<RiUser3Line />}
            />
          </DashboardItem>
          <DashboardItem>
            <CardNumber
              title="Saldo empresas RH's"
              text="Total de saldo"
              value={currencyBRLFormat(dashboardData?.companiesBalance || 0)}
              icon={<RiBuilding2Line />}
            />
          </DashboardItem>
          <DashboardItem></DashboardItem>
        </DashboardGrid>
      </DashboardSection>
    </Content>
  )
}

export default Dashboard

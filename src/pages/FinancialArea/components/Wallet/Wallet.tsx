import HideShow from "../../../../components/HideShow"
import { useCompanyId } from "../../../../hooks/useCompanyId"
import useFinancial from "../../../../hooks/useFinancial"

import { numberFormat } from "../../../../utils"
interface Props {
  showBalance: boolean
}

const Wallet = ({ showBalance }: Props) => {
  const companyId = useCompanyId()
  const { getWallet } = useFinancial()
  const { isLoading, balance } = getWallet(companyId)

  return (
    <>
      {showBalance && !isLoading && (
        <>
          <HideShow
            beforeText="Saldo Promoção à Saúde:"
            hideContent={numberFormat(balance)}
          />
        </>
      )}
    </>
  )
}

export default Wallet

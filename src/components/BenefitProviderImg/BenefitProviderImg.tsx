// Styles
import { Tooltip } from "@chakra-ui/react"
import { Img } from "./styled"

// Types
import { IBenefitProviderImg } from "./types"

const BenefitProviderImg = ({
  logoLink,
  nomeParceiro
}: IBenefitProviderImg) => {
  return (
    <Tooltip label={nomeParceiro} hasArrow>
      <Img src={logoLink} alt={nomeParceiro} />
    </Tooltip>
  )
}

export default BenefitProviderImg

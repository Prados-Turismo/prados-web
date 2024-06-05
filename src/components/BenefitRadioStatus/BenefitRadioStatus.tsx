// Styles
import { Radio } from "./styled"

// Types
import { IBenefitRadioStatus } from "./types"

const BenefitRadioStatus = ({ flDispBeneficiario }: IBenefitRadioStatus) => {
  return (
    <Radio
      colorScheme={flDispBeneficiario ? "green" : "red"}
      isChecked={true}
    ></Radio>
  )
}

export default BenefitRadioStatus

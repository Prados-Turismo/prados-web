import { Box } from "@chakra-ui/react"

import CompanyForm from "./CompanyForm"
import SectorsAndPositions from "./SectorsAndPositions"

import { Button } from "../Company"

interface Props {
  activeButton: Button["key"]
}
export default function Content({ activeButton }: Props) {
  const renderContent = () => {
    if (activeButton === "DADOS_CADASTRAIS") {
      return <CompanyForm />
    }

    if (activeButton === "SETORES_E_CARGOS") {
      return <SectorsAndPositions />
    }
    return null
  }
  return (
    <Box
      mt="120px"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="gray.200"
      borderTopRadius="md"
      borderBottom="none"
      p="4"
      height="100%"
    >
      {renderContent()}
    </Box>
  )
}

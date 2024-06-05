// Styles
import { Box } from "./styled"

import InterBrasilLogo from "/images/logo-interbrasil.png"
import InterBrasilRegistroANS from "/images/registro-ans-interbrasil.png"

const InterBrasilBox = () => {
  return (
    <Box>
      <img
        style={{ margin: "0 auto" }}
        src={InterBrasilLogo}
        alt="InterBrasil Saúde"
      />
      <h1>InterBrasil Administradora de Benefícios e Sistemas de Saúde S/A</h1>
      <h2>
        <span>CNPJ: 11.980.614/0001-01</span>
        <span>
          <img src={InterBrasilRegistroANS} alt="ANS nº: 417998" />
        </span>
      </h2>
    </Box>
  )
}

export default InterBrasilBox

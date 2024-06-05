// Styles
import { Box } from "./styled"

import XPLogo from "/images/logoxp.png"
import XPRegistroANS from "/images/registro-ans-xp.png"

const XPBox = () => {
  return (
    <Box>
      <h1>
        <img
          style={{ margin: "0 auto", height: "35px" }}
          src={XPLogo}
          alt="XP"
        />
        <span>XP Administradora de benefícios LTDA</span>
      </h1>
      <h2>
        <span>CNPJ: 46.024.424/0001-10</span>
        <span>
          <img src={XPRegistroANS} alt="ANS nº: 42350-5" />
        </span>
      </h2>
    </Box>
  )
}

export default XPBox

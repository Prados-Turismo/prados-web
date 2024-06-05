import { MarkStyled } from "./styles"
import { IMark } from "./types"

const Mark = ({ color = "available" }: IMark) => {
  return <MarkStyled className={color} />
}

export default Mark

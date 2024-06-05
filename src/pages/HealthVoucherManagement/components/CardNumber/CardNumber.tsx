import { Card } from "./styled"

import { ICardNumber } from "./types"

const CardNumber = ({ icon, title, text, value }: ICardNumber) => (
  <Card>
    {icon && <div className="wrapIcon">{icon}</div>}

    <div className="wrapContent ">
      <div className="wrapTitle">{title}</div>

      <div className="wrapText">{text}</div>

      <div className="wrapValue">{value}</div>
    </div>
  </Card>
)

export default CardNumber

import { useState } from "react"
import DollarIcon from "./DollarIcon/DollarIcon"
import ModalInfo from "./ModalInfo/ModalInfo"
import { TD } from "../Table"
import { IComissioningInfo } from "./types"
import { useGlobal } from "../../contexts/UserContext"

const ComissioningInfo = ({ comissioningInfo }: IComissioningInfo) => {
  const [isOpen, setOpen] = useState(false)
  const { isBroker } = useGlobal()
  if (!isBroker) return null

  return (
    <>
      <ModalInfo
        isOpen={isOpen}
        setOpen={setOpen}
        comissioningInfo={comissioningInfo}
      />
      <TD>
        <DollarIcon onClick={() => setOpen(!isOpen)} />
      </TD>
    </>
  )
}

export default ComissioningInfo

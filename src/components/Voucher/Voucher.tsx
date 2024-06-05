import { useState } from "react"
import { BiCopy } from "react-icons/bi"

import { useToastStandalone } from "../../hooks/useToastStandalone"
import SimpleModal from "../SimpleModal"
import Pix from "./pix.svg"

import { VoucherWrap, ModalContent } from "./styled"

import { IVoucher } from "./types"

const Voucher = ({ voucher, benefit, keyPix }: IVoucher) => {
  const [showModal, setShowModal] = useState<boolean>(false)

  return (
    <>
      <VoucherWrap>
        <span className="voucher">
          <b>Vale Saúde:</b> {voucher}
        </span>

        <span className="benefit">
          <b>Benefício Saúde:</b> {benefit}
        </span>

        <button
          className="pix"
          onClick={() => {
            setShowModal(true)
          }}
        >
          <img width="15px" src={Pix} alt="Chave Pix" />
          <span>Chave PIX</span>
        </button>
      </VoucherWrap>

      <SimpleModal
        isOpen={showModal}
        handleModal={setShowModal}
        size="md"
        minHeight="160px"
      >
        <ModalContent>
          <span className="title">Chave PIX</span>
          <span className="content">
            <button
              className="action"
              onClick={() => {
                navigator.clipboard?.writeText(keyPix)

                useToastStandalone({
                  title: "Chave copiada.",
                  description: "Sua chave foi copiada com sucesso!",
                  status: "success"
                })
              }}
            >
              {keyPix}
              <span>
                <BiCopy />
              </span>
            </button>
          </span>
        </ModalContent>
      </SimpleModal>
    </>
  )
}

export default Voucher

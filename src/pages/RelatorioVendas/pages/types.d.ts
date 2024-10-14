import React from "react"
import { ITransacaoVendaResponse } from "../../../models/transacao.model"
import { ISelect } from "../../../models/generics.model"

export interface IRelatorioVendasList {
  vendaResponse: ITransacaoVendaResponse
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  codigoUsuario: ISelect | null
  setUsuario: React.Dispatch<React.SetStateAction<ISelect | null>>
  dataInicio: string
  setDataInicio: React.Dispatch<React.SetStateAction<string>>
  dataFim: string
  setDataFim: React.Dispatch<React.SetStateAction<string>>
}

import React from "react"
import { ITransacaoPacoteResponse } from "../../../models/transacao.model"
import { ISelect } from "../../../models/generics.model"

export interface IRelatorioPacoteList {
  pacoteResponse: ITransacaoPacoteResponse
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  codigoPacote: ISelect | null
  setPacote: React.Dispatch<React.SetStateAction<ISelect | null>>
  dataInicio: string
  setDataInicio: React.Dispatch<React.SetStateAction<string>>
  dataFim: string
  setDataFim: React.Dispatch<React.SetStateAction<string>>
}

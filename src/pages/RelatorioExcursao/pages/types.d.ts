import React from "react"
import { ITransacaoExcursaoResponse } from "../../../models/transacao.model"
import { ISelect } from "../../../models/generics.model"

export interface IRelatorioExcursaoList {
  excursaoResponse: ITransacaoExcursaoResponse
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  codigoExcursao: ISelect | null
  setExcursao: React.Dispatch<React.SetStateAction<ISelect | null>>
  dataInicio: string
  setDataInicio: React.Dispatch<React.SetStateAction<string>>
  dataFim: string
  setDataFim: React.Dispatch<React.SetStateAction<string>>
}

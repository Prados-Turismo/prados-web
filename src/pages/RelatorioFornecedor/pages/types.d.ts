import React from "react"
import { ITransacaoFornecedorResponse } from "../../../models/transacao.model"
import { ISelect } from "../../../models/generics.model"

export interface IRelatorioFornecedorList {
  fornecedorResponse: ITransacaoFornecedorResponse
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  codigoFornecedor: ISelect | null
  setFornecedor: React.Dispatch<React.SetStateAction<ISelect | null>>
  dataInicio: string
  setDataInicio: React.Dispatch<React.SetStateAction<string>>
  dataFim: string
  setDataFim: React.Dispatch<React.SetStateAction<string>>
}

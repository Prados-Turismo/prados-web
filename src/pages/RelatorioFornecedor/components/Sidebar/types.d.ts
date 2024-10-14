import { ISidebar } from "../../../../models/sidebar.model"
import { ITransacaoExcursaoResponse } from "../../../models/transacao.model"

export interface IRelatorioFornecedorSideBar extends ISidebar {
  fornecedorResponse: ITransacaoExcursaoResponse
}

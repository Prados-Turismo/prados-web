import { ISidebar } from "../../../../models/sidebar.model"
import { ITransacaoVendaResponse } from "../../../../models/transacao.model"

export interface IRelatorioVendasSideBar extends ISidebar {
  vendaResponse: ITransacaoVendaResponse
}

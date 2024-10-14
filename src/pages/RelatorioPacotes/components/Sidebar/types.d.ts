import { ISidebar } from "../../../../models/sidebar.model"
import { ITransacaoExcursaoResponse } from "../../../models/transacao.model"

export interface IRelatorioPacoteSideBar extends ISidebar {
  pacoteResponse: ITransacaoPacoteResponse
}

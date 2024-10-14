import { ISidebar } from "../../../../models/sidebar.model"
import { ITransacaoExcursaoResponse } from "../../../models/transacao.model"

export interface IRelatorioExcursaoSideBar extends ISidebar {
  excursaoResponse: ITransacaoExcursaoResponse
}

import { ISidebar } from "../../../../models/sidebar.model"
import { ITransacaoCategoriasResponse } from "../../../models/transacao.model"

export interface IRelatorioCategoriasSideBar extends ISidebar {
  categoriasResponse: ITransacaoCategoriasResponse
}

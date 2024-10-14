import { ITransacao } from "./transacao.model";
import { IUsuario } from "./usuarios.model";

export interface IComissaoArgs {
  page: number;
  size: number;
  nome: string
  status?: number | string | null
}

export interface IComissao {
  id: string
  periodo: string
  valor: number
  data: string
  idTransacao: string
  usuariosId: string
  Financeiro: ITransacao[]
  Usuario: IUsuario
}

export interface IComissaoResponse {
  data: IComissao[];
  count: number;
  isLoading: boolean;
}

export interface ICreateComissaoArgs {
  periodo: string
  valor: number
  usuariosId: string
}

export interface IUpdateComissaoArgs extends ICreateComissaoArgs {
  id: string
}

export interface ICreateComissaoResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, ICreateComissaoArgs, unknown>;
}

export interface IUpdateComissaoResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, IUpdateComissaoArgs, unknown>;
}

export interface IDeleteComissaoResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, string, unknown>;
}

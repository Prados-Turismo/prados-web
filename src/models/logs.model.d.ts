export interface ILogs {
  id: string
  tipo: string
  newData: JsonValue | null
  oldData: JsonValue | null
  rotina: string
  data: string
  changes: Array<any>
  Usuario: {
    id: string,
    nome: string
  }
}

export interface ILogsArgs {
  page: number;
  size: number;
}

export interface ILogsResponse {
  data: ILogs[];
  count: number;
  isLoading: boolean;
}

export interface ICreateLogsArgs {
  nome: string
  ativo: boolean
  saldo: number
  usuarioCadastro: string
}

export interface IUpdateLogsArgs extends ICreateLogsArgs {
  id: string
}

export interface ICreateLogsResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, ICreateLogsArgs, unknown>;
}

export interface IUpdateLogsResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, IUpdateLogsArgs, unknown>;
}

export interface IDeleteLogsResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, string, unknown>;
}





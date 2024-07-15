export interface IExcursaoEmbarque {
  embarcou: boolean
  horaEmbarque: string
  codigoLocalEmbarque: string
  codigoExcursao: string
  codigoPassageiro: string
  usuarioCadastro: string
}

export interface IExcursaoEmbarqueArgs {
  page: number;
  size: number;
}

export interface IDataExcursaoEmbarque {
  nome: string
  dataInicio: Date
  dataFim: Date
  observacoes: string | null
  ativo: boolean
  gerouFinanceiro: boolean
  vagas: number
  codigoPacote: string
  usuarioCadastro: string
}

export interface IExcursaoListPassageiro {
  id: string,
  nome: string
}

export interface IExcursaoEmbarqueResponse {
  data: IExcursaoListPassageiro[];
  count: number;
  isLoading: boolean;
}

export interface IExcursaoEmbarqueListResponse {
  data: Array<IExcursaoListPassageiro>;
  isLoading: boolean;
}

export interface ICreateExcursaoEmbarqueArgs {
  embarcou: boolean
  horaEmbarque: string
  codigoLocalEmbarque: string
  codigoExcursao: string
  codigoPassageiro: string
  usuarioCadastro: string
}

export interface IUpdateExcursaoEmbarqueArgs extends ICreateExcursaoEmbarqueArgs {
  id: string
}

export interface ICreateExcursaoEmbarqueResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, ICreateExcursaoEmbarqueArgs, unknown>;
}

export interface IUpdateExcursaoEmbarqueResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, IUpdateExcursaoEmbarqueArgs, unknown>;
}

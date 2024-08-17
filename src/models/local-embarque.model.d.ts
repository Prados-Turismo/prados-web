export interface ILocalEmbarque {
  id: string
  nome: string
  observacoes: string
  horaEmbarque: string
  dataCadastro: Date
  codigoEndereco: string
  usuarioCadastro: string
  ativo: boolean
  Endereco: {
    logradouro: string
    numero: string
    complemento: string | null
    cep: string
    cidade: string
    uf: string
    bairro: string
  }
}

export interface ILocalEmbarqueResponse {
  data: ILocalEmbarque[];
  isLoading: boolean;
  count: number
}

export interface ILocalEmbarqueArgs {
  page: number;
  size: number;
}

export interface ICreateLocalEmbarqueArgs {
  nome: string
  observacoes: string
  horaEmbarque: string
  dataCadastro: Date
  codigoEndereco: string
  usuarioCadastro: string
  ativo: boolean
}

export interface IUpdateLocalEmbarqueArgs extends ICreateLocalEmbarqueArgs {
  id: string
}

export interface ICreateLocalEmbarqueResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, ICreateLocalEmbarqueArgs, unknown>;
}

export interface IUpdateLocalEmbarqueResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, IUpdateLocalEmbarqueArgs, unknown>;
}

export interface IDeleteLocalEmbarqueResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, string, unknown>;
}



export interface IOpcionalEmbarqueArgs {
  page: number;
  size: number;
}

export interface IOpcionalEmbarque {
  id: string
  data: string
  embarcou: boolean
  hasBoarded: string
  Pessoa: {
    id: string
    nome: string
    cpf: string
    sexo: string
    observacoes: string | null
    telefone: string | null
    telefoneWpp: string | null
    email: string
    contato: string | null
    telefoneContato: string | null
    dataNascimento: Date | null
    usuarioCadastro: string
    rg: string | null
    emissor: string | null
    rankingClientesId?: string | null
  }
  Reservas: {
    reserva?: number
    codigoUsuario: string | null
    idExcursao: string
    desconto: number
    plataforma?: number
    localEmbarqueId: string
    criancasColo: number
    Opcionais: {
      id: string
      Produto: {
        id: string
        nome: string
      }
    }[]
  }
}

export interface IOpcionalEmbarqueResponse {
  data: IOpcionalEmbarque[];
  count: number;
  isLoading: boolean;
}

export interface ICreateOpcionalEmbarqueArgs {
  embarcou: boolean
  data: DateTime
  idOpcional: string
  idPassageiro: string
}

export interface IUpdateOpcionalEmbarqueArgs extends ICreateOpcionalEmbarqueArgs {
  id: string
}

export interface ICreateOpcionalEmbarqueResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, ICreateOpcionalEmbarqueArgs, unknown>;
}

export interface IUpdateOpcionalEmbarqueResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, IUpdateOpcionalEmbarqueArgs, unknown>;
}

export interface IDeleteOpcionalEmbarqueResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, string, unknown>;
}

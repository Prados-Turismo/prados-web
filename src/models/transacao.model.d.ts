import { UseMutateFunction } from "react-query"

export interface ITransacao {
  id: string
  tipo: number
  valor: number
  vistoAdmin?: boolean
  data: string
  efetivado?: boolean
  observacao?: string | null
  ativo: boolean
  numeroComprovanteBancario?: string | null
  dataPrevistaRecebimento: string
  idWP?: number | null
  codigoPessoa?: string | null
  codigoFornecedor?: string | null
  codigoExcursao?: string | null
  codigoProduto?: string | null
  codigoPacote?: string | null
  codigoFormaPagamento: string
  usuarioCadastro: string
  Pessoas?: {
    id: string
    nome: string
    cpf: string
    sexo: string
    dataCadastro: Date
    observacoes: string | null
    telefone: string | null
    telefoneWpp: string | null
    email: string
    contato: string | null
    telefoneContato: string | null
    ativo: boolean
    dataNascimento: Date | null
    usuarioCadastro: string
  } | null,
  Fornecedor?: {
    id: string
    nome: string
    fantasia: string
    cnpj: string
    site: string | null
    ativo: boolean
    dataCadastro: Date
    observacoes: string | null
    telefone: string | null
    email: string
    contato: string | null
    telefoneContato: string | null
    codigoEndereco: string
    usuarioCadastro: string
  } | null,
  Excursao?: {
    id: string
    nome: string
    dataInicio: string
    dataFim: string
    observacoes: string | null
    dataCadastro: Date
    ativo: boolean
    gerouFinanceiro: boolean
    vagas: number
    codigoPacote: string
    usuarioCadastro: string
    Pacotes?: {
      id: string
      nome: string
      valor: number
      descricao: string
      ativo: boolean
      origem: number
      tipoTransporte: number
      urlImagem: string | null
      urlImgEsgotado: string | null
      idWP: number | null
      destino: string
      categoria: number | null
      codigoDestino: string | null
      usuarioCadastro: string
    } | null,
  } | null,
  Usuarios: {
    id: string
    nome: string
    username: string
    password: string
    dataCadastro: Date
    usuarioCadastro: string | null
    tipo: number
    email: string
    ativo: boolean
    comissao: number | null
    meta: number | null
  },
  Produtos?: {
    id: string
    nome: string
    estoque: number
    dataCompra?: Date | null
    ativo: boolean
    codigoFornecedor: string
    usuarioCadastro: string
  } | null,
  FormaPagamento: {
    id: string
    nome: string
    dataCadastro: Date
    taxa: number
    qtdDiasRecebimento: number
    ativo: boolean
    codigoContaBancaria: string
    usuarioCadastro: string
  }
  ContaBancaria: {
    id: string
    nome: string
    ativo: boolean
    saldo: number
    dataCadastro: Date
    usuarioCadastro: string
  }
  CategoriaTransacao: {
    id: string
    nome: string
    tipo: number
    codigoUsuario: string
    codigoSubCategoria: string
    SubCategoria: {
      id: string
      nome: string
      codigoUsuario: string
    }
  },
  Reservas: {
    id: string,
    reserva: number,
    status: boolean,
    codigoUsuario: string | null,
    desconto: number
    plataforma: number
  }
  Pacotes?: {
    id: string
    nome: string
    valor: number
    descricao: string
    ativo: boolean
    origem: number
    tipoTransporte: number
    urlImagem: string | null
    urlImgEsgotado: string | null
    idWP: number | null
    destino: string
    categoria: number | null
    codigoDestino: string | null
    usuarioCadastro: string
  } | null,
}

export interface ITransacaoArgs {
  page: number;
  size: number;
  nome?: string | null
  dataInicio?: string | null
  dataFim?: string | null
  codigoContaBancaria?: [string] | null | undefined | (string | number)[]
  efetivado?: boolean | number | string | null
}

export interface ITransacaoResponse {
  data: ITransacao[];
  count: number;
  isLoading: boolean;
}

export interface ITransacaoCategoriasResponse extends ITransacaoResponse {
  receitas: number
  despesas: number
}

export interface ITransacaoExcursaoResponse extends ITransacaoResponse {
  receitas: number
  despesas: number
}

export interface ITransacaoPacoteResponse extends ITransacaoResponse {
  receitas: number
  despesas: number
}

export interface ITransacaoFornecedorResponse extends ITransacaoResponse {
  receitas: number
  despesas: number
}

export interface ITransacaoVendaResponse extends ITransacaoResponse {
  vendas: number
}

export interface ICreateTransacaoArgs {
  tipo: number
  valor: number
  vistoAdmin?: boolean
  efetivado?: boolean
  observacao?: string
  ativo: boolean
  numeroComprovanteBancario?: string
  idWP?: number
  codigoPessoa?: string
  codigoFornecedor?: string
  codigoExcursao?: string
  codigoProduto?: string
  codigoPacote?: string
  codigoFormaPagamento: string
  usuarioCadastro: string
  data?: string | null
}

export interface ITransacaoCategoriasArgs {
  page: number;
  size: number;
  dataInicio?: string
  dataFim?: string
  codigoCategoria?: string
  codigoSubCategoria?: string
}

export interface ITransacaoExcursaoArgs {
  page: number;
  size: number;
  dataInicio?: string
  dataFim?: string
  codigoExcursao?: string
}

export interface ITransacaoPacoteArgs {
  page: number;
  size: number;
  dataInicio?: string
  dataFim?: string
  codigoPacote?: string
}

export interface ITransacaoVendaArgs {
  page: number;
  size: number;
  dataInicio?: string
  dataFim?: string
  codigoUsuario?: string
}

export interface ITransacaoFornecedorArgs {
  page: number;
  size: number;
  dataInicio?: string
  dataFim?: string
  codigoFornecedor?: string
}

export interface IUpdateTransacaoArgs extends ICreateTransacaoArgs {
  id: string
}

export interface ICreateTransacaoResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, ICreateTransacaoArgs, unknown>;
}

export interface IUpdateTransacaoResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, IUpdateTransacaoArgs, unknown>;
}

export interface IDeleteTransacaoResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, string, unknown>;
}

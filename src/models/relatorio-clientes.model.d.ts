import { ICategoriaTransacao } from "./categoria-transacao.model"
import { IContaBancaria } from "./conta-bancaria.model"
import { IExcursao } from "./excursao.model"
import { IFormaPagamento } from "./forma-pagamento.model"
import { IFornecedor } from "./fornecedor.model"
import { IDataPacote } from "./pacote.model"
import { IPessoa } from "./pessoa.model"
import { IUsuario } from "./usuarios.model"

export interface IRelatorioClientes {
  id: string
  tipo: number
  valor: number
  vistoAdmin: boolean
  data: Date
  efetivado: boolean
  observacao?: string | null
  ativo: boolean
  numeroComprovanteBancario?: string | null
  dataPrevistaRecebimento: Date
  idWP?: number | null
  codigoPessoa: string
  codigoFornecedor?: string | null
  codigoExcursao: string
  codigoProduto?: string | null
  codigoPacote: string
  codigoFormaPagamento: string
  codigoCategoria: string
  codigoContaBancaria: string
  usuarioCadastro: string
  idReserva?: string | null
  Pessoas?: Omit<IPessoa, "Endereco" | "Ranking"> | null
  Fornecedor?: Omit<IFornecedor, "Endereco"> | null
  Excursao?: Omit<IExcursao, "ExcursaoPassageiros" | "Pacotes"> | null
  Pacotes?: IDataPacote | null
  Usuarios?: IUsuario | null
  Produtos?: Omit<IDataProduct, "Fornecedor"> | null
  FormaPagamento?: IFormaPagamento | null
  ContaBancaria?: IContaBancaria | null
  CategoriaTransacao?: ICategoriaTransacao | null
}

export interface IRelatorioClientesArgs {
  page: number
  size: number
  pessoaId: string
}

export interface IRelatorioClientesResponse {
  data: IRelatorioClientes[]
  count: number
  isLoading: boolean
  sum: number
}

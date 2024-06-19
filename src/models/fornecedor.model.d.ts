/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IDataFornecedor {
  id: string
  nome: string
  ativo?: boolean
}

export interface IFornecedorResponse {
  data: IDataFornecedor[];
  isLoading: boolean;
}

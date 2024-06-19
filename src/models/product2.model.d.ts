/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IProductArgs {
  page: number;
  size: number;
}

export interface IDataProduct {
  id: string
  nome: string
  estoque: number
  dataCompra: Date
  dataCadastro: Date
  ativo: boolean
  codigoFornecedor: string
  usuarioCadastro: string
}

export interface IProductResponse {
  data: IDataProduct[];
  count: number;
  isLoading: boolean;
}

export interface ICreateProductArgs {
  nome: string;
  estoque: number
  ativo: boolean
  codigoFornecedor: string
  usuarioCadastro: string
}

export interface ICreateProductResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, ICreateProductArgs, unknown>;
}

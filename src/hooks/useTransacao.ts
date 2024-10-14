import { useMutation, useQuery } from "react-query";
import { useToastStandalone } from "./useToastStandalone";
import { apiPrados } from "../services/api";
import {
  ITransacaoArgs,
  ITransacaoResponse,
  ICreateTransacaoArgs,
  ICreateTransacaoResponse,
  IUpdateTransacaoArgs,
  IUpdateTransacaoResponse,
  IDeleteTransacaoResponse,
  ITransacaoCategoriasArgs,
  ITransacaoCategoriasResponse,
  ITransacaoExcursaoArgs,
  ITransacaoExcursaoResponse,
  ITransacaoPacoteArgs,
  ITransacaoVendaArgs,
  ITransacaoVendaResponse,
  ITransacaoFornecedorResponse,
  ITransacaoFornecedorArgs
} from "../models/transacao.model";
import { Warning } from "../errors";
import { keys, queryClient } from "../services/query";

const getTransacoes = (
  { page,
    size,
    nome,
    dataInicio,
    dataFim,
    codigoContaBancaria,
    efetivado }: ITransacaoArgs): ITransacaoResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.financeiro,
      page,
      nome,
      dataInicio,
      dataFim,
      codigoContaBancaria,
      efetivado
    ],
    async () => {
      const path = 'financeiro/index';

      dataInicio = dataInicio ? dataInicio : null
      dataFim = dataFim ? dataFim : null

      try {
        const { data } = await apiPrados.get(path, {
          params: {
            page,
            size,
            nome,
            dataInicio,
            dataFim,
            codigoContaBancaria,
            efetivado
          },
        });

        return data
      } catch (error: any) {
        throw new Warning(error.response.data.message, error.response.status);
      }
    }
  )

  return {
    data: data?.rows || [],
    count: data?.count || 0,
    isLoading
  };
}

const createTransacao = (
  reset: () => void,
  handleClose: () => void
): ICreateTransacaoResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: ICreateTransacaoArgs) => {
      const urlPath = 'financeiro/create'

      try {
        await apiPrados.post(urlPath, data).then(() => {
          reset()
          handleClose()

          queryClient.invalidateQueries([keys.financeiro])

          useToastStandalone({
            title: "Cadastro concluído!",
            status: "success",
          });
        })
      } catch (error: any) {
        throw new Warning(error.response.data.message, error?.response?.status);
      }
    }
  )

  return {
    isLoading,
    mutate
  }
}

const updateTransacao = (
  reset: () => void,
  handleClose: () => void
): IUpdateTransacaoResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: IUpdateTransacaoArgs) => {
      const urlPath = `financeiro/update/${data.id}`;

      try {
        await apiPrados.put(urlPath, data).then(() => {
          reset()
          handleClose()
          queryClient.invalidateQueries([keys.financeiro])

          useToastStandalone({
            title: "Atualizado com sucesso!",
            status: "success"
          })
        })
      } catch (error: any) {
        throw new Warning(error.response.data.message, error?.response?.status);
      }
    }
  )

  return {
    isLoading,
    mutate
  }
}

const deleteTransacao = (): IDeleteTransacaoResponse => {

  const { isLoading, mutate } = useMutation(
    async (id: string) => {
      const urlPath = `financeiro/delete/${id}`

      try {
        await apiPrados.patch(urlPath).then(function () {
          queryClient.invalidateQueries([keys.financeiro])
          queryClient.invalidateQueries([keys.contaBancaria])

          useToastStandalone({
            title: "Excluída com sucesso!",
            status: "success"
          })
        })
      } catch (error: any) {
        throw new Warning(error.response.data.message, error?.response?.status);
      }
    }
  )

  return {
    isLoading,
    mutate
  }
}

const efetivarTransacao = (): IDeleteTransacaoResponse => {

  const { isLoading, mutate } = useMutation(
    async (id: string) => {
      const urlPath = `financeiro/efetivar-transacao/${id}`

      try {
        await apiPrados.patch(urlPath).then(function () {
          queryClient.invalidateQueries([keys.financeiro])
          queryClient.invalidateQueries([keys.contaBancaria])

          useToastStandalone({
            title: "Efetivada com sucesso!",
            status: "success"
          })
        })
      } catch (error: any) {
        throw new Warning(error.response.data.message, error?.response?.status);
      }
    }
  )

  return {
    isLoading,
    mutate
  }
}

const desefetivarTransacao = (): IDeleteTransacaoResponse => {

  const { isLoading, mutate } = useMutation(
    async (id: string) => {
      const urlPath = `financeiro/des-efetivar/${id}`

      try {
        await apiPrados.patch(urlPath).then(function () {
          queryClient.invalidateQueries([keys.financeiro])
          queryClient.invalidateQueries([keys.contaBancaria])

          useToastStandalone({
            title: "Desefetivada com sucesso!",
            status: "success"
          })
        })
      } catch (error: any) {
        throw new Warning(error.response.data.message, error?.response?.status);
      }
    }
  )

  return {
    isLoading,
    mutate
  }
}

const setVistoTransacao = (): IDeleteTransacaoResponse => {

  const { isLoading, mutate } = useMutation(
    async (id: string) => {
      const urlPath = `financeiro/set-visto-admin/${id}`

      try {
        await apiPrados.patch(urlPath, { visto: true }).then(function () {
          queryClient.invalidateQueries([keys.financeiro])

          useToastStandalone({
            title: "Marcada como vista com sucesso!",
            status: "success"
          })
        })
      } catch (error: any) {
        throw new Warning(error.response.data.message, error?.response?.status);
      }
    }
  )

  return {
    isLoading,
    mutate
  }
}

const removeVistoTransacao = (): IDeleteTransacaoResponse => {

  const { isLoading, mutate } = useMutation(
    async (id: string) => {
      const urlPath = `financeiro/set-visto-admin/${id}`

      try {
        await apiPrados.patch(urlPath, { visto: false }).then(function () {
          queryClient.invalidateQueries([keys.financeiro])

          useToastStandalone({
            title: "Marcada como vista com sucesso!",
            status: "success"
          })
        })
      } catch (error: any) {
        throw new Warning(error.response.data.message, error?.response?.status);
      }
    }
  )

  return {
    isLoading,
    mutate
  }
}

const clone = (): IDeleteTransacaoResponse => {
  const { isLoading, mutate } = useMutation(
    async (id: string) => {
      const urlPath = `financeiro/clone/${id}`

      try {
        await apiPrados.put(urlPath).then(function () {
          queryClient.invalidateQueries([keys.financeiro])

          useToastStandalone({
            title: "Clonada com sucesso!",
            status: "success"
          })
        })
      } catch (error: any) {
        throw new Warning(error.response.data.message, error?.response?.status);
      }
    }
  )

  return {
    isLoading,
    mutate
  }
}

const getTransacoesCategorias = (
  {
    page,
    size,
    dataInicio,
    dataFim,
    codigoCategoria,
    codigoSubCategoria
  }: ITransacaoCategoriasArgs): ITransacaoCategoriasResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.financeiroCategorias,
      page,
      dataInicio,
      dataFim,
      codigoCategoria,
      codigoSubCategoria
    ],
    async () => {
      const path = 'relatorios/categorias';

      try {
        const { data } = await apiPrados.get(path, {
          params: {
            page,
            size,
            dataInicio: dataInicio || null,
            dataFim: dataFim || null,
            codigoCategoria,
            codigoSubCategoria
          },
        });

        return data
      } catch (error: any) {
        throw new Warning(error.response.data.message, error.response.status);
      }
    }
  )

  return {
    data: data?.rows || [],
    count: data?.count || 0,
    isLoading,
    receitas: data?.receitas || 0,
    despesas: data?.despesas || 0
  };
}

const getTransacoesExcursoes = (
  {
    page,
    size,
    dataInicio,
    dataFim,
    codigoExcursao
  }: ITransacaoExcursaoArgs): ITransacaoExcursaoResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.financeiroExcursao,
      page,
      dataInicio,
      dataFim,
      codigoExcursao
    ],
    async () => {
      const path = 'relatorios/excursoes';

      try {
        const { data } = await apiPrados.get(path, {
          params: {
            page,
            size,
            dataInicio: dataInicio || null,
            dataFim: dataFim || null,
            codigoExcursao
          },
        });

        return data
      } catch (error: any) {
        throw new Warning(error.response.data.message, error.response.status);
      }
    }
  )

  return {
    data: data?.rows || [],
    count: data?.count || 0,
    isLoading,
    receitas: data?.receitas || 0,
    despesas: data?.despesas || 0
  };
}

const getTransacoesPacote = (
  {
    page,
    size,
    dataInicio,
    dataFim,
    codigoPacote
  }: ITransacaoPacoteArgs): ITransacaoExcursaoResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.financeiroPacote,
      page,
      dataInicio,
      dataFim,
      codigoPacote
    ],
    async () => {
      const path = 'relatorios/pacotes';

      try {
        const { data } = await apiPrados.get(path, {
          params: {
            page,
            size,
            dataInicio: dataInicio || null,
            dataFim: dataFim || null,
            codigoPacote
          },
        });

        return data
      } catch (error: any) {
        throw new Warning(error.response.data.message, error.response.status);
      }
    }
  )

  return {
    data: data?.rows || [],
    count: data?.count || 0,
    isLoading,
    receitas: data?.receitas || 0,
    despesas: data?.despesas || 0
  };
}

const getTransacoesVendas = (
  {
    page,
    size,
    dataInicio,
    dataFim,
    codigoUsuario
  }: ITransacaoVendaArgs): ITransacaoVendaResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.financeiroVendas,
      page,
      dataInicio,
      dataFim,
      codigoUsuario
    ],
    async () => {
      const path = 'relatorios/vendas';

      try {
        const { data } = await apiPrados.get(path, {
          params: {
            page,
            size,
            dataInicio: dataInicio || null,
            dataFim: dataFim || null,
            codigoUsuario
          },
        });

        return data
      } catch (error: any) {
        throw new Warning(error.response.data.message, error.response.status);
      }
    }
  )

  return {
    data: data?.rows || [],
    count: data?.count || 0,
    isLoading,
    vendas: data?.vendas || 0
  };
}

const getTransacoesFornecedores = (
  {
    page,
    size,
    dataInicio,
    dataFim,
    codigoFornecedor
  }: ITransacaoFornecedorArgs): ITransacaoFornecedorResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.financeiroFornecedor,
      page,
      dataInicio,
      dataFim,
      codigoFornecedor
    ],
    async () => {
      const path = 'relatorios/fornecedores';

      try {
        const { data } = await apiPrados.get(path, {
          params: {
            page,
            size,
            dataInicio: dataInicio || null,
            dataFim: dataFim || null,
            codigoFornecedor
          },
        });

        return data
      } catch (error: any) {
        throw new Warning(error.response.data.message, error.response.status);
      }
    }
  )

  return {
    data: data?.rows || [],
    count: data?.count || 0,
    isLoading,
    receitas: data?.receitas || 0,
    despesas: data?.despesas || 0
  };
}


export default function useTransacao() {
  return {
    getTransacoes,
    createTransacao,
    updateTransacao,
    deleteTransacao,
    efetivarTransacao,
    desefetivarTransacao,
    setVistoTransacao,
    removeVistoTransacao,
    clone,
    getTransacoesCategorias,
    getTransacoesExcursoes,
    getTransacoesPacote,
    getTransacoesVendas,
    getTransacoesFornecedores
  }
}

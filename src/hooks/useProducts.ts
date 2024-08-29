/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from "react-query";

import { useToastStandalone } from "./useToastStandalone";

// Api
import { apiPrados } from "../services/api";

// Types
import {
  IProductArgs,
  IProductResponse,
  ICreateProductArgs,
  ICreateProductResponse,
  IUpdateProductArgs,
  IUpdateProductResponse
} from "../models/product2.model";

// Keys
import { Warning } from "../errors";
import { keys, queryClient } from "../services/query";

const getProducts = ({
  page,
  size
}: IProductArgs): IProductResponse => {
  const { data, isLoading } = useQuery(
    [
      keys.products,
      page
    ],
    async () => {
      const path = 'produtos/index';

      try {
        const { data } = await apiPrados.get(path, {
          params: {
            page,
            size
          },
        });

        return data
      } catch (error: any) {
        throw new Warning(error.response.data.message, error.response.status);
      }
    }
  );

  return {
    data: data?.rows || [],
    count: data?.count || 0,
    isLoading
  };
};

const getAllProducts = (): IProductResponse => {
  const { data, isLoading } = useQuery(
    [
      keys.products
    ],
    async () => {
      const path = 'produtos/findAll';

      try {
        const { data } = await apiPrados.get(path);

        return data
      } catch (error: any) {
        throw new Warning(error.response.data.message, error.response.status);
      }
    }
  );

  return {
    data: data || [],
    count: data?.count || 0,
    isLoading
  };
};

const createProduct = (
  reset: () => void,
  handleClose: () => void,
): ICreateProductResponse => {
  const { isLoading, mutate } = useMutation(
    async (data: ICreateProductArgs) => {
      const urlPath = 'produtos/create';

      try {
        await apiPrados.post(urlPath, data).then(() => {
          reset();
          handleClose();
          queryClient.invalidateQueries([keys.products]);

          useToastStandalone({
            title: "Cadastro concluído!",
            status: "success",
          });
        });
      } catch (error: any) {
        throw new Warning(error.response.data.message, error?.response?.status);
      }
    },
  );

  return {
    isLoading,
    mutate,
  };
};

const updateProduct = (
  reset: () => void,
  handleClose: () => void,
): IUpdateProductResponse => {
  const { isLoading, mutate } = useMutation(
    async (data: IUpdateProductArgs) => {
      const urlPath = `produtos/update/${data.id}`;

      try {
        await apiPrados.put(urlPath, data).then(() => {
          reset();
          handleClose();
          queryClient.invalidateQueries([keys.products]);

          useToastStandalone({
            title: "Atualizado com sucesso!",
            status: "success",
          });
        });
      } catch (error: any) {
        throw new Warning(error.response.data.message, error?.response?.status);
      }
    },
  );

  return {
    isLoading,
    mutate,
  };
};

const deleteProduto = (): IUpdateProductResponse => {

  const { isLoading, mutate } = useMutation(
    async (id: string) => {
      const urlPath = `produtos/delete/${id}`

      try {
        await apiPrados.patch(urlPath).then(function (data) {
          queryClient.invalidateQueries([keys.products])

          useToastStandalone({
            title: "Excluído com sucesso!",
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

export default function useProduct() {
  return {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduto,
    getAllProducts
  };
}

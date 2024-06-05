/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryClient } from "react-query"

export const generateQueryClient = (): QueryClient => {
  return new QueryClient()
}

export const queryClient = generateQueryClient()

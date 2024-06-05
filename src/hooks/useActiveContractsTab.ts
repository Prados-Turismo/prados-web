import { useMutation } from "react-query"
import { ISendContractData, IUseActiveContractsTab, IsendContractDataResponse } from "../models/active-contracts-tab-implantation"
import { apiSupport } from "../services/api"
import { useToastStandalone } from "./useToastStandalone"


const sendContractData = (companyId: string, callback: () => void): IsendContractDataResponse => {
  const { isLoading, mutate } = useMutation(
    async (data: ISendContractData) => {
      try {
        await apiSupport.post(`/implementation-form/active-contracts/${companyId}`, data).then(() => {
          callback()
        })
      } catch (error: any) {
        useToastStandalone({
          title: "Erro ao enviar formulário",
          description: error?.response?.message || "Erro ao enviar dados para cadastro",
          status: "error"
        })
      }
    },
    {
      onSuccess: () => {
        useToastStandalone({
          title: "Sucesso",
          description: "Chamado aberto com os dados para cadastro",
          status: "success"
        })
      }
    }
  )

  return {
    isLoading,
    mutate
  }
}

const handleAnswerForm = async (formId: string) => {
  await apiSupport.patch(`/implementation-form/answer/${formId}`).then(() => useToastStandalone({
    title: "Sucesso",
    description: "A empresa não possui contratos vigentes",
    status: "success"
  })).catch((error) => useToastStandalone({
    title: "Erro ao enviar formulário",
    description: error?.response?.message || "Erro ao responder o formulário",
    status: "error"
  }))
}

export const useActiveContractsTab = (): IUseActiveContractsTab => ({
  sendContractData,
  handleAnswerForm
})

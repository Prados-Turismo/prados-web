import { IImportPjsData, IUseImportPjsTab } from "../models/use-import-pjs-tab"
import { apiSupport } from "../services/api"
import { useToastStandalone } from "./useToastStandalone"


const sendImportPjsData = async (data: IImportPjsData, formId: string, companyId: string) => {

  await apiSupport.post(`/implementation-form/pj-import/${companyId}`, data).then(async () => {
    useToastStandalone({
      title: "Sucesso",
      description: "Chamado aberto com os dados para cadastro",
      status: "success"
    })

  }).catch((error) => useToastStandalone({
    title: "Erro ao enviar formulário",
    description: error?.response?.message || "Erro ao enviar dados para cadastro",
    status: "error"
  }))

}

const handleAnswerForm = async (formId: string) => {
  await apiSupport.patch(`/answer/${formId}`).then(() => useToastStandalone({
    title: "Sucesso",
    description: "A empresa não possui contratos vigentes",
    status: "success"
  })).catch((error) => useToastStandalone({
    title: "Erro ao enviar formulário",
    description: error?.response?.message || "Erro ao responder o formulário",
    status: "error"
  }))
}


export const useImportPjsTab = (): IUseImportPjsTab => ({
  sendImportPjsData,
  handleAnswerForm
})

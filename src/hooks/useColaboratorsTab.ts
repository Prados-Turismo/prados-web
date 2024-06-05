import { ISendColaboratorData, IUseColaboratorTab } from "../models/colaborator-tab-implantation-form"
import { apiSupport } from "../services/api"
import { useToastStandalone } from "./useToastStandalone"




const sendColaboratorData = async (data: ISendColaboratorData, formId: string, companyId: string) => {


  await apiSupport.post(`/implementation-form/collaborators/${companyId}`, data).then(async () => {
    useToastStandalone({
      title: "Sucesso",
      description: "Arquivo enviado para importação",
      status: "success"
    })
  }).catch(error => useToastStandalone({
    title: "Erro ao enviar formulário",
    description: error?.response?.message || "Arquivo enviado para importação",
    status: "error"
  }))
}


export const useColaboratorsTab = (): IUseColaboratorTab => ({
  sendColaboratorData
})

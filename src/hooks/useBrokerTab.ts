import { useQuery } from "react-query";
import { IBrokerTabData, IFetchBrokersResponse, IUseBrokerTab } from "../models/broker-tab-implant";
import { apiRecord, apiSupport } from "../services/api";
import { useToastStandalone } from "./useToastStandalone";




const sendBrokerData = async (data: IBrokerTabData, formId: string, companyId: string) => {
  await apiSupport.post(`/implementation-form/broker/${companyId}`, data).then(async () => {
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


const fetchBrokers = () => {
  const { data: brokerList, isLoading: isFetchingBrokers } = useQuery(['fetch-brokers-inside-forms'], {
    queryFn: async () => (await (apiRecord.get<IFetchBrokersResponse>("/companies-broker"))).data
  })

  return {
    brokerList,
    isFetchingBrokers
  }
}



export const useBrokerTab = (): IUseBrokerTab => ({
  sendBrokerData,
  fetchBrokers
})

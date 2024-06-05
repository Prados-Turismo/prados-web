import { UseMutateFunction } from "react-query"

export interface ISendContractData {
  answered: boolean
  callData: {
    hubId: string
    hubName: string
    companyName: string
    callReasonId: string
    callReasonSubject: string
    requestingUser: string
    requestingUserName: string
  }
  messageData: Array<{
    login: string
    pass: string
    contato?: string
    telefoneContato?: string
    emailContato?: string
    attachments: Array<string>
  }>
}

export interface IsendContractDataResponse {
  isLoading: boolean
  mutate: UseMutateFunction<void, unknown, ISendContractData, unknown>
}

export interface IUseActiveContractsTab {
  sendContractData: (companyId: string, callback: () => void) => IsendContractDataResponse
  handleAnswerForm: (formId: string) => Promise<void>
}

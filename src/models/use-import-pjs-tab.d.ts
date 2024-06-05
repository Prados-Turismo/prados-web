

export interface IImportPjsData {
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
  messageData: {
    resposta: string
    attachments: Array<string>
  }
}

export interface IUseImportPjsTab {
  sendImportPjsData: (data: IImportPjsData, formId: string, companyId: string) => Promise<void>;
  handleAnswerForm: (formId: string) => Promise<void>
}

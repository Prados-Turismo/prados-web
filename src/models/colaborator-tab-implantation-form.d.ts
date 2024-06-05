


export interface ISendColaboratorData {
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
    attachments: Array<string>
  }
}


export interface IUseColaboratorTab {
  sendColaboratorData: (data: ISendColaboratorData, formId: string, companyId: string) => Promise<void>
}

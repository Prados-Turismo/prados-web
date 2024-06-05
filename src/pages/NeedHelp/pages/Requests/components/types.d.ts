import { IDataNeedHelp } from "../../../../../models/needHelp.model"

export interface ITRRequests {
  status: string
  item: IDataNeedHelp
  selectedRole: "company" | "beneficiary" | "brokerAgent"
  refetchCalls: () => Promise<any>
}

export interface IChat {
  item: IDataNeedHelp
  status: string
}

export interface ICancelRequestButton {
  requestId: string
  protocol: string
}

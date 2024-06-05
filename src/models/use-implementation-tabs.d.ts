


export enum ImplantationFormEnum {
  collaborators = "collaborators",
  activeContracts = "activeContracts",
  pjImport = "pjImport",
  broker = "broker"
}

export enum CallReasonSlugs {
  implFormCol = "implFormCol",
  implFormCont = "implFormCont",
  implFormPj = "implFormPj",
  implFormBrok = "implFormBrok"
}

export interface IFetchImplementationFormsResponse {
  id: string
  createdAt: Date
  companyId: string
  type: ImplantationFormEnum
  answered: boolean
}


interface IFetchTabsDataResponse {
  tabsData: {
    label: string;
    content: JSX.Element;
    showTab: boolean;
  }[]
}

interface ICallData {
  hubId: string
  hubName: string
  companyName: string
  callReasonId: string
  callReasonSubject: string
  requestingUser: string
  requestingUserName: string
}


export interface IUseImplementationTabs {
  fetchImplementationForms(companyId: string): Promise<IFetchImplementationFormsResponse[]>
  fetchTabsData(forms: IFetchImplementationFormsResponse[], roleId: string, refetchForms: () => Promise<any>, callData: ICallData): IFetchTabsDataResponse
}

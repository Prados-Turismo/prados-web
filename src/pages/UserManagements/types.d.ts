export interface IItem {
  status: ISidebarContractStatus;
  name: string;
  active: boolean;
}

export interface IReactSelected {
  label: string;
  value: number | string;
  uf?: number;
}

export enum ISidebarUserManagementStatus {
  A = "A",
  I = "I",
}

export interface ISidebarUserManagement {
  status: ISidebarUserManagementStatus;
  onStatus: (status: ISidebarUserManagementStatus) => void;
  setUserTypeSelected: Dispatch<SetStateAction<IReactSelected>>;
  userTypeSelected: IReactSelected;
  setStatus: React.Dispatch<React.SetStateAction<ISidebarUserManagementStatus>>;
}

export interface IOrder {
  name: number | null;
  email: number | null;
}

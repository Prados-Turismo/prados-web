import { ICompanyUsersResponse } from "../../../models/userManagement.model";

import { IReactSelected, ISidebarUserManagementStatus } from "../types";

export interface IUserManagement {
  status: ISidebarUserManagementStatus;
  usersData: ICompanyUsersResponse | undefined;
  userTypeSelected: IReactSelected;
}

import { IStepsHeader } from "../../types";

export interface IStepContent extends IStepsHeader {
  title: string;
  active: boolean;
}

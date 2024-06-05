import { Dispatch, SetStateAction } from "react";

export interface IComparator {
  isFetching: boolean;
  setCurrentTab: Dispatch<
    SetStateAction<
      | {
          name: string;
          status: number;
          isDisabled: boolean;
        }
      | undefined
    >
  >;
}

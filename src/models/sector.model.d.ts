import { UseMutateFunction } from "react-query";

export interface ISectorResponse {
  isLoading: boolean;
  data: ISector[] | [];
}

export interface IOccupationResponse {
  isLoading: boolean;
  data: IOccupation[] | [];
}

interface ISector {
  id: string;
  name: string;
  companyId: string;
  createdAt: string;
  nameFormatted: string;
}

export interface IAddSectorResponse {
  isLoading: boolean;
  mutate: any;
}

interface IOccupation {
  id: string;
  name: string;
  sectorId: string;
  createdAt: string;
  nameFormatted: string;
}

export interface IAddOccupationResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<
    void,
    unknown,
    {
      sectorId: string;
      occupationName: string;
    },
    unknown
  >;
}

export interface IDeleteOccupationResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<
    void,
    unknown,
    {
      positionId: string;
      sectorId: string;
    },
    unknown
  >;
}

export interface IUpdateOccupationResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<
    void,
    unknown,
    {
      sectorId: string;
      positionId: string;
      occupationName: string;
    },
    unknown
  >;
}

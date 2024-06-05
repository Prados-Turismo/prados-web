/* eslint-disable @typescript-eslint/no-explicit-any */
import { IDataProductContract } from "../../../../models/product.model";

export interface IAdhesionContent {
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  contractId: string;
  beneficiaryId: string;
  page: string;
  setHolderId: React.Dispatch<React.SetStateAction<string | undefined>>;
  setcheckedAgrupados: React.Dispatch<
    React.SetStateAction<IFamilyContractData[]>
  >;
  checkedAgrupados: IFamilyContractData[];
  product: IDataProductContract;
  setIsLoadingAdhesion: React.Dispatch<React.SetStateAction<boolean>>;
  setDataLimiteAssinatura: React.Dispatch<React.SetStateAction<string | null>>;
}

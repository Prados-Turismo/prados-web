import { CSSProperties } from "react";

export interface IProviderImage {
  providerName: string;
  imgToken: string;
  w?: string;
  maxH?: string;
  propsImage?: CSSProperties;
  isCotador?: boolean;
}

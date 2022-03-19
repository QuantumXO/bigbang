import { Networks } from "@constants/blockchain";

export enum BondType {
  StableAsset,
  LP,
}

export interface BondAddresses {
  reserveAddress: string;
  bondAddress: string;
}

export interface NetworkAddresses {
  [Networks.AVAX]: BondAddresses;
  [Networks.ETH]: BondAddresses;
  [Networks.MATIC]: BondAddresses;
  [Networks.BNB]: BondAddresses;
  [Networks.FTM]: BondAddresses;
}

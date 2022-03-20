import { IBlockchain } from "@models//blockchain";

export enum BondType {
  StableAsset,
  LP,
}

export interface BondAddresses {
  reserveAddress: string;
  bondAddress: string;
}

export interface NetworkAddresses {
  [IBlockchain.NetworksEnum.AVAX]: BondAddresses;
  [IBlockchain.NetworksEnum.ETH]: BondAddresses;
  [IBlockchain.NetworksEnum.MATIC]: BondAddresses;
  [IBlockchain.NetworksEnum.BNB]: BondAddresses;
  [IBlockchain.NetworksEnum.FTM]: BondAddresses;
}

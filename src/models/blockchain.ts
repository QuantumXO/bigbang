export namespace IBlockchain {
  export enum NetworksEnum {
    AVAX = 43114,
    ETH = 1, // Ethereum
    FTM = 250, // Fantom
    BNB = 56, // Binance
    MATIC = 137, // Matic Mainnet / Polygon
  }
  export interface INetwork {
    id: NetworkType;
    name: string;
    chainId: string;
    hexadecimalChainId: string;
    chainNetwork?: 'mainnet';
    blockExplorerUrls?: string[];
    chainName?: string;
    icon?: string;
    iconUrls?: string[];
    nativeCurrency?: {
      name: string;
      symbol: string;
      decimals: number;
    };
    rpcUrls?: string[];
  }
  export interface IAddEthereumChainParameter {
    chainId: string;
    chainNetwork?: 'mainnet';
    blockExplorerUrls?: string[];
    chainName?: string;
    iconUrls?: string[];
    nativeCurrency?: {
      name: string;
      symbol: string;
      decimals: number;
    };
    rpcUrls?: string[];
  }
  export type NetworkType = keyof typeof NetworksEnum;
  
  export interface IBondAddresses {
    reserveAddress: string;
    bondAddress: string;
  }
  export enum WTF_BondEnum {
    StableAsset,
    LP,
  }
  export interface IBondMainnetAddresses {
    MIM_ADDRESS: string;
    STAKING_ADDRESS: string;
    STAKING_HELPER_ADDRESS: string;
    TREASURY_ADDRESS: string;
    ///////////////////////////////
    DAO_ADDRESS: string,
    MEMO_ADDRESS: string,
    TIME_ADDRESS: string,
    TIME_BONDING_CALC_ADDRESS: string,
    ZAPIN_ADDRESS: string,
    WMEMO_ADDRESS: string
  }
  export interface INetworkAddresses {
    [IBlockchain.NetworksEnum.AVAX]: IBlockchain.IBondAddresses;
    [IBlockchain.NetworksEnum.ETH]: IBlockchain.IBondAddresses;
    [IBlockchain.NetworksEnum.MATIC]: IBlockchain.IBondAddresses;
    [IBlockchain.NetworksEnum.BNB]: IBlockchain.IBondAddresses;
    [IBlockchain.NetworksEnum.FTM]: IBlockchain.IBondAddresses;
  }
  export type TokenType = 'BIG' | 'BANG' | 'xTOK';
  export type TokenNameType = 'big' | 'bang' | 'xTOK';
  export interface IToken {
    id: TokenType;
    name: TokenNameType;
    decimals: number;
    symbol: string;
  }
}
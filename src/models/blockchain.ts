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
    icon?: string;
    chainName?: string;
    iconUrls?: string[];
    isDisabled?: boolean;
    chainNetwork?: 'mainnet';
    blockExplorerUrls?: string[];
    nativeCurrency?: {
      name: string;
      symbol: string;
      decimals: number;
    };
    rpcUrls?: string[];
    bondAddresses: IBondMainnetAddresses,
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
    BIG_ADDRESS: string;
    BANG_ADDRESS: string;
    DYEL_ADDRESS: string;
    STAKING_ADDRESS: string;
    STAKING_HELPER_ADDRESS: string;
    TREASURY_ADDRESS: string;
    BONDING_CALC_ADDRESS: string; // zero or custom
    DISTRIBUTOR_ADDRESS: string;
    STAKING_WARMUP_ADDRESS: string;
    ZAPIN_ADDRESS: string;
  }
  export interface IFTMMainnetBondAddresses extends IBondMainnetAddresses {
    FTM_ADDRESS: string;
    USDC_ADDRESS: string;
    SCREAM_FTM_ADDRESS: string;
    GEIST_FTM_ADDRESS: string;
    TSHARE_FTM_ADDRESS: string;
    MULTI_FTM_ADDRESS: string;
    BOO_FTM_ADDRESS: string;
    BIG_FTM_ADDRESS: string;
    YEL_dYEL_ADDRESS: string;
  }
  export interface INetworkAddresses {
    [IBlockchain.NetworksEnum.ETH]: IBlockchain.IBondAddresses;
    [IBlockchain.NetworksEnum.MATIC]: IBlockchain.IBondAddresses;
    [IBlockchain.NetworksEnum.BNB]: IBlockchain.IBondAddresses;
    [IBlockchain.NetworksEnum.FTM]: IBlockchain.IBondAddresses;
  }
  export type TokenType = 'BIG' | 'BANG' | 'dYEL';
  export type TokenNameType = 'big' | 'bang' | 'dYEL';
  export interface IToken {
    id: TokenType;
    name: TokenNameType;
    decimals: number;
    symbol: string;
  }
}
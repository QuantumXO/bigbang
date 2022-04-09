export namespace IBlockchain {
  export enum NetworksEnum {
    ETH = 1, // Ethereum
    FTM = 250, // Fantom
    BNB = 56, // Binance
    MATIC = 137, // Matic Mainnet / Polygon
    AVAX = 43114,
  }
  export type NetworkType = keyof typeof NetworksEnum;
  export interface INetwork {
    id: NetworkType;
    name: string;
    chainId: string;
    stableTokenType: StableTokenType;
    hexadecimalChainId: string;
    icon?: string;
    chainName?: string;
    iconUrls?: string[];
    isDisabled?: boolean;
    chainNetwork?: 'mainnet';
    blockExplorerUrls?: string[];
    nativeCurrency: INetworkToken;
    rpcUrls?: string[];
    bondAddresses: IBondMainnetAddresses,
    tokens: INetworkToken[];
  }
  export interface INetworkToken extends Pick<IToken, 'id' | 'address'> {
    id: WTF_TokenType;
    address: string;
  }
  export interface IAddEthereumChainParameter {
    chainId: string;
    chainNetwork?: 'mainnet';
    blockExplorerUrls?: string[];
    chainName?: string;
    iconUrls?: string[];
    nativeCurrency?: {
      id: string;
      name: string;
      decimals: number;
    };
    rpcUrls?: string[];
  }
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
    [NetworksEnum.FTM]?: IBondAddresses;
    [NetworksEnum.ETH]?: IBondAddresses;
    [NetworksEnum.MATIC]?: IBondAddresses;
    [NetworksEnum.BNB]?: IBondAddresses;
  }
  export type TokenType = 'BIG' | 'BANG' | 'dYEL';
  export type TokenNameType = 'big' | 'bang' | 'dYEL';
  export interface IToken {
    id: WTF_TokenType;
    address: string;
    decimals: number;
    name?: WTF_TokenNameType;
    icon?: string;
    isNativeCurrency?: boolean;
    isWrap?: boolean;
    isLP?: boolean;
    isStable?: boolean;
    isBigNativeCurrencyLP?: boolean;
    isCommonNativeCurrencyLP?: boolean;
  }
  export type StableCommonTokenType = 'USDC';
  export type StableWrapCommonTokenType = 'wUSDC';
  export type FTMNativeCurrencyType = 'FTM';
  export type StableFTMTokenType = StableCommonTokenType;
  export type FTMTokenType =
    | FTMNativeCurrencyType
    | StableFTMTokenType
    | 'wFTM'         // wrapped Coin
    | 'USDCwFTM'     // LP
    | 'SCREAM_wFTM'  // LP
    | 'GEIST_wFTM'   // LP
    | 'TSHARE_wFTM'  // LP
    | 'MULTI_wFTM'   // LP
    | 'BOO_wFTM'     // LP
    | 'BIG_wFTM'     // LP
    | 'YEL_dYEL';    // LP
  export type StableMATICTokenType = StableCommonTokenType;
  export type MATICTokenType =
    | StableMATICTokenType
    | 'wMATIC'         // wrapped Coin
    | 'QUICK_wMATIC'   // LP
    | 'CRV_WETH'       // LP
    | 'SAND_wMATIC'    // LP
    | 'MANA_wMATIC'    // LP
    | 'BIG_wMATIC'     // LP
    | 'YEL_dYEL'       // LP
    | 'ORBS_wMATIC';   // LP
  export type StableTokenType = StableFTMTokenType | StableMATICTokenType;
  export type WTF_TokenType = TokenType | FTMTokenType | MATICTokenType | StableWrapCommonTokenType;
  export type WTF_TokenNameType = | 'unknown' | WTF_TokenType;
}
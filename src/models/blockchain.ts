export namespace IBlockchain {
  export type NetworkType = 'ETH' | 'FTM' | 'BNB' | 'MATIC';
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
  export interface INetworkToken extends Pick<IToken, 'id' | 'address' | 'tokenNativeCurrencyLPAddress'> { }
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
  export type OurTokenType = 'BIG' | 'BANG' | 'dYEL';
  export type OurTokenNameType = 'big' | 'bang' | 'dYEL';
  export interface IToken {
    id: TokenType;
    address: string;
    decimals: number;
    name?: TokenNameType;
    icon?: string;
    isNativeCurrency?: boolean;
    isWrap?: boolean;
    isLP?: boolean;
    isStable?: boolean;
    isBigNativeCurrencyLP?: boolean;
    isUSDCNativeCurrencyLP?: boolean;
    tokenNativeCurrencyLPAddress?: string;
  }
  export type StableCommonTokenType = 'USDC';
  export type StableWrapCommonTokenType = 'wUSDC';
  export type FTMNativeCurrencyType = 'wFTM';
  export type StableFTMTokenType = StableCommonTokenType;
  export type FTMTokenType =
    | FTMNativeCurrencyType
    | StableFTMTokenType
    | 'SCREAM'
    | 'GEIST'
    | 'TSHARE'
    | 'MULTI'
    | 'BOO'
    | 'BIGwFTM'
    // | 'YEL_dYEL'
    | 'USDCwFTM';
  export type StableMATICTokenType = StableCommonTokenType;
  export type MATICNativeCurrencyType = 'wMATIC';
  export type MATICTokenType =
    | StableMATICTokenType
    | MATICNativeCurrencyType
    | 'QUICK'
    | 'CRV'
    | 'SAND'
    | 'MANA'
    | 'WETH'
    | 'BIGwMATIC'
    | 'USDCwMATIC';
  export type StableTokenType = StableFTMTokenType | StableMATICTokenType;
  export type TokenType = OurTokenType | FTMTokenType | MATICTokenType | StableWrapCommonTokenType;
  export type TokenNameType = TokenType;
}
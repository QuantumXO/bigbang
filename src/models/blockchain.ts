export namespace IBlockchain {
  export type NetworkType = 'ETH' | 'FTM' | 'MATIC' | 'BSC';
  export interface INativeCurrency {
    id: TokenType;
    symbol: string;
    decimals: number;
    address: string;
  }
  export interface INetwork {
    id: NetworkType;
    name: string;
    chainId: string;
    hexadecimalChainId: string;
    icon?: string;
    chainName?: 'Polygon' | 'Fantom' | 'Ethereum' | 'Avalanche' | 'Binance Smart Chain';
    iconUrls?: string[];
    isDisabled?: boolean;
    blockExplorerUrls?: string[];
    nativeCurrency: INativeCurrency;
    rpcUrls?: string[];
    bondAddresses: IBondMainnetAddresses,
    tokens: INetworkToken[];
  }
  export interface INetworkToken extends Pick<IToken, 'id' | 'address' | 'tokenNativeCurrencyLPAddress'> { }
  export interface IAddEthereumChainParameter {
    chainId: string; // hex
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
  export type OurTokenType = 'BIG' | 'BANG' | 'dYel';
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
    networkType?: string;
    isBigNativeCurrencyLP?: boolean;
    isUSDCNativeCurrencyLP?: boolean;
    tokenNativeCurrencyLPAddress?: string;
  }
  export interface ITokenAsset extends Pick<
    IToken,
    'id' | 'icon' | 'decimals' | 'name' | 'isWrap' | 'isLP' | 'isStable' | 'isBigNativeCurrencyLP'
    | 'isUSDCNativeCurrencyLP'
  > {
    id: IBlockchain.TokenType;
    decimals: number;
    name: IBlockchain.TokenNameType;
    isWrap?: boolean;
    isLP?: boolean;
    isStable?: boolean;
  }
  export type StableCommonTokenType = 'USDC';
  export type StableWrapCommonTokenType = 'wUSDC';
  export type FTMNativeCurrencyType = 'wFTM';
  export type StableFTMTokenType = 'USDCInFTM';
  export type FTMTokenType =
    | FTMNativeCurrencyType
    | StableFTMTokenType
    | 'SCREAM'
    | 'GEIST'
    | 'TSHARE'
    | 'MULTI'
    | 'BOO'
    | 'BIGwFTM'
    | 'YEL'
    | 'BEETS'
    | 'LINK'
    | 'SPIRIT'
    | 'YFI'
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
    | 'ORBS'
    | 'QI'
    | 'BIGwMATIC'
  export type BSCNativeCurrencyType = 'wBNB';
  export type BSCTokenType =
    | StableMATICTokenType
    | BSCNativeCurrencyType
    | 'CAKE'
    | 'BIFI'
    | 'UNI'
    | 'MBOX'
    | 'ALPACA'
    | 'STG'
    | 'YEL'
    | 'BIGwBNB'
  export type ETHNativeCurrencyType = 'wETH';
  export type ETHTokenType =
    | StableMATICTokenType
    | ETHNativeCurrencyType
    | 'SUSHI'
    | 'CVX'
    | 'YFI'
    | 'ALCX'
    | 'AAVE'
    | 'UNI'
    | 'MKR'
    | 'COMP'
    | 'SPELL'
    | 'YEL'
    | 'CRV'
    | 'FARM'
    | 'BAL'
    | 'BIGwETH'
  export type AVALANCHENativeCurrencyType = 'wAVAX';
  export type AVALANCHETokenType =
    | StableMATICTokenType
    | AVALANCHENativeCurrencyType
    | 'AVAX'
    | 'JOE'
    | 'LINK.e'
    | 'PTP'
    | 'SPELL'
    | 'AAVE'
    | 'wMEMO'
    | 'YEL'
    | 'BIGwAVAX'
  export type TokenType =
    | StableWrapCommonTokenType
    | OurTokenType
    | FTMTokenType
    | MATICTokenType
    | BSCTokenType
    | ETHTokenType
    | AVALANCHETokenType;
  export type TokenNameType = TokenType;
}
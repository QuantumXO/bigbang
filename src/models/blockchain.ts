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
}
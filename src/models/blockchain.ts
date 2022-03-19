export declare namespace IBlockchain {
  export enum NetworksEnum {
    AVAX = 43114,
    ETH = 1, // Ethereum
    FTM = 250, // Fantom
    BNB = 56, // Binance
    MATIC = 137, // Matic Mainnet / Polygon
  }
  export type NetworkType = keyof typeof NetworksEnum;
}
import { IBlockchain } from '@models/blockchain';

// import ethNetworkIcon from '@assets/images/common/networks/eth_mainnet.svg';
// import binanceNetworkIcon from '@assets/images/common/networks/binance.svg';
import fantomNetworkIcon from '@assets/images/common/networks/fantom.svg';
// import maticNetworkIcon from '@assets/images/common/networks/polygon_MATIC.svg';

export const FTM_NETWORK: IBlockchain.INetwork = {
  id: 'FTM',
  chainId: '250',
  chainName: 'FTM',
  name: 'Fantom',
  stableTokenType: 'USDC',
  icon: fantomNetworkIcon,
  chainNetwork: 'mainnet',
  hexadecimalChainId: '0xFA',
  nativeCurrency: {
    id: 'FTM',
    address: '',
  },
  tokens: [
    { id: 'wFTM', address: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83' },
    { id: 'USDC', address: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75' },
    { id: 'USDCwFTM', address: '0x2b4C76d0dc16BE1C31D4C1DC53bF9B45987Fc75c' },
    { id: 'BIG_wFTM', address: '0x659BB25B9308bfA16F5ea8d452b9a2BbaE84F60F' },
  ],
  rpcUrls: ['https://rpc.ftm.tools/'],
  blockExplorerUrls: ['https://ftmscan.com'],
  bondAddresses: {
    BIG_ADDRESS: '0xc3eE9aB0441923811c6432fae32d4310FBe01DE0',
    BANG_ADDRESS: '0xf87648c318A7F1a1Ae8Efc7aC524674A68f9a3ac',
    DYEL_ADDRESS: '0xA4f474c92621705dE140694D3761F3686E1D775E',
    STAKING_ADDRESS: '0xc42dcf2FD841C81363c7Bd3B49ac28B08e19599E',
    STAKING_HELPER_ADDRESS: '0x2C61bFCd16c5122be5881F76d358273cb39E1570',
    STAKING_WARMUP_ADDRESS: '0x64569c623E507Bd8B0779dA6B3d713c949d18783',
    TREASURY_ADDRESS: '0xaa4F0516e0899B6F8a97ee237cAbb3ec5aba0E95',
    DISTRIBUTOR_ADDRESS: '0xc021EaB1Cb5a0B4119C75fF4254e7802fA332C74',
    /////
    ZAPIN_ADDRESS: '0x0000000000000000000000000000000000000000',
    BONDING_CALC_ADDRESS: '0x0000000000000000000000000000000000000000',
    /////
  },
};
/* export const ETH_NETWORK: IBlockchain.INetwork = {
  id: 'ETH',
  chainId: '1',
  name: 'Ethereum',
  isDisabled: true,
  stableTokenType: 'USDC',
  icon: ethNetworkIcon,
  hexadecimalChainId: '0x1',
  chainName: 'ETH Mainnet',
  blockExplorerUrls: ['https://etherscan.io'],
  bondAddresses: {
    BIG_ADDRESS: '0x0df1c7aF7079B8f80c1C4C0Fd8ece3d1D6b12DDA',
    BANG_ADDRESS: '0x43aBdF495a8979b7Ea347A5eDfFD97Bc06250d46',
    DYEL_ADDRESS: '0xc70c3Eb58D4619b2683a3f16d9aE0ad474b139cd',
    STAKING_ADDRESS: '0xdF8D9bC8088f03ADF14529A1b7d91FD66093d46d',
    STAKING_HELPER_ADDRESS: '0xD19CBe29aD8A0aDab95A465D7B70c4Fd10C153bc',
    STAKING_WARMUP_ADDRESS: '0xfbfACf5D7727b7f476322995F1AeD53113B4118d',
    TREASURY_ADDRESS: '0xF411118dbD6338aB40Fa8e3bF514596DbF1a7528',
    DISTRIBUTOR_ADDRESS: '0x627aC1904251F1e2Df5aCaefCE4547C66Ef64382',
    BONDING_CALC_ADDRESS: '0x0000000000000000000000000000000000000000',
    ZAPIN_ADDRESS: '0x0000000000000000000000000000000000000000',
  },
};
// Polygon (MATIC)
export const MATIC_NETWORK: IBlockchain.INetwork = {
  id: 'MATIC',
  chainId: '137',
  name: 'Polygon',
  isDisabled: true,
  chainName: 'Matic',
  stableTokenType: 'USDC',
  icon: maticNetworkIcon,
  chainNetwork: 'mainnet',
  hexadecimalChainId: '0x89',
  rpcUrls: ['https://rpc-mainnet.matic.network'],
  blockExplorerUrls: ['https://polygonscan.com/'],
  bondAddresses: {
    BIG_ADDRESS: '0x0df1c7aF7079B8f80c1C4C0Fd8ece3d1D6b12DDA',
    BANG_ADDRESS: '0x43aBdF495a8979b7Ea347A5eDfFD97Bc06250d46',
    DYEL_ADDRESS: '0xc70c3Eb58D4619b2683a3f16d9aE0ad474b139cd',
    STAKING_ADDRESS: '0xdF8D9bC8088f03ADF14529A1b7d91FD66093d46d',
    STAKING_HELPER_ADDRESS: '0xD19CBe29aD8A0aDab95A465D7B70c4Fd10C153bc',
    STAKING_WARMUP_ADDRESS: '0xfbfACf5D7727b7f476322995F1AeD53113B4118d',
    TREASURY_ADDRESS: '0xF411118dbD6338aB40Fa8e3bF514596DbF1a7528',
    DISTRIBUTOR_ADDRESS: '0x627aC1904251F1e2Df5aCaefCE4547C66Ef64382',
    BONDING_CALC_ADDRESS: '0x0000000000000000000000000000000000000000',
    ZAPIN_ADDRESS: '0x0000000000000000000000000000000000000000',
  },
};
export const BNB_NETWORK: IBlockchain.INetwork = {
  id: 'BNB',
  chainId: '56',
  name: 'Binance',
  chainName: 'BSC',
  isDisabled: true,
  stableTokenType: 'USDC',
  icon: binanceNetworkIcon,
  hexadecimalChainId: '0x38',
  chainNetwork: 'mainnet',
  rpcUrls: ['https://bsc-dataseed1.binance.org'],
  bondAddresses: {
    BIG_ADDRESS: '0x0df1c7aF7079B8f80c1C4C0Fd8ece3d1D6b12DDA',
    BANG_ADDRESS: '0x43aBdF495a8979b7Ea347A5eDfFD97Bc06250d46',
    DYEL_ADDRESS: '0xc70c3Eb58D4619b2683a3f16d9aE0ad474b139cd',
    STAKING_ADDRESS: '0xdF8D9bC8088f03ADF14529A1b7d91FD66093d46d',
    STAKING_HELPER_ADDRESS: '0xD19CBe29aD8A0aDab95A465D7B70c4Fd10C153bc',
    STAKING_WARMUP_ADDRESS: '0xfbfACf5D7727b7f476322995F1AeD53113B4118d',
    TREASURY_ADDRESS: '0xF411118dbD6338aB40Fa8e3bF514596DbF1a7528',
    DISTRIBUTOR_ADDRESS: '0x627aC1904251F1e2Df5aCaefCE4547C66Ef64382',
    BONDING_CALC_ADDRESS: '0x0000000000000000000000000000000000000000',
    ZAPIN_ADDRESS: '0x0000000000000000000000000000000000000000',
  },
}; */
/* export const AVAX_NETWORK: IBlockchain.INetwork = {
  id: 'AVAX',
  chainId: '43114',
  name: 'AVAX',
  isDisabled: true,
  stableTokenType: 'USDC',
  hexadecimalChainId: '0xa86a',
  chainName: 'Avalanche Mainnet',
  rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
  blockExplorerUrls: ['https://cchain.explorer.avax.network/'],
  nativeCurrency: {
    name: 'AVAX',
    symbol: 'AVAX',
    decimals: 18
  },
  bondAddresses: {
    BIG_ADDRESS: '0x0df1c7aF7079B8f80c1C4C0Fd8ece3d1D6b12DDA',
    BANG_ADDRESS: '0x43aBdF495a8979b7Ea347A5eDfFD97Bc06250d46',
    DYEL_ADDRESS: '0xc70c3Eb58D4619b2683a3f16d9aE0ad474b139cd',
    STAKING_ADDRESS: '0xdF8D9bC8088f03ADF14529A1b7d91FD66093d46d',
    STAKING_HELPER_ADDRESS: '0xD19CBe29aD8A0aDab95A465D7B70c4Fd10C153bc',
    STAKING_WARMUP_ADDRESS: '0xfbfACf5D7727b7f476322995F1AeD53113B4118d',
    TREASURY_ADDRESS: '0xF411118dbD6338aB40Fa8e3bF514596DbF1a7528',
    DISTRIBUTOR_ADDRESS: '0x627aC1904251F1e2Df5aCaefCE4547C66Ef64382',
    BONDING_CALC_ADDRESS: '0x0000000000000000000000000000000000000000',
    ZAPIN_ADDRESS: '0x0000000000000000000000000000000000000000',
  },
}; */

export const TOKEN_DECIMALS: number = 9;
export const DEFAULT_NETWORK = FTM_NETWORK;
export const NETWORKS: IBlockchain.INetwork[] = [FTM_NETWORK];
export const ACTIVE_NETWORKS: IBlockchain.INetwork[] = NETWORKS
  .filter(({ isDisabled }: IBlockchain.INetwork) => !isDisabled);
export const SUPPORTED_NETWORKS_CHAIN_IDS: string[] = ACTIVE_NETWORKS.map(({ chainId }:IBlockchain.INetwork) => chainId);

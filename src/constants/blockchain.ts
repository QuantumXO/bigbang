import { IBlockchain } from '@models/blockchain';

import ethNetworkIcon from '@assets/images/common/networks/eth_mainnet.svg';
import binanceNetworkIcon from '@assets/images/common/networks/binance.svg';
import fantomNetworkIcon from '@assets/images/common/networks/fantom.svg';
import maticNetworkIcon from '@assets/images/common/networks/polygon_MATIC.svg';

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
  ],
  rpcUrls: ['https://rpc.ftm.tools/'],
  blockExplorerUrls: ['https://ftmscan.com'],
  bondAddresses: {
    BIG_ADDRESS: '0xEcfC59531135d5e13cf68CfC4605e4988f71aD14',
    BANG_ADDRESS: '0x43aBdF495a8979b7Ea347A5eDfFD97Bc06250d46',
    DYEL_ADDRESS: '0xc70c3Eb58D4619b2683a3f16d9aE0ad474b139cd',
    STAKING_ADDRESS: '0xdF8D9bC8088f03ADF14529A1b7d91FD66093d46d',
    STAKING_HELPER_ADDRESS: '0xD19CBe29aD8A0aDab95A465D7B70c4Fd10C153bc',
    STAKING_WARMUP_ADDRESS: '0xfbfACf5D7727b7f476322995F1AeD53113B4118d',
    TREASURY_ADDRESS: '0xF411118dbD6338aB40Fa8e3bF514596DbF1a7528',
    DISTRIBUTOR_ADDRESS: '0x627aC1904251F1e2Df5aCaefCE4547C66Ef64382',
    USDC_ADDRESS: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
    ZAPIN_ADDRESS: '0x0000000000000000000000000000000000000000',
    /////
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

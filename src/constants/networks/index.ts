import { IBlockchain } from '@models/blockchain';
import FTM_NETWORK from '@constants/networks/ftm';
import MATIC_NETWORK from '@constants/networks/polygon';

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

export const DEFAULT_NETWORK = FTM_NETWORK;
export const Index: IBlockchain.INetwork[] = [FTM_NETWORK, MATIC_NETWORK];
export const ACTIVE_NETWORKS: IBlockchain.INetwork[] = Index
  .filter(({ isDisabled }: IBlockchain.INetwork) => !isDisabled);
export const SUPPORTED_NETWORKS_CHAIN_IDS: string[] = ACTIVE_NETWORKS.map(({ chainId }:IBlockchain.INetwork) => chainId);
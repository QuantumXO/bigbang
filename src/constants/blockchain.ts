import { IBlockchain } from '@models/blockchain';

import ethNetworkIcon from '@assets/images/common/networks/eth_mainnet.svg';
import binanceNetworkIcon from '@assets/images/common/networks/binance.svg';
import fantomNetworkIcon from '@assets/images/common/networks/fantom.svg';
import maticNetworkIcon from '@assets/images/common/networks/polygon_MATIC.svg';

export const ETH_NETWORK: IBlockchain.INetwork = {
  id: 'ETH',
  chainId: '1',
  name: 'Ethereum',
  icon: ethNetworkIcon,
  hexadecimalChainId: '0x1',
  chainName: 'ETH Mainnet',
  blockExplorerUrls: ['https://etherscan.io'],
};
// Polygon (MATIC)
export const MATIC_NETWORK: IBlockchain.INetwork = {
  id: 'MATIC',
  chainId: '137',
  name: 'Polygon',
  chainName: 'Matic',
  icon: maticNetworkIcon,
  chainNetwork: 'mainnet',
  hexadecimalChainId: '0x89',
  rpcUrls: ['https://rpc-mainnet.matic.network'],
  blockExplorerUrls: ['https://polygonscan.com/'],
};
export const BNB_NETWORK: IBlockchain.INetwork = {
  id: 'BNB',
  chainId: '56',
  name: 'Binance',
  chainName: 'BSC',
  icon: binanceNetworkIcon,
  hexadecimalChainId: '0x38',
  chainNetwork: 'mainnet',
  rpcUrls: ['https://bsc-dataseed1.binance.org'],
};
export const FTM_NETWORK: IBlockchain.INetwork = {
  id: 'FTM',
  chainId: '250',
  chainName: 'FTM',
  name: 'Fantom',
  icon: fantomNetworkIcon,
  chainNetwork: 'mainnet',
  hexadecimalChainId: '0xFA',
  rpcUrls: ['https://rpcapi.fantom.network'],
  blockExplorerUrls: ['https://ftmscan.com'],
};
export const AVAX_NETWORK: IBlockchain.INetwork = {
  id: 'AVAX',
  chainId: '43114',
  name: 'AVAX',
  hexadecimalChainId: '0xa86a',
  chainName: 'Avalanche Mainnet',
  rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
  blockExplorerUrls: ['https://cchain.explorer.avax.network/'],
  nativeCurrency: {
    name: 'AVAX',
    symbol: 'AVAX',
    decimals: 18
  }
};
export const TOKEN_DECIMALS: number = 9;
export const DEFAULT_NETWORK = ETH_NETWORK;
export const NETWORKS:IBlockchain.INetwork[] = [ETH_NETWORK, FTM_NETWORK, BNB_NETWORK, MATIC_NETWORK];
export const SUPPORTED_NETWORKS_CHAIN_IDS: string[] = NETWORKS.map(({ chainId }:IBlockchain.INetwork) => chainId);

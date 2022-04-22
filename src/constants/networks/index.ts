import { IBlockchain } from '@models/blockchain';
import FTM_NETWORK from '@constants/networks/ftm';
import MATIC_NETWORK from '@constants/networks/polygon';
import BSC_NETWORK from '@constants/networks/bsc';
import AVAX_NETWORK from '@constants/networks/avax';

export const DEFAULT_NETWORK = FTM_NETWORK;
export const NETWORKS: IBlockchain.INetwork[] = [FTM_NETWORK, MATIC_NETWORK, BSC_NETWORK, AVAX_NETWORK];
export const ACTIVE_NETWORKS: IBlockchain.INetwork[] = NETWORKS
  .filter(({ isDisabled }: IBlockchain.INetwork) => !isDisabled);
export const SUPPORTED_NETWORKS_CHAIN_IDS: string[] = ACTIVE_NETWORKS.map(({ chainId }:IBlockchain.INetwork) => chainId);

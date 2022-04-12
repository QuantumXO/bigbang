import { IBlockchain } from '@models/blockchain';
import { ACTIVE_NETWORKS } from '@constants/networks';

export const getBondAddresses = (networkID: number): IBlockchain.IBondMainnetAddresses => {
  const currentNetwork: IBlockchain.INetwork | undefined = ACTIVE_NETWORKS
    .find(({ chainId }: IBlockchain.INetwork) => +chainId === networkID);
  
  if (currentNetwork) {
    return currentNetwork.bondAddresses;
  }
  
  throw Error("Network don't support");
};

import { IBlockchain } from '@models/blockchain';
import { ACTIVE_NETWORKS } from '@constants/networks';

export const getBondAddresses = (networkID: number): IBlockchain.IBondMainnetAddresses | Record<string, never> => {
  const currentNetwork: IBlockchain.INetwork | undefined = ACTIVE_NETWORKS
    .find(({ chainId }: IBlockchain.INetwork) => +chainId === networkID);
  let result: IBlockchain.IBondMainnetAddresses | Record<string, never> = {};
  
  if (currentNetwork) {
    result = currentNetwork.bondAddresses;
  }
  
  return result;
  
  // throw Error("Network don't support");
};

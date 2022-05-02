import { Contract } from 'ethers';
import { ReverseBondingContract } from '@services/abi';
import { JsonRpcProvider } from '@ethersproject/providers';
import { IBlockchain } from '@models/blockchain';
import { getCurrentNetwork } from '@services/common/network';

export default async (networkId: number, provider: JsonRpcProvider): Promise<number> => {
  const {
    id: currentNetworkId,
    bondAddresses
  }: IBlockchain.INetwork = getCurrentNetwork(String(networkId)) as IBlockchain.INetwork;
  const { REVERSE_BONDING_ADDRESS } = bondAddresses;
  const reverseBondingContract = new Contract(REVERSE_BONDING_ADDRESS, ReverseBondingContract, provider);
  const isBSCNetwork: boolean = currentNetworkId === 'BSC';
  const usdcDecimals: number = isBSCNetwork ? 18 : 6;
  
  const result = (await reverseBondingContract.currentPrice()) / Math.pow(10, usdcDecimals);
  return result;
};
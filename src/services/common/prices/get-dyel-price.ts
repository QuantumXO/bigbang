import { Contract } from 'ethers';
import { ReverseBondingContract } from '@services/abi';
import { getBondAddresses } from '@services/helpers';
import { JsonRpcProvider } from '@ethersproject/providers';

export default async (networkId: number, provider: JsonRpcProvider): Promise<number> => {
  const { REVERSE_BONDING_ADDRESS } = getBondAddresses(networkId);
  const reverseBondingContract = new Contract(REVERSE_BONDING_ADDRESS, ReverseBondingContract, provider);
  const result = (await reverseBondingContract.currentPrice()) / Math.pow(10, 6);
  return result;
};
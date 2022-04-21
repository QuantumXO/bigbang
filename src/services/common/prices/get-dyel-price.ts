import { Contract, ethers } from 'ethers';
import { BangTokenContract, BigTokenContract, dYelTokenContract } from '@services/abi';
import { getBondAddresses } from '@services/helpers';
import { JsonRpcProvider } from '@ethersproject/providers';

export default async (
  networkId: number, provider: JsonRpcProvider, treasuryBalance: number,
): Promise<number> => {
  const { DYEL_ADDRESS, BIG_ADDRESS, BANG_ADDRESS, STAKING_ADDRESS } = getBondAddresses(networkId);
  const dYelContract: Contract = new ethers.Contract(DYEL_ADDRESS, dYelTokenContract, provider);
  const dYelTotalSupply: number = await dYelContract.totalSupply() / Math.pow(10, 18);
  
  const bigContract: Contract = new ethers.Contract(BIG_ADDRESS, BigTokenContract, provider);
  const bigTotalSupply: number = await bigContract.totalSupply();
  const daoBalanceOf: number = await bigContract.balanceOf('0x5F8ec4d7ED8F9E3Fa4219796551271579F7e0029');
  const stakingBalanceOf: number = await bigContract.balanceOf(STAKING_ADDRESS);
  const bigToDyel: number = (bigTotalSupply / Math.pow(10, 9)) - (daoBalanceOf / Math.pow(10, 9)) - (stakingBalanceOf / Math.pow(10, 9));
  
  const bangContract: Contract = new ethers.Contract(BANG_ADDRESS, BangTokenContract, provider);
  const bangTotalSupply: number = await bangContract.totalSupply();
  const bangIndex: number = await bangContract.index();
  const bangToDyel: number = bangTotalSupply / Math.pow(10, 9);
  
  const possibleDyel: number = (bigToDyel + bangToDyel) / (bangIndex / Math.pow(10, 9));
  const totalDyel: number = possibleDyel + dYelTotalSupply;
  
  const result: number = treasuryBalance / totalDyel;
  
  return result;
};
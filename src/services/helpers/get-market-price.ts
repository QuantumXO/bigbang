import { Contract, ethers } from 'ethers';
import { LpReserveContract } from '../abi';
import { ftm } from './bond';
import { getBondAddresses } from '@services/helpers/get-bond-addresses';
import { IBlockchain } from '@models/blockchain';
import { getToken } from '@services/helpers/get-token';

// #TODO check method
export const getMarketPrice = async (
  networkID: number,
  provider: ethers.Signer | ethers.providers.Provider
): Promise<number> =>  {
  let result: number = 0
  try {
    // FTM Network
    const nativeCurrencyInUSDC: number = await getNativeCurrencyInUSDC(networkID, provider);
    const bigPriceInNativeCurrency: number = await getBigPriceInNativeCurrency(networkID, provider);
    // USDC per nativeCurrency
    result = nativeCurrencyInUSDC * bigPriceInNativeCurrency;
  } catch (e) {
    console.error(e);
  }
  return result;
}

export const getBigPriceInNativeCurrency = async (
  networkID: number,
  provider: ethers.Signer | ethers.providers.Provider
): Promise<number> => {
  const { BIG_ADDRESS }: IBlockchain.IBondMainnetAddresses = getBondAddresses(networkID);
  const bigFTMLPAddress: string = getToken('BIG_wFTM', 'address');
  const bigFTMLPContract: Contract = new Contract(bigFTMLPAddress, LpReserveContract, provider);
  const [reserve0, reserve1] = await bigFTMLPContract.getReserves();
  const token0Address: string = await bigFTMLPContract.token0();
  const token1Address: string = await bigFTMLPContract.token1();
  const isBigToken0: boolean = token0Address.toLowerCase() === BIG_ADDRESS.toLowerCase();
  const isBigToken1: boolean = token1Address.toLowerCase() === BIG_ADDRESS.toLowerCase();
  let bigPriceInNativeCurrency: number; // in FTM
  
  if (isBigToken1) {
    bigPriceInNativeCurrency = ((reserve0) / (reserve1 * Math.pow(10, 9)));
  } else if (isBigToken0) {
    bigPriceInNativeCurrency = ((reserve1) / (reserve0 * Math.pow(10, 9)));
  } else {
    throw new Error('No exist BIG address');
  }
  
  return bigPriceInNativeCurrency;
};

export const getNativeCurrencyInUSDC = async (
  networkID: number,
  provider: ethers.Signer | ethers.providers.Provider
): Promise<number> => {
  const uSDCAddress: string = getToken('USDC', 'address');
  // FROM https://ftmscan.com/address/0x2b4c76d0dc16be1c31d4c1dc53bf9b45987fc75c#readContract
  const uSDCFTMLPAddress: string = getToken('USDCwFTM', 'address');
  const uSDCFTMLPContract: Contract = new Contract(uSDCFTMLPAddress, LpReserveContract, provider);
  const [reserve0, reserve1] = await uSDCFTMLPContract.getReserves();
  const token0Address: string = await uSDCFTMLPContract.token0();
  const token1Address: string = await uSDCFTMLPContract.token1();
  const isUSDCToken0: boolean = token0Address.toLowerCase() === uSDCAddress.toLowerCase();
  const isUSDCToken1: boolean = token1Address.toLowerCase() === uSDCAddress.toLowerCase();
  let nativeCurrencyInUSDC: number; // in USDC
  
  if (isUSDCToken0) {
    nativeCurrencyInUSDC = ((reserve0 * Math.pow(10, 18)) / reserve1) / Math.pow(10, 6);
  } else if (isUSDCToken1) {
    nativeCurrencyInUSDC = ((reserve1 * Math.pow(10, 18)) / reserve0) / Math.pow(10, 6);
  } else {
    throw new Error('No exist USDC address');
  }
  
  return nativeCurrencyInUSDC;
};

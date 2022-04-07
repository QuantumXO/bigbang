import { ethers } from "ethers";
import { LpReserveContract } from "../abi";
import { ftm } from "./bond";
import { getBondAddresses } from '@services/helpers/get-bond-addresses';
import { IBlockchain } from '@models/blockchain';

// #TODO check method
export async function getMarketPrice(
  networkID: number,
  provider: ethers.Signer | ethers.providers.Provider
): Promise<number> {
  // FTM Network
  const { USDC_ADDRESS, BIG_ADDRESS }: IBlockchain.IBondMainnetAddresses = getBondAddresses(networkID);
  const bigFTMLPAddress: string = ftm.getReserveAddressForBond(networkID);
  const bigFTMLPContract = new ethers.Contract(bigFTMLPAddress, LpReserveContract, provider);
  const [reserve0, reserve1] = await bigFTMLPContract.getReserves();
  // const bigFTMLPContractToken0Address = await bigFTMLPContract.token0();
  const bigFTMLPContractToken1Address = await bigFTMLPContract.token1();
  const isBigLP: boolean = bigFTMLPContractToken1Address.toLowerCase() === BIG_ADDRESS.toLowerCase();
  let bigPriceInNativeCurrency: number; // in FTM
  
  if (isBigLP) {
    bigPriceInNativeCurrency = ((reserve0) / (reserve1 * Math.pow(10, 9)));
  } else {
    bigPriceInNativeCurrency = ((reserve1) / (reserve0 * Math.pow(10, 9)));
  }
  
  console.log('bigPriceInNativeCurrency: ', bigPriceInNativeCurrency);
  
  const result: number = (await getNativeCurrencyInUSDC(networkID, provider)) * bigPriceInNativeCurrency; // USDC per nativeCurrency
  
  console.log('result: ', result);
  
  return result;
}

export const getNativeCurrencyInUSDC = async (
  networkID: number,
  provider: ethers.Signer | ethers.providers.Provider
): Promise<number> => {
  const { USDC_ADDRESS }: IBlockchain.IBondMainnetAddresses = getBondAddresses(networkID);
  const uSDCFTMLPAddress: string = '0x2b4C76d0dc16BE1C31D4C1DC53bF9B45987Fc75c';
  const uSDCFTMLPContract = new ethers.Contract(uSDCFTMLPAddress, LpReserveContract, provider);
  const [reserve00, reserve11] = await uSDCFTMLPContract.getReserves();
  const token0Address = await uSDCFTMLPContract.token0();
  const token1Address = await uSDCFTMLPContract.token1();
  // check USDC existing
  const isUSDCLP: boolean = token0Address.toLowerCase() === USDC_ADDRESS.toLowerCase();
  
  let nativeCurrencyInUSDC: number; // in USDC
  
  if (isUSDCLP) {
    nativeCurrencyInUSDC = ((reserve00 * Math.pow(10, 18)) / reserve11) / Math.pow(10, 6);
  } else {
    nativeCurrencyInUSDC = ((reserve11 * Math.pow(10, 18)) / reserve00) / Math.pow(10, 6);
  }
  
  return nativeCurrencyInUSDC;
};

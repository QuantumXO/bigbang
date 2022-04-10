import { Contract, ethers } from 'ethers';
import { LpReserveContract } from '../abi';
import { getBondAddresses } from '@services/helpers/get-bond-addresses';
import { IBlockchain } from '@models/blockchain';
import { getToken } from '@services/helpers/get-token';
import network from '@services/common/network';
import { Bond } from '@services/helpers/bond/bond';

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
  const commonBigLPToken: IBlockchain.IToken | undefined = network().getCurrentNetworkCommonBIGLPToken;
  let bigPriceInNativeCurrency: number; // in FTM
  
  if (commonBigLPToken) {
    const commonBigLPTokenAddress: string = getToken(commonBigLPToken.id, 'address');
    const commonBigLPContract: Contract = new Contract(commonBigLPTokenAddress, LpReserveContract, provider);
    const [reserve0, reserve1] = await commonBigLPContract.getReserves();
    const token0Address: string = await commonBigLPContract.token0();
    const token1Address: string = await commonBigLPContract.token1();
    const isBigToken0: boolean = token0Address.toLowerCase() === BIG_ADDRESS.toLowerCase();
    const isBigToken1: boolean = token1Address.toLowerCase() === BIG_ADDRESS.toLowerCase();
  
    if (isBigToken1) {
      bigPriceInNativeCurrency = ((reserve0) / (reserve1 * Math.pow(10, 9)));
    } else if (isBigToken0) {
      bigPriceInNativeCurrency = ((reserve1) / (reserve0 * Math.pow(10, 9)));
    } else {
      throw new Error('No exist BIG address');
    }
  } else {
    throw new Error('getBigPriceInNativeCurrency error');
  }
  
  return bigPriceInNativeCurrency;
};

export const getNativeCurrencyInUSDC = async (
  networkID: number,
  provider: ethers.Signer | ethers.providers.Provider
): Promise<number> => {
  const commonNativeCurrencyLPToken: IBlockchain.IToken | undefined = network()
    .getCurrentNetworkCommonNativeCurrencyLPToken;
  
  if (commonNativeCurrencyLPToken) {
    const uSDCAddress: string = getToken('USDC', 'address');
    const uSDCNativeCurrencyLPAddress: string = getToken(commonNativeCurrencyLPToken.id, 'address');
    const uSDCNativeCurrencyLPContract: Contract = new Contract(uSDCNativeCurrencyLPAddress, LpReserveContract, provider);
    const [reserve0, reserve1] = await uSDCNativeCurrencyLPContract.getReserves();
    const token0Address: string = await uSDCNativeCurrencyLPContract.token0();
    const token1Address: string = await uSDCNativeCurrencyLPContract.token1();
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
  } else {
    throw new Error('getNativeCurrencyInUSDC error');
  }
};

export const getTokenInNativeCurrency = async (
  bondId: IBlockchain.WTF_TokenType,
  networkID: number,
  provider: ethers.Signer | ethers.providers.Provider
): Promise<number> => {
  const currentNetwork: IBlockchain.INetwork | undefined = network().getCurrentNetwork;
  
  if (currentNetwork) {
    const WTF_LPAddress: string = getToken(bondId, 'WTF_LPAddress');
    const nativeCurrencyTokenId: IBlockchain.WTF_TokenType = currentNetwork.nativeCurrency.id;
    const nativeCurrencyTokenAddress: string = getToken(nativeCurrencyTokenId, 'address');
    const contract: Contract = new Contract(WTF_LPAddress, LpReserveContract, provider);
    const [reserve0, reserve1] = await contract.getReserves();
    const token0Address: string = (await contract.token0()).toLowerCase();
    const token1Address: string = (await contract.token1()).toLowerCase();
    let result: number;
    
    if (token0Address === nativeCurrencyTokenAddress) {
      //
    } else if (token1Address === nativeCurrencyTokenAddress) {
      //
    } else {
      //
    }
    
    // eslint-disable-next-line prefer-const
    result = reserve0 / reserve1;
  
    return result;
  } else {
    throw new Error('getTokenInNativeCurrency Error');
  }
};

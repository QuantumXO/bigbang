import { Contract, ethers, Signer } from 'ethers';
import { LpReserveContract } from '../abi';
import { getBondAddresses } from '@services/helpers/bond/get-bond-addresses';
import { IBlockchain } from '@models/blockchain';
import { getToken } from '@services/helpers/get-token';
import network from '@services/common/network';
import { IBond } from '@models/bond';
import { getReserves } from '@services/helpers/get-reserves';
import { StaticJsonRpcProvider } from '@ethersproject/providers';

// #TODO check method
export const getMarketPrice = async (
  networkID: number,
  provider: StaticJsonRpcProvider | Signer
): Promise<number> =>  {
  let result: number = 0
  try {
    // FTM Network
    const nativeCurrencyInUSDC: number = await getNativeCurrencyInUSDC(networkID, provider);
    const bigPriceInNativeCurrency: number = await getBigPriceInNativeCurrency(networkID, provider);
    // USDC per nativeCurrency
    result = nativeCurrencyInUSDC * bigPriceInNativeCurrency;
  } catch (e) {
    console.error('getMarketPrice(): ', e);
  }
  return result;
}

export const getBigPriceInNativeCurrency = async (
  networkID: number,
  provider: StaticJsonRpcProvider | Signer
): Promise<number> => {
  const { BIG_ADDRESS }: IBlockchain.IBondMainnetAddresses = getBondAddresses(networkID);
  const bigNativeCurrencyLPToken: IBlockchain.IToken | undefined = network().getNetworkBigNativeCurrencyLPToken;
  let bigPriceInNativeCurrency: number;
  
  if (bigNativeCurrencyLPToken) {
    const { reserves: [reserve0, reserve1], comparedAddressInReserve } = await getReserves({
      contractAddress: bigNativeCurrencyLPToken.address,
      contractABI: LpReserveContract,
      provider,
      comparedAddress: BIG_ADDRESS,
    });
  
    if (comparedAddressInReserve === 1) {
      bigPriceInNativeCurrency = ((reserve0) / (reserve1 * Math.pow(10, 9)));
    } else if (comparedAddressInReserve === 0) {
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
  provider: StaticJsonRpcProvider | Signer,
): Promise<number> => {
  const uSDCNativeCurrencyLPToken: IBlockchain.IToken | undefined = network()
    .getNetworkUSDCNativeCurrencyLPToken;
  
  if (uSDCNativeCurrencyLPToken) {
    const uSDCAddress: string = getToken('USDC', 'address');
    let nativeCurrencyInUSDC: number; // in USDC
  
    const { reserves: [reserve0, reserve1], comparedAddressInReserve } = await getReserves({
      contractAddress: uSDCNativeCurrencyLPToken.address,
      contractABI: LpReserveContract,
      provider,
      comparedAddress: uSDCAddress,
    });
  
    if (comparedAddressInReserve === 0) {
      nativeCurrencyInUSDC = ((reserve0 * Math.pow(10, 18)) / reserve1) / Math.pow(10, 6);
    } else if (comparedAddressInReserve === 1) {
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
  bondId: IBond.IBondType,
  networkID: number,
  provider: StaticJsonRpcProvider | Signer,
): Promise<number> => {
  const currentNetwork: IBlockchain.INetwork | undefined = network().getCurrentNetwork;
  if (currentNetwork) {
    const tokenNativeCurrencyLPAddress: string = getToken(bondId, 'tokenNativeCurrencyLPAddress');
    const nativeCurrencyTokenId: IBlockchain.TokenType = currentNetwork.nativeCurrency.id;
    const nativeCurrencyTokenAddress: string = getToken(nativeCurrencyTokenId, 'address');
    let result: number;
  
    const { reserves: [reserve0, reserve1], comparedAddressInReserve } = await getReserves({
      contractAddress: tokenNativeCurrencyLPAddress,
      contractABI: LpReserveContract,
      provider,
      comparedAddress: nativeCurrencyTokenAddress,
    });
    
    if (comparedAddressInReserve === 0) {
      //
    } else if (comparedAddressInReserve === 1) {
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

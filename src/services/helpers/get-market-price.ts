import { Contract, Signer } from 'ethers';
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
    console.error('getMarketPrice() error: ', e);
  }
  return result;
}

export const getBigPriceInNativeCurrency = async (
  networkID: number,
  provider: StaticJsonRpcProvider | Signer
): Promise<number> => {
  const { BIG_ADDRESS }: IBlockchain.IBondMainnetAddresses = getBondAddresses(networkID);
  const bigNativeCurrencyLPToken: IBlockchain.IToken | undefined = network().getNetworkBigNativeCurrencyLPToken;
  let bigPriceInNativeCurrency: number = 0;

  if (bigNativeCurrencyLPToken) {
    try {
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
    } catch (e) {
      console.error('getBigPriceInNativeCurrency() error: ', e);
    }
  } else {
    throw new Error('bigNativeCurrencyLPToken error');
  }
  
  return bigPriceInNativeCurrency;
};

export const getNativeCurrencyInUSDC = async (
  networkID: number,
  provider: StaticJsonRpcProvider | Signer,
): Promise<number> => {
  const uSDCNativeCurrencyLPToken: IBlockchain.IToken | undefined = network()
    .getNetworkUSDCNativeCurrencyLPToken;
  let nativeCurrencyInUSDC: number = 0; // in USDC
  
  try {
    if (uSDCNativeCurrencyLPToken) {
      const uSDCAddress: string = getToken('USDC', 'address');
    
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
    } else {
      throw new Error('uSDCNativeCurrencyLPToken error');
    }
  } catch (e) {
    console.error('getNativeCurrencyInUSDC() error: ', e);
  }
  
  return nativeCurrencyInUSDC;
};

export const getTokenInNativeCurrency = async (
  bondId: IBond.IBondType,
  networkID: number,
  provider: StaticJsonRpcProvider | Signer,
): Promise<number> => {
  const currentNetwork: IBlockchain.INetwork | undefined = network().getCurrentNetwork;
  let result: number = 0;
  
  try {
    if (currentNetwork) {
      const tokenNativeCurrencyLPAddress: string = getToken(bondId, 'tokenNativeCurrencyLPAddress');
      const nativeCurrencyTokenId: IBlockchain.TokenType = currentNetwork.nativeCurrency.id;
      const nativeCurrencyTokenAddress: string = getToken(nativeCurrencyTokenId, 'address');
    
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
    } else {
      throw new Error('currentNetwork Error');
    }
  } catch (e) {
    console.log('getTokenInNativeCurrency() error: ', e)
  }
  
  return result;
};

export const getLPInNativeCurrency = async (
  bondId: IBond.IBondType,
  networkID: number,
  provider: StaticJsonRpcProvider | Signer,
): Promise<number> => {
  const currentNetwork: IBlockchain.INetwork | undefined = network().getCurrentNetwork;
  let result: number = 0;
  
  if (currentNetwork) {
    const tokenNativeCurrencyLPAddress: string = getToken(bondId, 'tokenNativeCurrencyLPAddress');
    const nativeCurrencyTokenId: IBlockchain.TokenType = currentNetwork.nativeCurrency.id;
    const nativeCurrencyTokenAddress: string = getToken(nativeCurrencyTokenId, 'address');
    const LPContract = new Contract(tokenNativeCurrencyLPAddress, LpReserveContract, provider);
    const totalSupply: number = await LPContract.totalSupply();
  
    const { reserves: [reserve0, reserve1], comparedAddressInReserve } = await getReserves({
      contractAddress: tokenNativeCurrencyLPAddress,
      contractABI: LpReserveContract,
      provider,
      comparedAddress: nativeCurrencyTokenAddress,
    });
    
    if (comparedAddressInReserve === 0) {
      result = ((reserve0 * 2) / totalSupply);
    } else if (comparedAddressInReserve === 1) {
      result = ((reserve1 * 2) / totalSupply);
    } else {
      throw new Error('error');
    }
  }
  
  return result;
};

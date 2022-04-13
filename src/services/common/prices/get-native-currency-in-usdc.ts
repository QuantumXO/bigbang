import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import { IBlockchain } from '@models/blockchain';
import network from '@services/common/network';
import { getToken } from '@services/helpers/get-token';
import { getReserves } from '@services/helpers/get-reserves';
import { LpReserveContract } from '@services/abi';
import { sleep } from '@services/helpers';

export const getNativeCurrencyInUSDC = async (
  networkID: number,
  provider: StaticJsonRpcProvider | Signer,
): Promise<number> => {
  const uSDCNativeCurrencyLPToken: IBlockchain.IToken | undefined = network.getNetworkUSDCNativeCurrencyLPToken;
  let nativeCurrencyInUSDC: number = 0; // in USDC
  
  try {
    if (uSDCNativeCurrencyLPToken) {
      const uSDCAddress: string = getToken('USDC', 'address');
      
      const { reserves: [reserve0, reserve1], comparedAddressInReserve } = await getReserves({
        contractAddress: uSDCNativeCurrencyLPToken?.tokenNativeCurrencyLPAddress || 'unknown',
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
  
  await sleep(0.01);
  
  return nativeCurrencyInUSDC;
};
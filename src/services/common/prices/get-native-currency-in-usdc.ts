import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import { IBlockchain } from '@models/blockchain';
import { getToken } from '@services/helpers/get-token';
import { getReserves } from '@services/helpers/get-reserves';
import { LpReserveContract } from '@services/abi';
import { sleep } from '@services/helpers';
import { getCurrentNetwork } from '@services/common/network';

export const getNativeCurrencyInUSDC = async (
  networkID: number,
  provider: StaticJsonRpcProvider | Signer,
  tokens: IBlockchain.IToken[],
  uSDCNativeCurrencyLPToken: IBlockchain.IToken | undefined,
): Promise<number> => {
  let nativeCurrencyInUSDC: number = 0; // in USDC
  
  try {
    if (uSDCNativeCurrencyLPToken) {
      const uSDCAddress: string = getToken(tokens, 'USDC', 'address');
      const currentNetwork: IBlockchain.INetwork | undefined = getCurrentNetwork(String(networkID));
      let uSDCTokenDecimals: number = 6;
      
      if (currentNetwork?.id === 'BSC') {
        uSDCTokenDecimals = 18;
      }
      
      const { reserves: [reserve0, reserve1], comparedAddressInReserve } = await getReserves({
        contractAddress: uSDCNativeCurrencyLPToken?.tokenNativeCurrencyLPAddress || 'unknown',
        contractABI: LpReserveContract,
        provider,
        comparedAddress: uSDCAddress,
      });
      
      if (comparedAddressInReserve === 0) {
        nativeCurrencyInUSDC = ((reserve0 * Math.pow(10, 18)) / reserve1) / Math.pow(10, uSDCTokenDecimals);
      } else if (comparedAddressInReserve === 1) {
        nativeCurrencyInUSDC = ((reserve1 * Math.pow(10, 18)) / reserve0) / Math.pow(10, uSDCTokenDecimals);
  
      } else {
        throw new Error('No exist USDC address');
      }
    } else {
      throw new Error('uSDCNativeCurrencyLPToken error');
    }
  } catch (e) {
    console.log('getNativeCurrencyInUSDC() error: ', e);
  }
  
  await sleep(0.01);
  
  return nativeCurrencyInUSDC;
};
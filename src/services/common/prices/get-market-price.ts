import { Contract, Signer } from 'ethers';
import { LpReserveContract } from '@services/abi';
import { IBlockchain } from '@models/blockchain';
import { getToken } from '@services/helpers/get-token';
import network from '@services/common/network';
import { IBond } from '@models/bond';
import { getReserves } from '@services/helpers/get-reserves';
import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { sleep } from '@services/helpers/sleep';
import { getBigPriceInNativeCurrency } from '@services/common/prices/get-big-price-in-native-currency';
import { getNativeCurrencyInUSDC } from '@services/common/prices/get-native-currency-in-usdc';

// #TODO check method
export const getMarketPrice = async (
  networkID: number,
  provider: StaticJsonRpcProvider | Signer
): Promise<number> =>  {
  let result: number = 0
  try {
    const nativeCurrencyInUSDC: number = await getNativeCurrencyInUSDC(networkID, provider);
    const bigPriceInNativeCurrency: number = await getBigPriceInNativeCurrency(networkID, provider);
    // USDC per nativeCurrency
    result = nativeCurrencyInUSDC * bigPriceInNativeCurrency;
  } catch (e) {
    console.error('getMarketPrice() error: ', e);
  }
  
  await sleep(0.01);
  
  return result;
}
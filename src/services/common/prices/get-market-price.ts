import { Signer } from 'ethers';
import { IBlockchain } from '@models/blockchain';
import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { sleep } from '@services/helpers/sleep';
import { getBigPriceInNativeCurrency } from '@services/common/prices/get-big-price-in-native-currency';
import { getNativeCurrencyInUSDC } from '@services/common/prices/get-native-currency-in-usdc';

// #TODO check method
export const getMarketPrice = async (
  networkID: number,
  provider: StaticJsonRpcProvider | Signer,
  tokens: IBlockchain.IToken[],
): Promise<number> =>  {
  let result: number = 0
  try {
    const bigNativeCurrencyLPToken = tokens.find(({ isBigNativeCurrencyLP }: IBlockchain.IToken) => isBigNativeCurrencyLP);
    const uSDCNativeCurrencyLPToken = tokens.find(({ isUSDCNativeCurrencyLP }: IBlockchain.IToken) => isUSDCNativeCurrencyLP);
    const nativeCurrencyInUSDC: number = await getNativeCurrencyInUSDC(networkID, provider, tokens, uSDCNativeCurrencyLPToken);
    const bigPriceInNativeCurrency: number = await getBigPriceInNativeCurrency(networkID, provider, bigNativeCurrencyLPToken);
    // USDC per nativeCurrency
    result = nativeCurrencyInUSDC * bigPriceInNativeCurrency;
  } catch (e) {
    console.log('getMarketPrice() error: ', e);
  }
  
  await sleep(0.01);
  
  return result;
}
import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import { IBlockchain } from '@models/blockchain';
import { getBondAddresses } from '@services/helpers';
import network from '@services/common/network';
import { getReserves } from '@services/helpers/get-reserves';
import { LpReserveContract } from '@services/abi';

export const getBigPriceInNativeCurrency = async (
  networkID: number,
  provider: StaticJsonRpcProvider | Signer
): Promise<number> => {
  const { BIG_ADDRESS }: IBlockchain.IBondMainnetAddresses = getBondAddresses(networkID);
  const bigNativeCurrencyLPToken: IBlockchain.IToken | undefined = network.getNetworkBigNativeCurrencyLPToken;
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
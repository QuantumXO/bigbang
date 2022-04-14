import { IBond } from '@models/bond';
import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import { IBlockchain } from '@models/blockchain';
import network from '@services/common/network';
import { getToken } from '@services/helpers/get-token';
import { getReserves } from '@services/helpers/get-reserves';
import { LpReserveContract } from '@services/abi';

export const getTokenInNativeCurrency = async (
  bondId: IBond.IBondType,
  networkID: number,
  provider: StaticJsonRpcProvider | Signer,
): Promise<number> => {
  const currentNetwork: IBlockchain.INetwork | undefined = network.getCurrentNetwork;
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
        console.log('nativeCurrencyTokenAddress error');
      }
      
      // eslint-disable-next-line prefer-const
      result = reserve0 / reserve1;
    } else {
      throw new Error('currentNetwork Error');
    }
  } catch (e) {
    console.log('getTokenInNativeCurrency() error: ', bondId, e)
  }
  
  return result;
};
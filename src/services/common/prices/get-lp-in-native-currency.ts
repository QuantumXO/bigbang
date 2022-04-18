import { IBond } from '@models/bond';
import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { Contract, Signer } from 'ethers';
import { IBlockchain } from '@models/blockchain';
import { getToken } from '@services/helpers/get-token';
import { LpReserveContract } from '@services/abi';
import { getReserves } from '@services/helpers/get-reserves';
import { getCurrentNetwork } from '@services/common/network';

export const getLPInNativeCurrency = async (
  networkID: number,
  provider: StaticJsonRpcProvider | Signer,
  bondId: IBond.IBondType,
  tokens: IBlockchain.IToken[],
): Promise<number> => {
  const currentNetwork: IBlockchain.INetwork | undefined = getCurrentNetwork(String(networkID));
  let result: number = 0;
  
  if (currentNetwork) {
    const tokenNativeCurrencyLPAddress: string = getToken(tokens, bondId, 'tokenNativeCurrencyLPAddress');
    const nativeCurrencyTokenId: IBlockchain.TokenType = currentNetwork.nativeCurrency.id;
    const nativeCurrencyTokenAddress: string = getToken(tokens, nativeCurrencyTokenId, 'address');
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
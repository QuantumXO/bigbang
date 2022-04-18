import { JsonRpcProvider } from '@ethersproject/providers';
import { BigNumber, utils } from 'ethers';

const GAS: string = '5';

export const getGasPrice = async (provider: JsonRpcProvider): Promise<BigNumber> => {
  const gasPrice: BigNumber = await provider.getGasPrice();
  const convertGas: BigNumber = utils.parseUnits(GAS, 'gwei');
  return gasPrice.add(convertGas);
};
